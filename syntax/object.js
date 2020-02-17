var member = ['minjoon','ihyun','minseok'];
console.log(member[0]); //array (list) use index 

var i = 0;
while(i<member.length){
    console.log('array loop:', member[i])
    i = i +1
};


var roles = {
    'programmer':'minjoon',
    'CEO':'ihyun',
    'brother':'minseok'
}

console.log(roles.CEO); // object uses key and value 
console.log(roles['CEO']);

for(var n in roles){
    console.log('object: ',n, 'value: ', roles[n])
}