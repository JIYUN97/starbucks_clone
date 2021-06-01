# starbucks_clone
스타벅스 어플리케이션 클론

# 시연영상 주소

# 클론코딩 소개

# 📌 프로젝트 기간 및 팀원 소개
2021년 4월 2일 ~ 2021년 4월 8일

# 개발 스펙
Node.js
개발 언어 : Javascript
데이터베이스 : MongoDB
배포 : AWS

# API 설명
|기능|Method|URL| Response|
|:---|:---:|:---:|:---:|
|로그인|POST|/user/login| token |
|회원가입|POST|/user/register| token |
|로그인|POST|/user/login| token |
|로그인|POST|/user/login| token |
|기능                                  |API URL                                                                                |Method|Return page        |request(프론트->서버)                                      |response(서버->프론트)           |비고 |역할        |우선 순위|
|------------------------------------|---------------------------------------------------------------------------------------|------|-------------------|------------------------------------------------------|----------------------------|---|----------|-----|
|장바구니 불러오기                           |/cart                                                                                  |GET   |                   |token                                                 |장바구니에 있는 메뉴                 |   |완료, 지윤    |3    |
|나만의 메뉴                              |/menu/mymenu                                                                           |GET   |                   |token                                                 |해당 유저가 저장한 나만의 메뉴           |   |가연, 완료    |     |
|장바구니에 넣기                            |/menu/:menuId/cart                                                                     |POST  |                   |token                                                 |성공 여부 또는 에러 메세지             |   |완료, 지윤    |3    |
|나만의 메뉴                              |/menu/mymenu                                                                           |POST  |페이지 그대로            |token, size, cup_option , menuId                      |                            |   |가연, 완료    |3    |
|주문 내역 /히스토리                         |/order                                                                                 |GET   |히스토리               |token                                                 |해당 유저의 주문 내역 전체(최신순으로)      |   |완료, 지윤    |3    |
|유저정보                                |/user/user_info                                                                        |GET   |                   |token                                                 |                            |   |가연, 완료, 지윤|1    |
|새로 나온 메뉴                            |/menu/new_menu                                                                         |GET   |                   |                                                      |2021년 cherryblossom 메뉴들     |   |가연, 완료    |1    |
|인기 메뉴                               |/menu/popular_menu                                                                     |GET   |                   |                                                      |userhistory DB에서 최신 주문 5개 정보|   |가연, 완료    |1    |
|결제하기 (결제하기 페이지에서 하단 결제하기 버튼을 눌렀을 경우)|/order                                                                                 |POST  |메인 페이지 또는 주문 내역 페이지|menuId, size, cup_option,num(수량),token(header에 보내주세요) |결제 성공 여부                    |   |완료, 지윤    |1    |
|카테고리별 페이지                           |/menu/drink/categories/:categoryId (ex:/menu/drink/categories/6069beea440bb1065c7f2ad7)|GET   |                   |                                                      |해당 카테고리 음료 정보               |   |완료, 지윤    |1    |
|전체 메뉴                               |/menu/drink                                                                            |GET   |메뉴 페이지             |                                                      |                            |   |완료, 지윤    |1    |
|회원가입                                |/user/register                                                                         |POST  |로그인 페이지            |id,password,nickName                                  |회원 가입 성공 여부                 |   |가연, 완료    |1    |
|로그인                                 |/user/login                                                                            |POST  |메인 페이지             |id, password                                          |token 정보                    |   |완료, 지윤    |1    |
|각 음료별 상세 정보                         |/menu/drink/:menuId                                                                    |GET   |음료 상세 페이지          |                                                      |해당 음료의 상세 정보(가격, 알레르기, 사진)  |   |완료, 지윤    |1    |
|                                    |                                                                                       |      |                   |                                                      |                            |   |          |     |
