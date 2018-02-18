### lesson05_프로토타입기반클래스

#### 문법

> 클래스 정의 방식 중 가장 많이 사용할 클래스 정의 방식

```javascript
function 클래스이름(){
  this.프로퍼티1 = 초깃값;
  this.프로퍼티2 = 초깃값;
  ....
}

클래스이름.prototype.메서드 = function(){
  .......
}
```

`예제01`  프로토타입 방식을 활용한 간단한 클래스 만들기

`문제`  

자신의 <u>이름과 나이를 프로퍼티</u>로 가지고 있고 ,

이 정보를 출력하는 <u>showInfo()라는 메서드</u>를 가진 클래스를 만들어보시오.

```javascript
//클래스 생성자 (User클래스 생성)
function User(){
  //프로퍼티정의 
  this.name = "Leehyewon"; //이름 프로퍼티
  this.age = 20; //나이 프로퍼티
}

//메서드 정의 (showInfo()메서드 : console에 User클래스의 정보출력하기)
User.prototype.showInfo = function(){
  console.log("name = " + this.name + ", age :" + this.age);
}

//인스턴스 생성 (user인스턴스 생성)
var user = new User();

//메서드 호출
user.showInfo();
```

`응용`

이름과 나이를 객체로 받아보기  



#### 생성자 정의 방법

> 클래스이름 자체가 생성자이며 인스턴스를 생성할때 자동으로 호출 (함수방식과 동일)
>
> 생성자는 주로 프로퍼티 생성 및 객체 정보나 상태를 초기화하는 메서드를 호출하는 역활

```javascript
function 클래스이름(){
  초기화 작업
}
```



#### 프로퍼티 정의 방법

> this에 만들어준다.

```javascript
function 클래스이름(){
  this.프로퍼티1 = 초깃값;
  this.프로퍼티2 = 초깃값;
}
```



#### 메서드 정의 방법

> prototype이라는 곳에 만들어준다.
>
> 함수방식은 생성자 내부에서 this 속성에 메서드를 생성 
>
> <u>프로토타입방식은 생성자 밖에서 prototype 속성에 메서드를 생성</u>

```javascript
 function 클래스이름(){
  this.프로퍼티1 = 초깃값;
  this.프로퍼티2 = 초깃값;
}

클래스이름.prototype.메서드1=function(){
  ...
};
클래스이름.prototype.메서드2=function(){
  ...
};
```

`참고 `  함수방식

```javascript
function 클래스이름(){
  this.프로퍼티1 = 초깃값;
  this.프로퍼티2 = 초깃값;
  this.메서드1 = function(){
    ...
  }
  this.메서드2 = function(){
    ...
  }
}
```



#### 인스턴스 생성 방법

> 클래스 이름 함수를 호출할때 앞에 new 키워드를 추가해 호출

```javascript
function 클래스이름(){
  this.프로퍼티 = 초깃값;
}
클래스이름.prototype.메서드 = function(){}

var 인스턴스 = new 클래스이름();
```



#### 객체 외부에서 프로퍼티와 메서드 접근방법

> 객체외부에서 객체내부에 있는 프로퍼티와 메서드에 접근하려면 인스턴스 생성후 접근 연산자(.)를 이용한다.

```javascript
function 클래스이름(){

  this.프로퍼티 = 초깃값;

}

클래스이름.prototype.메서드 = function(){}

var 인스턴스 = new 클래스이름();

인스턴스.프로퍼티;
인스턴스.메서드();
```



#### 객체 내부에서 프로퍼티와 메서드 접근방법

> 현재 객체 자신을 나타내는 this라는 키워드와 접근 연산자(.)를 사용

```javascript
function 클래스이름(){
  this.프로퍼티1 = 초깃값;
  this.프로퍼티2 = 초깃값;
}

클래스이름.prototype.메서드1 = function(){
  console.log(this.프로퍼티1);
  this.메서드2();
}

클래스이름.prototype.메서드2 = function(){
 ...
}
 
 var 인스턴스 = new 클래스이름();
```



`예제02  `함수단뒤 코딩으로 만들어진 탭 메뉴를 프로토타입방식으로 클래스를 만들어주세요.

> 1. 클래스생성
> 2. 변수를 프로퍼티로 만들기
> 3. 함수를 메서드로 만들기
> 4. 객체 내부 프로퍼티와 메서드 사용하기
> 5. 인스턴스 생성하기
> 6. 객체 외부에서 프로퍼티와 메서드 사용하기

```javascript
var $tabMenu =null;
var $menuItems=null;
var $selectMenuItem=null;

$(document).ready(function(){
  // 탭메뉴 요소 초기화
  init();
  // 탭메뉴 요소에 이벤트 등록
  initEvent();
});

// 요소 초기화
function init(){
  $tabMenu = $("#tabMenu1");
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
  // 기존 선택메뉴 아이템을 비활성화 처리 하기
  if($selectMenuItem){
    $selectMenuItem.removeClass("select");
  }

  // 신규 아이템 활성화 처리 하기
  $selectMenuItem = $menuItem;
  $selectMenuItem.addClass("select");
}
```

`풀이`

