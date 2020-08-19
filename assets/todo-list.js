$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('.delete').on('click', function(){
      var item = $(this).data("item");

      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

  $('.item').on('change', function(){
      var itemNew = $(this).val();
      var itemold = $(this).data("oldval");
      var todo = {new:itemNew, old: itemold};
      $.ajax({
        type: 'POST',
        url: '/todo/update',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          console.log(data);
          location.reload();
          
        }
      });
      });


});
