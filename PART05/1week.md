## PART05 클래스와_클래스단위프로그래밍

### 01장_클래스기초



#### lesson01_클래스란?

> 변수와 함수 중 연관 있는 변수만을 선별해 포장하는 기술
>
> 클래스 사용하는 이유 : 객체 단위로 코드를 그룹화하고 코드를 재사용하기 위해서



1. 객체 단위의 코드 그룹화 (연관 있는 변수와 함수를 그룹화 하는기능)
2. 객체 단위의 중복 코드 제거 및 코드 재사용성 (객체 단위로 코드를 재사용)
3. 자바스크립트에서는 클래스처럼 사용할수 있는 방법 세가지를 지원함 (리터럴/함수/프로토타입방식)

------

#### lesson02_클래스관련 기본개념과 용어정리



##### 인스턴스

> 클래스는 설계도 
>
> 인스턴스는 설계도대로 만들어진 결과물



##### 객체 (= 인스턴스 = 클래스의 실체) 

> 인스턴스의 다른말 일 뿐 두 용어 모드 클래스의 실체를 나타내는 용어
>
> 인스턴스라는 용어는 new키워드를 이용해 클래스의 실체를 생성할때 주로 사용
>
> 객체라는 용어는 인스턴스 생성 후 클래스에서 제공하는 프로퍼티와 메서드를 사용할 때 주로 사용



##### 프로퍼티 (멤버변수)

> 클래스 내부에 만드는 변수
>
> 주로 객체 내부에서 사용하는 일반적은 정보와 객체 내부 함수에서 처리한 결과값이 저장



##### 메서드 (멤버함수)

> 클래스 내부에 만드는 함수 
>
> 주로 객체의 프로퍼티 값을 변경하거나 알아내는 기능과 클래스를 대표하는 기능

------

#### lesson03_오브젝트리터럴기반 클래스

객체 리터럴을 의미하는 {} 내부에 프로퍼티와 메서드를 정의하는 구조

##### 문법

```javascript
var 인스턴스 ={
  프로퍼티 : 초깃값,
  ....
  메서드 : function(){
  ...
  },
    ...
}
```

`예제01`  리터럴 방식을 활용한 간단한 클래스 만들기

```javascript
// 클래스 정의 및 인스턴스 생성
var user = {
  name:"leehyewon",
  age:20,
  showInfo:function(){
    console.log("name:"+this.name+", age:"+this.age);
  }
}

// 매서드 접근하기
user.showInfo();
```

##### 생성자 정의 방법

> 인스턴스가 만들어지면서 자동으로 호출되는 함수
>
> 생성자의 주 용도는 프로퍼티 초기화 역활을 담당
>
> 리터럴 방식에는 생성자 존재하지 않음

##### 프로퍼티 정의 방법

> 세미콜론(;)이 아닌 **콤마(,)**로 구분

```javascript
var 인스턴스 = {
  프로퍼티1:초깃값,
  프로퍼티2:초깃값,
  .....
}
```

##### 메서드 정의 방법

```javascript
var 인스턴스 = {
  프로퍼티1:초깃값,
  프로퍼티2:초깃값,
  메서드1:function(){
  },
  메서드2:function(){
  }
}
```

##### 인스턴스 생성 방법

> 리터럴 방식은 클래스를 정의함과 동시에 자동으로 인스턴스가 만들어짐
>
> 단점 : 다른 클래스 정의 방법과 달리 인스턴스를 하나 이상 만들수 없음

```javascript
var 인스턴스 = {
  프로퍼티와 메서드 정의
}
```

##### 객체외부에서 프로퍼티와 메서드 접근방법

```javascript
var 인스턴스 = {
  프로퍼티1:초깃값,
  프로퍼티2:초깃값,
  메서드1:function(){
  },
  메서드2:function(){
  }
}

인스턴스.프로퍼티2;
인스턴스.메서드2();
```

##### 객체 내부에서 프로퍼티와 메서드 접근방법

```javascript
var 인스턴스 = {
  프로퍼티1:초깃값,
  프로퍼티2:초깃값,
  메서드1:function(){
   	console.log(this.프로퍼티1);
    this.메서드2();
  },
  메서드2:function(){
  }
}
```



`예제02` 리터럴방식으로 클래스를 만들어주세요.

