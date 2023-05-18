$(document).ready(function () {
  //   $(".hand").click(function () {
  //     $(".hand").fadeToggle();
  //     $(".text").fadeToggle();
  //   });

  //   $(".text").click(function () {
  //     $(".text").fadeToggle();
  //     $(".hand").fadeToggle();
  //   });

  $("#about-click").click(function () {
    $("#overlay").fadeIn();
  });

  $("#overlay").click(function () {
    $("#overlay").fadeOut();
  });
});
