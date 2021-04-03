import csv
from genericpath import exists
import re
import time

import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.menu    # 'menu'라는 이름의 db를 사용합니다. 'dbsparta' db가 없다면 새로 만듭니다.

# 보니까 메뉴끼리 URL에 통일성이 없음.. 큰틀에서 한번 URL만 싹 모아오고.. 그리고

# 포함관계 메뉴(음료) - 카테고리(콜드브루) - 상세정보(나이트로 바닐라크림)
# 작업순서
# 음료(메인페이지) > 콜드브루 / 브루드커피 / 에스프레소 URL을 가져온다
# 라고하려했느,ㄴ데 div > gnb_sub_inner 태그가 너무 많아서 저게 안불러와짐

# 이렇게 나눈거 굳이 필요없을듯..
url = ["https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_cold_brew","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_brood","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_espresso"
,"https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_frappuccino","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_blended","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_fizzo",
"https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_tea","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_etc","https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_juice"]
url_name = ["콜드브루","브루드커피","에스프레소","프라푸치노","블렌디드","스타벅스피지오","티","기타제조음료","스타벅스주스(병음료)"]

#########################

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(url[1])

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')
drinks = soup.findAll("li", {"class": re.compile("menuDataSet")})

# 상세페이지의 url을 얻는법
detail_url = []
for drink in drinks:
    a_tag = drink.find("a")
    prod = "https://www.starbucks.co.kr/menu/drink_view.do?product_cd="+a_tag['prod']
    detail_url.append(prod)

# 각 url당 상세정보를 for문을 돌리기
for url in detail_url:
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(url)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    drinks = soup.findAll("div", {"class": re.compile("content02")})

    # 데이터 삽입
    #큰카테고리
    menu = "음료"

    # 중간카테고리
    a = soup.findAll("div", {"class": re.compile("sub_tit_inner")})
    category = a[0].findAll('a', {"class": re.compile("cate")})[0].text

    # 디테일
    eng_name = drinks[0].findAll("div", {"class": re.compile("myAssignZone")})[0].findAll("h4")[0].findAll('span')[0].text
    name = drinks[0].findAll("div", {"class": re.compile("myAssignZone")})[0].findAll("h4")[0].text.replace(eng_name,'')
    description = drinks[0].findAll("p", {"class": re.compile("t1")})[0].text
    price = 5600
    eng_category = "추후직접수정해야함"
    # 영양소가 1차원 배열인데 텍스트로 수정..할지말지 추후 상의
    # 1차원 배열이었는데 ","를 기준으로 나뉘는 str타입으로 변경했습니다
    nutrition = str([x.text for x in drinks[0]("dd")][:8])[1:-1]
    image = drinks[0].findAll("img", {"class": re.compile("zoomImg")})[0]['src']

    
    # hot / ice 구분을 위한 리스트
    default_ice = ["콜드 브루","프라푸치노","스타벅스 피지오"]

    # hot 과 ice를 나누어주는 조건문
    if category in default_ice:
        hot = False
        ice = True
    elif "아이스" in name:
        hot = False
        ice = True
    else:
        hot = True
        ice = False

    # 알러지 조건문
    # 알러지가 없는 경우엔 그냥 값을 안넣어줄까하다가 그냥 none으로 넣는게 나을것같아서..
    try: 
        allergy = drinks[0].findAll("div", {"class": re.compile("product_factor")})[0].findAll("p")[0].text.split(":")[1]
    except IndexError: allergy = "none"

    doc = {"menu":menu,"category":category,"eng_name":eng_name,"name":name
        ,"description":description,"price":5600,"eng_category":"추후수정할예정"
        ,"nutrition":nutrition,"image":image,"allergy":allergy,
        "hot":hot,"ice":ice}
    db.menu.insert_one(doc)
    # print("menu:",menu,"\ncategory:",category,"\nname:",name,"\neng_name:",eng_name,"\ndescription:",description,"\nimage:",image,"\nnutrition:",nutrition,"\nallergy:",allergy,"\nice:",ice,"\nhot:",hot)
