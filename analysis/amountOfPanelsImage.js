// Declaring slide image for change of amount of panels

var amountOfPanels = 0;

// Manual change of Amount of Panels Input
$("#Liczba-Paneli").on("change", function() {
  imageAmountOfPanels(amountOfPanels);
});

// Click in button Plus
$("#more-panels").on("click", function() {
  var amountOfPanels = $("#Liczba-Paneli").val();
  console.log("amount of panels: " + amountOfPanels);
  amountOfPanels = parseInt(amountOfPanels);
  console.log("amount of panels 2: " + amountOfPanels);
  console.log("click");
  console.log(amountOfPanels);
  if (amountOfPanels < 60) {
    console.log("click2");
    $("#Liczba-Paneli").val(amountOfPanels + 2);
    clientSession.st_numberOfPanels = amountOfPanels;
    updateState(); // Firebase State Update
    imageAmountOfPanels(amountOfPanels);
    console.log("click3");
  }
});

// Click in button Minus
$("#less-panels").on("click", function() {
  var amountOfPanels = $("#Liczba-Paneli").val();
  console.log("amount of panels: " + amountOfPanels);
  amountOfPanels = parseInt(amountOfPanels);
  console.log("amount of panels 2: " + amountOfPanels);
  if (amountOfPanels > 10) {
    $("#Liczba-Paneli").val(amountOfPanels - 2);
    clientSession.st_numberOfPanels = amountOfPanels;
    updateState(); // Firebase State Update
    imageAmountOfPanels(amountOfPanels);
  }
});

function imageAmountOfPanels(amountOfPanels) {
  $(".panel-img").hide();
  if (amountOfPanels <= 10) {
    $("#panels-10").show();
  } else if (amountOfPanels <= 14) {
    $("#panels-14").show();
  } else if (amountOfPanels <= 16) {
    $("#panels-16").show();
  } else if (amountOfPanels <= 20) {
    $("#panels-20").show();
  } else if (amountOfPanels <= 24) {
    $("#panels-24").show();
  } else if (amountOfPanels <= 28) {
    $("#panels-28").show();
  } else {
    $("#panels-32").show();
  }
}
