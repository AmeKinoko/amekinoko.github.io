$(document).ready(function(){

  console.log("page has loaded.");

  var key = false;
  var branch = false;

  $(".scene").hide();
  $("#sound").show();

  $("#yesb").click(function(){
    $("#sound").fadeOut(1000);
    $("#s1").fadeIn(1000);

  });

  $("#choice1").click(function(){
    $("#s1").fadeOut(1000);
    $("#s2").fadeIn(1000);
  });

  $("#choice2").click(function(){
    $("#s2").fadeOut(1000);
    $("#s3").fadeIn(1000);
    branch = true;

  });

  $("#choice3").click(function(){
    $("#s2").fadeOut(1000);
    $("#s4").fadeIn(1000);
  });

  $(".choice4").click(function(){
    $("#s4, #s3").fadeOut(1000);
    $("#s5").fadeIn(1000);

  });

  $("#choice5").click(function(){
    $("#s5").fadeOut(1000);
    $("#s6").fadeIn(1000);

  });

  $("#choice6").click(function(){
    $("#s6").fadeOut(1000);
    $("#s7").fadeIn(1000);

  });

  $("#choice8").click(function(){
    $("#s7").fadeOut(1000);
    $("#s8").fadeIn(1000);

  });

  $("#choice10").click(function(){
    $("#s8").fadeOut(1000);
    $("#s9").fadeIn(1000);
    key = true;

  });

  $(".choice9").click(function(){
    $("#s9, #s6, #s7").fadeOut(1000);
    $("#s10").fadeIn(1000);

  });

  $("#choice11").click(function(){
    $("#s10").hide();
    $("#s11").show();
    $("#s12").delay(1000).fadeIn(1000);

  });

  $("#choicedie").click(function(){
    $("#s12, #s11, #s17").fadeOut(1000);
    $("#s1").fadeIn(1000);
    key = false;
    branch = false;

  });

  $("#choice12").click(function(){
    if (key) {
       $("#s13").fadeOut(1000);
    $("#s15").fadeIn(1000);
  } else {
    $("#s13").fadeOut(1000);
    $("#s14").fadeIn(1000);
  }

  });

  $(".choice7").click(function(){
    $("#s9, #s6").fadeOut(1000);
    $("#s13").fadeIn(1000);

  });

  $("#choice14").click(function(){
    $("#s15").fadeOut(1000);
    $("#s16").fadeIn(1000);

  });

  $("#choice16").click(function(){
    $("#s16").hide();
    $("#s17").show();
    $("#s12").delay(900).fadeIn(500);

  });

  $("#choice13").click(function(){
    $("#s14").fadeOut(1000);
    $("#s18").fadeIn(1000);

  });

  $("#choice17").click(function(){
    $("#s18").fadeOut(1000);
    $("#s19").fadeIn(1000);

  });

  $("#choice18").click(function(){
    $("#s19").fadeOut(1000);
    $("#s20").fadeIn(1000);

  });

  $("#choice19").click(function(){
    $("#s20").fadeOut(1000);
    $("#s21").fadeIn(1000);

  });

  $("#choice20").click(function(){
    $("#s21").fadeOut(1000);
    $("#s22").fadeIn(1000);
    $("#s22").delay(6000).fadeOut(1000)
    $("#s12").delay(6000).fadeIn(1000);

  });

  $("#choice15").click(function(){
    if (branch) {
       $("#s15").fadeOut(1000);
    $("#s26").fadeIn(1000);
  } else {
    $("#s15").fadeOut(1000);
    $("#s23").fadeIn(1000);
  }

    });

    $("#choice21").click(function(){
      $("#s23").fadeOut(1000);
      $("#s24").fadeIn(1000);

    });

    $("#choice22").click(function(){
      $("#s24").fadeOut(1000);
      $("#s25").fadeIn(1000);
      $("#s25").delay(6000).fadeOut(1000)
      $("#s12").delay(6000).fadeIn(1000);

    });

    $("#choice23").click(function(){
      $("#s26").fadeOut(1000);
      $("#s27").fadeIn(1000);

    });

    $("#choice25").click(function(){
      $("#s27").fadeOut(1000);
      $("#s28").fadeIn(1000);

    });

    $("#choice26").click(function(){
      $("#s28").fadeOut(1000);
      $("#s29").fadeIn(1000);

    });


        $("#choice27").click(function(){
          $("#s29").fadeOut(1000);
          $("#s30").fadeIn(1000);

        });

        $("#choice28").click(function(){
          $("#s30").fadeOut(1000);
          $("#s31").fadeIn(1000);
          $("#s31").delay(6000).fadeOut(1000)
          $("#s12").delay(6000).fadeIn(1000);

        });

        $("#choice24").click(function(){
          $("#s27").fadeOut(1000);
          $("#s32").fadeIn(1000);

        });

        $("#choice29").click(function(){
          $("#s32").fadeOut(1000);
          $("#s33").fadeIn(1000);

        });

        $("#choice30").click(function(){
          $("#s33").fadeOut(1000);
          $("#s34").fadeIn(1000);

        });







});
