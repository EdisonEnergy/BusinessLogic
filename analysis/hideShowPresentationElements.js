/* Function which is resposible for visual aspect of presentation */

function hideShowPresentationElements() {
  $("#montaz-wrap").hide();

  var EnergyGrowYesNo = clientSession.st_energyGrowYesNo;
  if (EnergyGrowYesNo == 1) {
    $("#EnergyGrowSlide").show();
    $("#EnergyGrowYesNo").hide();
  } else {
    $("#EnergyGrowSlide").hide();
  }

  var Forma = clientSession.st_paymentMethod;

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
