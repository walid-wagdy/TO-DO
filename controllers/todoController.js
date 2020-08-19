var bodyParser = require('body-parser');
var connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sql = require("mssql");
var config = {
        user: 'ww',
        password: 'ww',
        server: 'walid-wagdy',
        database: 'ToDo'
    };
var myConnection = new connection(config);
myConnection.on('connection',function(err){
  if (err) console.log('error is ' + err)
console.log('Here');
  console.log('Connected');
});
    var data = new Array();

var urlEncodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

  app.get('/todo' , function(req,res){
    console.log('GET');

    sql.connect(config, function (err) {
      if (err) console.log(err)
      // create Request object
          var request = new sql.Request();
          data=[];

          // query to the database and get the records
          request.query('select * from todo', function (err, result) {
              // send records as a response
              for (var i = 0; i < result.recordset.length; ++i) {
                              var todo = result.recordset[i].ToDo;
                              data.push({'item':todo});
                          }
                          res.render('todo',{todo: data});
          });
    });

  });

  app.post('/todo' ,urlEncodedParser, function(req,res){
   console.log(req.body.item);
   sql.connect(config, function (err) {
     if (err) console.log(err)
     // create Request object
         var request = new sql.Request().input('item', sql.VarChar(100), req.body.item);
         request.query("insert into todo values (@item)", function (err, result) {
           if (err) console.log('error is ' + err)

         });
       });
    data.push(req.body);
    res.json(data);
  });

  app.post('/todo/update' ,urlEncodedParser, function(req,res){
   console.log(req.body.new);
   sql.connect(config, function (err) {
     if (err) console.log(err)
     // create Request object
     var request = new sql.Request().input('old', sql.VarChar(100), req.body.old)
                                    .input('new', sql.VarChar(100), req.body.new);
         request.query("update todo set ToDo = @new where ToDo = @old", function (err, result) {
           if (err) console.log('error is ' + err)
           sql.connect(config, function (err) {
             if (err) console.log(err)
             // create Request object
                 var request = new sql.Request();
                 // query to the database and get the records
                 data=[];
                 request.query('select * from todo', function (err, result) {
                     // send records as a response

                     for (var i = 0; i < result.recordset.length; ++i) {
                                     var todo = result.recordset[i].ToDo;
                                     data.push({'item':todo});
                                 }
                 });
           });
           res.render('todo',{todo: data});
         });
       });


  });

  app.delete('/todo/:item' , function(req,res){

      //var request = new sql.Request();
      console.log(req.params.item);

      sql.connect(config, function (err) {
        if (err) console.log(err)
        // create Request object
            var request = new sql.Request().input('item', sql.VarChar(50), req.params.item);
            // query to the database and get the records

              console.log(req.params.item);
            request.query("DELETE from todo where ToDO = @item", function (err, result) {
              if (err) console.log('error is ' + err)

            });

      data = data.filter(function(todo) {
        return todo.item !== req.params.item;
        });
        res.json({todo: data});
      });

  });

};
