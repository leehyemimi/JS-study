## 01 . 분석하기 

##### 요구사항

```
1. 탭메뉴를 누르면 탭메뉴에 해당하는 탭내용보여주기
2. 탭내용을  보여줄때 
   ⓐ 아무런 효과없이 바로보여주기
   ⓑ 슬라이드효과
   ⓒ 페이드효과
   ⓓ 앞으로도 출력효과는 계속 해서 추가 될수있으니, 
       jQuery 플러그인처럼 독립적으로 분리해 탭 내용에 연결해서 사용할수 있도록 제작
3. 모든내용은 자바스크립트 prototype 문법을 이용해 클래스로 만들기
4. 탭패널을 좀더 쉽게 사용할수 있도록 jQuery플러그인으로 만들기
```

##### 출력효과

```
1. 효과없음
2. 슬라이드 효과 
   선택된 내용은 선택한 탭메뉴에 따라 좌우로 이동하며 서서히 사라져야(페이드아웃효과)함
   신규로 선택된 탭내용은 좌우로 이동하며 서서히 등장(페이드효과)
3. 페이드효과 
   선택된 탭내용은 움직이지 않고 그자리에서 사라져야(페이드아웃효과)함
   신규로 선택된 탭내용은 그자리에서 서서이 등장(페이드효과)
```

##### 동작효과

```
탭메뉴를 클릭하는 경우
```



## 02. 구현하기

단계01 : 레이아웃 잡기 

단계02 : 탭메뉴 만들기 https://github.com/leehyemimi/JS-study/blob/master/PART07/tabpanel_v1.js

단계03 : 탭내용 출력하기

1. 효과없이 탭내용 활성화 **(tabpanel_v2.js)**

2. 생성자에 effect 매개변수 추가 **(tabpanel_v3.js)**

   var tabMeun1 = new TabPanel("선택자","선택효과이름");

3. 슬라이드 효과 적용해 탭내용 활성화 **(tabpanel_v4.js)**

4. 페이드 효과 적용해 탭내용 활성화 **(tabpanel_v5.js)**

단계04 : 다형성을 활용해 출력효과 분리하기

1. 인터페이스 설계

   ```javascript
   TabPanel.prototype.normalEffect = function($hideContent,$showContent){
   	//현재 탭내용 비활성화 코드
     	//신규 탭내용 활성화 코드
   }

   TabPanel.prototype.slideEffect = function($hideContent,$showContent,showIndex,$tabContentWidth){
   	//현재 탭내용 비활성화 코드
     	//신규 탭내용 활성화 코드
   }

   TabPanel.prototype.fadeEffect = function($hideContent,$showContent){
   	//현재 탭내용 비활성화 코드
     	//신규 탭내용 활성화 코드
   }

   : 매개변수의 개수도 인터페이스의 규약에 해당
   오브젝트 형 하나를 매개변수로 함

   일반효과.effect({
     $hideContent : 현재탭내용,
     $showContent : 신규탭내용
   })

   일반효과.effect({
     $hideContent : 현재탭내용,
     $showContent : 신규탭내용,
     showIndex:신규탭 인덱스,
     $tabContentWidth:탭내용 너비
   })
   ```

   ​

2. 일반효과구현하기

3. 페이드효과구현하기

4. 슬라이드효과구현하기 **(tabpanel_v6.js)**

   ​

5. 다형성과 합성을 활용한 출력효과 적용 **(tabpanel_v7.js)**

단계05 : 옵션값 만들기  **(tabpanel_v8.js)**

단계06 : 캡슐화 처리

단계07 : jQuery 플러그인 제작  **(tabpanel_v9.js)**