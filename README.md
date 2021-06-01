# 스타벅스 어플리케이션 클론 - Backend
스타벅스 어플리케이션 클론

## 클론코딩 소개
스타벅스의 리뉴얼된 어플리케이션을 클론코딩 하였습니다.

## 🎥시연영상 주소
https://www.youtube.com/watch?v=4sEtqqU6d8U

## 📌 프로젝트 기간 및 팀원 소개
2021년 4월 2일 ~ 2021년 4월 8일
- 팀원
  - **CLIENT**
    
    ![](https://img.shields.io/badge/ReactNative-문형원-blue?style=for-the-badge)
    
    ![](https://img.shields.io/badge/ReactNative-주형인-blue?style=for-the-badge)
    
  - **BACKEND** 

     ![](https://img.shields.io/badge/Node.js-유지윤-pink?style=for-the-badge)
     
     ![](https://img.shields.io/badge/Node.js-원가연-pink?style=for-the-badge)

## ⚒️개발 스펙
- Node.js
- 개발 언어 : Javascript
- 데이터베이스 : MongoDB
- 배포 : AWS

## 🎯API 설명
|기능          |API URL                            |Method|Return page        |request(프론트->서버)                                      |response(서버->프론트)           
|------------|-----------------------------------|------|-------------------|------------------------------------------------------|----------------------------|
|장바구니 불러오기   |/cart                              |GET   |                   |token                                                 |장바구니에 있는 메뉴          
|나만의 메뉴      |/menu/mymenu                       |GET   |                   |token                                                 |해당 유저가 저장한 나만의 메뉴     
|장바구니에 넣기    |/menu/:menuId/cart                 |POST  |                   |token                                                 |성공 여부 또는 에러 메세지            
|나만의 메뉴      |/menu/mymenu                       |POST  |페이지 그대로            |token, size, cup_option , menuId                      |                            
|주문 내역 /히스토리 |/order                             |GET   |히스토리               |token                                                 |해당 유저의 주문 내역 전체(최신순으로)     
|유저정보        |/user/user_info                    |GET   |                   |token                                                 |                           
|새로 나온 메뉴    |/menu/new_menu                     |GET   |                   |                                                      |2021년 cherryblossom 메뉴들     
|인기 메뉴       |/menu/popular_menu                 |GET   |                   |                                                      |userhistory DB에서 최신 주문 5개 정보
|결제하기        |/order                             |POST  |메인 페이지 또는 주문 내역 페이지|menuId, size, cup_option,num(수량),token(header에 보내주세요) |결제 성공 여부                      
|카테고리별 페이지   |/menu/drink/categories/:categoryId |GET   |                   |                                                      |해당 카테고리 음료 정보               
|전체 메뉴       |/menu/drink                        |GET   |메뉴 페이지             |                                                      |                            
|회원가입        |/user/register                     |POST  |로그인 페이지            |id,password,nickName                                  |회원 가입 성공 여부                 
|로그인         |/user/login                        |POST  |메인 페이지             |id, password                                          |token 정보                   
|각 음료별 상세 정보 |/menu/drink/:menuId                |GET   |음료 상세 페이지          |                                                      |해당 음료의 상세 정보(가격, 알레르기, 사진)     
|            |                                   |      |                   |                                                      |                            |   |              |

## 🌱성장한 점
1. Client와의 작업을 통한 협업 경험
2. 클론 코딩 경험으로 서비스를 뜯어보며 전체 서비스 로직을 파악하는 경험
