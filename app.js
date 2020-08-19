var express  = require('express');
var todoController = require('./controllers/todoController');

var app = express();
app.set('view engine','ejs')

//static files
app.use(express.static('./assets'));

//fire controllers
todoController(app);
//Listen to port
app.get('/' , function(req,res){

  res.send('Home');
});
app.listen(5555);
console.log('Port 5555');
