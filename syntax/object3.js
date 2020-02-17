var q = {
    v1:'v1',
    v2:'v2',
    f1:function (){
      console.log(this.v1); // 객체 내의 함수에서 객체를 참조할 때는 this 를 쓰기로 약속함 
    },
    f2:function(){
      console.log(this.v2);
    }
  }
   
  q.f1();
  q.f2();