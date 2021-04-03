import csv
import re
import time

import requests
from bs4 import BeautifulSoup
# from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
# import pandas as pd

# client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
# db = client.menu    # 'menu'라는 이름의 db를 사용합니다. 'dbsparta' db가 없다면 새로 만듭니다.

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
# print(drinks)

# for drink in drinks:
#     a_tag = drink.find("a")
#     prod = "https://www.starbucks.co.kr/menu/drink_view.do?product_cd="+a_tag['prod']
#     image_tag = drink.find("img")
#     title = image_tag['alt']
#     print(prod)

print("출력잘됨")
#결과값 106509

# driver = webdriver.Chrome(ChromeDriverManager().install())
# url = "https://www.starbucks.co.kr/index.do"
# driver.get(url)

# html = driver.page_source
# soup = BeautifulSoup(html, 'html.parser')

# menu = soup.findAll("div",{"class": re.compile("gnb_sub_inner")})
# print(menu)