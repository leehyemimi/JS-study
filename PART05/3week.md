### 01. 함수를 사용 하는 이유

- 코드 중복 제거 및 코드 재사용
- 유지보수 용이성



#### 함수란? 

> 함수는 특정 기능을 하는 구문(알고리즘,로직)을 독립된 부품으로 만들어 재사용하고자 할때 사용하는 문법



#### 함수 구조 3가지

- 일반적인 함수

```javascript
function 함수이름(){
  실행구문;
}
```

- 매개변수가 있는 함수

```javascript
function 함수이름([매개변수1,매개변수2, ... ]){
  실행구문;
}
```

- 리턴값이 있는 함수

```javascript
 function 함수이름([매개변수1,매개변수2, ... ]){
  실행구문;
   return 실행결과;
 }
```



### 02. 지역변수와 전역변수

- 전역변수 

> 전역 영역에서 만들어지는 변수로 영역에 상관 없이 사용할수 있는 변수

- 지역변수

> 지역 영역에서 만들어지는 변수로서 오직 만들어지는 영역에서만 사용 할수 있다.



### 03. 매개변수가 있는 함수

- 매개변수(파라미터)

> 함수 외부에서 함수 내부로 데이터를 전달할때 매개체 역할을 하는 변수
>
> 매개변수는 지역변수이기도 한다. 
>
> 함수가 실행될때 만들어지고 함수가 종료되면 자동으로 사라진다.
>
> 지역변수가 매개변수와 다른점은 매개변수를 만들때 var를 붙이지 않는다는것

`문법`

```javascript
function 함수이름([매개변수1,매개변수2,....]){
  실행구문;
}
```

`예제`  매개변수로 받는 두 수를 더한 결과값을 출력하는 함수를 만들어주세요.

```javascript
function sum(num1,num2){
  var result = num1 + num2;
  console.log("두 수의 합은 =" + result);
}

sum(10,20);
```



### 04. 리턴값이 있는 함수

`문법`

```javascript
function 함수이름([매개변수1,매개변수2,...]){
  실행구문;
  
  [return 리턴값;]
}
```

`호출`

```javascript
var 변수 = 함수이름();
```



#### 리턴값(return)이란?

> 함수 내부에서 처리한 결과값을 함수 외부로 전달하기 위해 사용하는 일종의 출력값

```javascript
function sum(num1,num2){
  var result = num1 + num2;
  return result;
}

var value = sum(10,20);
console.log("두수의합은 = " + value);
```

리턴값을 굳이 변수에 저장하지 않아도 됨.

> 함수를 즉시 빠져 나오는 기능

`예제` 289p



### 05. 중첩함수

> 함수 내부에 만들어지는 함수

`문법`  

```javascript
function outer(){
  // inner를 중첩 함수라고 부릅니다.
  function inner(){
  }
  inner();
}

outer();
```

- 내부 전용 함수

> 함수내부에서만 사용할수 있음.
>
> 함수내부에서만 사용하는 기능을 중첩함수로 만들어 사용
>
> 일반적인 중첩함수는 이름이 없는 이벤트 리스너

`예제1` 1초에 한번씩 "안녕하세요"를 출력해주세요.

```javascript
function startHello(){
  var count = 0;
  setInterval(function(){
    count++;
    console.log(count+"안녕하세요","<br>");
  },1000)
}
startHello();
```

`해설` startHello() 함수 내부에 setInterval() 함수의 매개변수 값으로 사용한 익명함수가 중첩함수

`예제2` 버튼을 클릭하면 "안녕하세요"를 출력해주세요.

```javascript
$(document).ready(function(){
  $("#btn").click(function(){
    alert("안녕하세요");
  });
});
```



### 06. 콜백함수

> 함수  내부의 처리 결과값을 함수 외부로 내보낼때 사용(일종의 리턴문과 비슷한 기능)
>
> 특정함수의 매개변수 값으로 콜백함수를 넘긴후 처리 결과를 콜백함수의 매개변수에 담아 콜백 함수를 초출하는 구조
>
> 로직구현부분은 동일하고 로직처리부분을 다양하게 처리해야 하는 경우 유용하게 사용

`문법`

```javascript
function 함수이름(callback){
  ....
  callback(결과);
}
```



#### return vs 콜백함수

> 콜백함수를 이용하면 리턴값이 있는 함수구문을 대신 사용할수있음

`문법 비교`

```javascript
function 함수이름(){
  ....
  return 결과;
}

VS

function 함수이름(callback){
  ....
  callback(결과);
}
```



#### 동기 VS 비동기

- 동기 : 함수가 호출된후 끝날때 까지 다음구문을 실행하지 않고 대기하고 있는 경우

- 비동기 : 함수가 호출된후 끝날때 까지 기다리지 않고 바로 다음 구문을 실행하는 경우

  **콜백함수가 주로 비동기 함수 결과값을 처리하기 위한 도구로 사용**



#### 콜백함수 실무에서 사용 (이해안감)

- 이벤트 리스너로 사용

```javascript
$("#btn").click(function(){
  alert("클릭되었습니다.");
})
```

- 타이머 실행 함수로 사용

```javascript
setInterval(function(){
  alert("1초마다 갱신");
},1000);
```

- Ajax 결과값 받을때 사용

```javascript
$.get("http://www.naver.com",function(){
  alert("서버통신이 이뤄졌다.");
});
```

- jQuery  애니메이션 완료

```javascript
$("#btn").animate({
  left:100
},2000,"easeOutQuint",function(){
  alert("에니메이션 완료")
});
```



#### 책 외의 내용

함수를 인자로 넘겨 사용하겠다 입니다.

`예제`

```javascript
var allUserData = []; 

// 콘솔에 결과를 찍는 함수 
function logStuff (userData) { 
  if ( typeof userData === "string") { 
    console.log(userData); 
  } else if ( typeof userData === "object") { 
    for (var item in userData) { 
      console.log(item + ": " + userData[item]); 
    } 
  } 
} 

// 두 개의 인자를 받아서 마지막에 콜백함수를 호출한다. 
function getInput (options, callback) { 
  allUserData.push (options); 
  callback (options); 
} 
// getInput 함수를 호출할 때 , 우리는 logStuf이라는 함수의 이름을 인자로 넘긴다. 
// 그래서 logStuff 은 콜백함수가 되어 getInput이라는 함수의 내부에서 동작을 할것이다. 

getInput ({name:"Rich", speciality:"JavaScript"}, logStuff); 

// name: Rich 
// speciality: JavaScript
```

참고url :  http://yubylab.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0



#### 콜백함수 적용의 기본 원칙

이름이나 익명의 함수를 사용하라

콜백함수로 파라매터 전달

콜백함수가 실행 되기 전에 함수임을 명확하게 하기

this를 사용한 메서드를 콜백으로 사용시 문제 

Call 과 Apply를 통한 this 보호



### 07. 클로저 함수

> 함수내부에 만든 지역변수가 사라지지 않고 계속해서 값을 유지하고 있는 상태
>
> 변수가 메모리에서 제거되지 않고 계속해서 값을 유지하는 상태를 클로저라고 부르며 내부에 있는 함수를 클로저함수라고 함

`문법`

```javascript
function 외부함수(){
   var 변수1;
  function 내부함수(){
    변수1 사용;
  }
}
```



#### 클로저를 사용하면 좋은점

> 바로 연관 있는 변수와 기능(중첩함수)를 하나의 함수로 묶어 독립적으로 실행시킬수 있음
>
> 함수내부에 데이터가 만들어지기 때문에 함수 외부에서 수정할수 없는 보호된 데이터를 만들수 있음