## Lesson 04 함수 기반 플러그인 만들기 

> 플러그인 구현 코드를  each() 메서드의 매개변수 값으로 넘기는 함수 내부에 작성하는 구조를 의미함
>
> 가장 일반적으로 플러그인을 제작하는 방법

#### 01.구문   

```javascript
(function($){
  $.fn.플러그인 이름 = function(속성값){
    this.each(function(index){
      //구현코드위치
      var 변수1;
      var 변수2;
      ...
      function 함수1(){
        ....
      }
      function 함수2(){
        ....
      }      
    });
    return this;
  }
})(jQuery)
```

#### 02.예제

```javascript
(function($){
  $.fn.tabMenu = function(){
    this.each(function(index){
      //구현코드위치
      var $tabMenu =null;
      var $menuItems=null;
      var $selectMenuItem=null;

      // 요소 초기화
      function init(selector){
        $tabMenu = $(selector);
        $menuItems = $tabMenu.find("li");
      }

      // 이벤트 등록
      function initEvent(){
        $menuItems.on("click",function(){
          setSelectItem($(this));
        });
      }

      // $menuItem에 해당하는 메뉴 아이템 선택하기
      function setSelectItem($menuItem){
        // 기존 선택메뉴 아이템을 비활성화 처리하기
        if($selectMenuItem){
          $selectMenuItem.removeClass("select");
        }

        // 신규 아이템 활성화 처리하기
        $selectMenuItem = $menuItem;
        $selectMenuItem.addClass("select");
      }

      init(this);
      initEvent();
      console.log(this);
    });
    return this;
  }
})(jQuery);

$(document).ready(function(){
  //플러그인 호출
  $(".tab-menu").tabMenu();
});
```

#### 03.정리

내부 함수가 중복해서 만들어지는 문제점

해결방법 : prototype 방식의 클래시를 활용해 플러그인을 만드는것

## Lesson 05 클래스 기반 플러그인 만들기

> prototype 기반 클래스로 만든 후 플러그인에서 클래스 인스턴스를 생선한 후 사용하는 구조
>
> 함수기반 플러그인이 가지고 있는 문제점 해결가능

#### 01.문법

```javascript
(function($){
  function MyClass(){
    this.프로퍼티;
    this.프로퍼티;
  }
  MyClass.prototype.메서드1=function(){
    ......
  }
  MyClass.prototype.메서드2=function(){
    ......
  }
    
    $.fn.플러그인이름=function(){
      this.each(function(index){
        var obj = new MyClass();
      }
    }
})(jQuery);
```

#### 02.예제

```javascript
(function($){
  function TabMenu(selector) {
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;

    this.init(selector);
    this.initEvent();
  }

  // 요소 초기화
  TabMenu.prototype.init=function(selelctor){
    this.$tabMenu = $(selelctor);
    this.$menuItems = this.$tabMenu.find("li");
  }

  // 이벤트 등록
  TabMenu.prototype.initEvent = function() {
    var objThis = this;
    this.$menuItems.on("click", function() {
      objThis.setSelectItem($(this));
    });
  }

  // $menuItem에 해당하는 메뉴 아이템 선택하기
  TabMenu.prototype.setSelectItem = function($menuItem) {
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if (this.$selectMenuItem) {
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }

  $.fn.tabMenu = function(){
    this.each(function(index){
      //구현코드위치
      var tabMenu = new TabMenu(this);
      console.log(this);
    });
    return this;
  }
})(jQuery);

$(document).ready(function(){
  //플러그인 호출
  $(".tab-menu").tabMenu();
});
```

#### 03.정리

> 프로토타입 클래스 기반 플러그인 제작이 훨씬 더 효율적

## Lesson 06 플러그인 그룹 만들기

> 연관된 클래스 기반으로 jQuery 플러그인을 만들때 클래스 인스턴스를 연관 있는 플러그인에서 공유해서 사용하는 구조

`예제` 외부에서 특정탭메뉴 아이템을 선택할수 있게 만들어주세요.

```javascript
(function($){
  function TabMenu(selector) {
    this.$tabMenu = null;
    this.$menuItems = null;
    this.$selectMenuItem = null;

    this.init(selector);
    this.initEvent();
  }

  // 요소 초기화
  TabMenu.prototype.init=function(selelctor){
    this.$tabMenu = $(selelctor);
    this.$menuItems = this.$tabMenu.find("li");
  }

  // 이벤트 등록
  TabMenu.prototype.initEvent = function() {
    var objThis = this;
    this.$menuItems.on("click", function() {
      objThis.setSelectItem($(this));
    });
  }

  // $menuItem에 해당하는 메뉴 아이템 선택하기
  TabMenu.prototype.setSelectItem = function($menuItem) {
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if (this.$selectMenuItem) {
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
	////////////////////////////
   $.fn.tabMenu = function(){
    this.each(function(index){
      var tabMenu = new TabMenu(this);
      $(this).data("tabMenu_data",tabMenu); //인스턴스를 data()를 활용해 저장
    });
    return this;
  }
   
   // n번째 탭메뉴 아이템 선택하기 // 신규로함수생성
   $.fn.selectTabMenuItemAt = function(selectIndex){
    this.each(function(index){
      //저장한 TabMenu 객체 구하기
      var tabMenu = $(this).data("tabMenu_data");
      if(tabMenu){
         //n번째 메뉴 아이템 선택하기
        tabMenu.$selectMenuItem(tabMenu.$menuItem.eq(selectIndex));
        }
    });
    return this;
  }
})(jQuery)
```

