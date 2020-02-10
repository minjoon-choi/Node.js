var testFolder = './data'; // ./은 현재 디렉토리를 의미함 
var fs = require('fs');
 
fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})