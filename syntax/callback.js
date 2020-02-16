/*
function a(){
  console.log('A');
}
*/
var a = function(){ //함수를 값으로서 변수에 할당 할 수 있음!!! JS에서는 함수가 값이다!
    console.log('A');
  }
   
   
  function slowfunc(callback){
    callback();
  }
   
  slowfunc(a);

/*만약 시간이 오래걸리는 slowfunc라는 함수가 있다고 치자
이 기능이 끝난 다음에
이 시간이 오래 걸리는 함수가 종료된 후에
그 다음일을 하세요 라고 하고 싶다면
이 함수가 인자로 callback을 받으면 된다.
그리고 나서 callback을 실행해 주면 됨
    
    function slowfunc(callback){
    callback();
    }
    
    이렇게 되면 slowfunc가 실행이 되고 callback이라는 parameter는
    어떤 값을 갖냐면 a 가 가르키는 저 함수를 갖게 됨.
    이 안에서 callback 이라는 함수를 호출하면
    a가 실행이 됨

*/