//array, object 

//Javascript - function can be value 

var f = function(){
    console.log(1+1);
    console.log(1+2);
}

// var i = if(true){console.log(1)}

// var w = while(true){console.log(1)}

console.log(f); // [Function: f]
f(); //1, 2  ... function itself can be value. Value can be put in array and object

var a = [f];
a[0]();

var b = {
    func:f
}
b.func();