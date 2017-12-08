const express = require('express');
const request = require('request');
const fs = require('fs');

var cookieParser = require('cookie-parser');
var app = express(),
bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");
app.use(cookieParser());
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));



request({
	url: 'https://jsonplaceholder.typicode.com/users'

},(error, response, body) =>{
	fs.writeFile('author',body, (err) =>{
		if(err) throw err;
	});
});

request({
	url: 'https://jsonplaceholder.typicode.com/posts'

},(error, response, body) =>{
	fs.writeFile('post',body, (err) =>{
		if(err) throw err;
	});
});

var author = fs.readFileSync('author');
var a=JSON.parse(author);
//a = authors object
var post = fs.readFileSync('post');
var p=JSON.parse(post);

function init(name , count){
	this.name=name;
	this.count=count;
}

 var n= a.length;

 var obj = {
	 name: null,
	 count: null
 };

var i;
 for(i=0;i<n;i++){
	 obj[i]= new init(a[i].name,1);
 }

var k=0;
var j=0;
 m=p.length
for(i=1;i<m;i++)
{
	 j=k+1;
	if(j==p[i].userId)
	obj[k].count+=1;
	else {
		k++;
	}
}

for(i=0;i<n;i++){
	console.log(obj[i].count);
}

for(i=0;i<n;i++){
	console.log(obj[i].name);
}

app.get('/authors',(req, res) =>{

		res.send('author name : '+ obj[0].name+' posts: '+ obj[0].count +
    '\nauthor name : '+ obj[1].name+' posts: '+ obj[1].count +
		'\nauthor name : '+ obj[2].name+' posts: '+ obj[2].count +
		'\nauthor name : '+ obj[3].name+' posts: '+ obj[3].count +
		'\nauthor name : '+ obj[4].name+' posts: '+ obj[4].count +
		'\nauthor name : '+ obj[5].name+' posts: '+ obj[5].count +
		'\nauthor name : '+ obj[6].name+' posts: '+ obj[6].count +
		'\nauthor name : '+ obj[7].name+' posts: '+ obj[7].count +
		'\nauthor name : '+ obj[8].name+' posts: '+ obj[8].count +
		'\nauthor name : '+ obj[9].name+' posts: '+ obj[9].count )


});

app.get('/setcookie', (req, res)=> {
  res.cookie('name','Ashutosh');
  res.cookie('age','19');
  res.end('set cookie');
});

app.get('/getcookie',(req, res)=>{
  res.send('cookies are : name:'+req.cookies.name+' age:'+ req.cookies.age);

})

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.get('/post',function(req,res){
  res.sendfile("post.html");
});

app.post('/post',function(req,res){
  var user_name=req.body.user;

  console.log("User name = "+user_name);
  
});

app.get('/', (req, res) => {
  res.send('<h1>Hello World - Ashutosh<h1>');
});




app.get('/robots',(req, res) =>{
  res.send('<h1>Request denied<h1>');
});

app.listen(2000);