```javascript
$(document).ready(function(){
  // 탭메뉴 요소 초기화
  TabMenu.init();
  // 탭메뉴 요소에 이벤트 등록
  TabMenu.initEvent();
});

var TabMenu = {
  // 탭메뉴 관련 변수
  $tabMenu : null,
  $menuItems : null,
  $selectMenuItem : null,
  // 요소 초기화
  init : function(){
    this.$tabMenu = $("#tabMenu1");
    this.$menuItems = this.$tabMenu.find("li");
  },
  // 이벤트 등록
  initEvent : function(){
    var objThis = this;
    this.$menuItems.on("click",function(){
      objThis.setSelectItem($(this));
    });
  },
  // $menuItem에 해당하는 메뉴 아이템 선택하기
  setSelectItem: function($menuItem){
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if(this.$selectMenuItem){
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
}
```

`예제03` 두개에 탭이 독립적으로 동작할수 있도록 해주세요.

```javascript
$(document).ready(function(){
  TabMenu1.init();
  TabMenu1.initEvent();
  TabMenu2.init();
  TabMenu2.initEvent();
});

var TabMenu1 = {
  // 탭메뉴 관련 변수
  $tabMenu : null,
  $menuItems : null,
  $selectMenuItem : null,
  // 요소 초기화
  init : function(){
    this.$tabMenu = $("#tabMenu1");
    this.$menuItems = this.$tabMenu.find("li");
  },
  // 이벤트 등록
  initEvent : function(){
    var objThis = this;
    this.$menuItems.on("click",function(){
      objThis.setSelectItem($(this));
    });
  },
  // $menuItem에 해당하는 메뉴 아이템 선택하기
  setSelectItem: function($menuItem){
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if(this.$selectMenuItem){
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
}

var TabMenu2 = {
  // 탭메뉴 관련 변수
  $tabMenu : null,
  $menuItems : null,
  $selectMenuItem : null,
  // 요소 초기화
  init : function(){
    this.$tabMenu = $("#tabMenu2");
    this.$menuItems = this.$tabMenu.find("li");
  },
  // 이벤트 등록
  initEvent : function(){
    var objThis = this;
    this.$menuItems.on("click",function(){
      objThis.setSelectItem($(this));
    });
  },
  // $menuItem에 해당하는 메뉴 아이템 선택하기
  setSelectItem: function($menuItem){
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if(this.$selectMenuItem){
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
}
```

##### 특징

**1. 인스턴스를 여러개 만들수 없다.**

**2. 주용도는 여러개의 데이터포장용으로 사용한다.**

여러개의 데이터를 묶어 값을 보관하거나 함수의 매개변수 값으로 전달할때 주로 사용

`예제04` 사용자이름, 아이디, 별명, 나이, 주소를 매개변수 값으로 받아 출력하는 함수를 만들어주세요.

```javascript
function showInfo(name,id,nickname,age,address){
  console.log("name"+name+",id"+id+",nickname"+nickname+",age"+age+",address"+address);
}
showInfo("이혜원","sun","미미",20,"인천시")
```

`풀이`

```javascript
var userInfo = {
  name : "이혜원",
  id : "sun",
  nickname : "미미",
  age : 20,
  address : "인천시"
}
//함수 호출
showInfo(userInfo);
showInfo({name : "이혜원1",id : "sun1",nickname : "미미1",age : 20,	address : "인천시1"});
showInfo({name : "이혜원2",id : "sun2",nickname : "미미2",age : 20,	address : "인천시2"});
//함수에서 데이터 사용
function showInfo(userInfo1){
  console.log("name:"+userInfo1.name+",id:"+userInfo1.id+",nickname:"+userInfo1.nickname+",age:"+userInfo1.age+",address:"+userInfo1.address);
}
```

------

#### lesson04_함수방식 클래스

##### 문법

> 프로퍼티와 메서드는 반드시 자기 자신을 나타내는 this에 정의해야 한다.
>
> 함수이름은 소문자 클래스는 대문자

```javascript
function 클래스이름(){
  this.프로퍼티1=초깃값;
  this.프로퍼티2=초깃값;
  ....
  this.메서드=function(){
  }
  ....
}

var 인스턴스 = new 클래스이름();
```

