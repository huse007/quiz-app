  $('#about-btn').click(function() {
      $.get("quiz/categories2.html",function(data,status) {
	  alert("Data: "+data+"\nStatus: "+status);
      });
  }); 
    
