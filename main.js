const express = require('express') // constant 'express' is never gonna change
const app = express()
const port = 3000
var fs = require('fs');
var path = require('path');
var template = require('./lib/template.js')
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
//middleware package
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet'); // protecting web application
app.use(helmet());

// Upon request, middlewares are executed.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false})); 
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
      request.list = filelist;
      next();
  });
});


//routing - provide proper response to variable paths
//app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function(request, response){
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src="/images/hello.jpg" style="width:300px; display:block; margin-top: 10px"></img>
    `,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});


app.get('/topic/create',function(request, response){
  var title = 'WEB - create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, ''); 
  response.send(html);
});

app.post('/topic/create_process', function(request, response){  
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
  });
});

app.get('/topic/update/:pageId', function(request, response){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/topic/create">create</a> <a href="/topic/update?id=${title}">update</a>`
    );
    response.send(html);
  });
});

app.post('/topic/update_process', function(request, response){
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
    })
  });
});

app.post('/topic/delete_process', function(request, response){
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  });
});

// routing using path instead of URL querystring 
app.get('/topic/:pageId', function(request, response, next){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err){
      next(err);
    } else {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });
      var list = template.list(request.list);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
        <a href="/topic/update/${sanitizedTitle}">update</a>
        <form action="/topic/delete_process" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>` 
        //Delete shouldn't be a link. Or user can delete data by address.
        //When delete, form method should be POST (query string should be hidden)
      );
      response.send(html);  
    }
  });
});



//initiate node server 
//app.listen(3000, () => console.log(`Example app listening on port ${port}!`))

app.use(function(req, res, next){
  res.status(404).send("Sorry can't find that!");
});

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function() {
  console.log(`Example app listening on port ${port}!`)
});



/*
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
        });
      } else {
      }
    } else if(pathname === '/create'){
    } else if(pathname === '/create_process'){
      
    } else if(pathname === '/update'){
      
    } else if(pathname === '/update_process'){
      
    } else if(pathname === '/delete_process'){
      
    } else {
      response.writeHead(404);
      response.end('Not found');
    } 
});
app.listen(3000);
*/