$(document).on("keyup", function(event) {
  console.log(event.which);
  if (event.which === 37) {
    $(".w-slider-arrow-left").trigger("click");
  } else if (event.which === 39) {
    $(".w-slider-arrow-right").trigger("click");
  }
});
