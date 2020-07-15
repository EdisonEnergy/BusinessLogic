/* Function which is resposible for visual aspect of presentation */
hideShowPresentationElements();
function hideShowPresentationElements() {
  $("#montaz-wrap").hide();

  var EnergyGrowYesNo = $("input[name='EnergyGrowYesNo']:checked").val();
  if (EnergyGrowYesNo == 1) {
    $("#EnergyGrowSlide").show();
    $("#EnergyGrowYesNo").hide();
  }

  var Forma = $("input[name='Forma']:checked").val();

  /* Hide/Show comparison slide (red one) */
  if (Forma == "plan") {
    $("#forma-platnosci-plan").show();
    $("#forma-platnosci-gotowka").hide();
  } else {
    $("#forma-platnosci-plan").hide();
    $("#forma-platnosci-gotowka").show();
  }

  /* Hide/Show Assembly Credit Question */
  if (Forma == "plan") {
    $("#montaz-wrap").show();
  } else {
    $("#montaz-wrap").hide();
  }
}
