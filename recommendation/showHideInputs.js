// Code responsible for show/hide recomendation inputs

$("#recommendation-2").hide();
$("#recommendation-3").hide();
$("#recommendation-4").hide();
$("#recommendation-5").hide();

$("#r-button-1").on("click", function() {
  $("#recommendation-2").show();
  $(this).hide();
});

$("#r-button-2").on("click", function() {
  $("#recommendation-3").show();
  $(this).hide();
});
$("#r-button-3").on("click", function() {
  $("#recommendation-4").show();
  $(this).hide();
});

$("#r-button-4").on("click", function() {
  $("#recommendation-5").show();
  $(this).hide();
});