#### 결론

> 플러그인 그룹구조 : 특정 플러그인에서 생성한 클래스의 인스턴스를 다른 플러그인에서 재사용해야 하는 경우 jQuery의 data()메서드를 활용해 생성한 인스턴스를 저장해 재사용하면 됨



#### * jQuery에서 data()메서드란?

> 일치 된 요소와 관련된 임의의 데이터를 저장하거나 일치하는 요소 집합의 첫 번째 요소에 대해 명명 된 데이터 저장소에 값을 반환합니다.

http://api.jquery.com/data/

`예제`

```javascript
$(document).ready(function(){
  $( "body" ).data( "foo", 52 );
  $( "body" ).data( "bar", { myType: "test", count: 40 } );
  $( "body" ).data( { baz: [ 1, 2, 3 ] } );
  $( "body" ).data( "foo" ); // 52
  $( "body" ).data(); // { foo: 52, bar: { myType: "test", count: 40 }, baz: [ 1, 2, 3 ] }

  console.log($( "body" ).data());
});
```

## Lesson 06 extend() 메서드를 활용한 플러그인 옵션처리

> jQuery 플러그인의 경우 기능을 변경할 수 있는 옵션값이 존재합니다.

#### 01_기본옵션값

플러그인을 만들다 보면 플러그인 호출시 넘겨야 하는 매개변수 값이 많은 경우 / 이값들은 주로 옵션값

`예제` 플러그인에 기본 옵션값 적용하기 [예제파일](https://github.com/leehyemimi/JS-study/blob/master/PART05/Chapter03/extend01.html)

```javascript
function($){
  $defaultOptions ={
    duration:500,
    easing:"easeInQuint",
    delayTime:1000
  }
  $.fn.removeAni=function(duration,easing,delayTime){
    //사용자 옵션 정보 유무 판단 후, 값이 없는 경우 기본값으로 설정
    duration = duration || $defaultOptions.duration;
    easing = easing || $defaultOptions.easing;
    delayTime = delayTime || $defaultOptions.delayTime;
    //옵션값을 변경
    this.each(function(index){
      var $target= $(this);
      $target.delay(index*delayTime).animate({
        height:0
      },duration,easing, function(){
        $target.remove();
      })
    })

    return this;
  }
})(jQuery);

$(document).ready(function(){
  // 플러그인 호출
  $(".menu li").removeAni();
});
```

[연산자](https://github.com/leehyemimi/JS-study/blob/master/PART05/Chapter03/%EC%97%B0%EC%82%B0%EC%9E%90.md)

#### 02_jQuery의 extend() 메서드 소개

> 객체의 기능을 합칠때 사용하는 메서드 
>
> 플러그인 제작 시 옵션값 처리에 유용하게 사용됨

`사용법` 

```javascript
var reault = jQuery.extend(target[,object1][,objectN]);
```

`매개변수`

target : 합쳐진 기능을 최종적으로 저장할 객체

object1, objectN :  합쳐질 기능을 가진 객체

`리턴값`

리턴값은 target에 저장되는 값과 같음

`예제` [예제파일](https://github.com/leehyemimi/JS-study/blob/master/PART05/Chapter03/extend02.html)

```javascript
 $(document).ready(function(){
   var target = {
     property1:"a",
     property2:"b",
     method1:function(){
       console.log("m1()");
     },
     method2:function(){
       console.log("m2()");
     }
   };

   var object1 = {
     property1:"1_a",
     property3:"1_c",
     method1:function(){
       console.log("1_m1()");
     },
     method3:function(){
       console.log("1_m3()");
     }
   };

   var result = jQuery.extend(target,object1);
   console.log("target = ", target);
   console.log("object1 = ", object1);
   console.log("result = ", result);

 });
```

##### extend() 메서드 사용시 주의사항 및 해결책

> extend() 메서드 실행후 target 자체도 변경됨
>
> 플러그인에서 extend() 메서드를 활용해 옵션값을 처리할때 target에 해당하는 기본 옵션값이 변경되는 안되는 경우가 있음

`예제` [예제파일](https://github.com/leehyemimi/JS-study/blob/master/PART05/Chapter03/extend03.html)

```javascript
var result = jQuery.extend(null,target,object1);
var result = jQuery.extend({},target,object1);
```

### 03_extend() 메서드를 활용한 플러그인 옵션 처리

`예제`

```javascript
(function($){
  $.defaultOptions = {
    duration:500,
    delayTime:1000
  }
  $.fn.removeAni=function(options){
    // 사용자 옵션 정보 유무 판단 후, 값이 없는 경우 기본 값으로 설정
    options = $.extend(null, $.defaultOptions, options);

    // 옵션 값을 변경
    this.each(function(index){
      var $target= $(this);
      $target.delay(index*options.delayTime).animate({
        height:0
      },options.duration, function(){
        $target.remove();
      })
    })

    return this;
  }
})(jQuery)

$(document).ready(function(){
  // 플러그인 호출
  $(".menu li").removeAni({
    durtaion:1000
  });
});
```

[bx슬라이드플러그인](https://github.com/leehyemimi/JS-study/blob/master/PART05/Chapter03/bx.js)