`예제01` 함수 방식을 활용한 간단한 클래스 만들기

```javascript
// 클래스 정의
function User(){
  this.name="leehyewon";
  this.age=20;
  this.showInfo = function(){
    console.log("name:"+this.name+',age:'+this.age);
  }
}

//인스턴스 생성
var user = new User();
//메서드 호출
user.showInfo();
```

##### 생성자 정의 방법

```javascript
function 클래스이름(){
  this.프로퍼티=초깃값;
  this.메서드=function(){
  }
}

var 인스턴스 = new 클래스이름();
```

##### 프로퍼티 정의 방법

> this에 만들어 준다.

```javascript
function 클래스이름(){
  this.프로퍼티1=초깃값;
  this.프로퍼티2=초깃값;
}
```

##### 메서드 정의 방법

> this에 만들어 준다.

```javascript
function 클래스이름(){
  this.프로퍼티1=초깃값;
  this.메서드1=function(){
  }
  this.메서드2=function(){
  }
}
```

##### 인스턴스 생성 방법

> 함수 방식에서 인스턴스 생성 방법은 '클래스이름' 함수를 호출할때 앖에 new 키워드를 추가해 호출해준다.

```javascript
function 클래스이름(){
  this.프로퍼티 = 초깃값;
  this.메서드 = function(){}
}

var 인스턴스 = new 클래스이름();
```

##### 객체 외부에서 프로퍼티와 메서드 접근방법

```javascript
function 클래스이름(){
  this.프로퍼티 = 초깃값;
  this.메서드 = function(){}
}

var 인스턴스 = new 클래스이름();
인스턴스.프로퍼티;
인스턴스.메서드();
```

##### 객체 내부에서 프로퍼티와 메서드 접근방법

```javascript
function 클래스이름(){
  this.프로퍼티 = 초깃값;
  this.메서드1 = function(){
    console.log(this.프로퍼티);
    this.메서드2();
  }
  this.메서드2 = function(){    
  }
}

var 인스턴스 = new 클래스이름();
```

`예제02`  함수방식으로 클래스를 만들어주세요.

```javascript
$(document).ready(function(){
  var tab1 = new TabMenu();
  tab1.init();
  tab1.initEvent();
});

function TabMenu() {
  this.$tabMenu =null;
  this.$menuItems=null;
  this.$selectMenuItem=null;
  // 요소 초기화
  this.init = function(){
    this.$tabMenu = $("#tabMenu1");
    this.$menuItems = this.$tabMenu.find("li");
  }
  // 이벤트 등록
  this.initEvent = function(){
    var objThis = this;
    this.$menuItems.on("click",function(){
      objThis.setSelectItem($(this));
    });
  }
  // $menuItem에 해당하는 메뉴 아이템 선택하기
  this.setSelectItem = function($menuItem){
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if(this.$selectMenuItem){
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
}
```

`예제03`  두개에 탭이 독립적으로 동작할수 있도록 해주세요.

```javascript
$(document).ready(function(){
  var tab1 = new TabMenu();
  tab1.init("#tabMenu1");
  tab1.initEvent();

  var tab2 = new TabMenu();
  tab2.init("#tabMenu2");
  tab2.initEvent();
});

function TabMenu() {
  this.$tabMenu =null;
  this.$menuItems=null;
  this.$selectMenuItem=null;
  // 요소 초기화
  this.init = function(select){
    this.$tabMenu = $(select);
    this.$menuItems = this.$tabMenu.find("li");
  }
  // 이벤트 등록
  this.initEvent = function(){
    var objThis = this;
    this.$menuItems.on("click",function(){
      objThis.setSelectItem($(this));
    });
  }
  // $menuItem에 해당하는 메뉴 아이템 선택하기
  this.setSelectItem = function($menuItem){
    // 기존 선택메뉴 아이템을 비활성화 처리 하기
    if(this.$selectMenuItem){
      this.$selectMenuItem.removeClass("select");
    }

    // 신규 아이템 활성화 처리 하기
    this.$selectMenuItem = $menuItem;
    this.$selectMenuItem.addClass("select");
  }
}
```

##### 특징

**1. 코드 재사용 기능**

**2.메서드가 중복해서 생성되는 단점**

실무에서는 함수 방식으로는 클래스를 잘 만들진 않다.