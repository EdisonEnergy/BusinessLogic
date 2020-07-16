var actual_slide = $("#actual_slide").html();
actual_slide = parseInt(actual_slide);
var next_slide = actual_slide + 1;
var prev_slide = actual_slide - 1;
var next_slide_link =
  "https://siecpartnerska.edisonenergia.pl/prezentacja/slajd-" + next_slide;
var prev_slide_link =
  "https://siecpartnerska.edisonenergia.pl/prezentacja/slajd-" + prev_slide;

var totalNumberOfSlides = $(".slide_item").length;
console.log(totalNumberOfSlides);
$("#next_slide").on("click", function() {
  if (actual_slide < totalNumberOfSlides) {
    window.location.replace(next_slide_link);
  }
});
$("#prev_slide").on("click", function() {
  if (actual_slide > 1) {
    window.location.replace(prev_slide_link);
  }
});

$(document).on("keyup", function(event) {
  if (event.which === 37 && actual_slide != 1) {
    window.location.replace(prev_slide_link);
  } else if (event.which === 39 && actual_slide < totalNumberOfSlides) {
    window.location.replace(next_slide_link);
  }
});
if (actual_slide == totalNumberOfSlides) {
  $("#next_slide").hide();
}

if (actual_slide == 1) {
  $("#prev_slide").hide();
}
