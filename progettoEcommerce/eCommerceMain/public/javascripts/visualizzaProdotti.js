document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.m');
  
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
       document.getElementById("in").value = button.id;
      });
    });
  });