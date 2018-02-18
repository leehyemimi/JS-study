jQuery는 정말 많이 쓰는 **라이브러리**인데요. 웹 개발자뿐만 아니라 디자이너도 사용하는 대중적인 라이브러리입니다. 아마 자바스크립트 라이브러리 중에서 제일 인기가 많을 거에요. 지금은 현재 3버전까지 나와서 꾸준히 발전하고 있는데요. jQuery는 **최신 버전**을 쓰는 게 좋습니다. 최신 버전이 최적화가 잘 되어있기 때문이죠.

jQuery에 대한 강좌를 여기서 하는 것은 아니고요. 지금 따로 할까 생각중에 있습니다만, jQuery가 워낙 간단해서 할 필요성을 잘 못느끼고 있습니다. 이 강좌에서는 jQuery가 어떻게 구성되어 있는지 코드를 분석할 겁니다.

[jQuery 1.0.1 버전](http://code.jquery.com/jquery-1.0.1.js)을 사용할건데요. 최초의 버전(1.0.0은 못 구하겠네요)이자 핵심 기능만 담고 있기 때문에 분석하기 편해서 선택했습니다. jQuery 코드 전체를 직접 보고 싶다면 *code.jquery.com/jquery-버전.js 하면 됩니다. *어떤 것을 분석할 지는 다음과 같습니다.

- jQuery는 어떻게 $를 사용하는가
- $(function() { 내용 });은 어떻게 기능하는가 
- $(선택자)는 어떻게 기능하는가
- 제이쿼리 플러그인에서 사용하는 $.fn은 무슨 원리인가 
- $(선택자).find().css()... 등 메소드 체이닝은 어떻게 기능하는가

후, 알아볼게 많네요. 일단 jQuery와 $부터 알아보죠.

```javascript
function jQuery(a,c) {
  // Shortcut for document ready (because $(document).each() is silly)
  if ( a && a.constructor == Function && jQuery.fn.ready )
    return jQuery(document).ready(a); // (1)
 // Make sure that a selection was provided
  a = a || jQuery.context || document; // (2)
 // Watch for when a jQuery object is passed as the selector
  if ( a.jquery )
    return $( jQuery.merge( a, [] ) ); // (3)
 // Watch for when a jQuery object is passed at the context
  if ( c && c.jquery )
    return $( c ).find(a); // (4)
 // If the context is global, return a new object
  if ( window == this )
    return new jQuery(a,c); // (5)
 // Handle HTML strings
  var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
  if ( m ) a = jQuery.clean( [ m[1] ] ); // (6)
 // Watch for when an array is passed in
  this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
  // Assume that it is an array of DOM Elements
  jQuery.merge( a, [] ) :
 // Find the matching elements and save them for later
  jQuery.find( a, c ) ); // (7)
 // See if an extra function was provided
  var fn = arguments[ arguments.length - 1 ]; // (8)
 // If so, execute it in context
  if ( fn && fn.constructor == Function ) // (9)
    this.each(fn);
}
// Map over the $ in case of overwrite
if ( typeof $ != "undefined" )
  jQuery._$ = $;
// Map the jQuery namespace to the '$' one
var $ = jQuery;
```

jQuery라는 함수를 엄청 복잡하게 정의해 놓았네요. 코드가 길어서 위에서부터 순서대로 (1), (2), (3)... 매겨놓았습니다. 위의 코드 마지막의 `var $ = jQuery`가 $를 jQuery와 동일시하는 코드입니다. 그래서 jQuery를 써도 되고, $를 써도 됩니다.

그렇다면 `$(function() { 내용 })` 을 했을 때 어떻게 동작할까요? $() 안에 함수를 넣은 것이기 때문에 a가 함수가 됩니다. 다행히 (1)에서 바로 걸리네요. a가 함수이므로 `jQuery(document).ready(a);` 가 실행됩니다. `$(document).ready(function() {})`가 `$(function() {})` 과 같은 거였군요.

이제 `$(document)`처럼 **$(선택자)** 했을 경우 무슨 상황이 일어나나 알아볼까요? jQuery의 매개변수 a에 문자열 선택자 이름이 들어갑니다. (1)은 함수가 아니니 건너뛰고요, (2)는 그대로 a로 갑니다. a는 문자열이지 jQuery 객체가 아니므로 (3)도 넘어갑니다. (4)는 c가 없으니까 넘어가고요,

드디어 (5)에서 걸립니다! 근데 `new jQuery(a, c)`라서 결국 똑같은 과정을 반복하게 됩니다. **new**를 하는 이유는 **prototype**을 사용하기 위함인 것 같습니다. 그런데 이번에 new jQuery로 호출했을 때는 (5)에서 걸리지 않습니다. new로 호출했을 때는 this가 window가 아니니까요. (6)은 문자열이 태그를 포함한 게 아니라 넘어가고요. 

(7)에서 마지막으로 걸립니다! array도 아니고 **Node**도 아니기 때문에 jQuery.find가 작동합니다. 그런데 jQuery.find는 위 코드에 없네요? 이제 jQuery의 **prototype**을 정의해둔 코드를 봐야겠습니다...

```javascript
jQuery.fn = jQuery.prototype = {
  jquery: "$Rev: 509 $",
  ...,
  get: function( num ) {
    // Watch for when an array (of elements) is passed in
    if ( num && num.constructor == Array ) {
      // Use a tricky hack to make the jQuery object
      // look and feel like an array
      this.length = 0;
      [].push.apply( this, num );
      return this;
    } else
    return num == undefined ?
      // Return a 'clean' array
      jQuery.map( this, function(a){ return a } ) :
      // Return just the object
      this[num];
  },
  ...,
  find: function(t) {
    return this.pushStack( jQuery.map( this, function(a){
      return jQuery.find(t,a);
    }), arguments );
  },
  ...,
  pushStack: function(a,args) {
    var fn = args && args[args.length-1];
    if ( !fn || fn.constructor != Function ) {
      if ( !this.stack ) this.stack = [];
      this.stack.push( this.get() );
      this.get( a );
    } else {
      var old = this.get();
      this.get( a );
      if ( fn.constructor == Function )
        return this.each( fn );
      this.get( old );
    }
    return this;
  }
}
```

코드 분석에 앞서 이 코드의 제일 위를 보시면 `jQuery.fn = jQuery.prototype`이라고 되어있습니다. **제이쿼리 플러그인**을 만들 때 사용하던 fn이 prototype이었던거죠. **prototype**에 추가했기 때문에 확장함수를 모든 제이쿼리 객체가 쓸 수 있던 겁니다. 다시 find로 돌아가서 find를 보면 안에 다시 jQuery.find를 호출하고 있습니다. 이해가 잘 안 가네요. 태그를 찾는 코드 대신에 find를 다시 호출하고 있는데요. 또 map 메소드는 보이지도 않습니다. 어떻게 된 걸까요? 그 비밀은 다음 강좌에서 알려드리겠습니다!



-------------------------------------------------------------------------------------------

사실 아래에 *jQuery.extend*라고 숨겨진 코드가 더 있었습니다.

```javascript
jQuery.extend = jQuery.fn.extend = function(obj,prop) {
  if ( !prop ) { prop = obj; obj = this; }
  for ( var i in prop ) obj[i] = prop[i];
  return obj;
};

jQuery.extend({
  ...
  find: function( t, context ) {
    // Make sure that the context is a DOM Element
    if ( context && context.nodeType == undefined ) // (1)
      context = null;
    // Set the correct context (if none is provided)
    context = context || jQuery.context || document; // (2)
    if ( t.constructor != String ) return [t]; // (3)
    if ( !t.indexOf("//") ) { // (4)
      context = context.documentElement;
      t = t.substr(2,t.length);
    } else if ( !t.indexOf("/") ) {
      context = context.documentElement;
      t = t.substr(1,t.length);
      // FIX Assume the root element is right :(
      if ( t.indexOf("/") >= 1 )
        t = t.substr(t.indexOf("/"),t.length);
      }
    }
    var ret = [context];
    var done = [];
    var last = null;
    while ( t.length > 0 && last != t ) { // (5)
      var r = [];
      last = t;
      t = jQuery.trim(t).replace( /^\/\//i, "" ); // (6)
      var foundToken = false;
      for ( var i = 0; i < jQuery.token.length; i += 2 ) { // (7)
        if ( foundToken ) continue;
        var re = new RegExp("^(" + jQuery.token[i] + ")");
        var m = re.exec(t);
        if ( m ) {
          r = ret = jQuery.map( ret, jQuery.token[i+1] );
          t = jQuery.trim( t.replace( re, "" ) );
          foundToken = true;
        }
      }
      if ( !foundToken ) { // (8)
        if ( !t.indexOf(",") || !t.indexOf("|") ) { // (9)
          if ( ret[0] == context ) ret.shift();
          done = jQuery.merge( done, ret );
          r = ret = [context];
          t = " " + t.substr(1,t.length);
        } else { // (10)
          var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
          var m = re2.exec(t); // (11)
          if ( m[1] == "#" ) { // (12)
            // Ummm, should make this work in all XML docs
            var oid = document.getElementById(m[2]); // (13)
            r = ret = oid ? [oid] : [];
            t = t.replace( re2, "" );
          } else {
            if ( !m[2] || m[1] == "." ) m[2] = "*";
            for ( var i = 0; i < ret.length; i++ )
              r = jQuery.merge( r,
                m[2] == "*" ?
                  jQuery.getAll(ret[i]) :
                  ret[i].getElementsByTagName(m[2])
                );
            }
          }
        }
        if ( t ) { // (14)
          var val = jQuery.filter(t,r);
          ret = r = val.r;
          t = jQuery.trim(val.t);
       }
     }
     if ( ret && ret[0] == context ) ret.shift(); // (15)
     done = jQuery.merge( done, ret ); // (16)
     return done;
   },
```

extend 메소드는 jQuery.fn.extend이기 때문에 jQuery의 prototype에 메소드를 추가하는 함수입니다. 기존 find 메소드를 덮어썼기 때문에 jQuery.find는 바로 위의 find 메소드입니다.

find 메소드가 정말 기네요. 그래서 또 (1), (2), (3)... 으로 구분했습니다. 지금 현재 `jQuery.find('#target')` 을 한 상황이라고 가정해보죠. context는 undefined입니다. (1)은 그래서 넘어가고요. (2)에서 context는 document가 됩니다.* *`jQuery.context`는 뭔지 모르니까요. (3)은 string이 맞으니까 넘어가고요. (4)의 if문은 문자열에 /가 들어있지 않으니까 넘어갑니다.

(5)에서 while문에 걸리는데요. (6)은 문자열에 공백이나 //가 있으면 제거하는 거고요. (7)에서는 jQuery.token이 나오는데 그냥 문자열이 `['.', '..', '<', '/', '+', '~']` 중 하나로 시작하는 지 검사하는 겁니다. 모두 아니니까 넘어갑니다.

(8)에서 아까 foundToken이 false이기 때문에 걸립니다. (9)는 문자열에 ,(쉼표)나 |가 없기 때문에 (10) else로 넘어갑니다. (11)에서 m은 `['#target', '#', 'target']`이 됩니다. 따라서 (12)가 true가 되고  (13)에서 `document.getElementById('target')` 을 하게 되네요. 그 결과는 oid 변수에 저장되고, t는 빈 문자열이 됩니다. 따라서 (14)는 false로 넘어가죠. (15)도 넘어가고요.

최종적으로 (16)에서 *jQuery.merge*가 나오는데 그냥 배열을 합치는 메소드입니다. 결국에는 `return done`으로 찾을 결과를 반환합니다.

후... 정말 복잡하네요. 이런 식이 있기 때문에 모든 **선택자**를 다 검색할 수 있었던 겁니다. 여러분도 이 정도의 **라이브러리**를 혼자 만들 수 있겠나요??? 마지막 시간에는 아직 알아보지 못한 한 가지, **메소드 체이닝**이 어떻게 이루어지는 지 알아보겠습니다!

-----------------------------------------------------------

마지막으로 제이쿼리의 **메소드 체이닝**에 대해 알아보겠습니다!

제이쿼리를 보면 메소드를 연속으로 사용하는 경우가 많죠. 이번 시간은 `$('#app-root').children().parent()`가 어떻게 동작하는 지 알아보겠습니다! children 메소드를 호출한 후 parent를 하면 다시 원래의 `$('#app-root')`가 나와야겠죠? **children**과 **parent** 메소드는 아래 코드에 들어 있습니다. 왜 굳이 이렇게 만들었는지는 모르겠습니다. (이후 버전을 보면 바뀝니다)

```javascript
jQuery.extend(
  init: function(){
    jQuery.initDone = true;
    jQuery.each( jQuery.macros.axis, function(i,n){ // (1)
      jQuery.fn[ i ] = function(a) {
      var ret = jQuery.map(this,n); // (2)
      if ( a && a.constructor == String )
        ret = jQuery.filter(a,ret).r;
      return this.pushStack( ret, arguments ); // (8)
    };
  });
  ...
});
```

```javascript
jQuery.macros = {
  axis: {
    parent: "a.parentNode",
    ancestors: jQuery.parents,
    parents: jQuery.parents,
    next: "jQuery.sibling(a).next",
    prev: "jQuery.sibling(a).prev",
    siblings: jQuery.sibling,
    children: "jQuery.sibling(a.firstChild)"
  },
  ...
};
jQuery.init();
```

함수들을 `jQuery.macros.axis` 객체에 넣어둔 후에 **jQuery.each**로 각각 prototype에 추가했습니다. (1)을 보면, 매개변수 i는 parent, children 같은 속성명이고, n은 "a.parentNode", "jQuery.sibling(a.firstChild)" 같은 속성값입니다. (2)에서 **jQuery.map**은 n이 문자열이면 *return + n*으로 바꿔서 map합니다. 따라서 parent 경우는 `function(){ return a.parentNode; };`가 되죠. 그리고 결과를 **배열**에 담아 반환합니다. children도 마찬가지고요. **sibling **메소드 코드를 볼까요?

```javascript
sibling: function(elem, pos, not) {
  var elems = [];
  var siblings = elem.parentNode.childNodes; // (3)
  for ( var i = 0; i < siblings.length; i++ ) { // (4)
    if ( not === true && siblings[i] == elem ) continue; // (5)
    if ( siblings[i].nodeType == 1 ) // (6)
      elems.push( siblings[i] );
    if ( siblings[i] == elem )
      elems.n = elems.length - 1;
  }
  return jQuery.extend( elems, { // (7)
    last: elems.n == elems.length - 1,
    cur: pos == "even" && elems.n % 2 == 0 || pos == "odd" && elems.n % 2 || elems[pos] == elem,
    prev: elems[elems.n - 1],
    next: elems[elems.n + 1]
  });
},
```

그리고 `$('#app-root').children()`을 했다고 생각해봅시다. **elem** 변수는 "jQuery.sibling(a.firstChild)"에 따라 `[#app-root의 첫 번째 자식노드]`입니다. (3)에서 **siblings**는 `[#app-root의 자식들]` 이 되고요. (4)에서 반복문을 돌며 siblings 변수를 검사하는데 (5)는 not이 undefined니까 넘어가고요. 

(6)에서 siblings[i]의 nodeType이 **1**(1이면 Element)입니다. 따라서 모든 자식들이 elems 배열에 push됩니다. (7)은 그냥 elems가 return 된다고만 보면 됩니다. 다시 (2)로 가면 **ret**은 `[#app-root의 자식들]` 이죠. (8)(제일 위의 코드에 있습니다)에서 `this.pushStack(ret, arguments)`으로 **children **메소드는 끝이납니다. 

이제 this.pushStack 메소드를 봅시다. **a**는 지금 ret이, **args**에는 []가 담겨있습니다.

```javascript
pushStack: function(a, args) {
  var fn = args && args[args.length-1]; // (8)
  if ( !fn || fn.constructor != Function ) { // (9)
    if ( !this.stack ) this.stack = [];
    this.stack.push( this.get() ); // (10)
    this.get( a ); // (11);
  } else {
    var old = this.get();
    this.get( a );
    if ( fn.constructor == Function )
      return this.each( fn );
    this.get( old );
  }
  return this;
}
```

(8)은 **args**가 빈 배열이라 **fn**은 undefined가 됩니다. 따라서 (9)에서 `this.get()`을 한 것을 stack 배열에 넣게 되는데요. **get **메소드도 봐야할 것 같네요. **num**은 undefined입니다.

```javascript
get: function( num ) {
  // Watch for when an array (of elements) is passed in
  if ( num && num.constructor == Array ) { // (12)
    // Use a tricky hack to make the jQuery object
    // look and feel like an array
    this.length = 0;
    [].push.apply( this, num );
    return this;
  } else { // (13)
    return num == undefined ?
      // Return a 'clean' array
      jQuery.map( this, function(a){ return a } ) : // (14)
      // Return just the object
      this[num];
  }
}
```

num이 undefined이니까 (13), (14)으로 가는데, **jQuery.map**이 그냥 그대로 this를 return하기 때문에 (10)에서는 `this.stack.push([#app-root])`가 됩니다. (11)에서 한 번 더 **this.get**을 호출하는데 이버에는 **num**이 a(ret)입니다. 따라서 (12)로 가죠. 이번에는 `[].push.apply( this, num)` 이라는 코드가 나오네요.

**this **객체에 배열처럼 num을 push하라는 건데 이게 가능은 합니다. 이렇게 하면 결과는 `{ 0: #app-root의 자식노드, length: 1, stack: [#app-root], __proto__: jQuery }` 가 됩니다. **stack**은 방금 전에 this.stack에 push한 결과입니다. 결국 이것이 결과가 되어 반환됩니다. **prototype**이 jQuery 객체이기 때문에 다시 모든 jQuery 메소드를 사용할 수 있습니다.

정말 복잡하죠? 저도 분석하는 데 오랜 시간이 걸렸습니다. 이제 다시 **parent **메소드를 하게 되면 `returna.parentNode`로부터 시작하여 다시 이 과정을 거친 뒤 #app-root가 반환됩니다.

이렇게 제이쿼리 분석을 마칩니다. 제이쿼리는 3버전까지 오면서 코드가 많이 바뀌었습니다. 하지만 그 기본 원리는 같다는 걸 기억하세요! 다음 강좌는 함수형 프로그래밍 기법 중 하나인 **커링**에 대해 알아보겠습니다!