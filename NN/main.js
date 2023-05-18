$(document).ready(function() {

  console.log("page has loaded.");

  $("#im").hover(function () {
    $("#im").animate({width: '30vw'}, 1000);
  }, function() {
    $("#im").animate({width: '20vw'}, 1000);
  });

  console.log(object);


});
