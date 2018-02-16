#### lesson05_프로토타입기반클래스

1. 문법

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

`문제 : 자신의 이름과 나이를 프로퍼티로 가지고 있고 이 정보를 출력하는 showInfo()라는 메서드를 가진 클래스를 만들어보시오.`

```javascript
//클래스 생성자
function User(){
  //프로퍼티정의
  this.name = "Leehyewon"; //name : 프로퍼티
  this.age = 20; //age : 프로퍼티
}

//메서드 정의
User.prototype.showInfo = function(){
  console.log("name = " + this.name + ", age :" + this.age);
}

//인스턴스 생성
var user = new User();
//메서드 호출
user.showInfo();

```

