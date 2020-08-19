var express  = require('express');
var app = express();
app.set('view engine','ejs')

app.get('/:name' , function(req,res){
  var data = {age:30, job: 'Developer', lang: ['C#','Asp.NET','SQL','VB', 'Oracle']}
  res.render('profile',{name: req.params.name, data:data});
});
app.get('/ww' , function(req,res){
  res.send('w');
});
app.get('/ww/:name' , function(req,res){
  var data = {age:30, job: 'Developer', lang: ['C#','Asp.NET','SQL','VB', 'Oracle']}
  res.render('profile',{name: req.params.name, data:data});
});

app.listen(5555);
