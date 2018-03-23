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