```javascript
function TabMenu(){ // 1.클래스생성
  // 2.프로퍼티로 만들기 (탭메뉴 관련 변수)
  this.$tabMenu = null;
  this.$menuItems=null;
  this.$selectMenuItem = null;
}

// 3.메서드로 만들기 / 4. 객체 내부 프로퍼티와 메서드 사용하기
// 요소 초기화
TabMenu.prototype.init = function() {
  this.$tabMenu = $("#tabMenu1");
  this.$menuItems = this.$tabMenu.find("li");
};
// 이벤트 등록
TabMenu.prototype.initEvent = function(){
  var objThis = this;
  this.$menuItems.on("click",function(){
    objThis.setSelectItem($(this));
  });
};
// $menuItem에 해당하는 메뉴 아이템 선택하기
TabMenu.prototype.setSelectItem = function($menuItem){
  // 기존 선택메뉴 아이템을 비활성화 처리 하기
  if(this.$selectMenuItem){
    this.$selectMenuItem.removeClass("select");
  }

  // 신규 아이템 활성화 처리 하기
  this.$selectMenuItem = $menuItem;
  this.$selectMenuItem.addClass("select");
};

$(document).ready(function(){
  // 5.인스턴스생성
  var tab1 = new TabMenu();

  //6. 객체 외부에서 프로퍼티와 메서드 사용하기
  // 탭메뉴 요소 초기화
  tab1.init();
  // 탭메뉴 요소에 이벤트 등록
  tab1.initEvent();
});
```



`예제03 ` 두번째 탭메뉴가 독립적으로 동작할수 있게 만들어주세요.

```javascript
$(document).ready(function(){
  var tab1 = new TabMenu();
  tab1.init("#tabMenu1");
  tab1.initEvent();

  var tab2 = new TabMenu();
  tab2.init("#tabMenu2");
  tab2.initEvent();
});

function TabMenu(){
  this.$tabMenu = null;
  this.$menuItems=null;
  this.$selectMenuItem = null;
}

TabMenu.prototype.init = function(select) { //tab여러개 컨트롤 할수있게 매개변수 받아오기
  this.$tabMenu = $(select);
  this.$menuItems = this.$tabMenu.find("li");
};
TabMenu.prototype.initEvent = function(){
  var objThis = this;
  this.$menuItems.on("click",function(){
    objThis.setSelectItem($(this));
  });
};
TabMenu.prototype.setSelectItem = function($menuItem){
  if(this.$selectMenuItem){
    this.$selectMenuItem.removeClass("select");
  }
  this.$selectMenuItem = $menuItem;
  this.$selectMenuItem.addClass("select");
};
```

`예제03_심화 ` `예제03`을 최적화해주세요.

```javascript
$(document).ready(function(){
  var tab1 = new TabMenu("#tabMenu1");
  var tab2 = new TabMenu("#tabMenu2");
});

function TabMenu(select){ //tab여러개 컨트롤 할수있게 매개변수 받아오기
  this.$tabMenu = null;
  this.$menuItems=null;
  this.$selectMenuItem = null;
  
  this.init(select);
  this.initEvent();
}

TabMenu.prototype.init = function(select) { 
  this.$tabMenu = $(select);
  this.$menuItems = this.$tabMenu.find("li");
};
TabMenu.prototype.initEvent = function(){
  var objThis = this;
  this.$menuItems.on("click",function(){
    objThis.setSelectItem($(this));
  });
};
TabMenu.prototype.setSelectItem = function($menuItem){
  if(this.$selectMenuItem){
    this.$selectMenuItem.removeClass("select");
  }
  this.$selectMenuItem = $menuItem;
  this.$selectMenuItem.addClass("select");
};
```



#### 특징

**1. 코드 재사용 기능**

함수기반클래스오 동일하게 하나의 탭메뉴 클래스로 여러개의 탭메뉴를 만들수 있는 장점

**2. 메서드 공유 기능**

모든 인스턴스가 prototype에 만든 메서드를 공유해서 사용한다는 점

메서드들은 오직 한번만 만들어짐 (**함수방식과 비교필요)

**3. 상속기능**

자바스크립트에서는 prototype을 이용해 상속을 구현함



### lesson06_클래스 정의 방법 3가지 비교

#### 특징

- 프로토타입 방식

> 일반적인 클래스 제작방법
>
> 인스턴스마다 공통된 메서드를 공유해서 사용하는 장점이 있음
>
> JQuery도 prototype 방식으로 만들어져있음

- 함수방식

> 간단한 클래스 제작시 사용
>
> 인스턴스마다 메서드가 독립적으로 만들어지는 단점이 있음

- 리터럴방식

> 클래스 만드는 용도는 아니며 주로 여러 개의 매개변수를 그룹으로 묶어 함수의 매개별수로 보낼때 사용
>
> 정의와 함께 인스턴스가 만들어지는 장점이 있음. 단! 인스턴스는 오직 하나만 만들수 있음



#### 클래스 정의 방법 비교

- 리터럴 방식

```javascript
var 인스턴스 = {
  프로퍼티1:초깃값,
  프로퍼티2:초깃값,
  
  메서드1 : function(){
  },
  메서드2 : function(){
  }
}
```

- 함수방식

```javascript
function 클래스이름(){
  this.프로퍼티1=초깃값;
  this.프로퍼티2=초깃값;
  
  this.메서드1=function(){
  }
   this.메서드2=function(){
  }
}
```

- 프로토타입 방식

```javascript
function 클래스이름(){
  this.프로퍼티1=초깃값;
  this.프로퍼티2=초깃값;
}

클래스이름.prototype.메서드1 = function(){
}
클래스이름.prototype.메서드2 = function(){
}
```



#### 인스턴스 생성 방법

- 리터럴 방식

```javascript
var 인스턴스 = {
}
```

- 함수 방식

```javascript
var 인스턴스 = new 클래스이름()
```

- 프로토타입 방식

```javascript
var 인스턴스 = new 클래스이름()
```



#### 객체 외부에서 프로퍼티와 메서드 접근방법

- 리터럴 방식 / 함수방식/ 프로토타입방식

```javascript
인스턴스.프로퍼티1;
인스턴스.메서드1();
```

