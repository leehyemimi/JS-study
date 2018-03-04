### 02장_클래스 중급

#### lesson01_this의 정체

**this가 만들어 지는 경우**

1. 일반함수에서 this
2. 중첩함수에서 this
3. 이벤트에서 this
4. 메서드에서 this
5. 메서드 내부의 중첩 함수에서 this

##### 01. this란?

> 일반적으로 메서드를 호출한 객체가 저장되어 있는 속성

`예제1`  this값 확인하기

```javascript
function MyClass(){
  this.property1 = "value1";
}

MyClass.prototype.method1=function(){
  alert(this.property1);
}

var my1 = new MyClass();
my1.method1();
```



##### 02. 일반 함수에서의 this

`예제2`  다음예제를 실행하면 1,2,3에는 어떤 값이 출력될것인지 확인해보시오.

```javascript
var data = 10;
function outer(){
  this.data=20;
  data=30;
  
  console.log("1. data =" + data);
  console.log("2. this.data =" + this.data);//지역변수내에서 data를 찾고 없으면 전역변수로 
  console.log("3. window.data =" + window.data); //일반함수 내부에서 this는 전역객체인 window에 저장된다.
}

outer();
```



##### 03. 일반 중첩함수에서의 this

`예제3`  다음예제를 실행하면 1,2,3에는 어떤 값이 출력될것인지 확인해보시오.

```javascript
var data = 10;
function outer(){
  function inner(){
    this.data=20;
 	data=30;
  
  console.log("1. data =" + data);
  console.log("2. this.data =" + this.data);
  console.log("3. window.data =" + window.data); 
  }  
}
```



##### 04. 이벤트 리스너에서의 this

`예제3`  다음예제를 실행하면 1,2,3에는 어떤 값이 출력될것인지 확인해보시오.

```javascript
var data = 10;
$(document).ready(function(){
  $()
});
function outer(){
  function inner(){
    this.data=20;
 	data=30;
  
  console.log("1. data =" + data);
  console.log("2. this.data =" + this.data);
  console.log("3. window.data =" + window.data); 
  }  
}
```

