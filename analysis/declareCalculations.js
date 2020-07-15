/* Function which is resposible for finding values for calculations */

// Declaration for every input change and on application load
$("input").on("change", function() {
  declareCalculation();
});

declareCalculation();

function declareCalculation() {
  /* priceGrow */
  var priceGrow = $("#PriceGrow").val();
  priceGrow = priceGrow / 100;

  /* energyGrow */
  var energyGrow = $("#EnergyGrow").val();
  energyGrow = energyGrow / 100;

  var amountOfPanels = $("#Liczba-Paneli").val();
  console.log("amount of panels: " + amountOfPanels);
  amountOfPanels = parseInt(amountOfPanels);
  console.log("amount of panels 2: " + amountOfPanels);

  /* supplierValue */
  var energySupplier = $("input[name='EnergySupplier']:checked").val();
  var supplierValue = 0.58;
  if (energySupplier == "PGE") {
    supplierValue = 0.58;
  } else if (energySupplier == "Tauron") {
    supplierValue = 0.54;
  } else if (energySupplier == "Enea") {
    supplierValue = 0.52;
  } else if (energySupplier == "Energa") {
    supplierValue = 0.6;
  } else if (energySupplier == "Innogy") {
    supplierValue = 0.52;
  }

  var modulePower = 0;
  modulePower = $("input[name='Modul']:checked").val();

  var insurance = $("input[name='Ubezpieczenie']:checked").val();
  var warranty = $("input[name='Gwarancja']:checked").val();
  var monitoring = $("input[name='Monitoring']:checked").val();
  var fullBlack = $("input[name='FullBlack']:checked").val();

  /* powerUse */
  var powerUse = $("#PowerUse").val(); // Zużycie prądu

  var roofSide = $("input[name='StronaDachu']:checked").val(); // Strona Dachu

  var roofAngel = $("input[name='KatDachu']:checked").val(); // Kąt Dachu

  var yourEnergyProgram = $("input[name='Program']:checked").val(); // Program Twój Prąd

  var reliefPercentage = $("input[name='Poziom-ulgi']:checked").val(); // Poziom ulgi

  calculatePrice(
    priceGrow,
    energyGrow,
    supplierValue,
    powerUse,
    amountOfPanels,
    modulePower,
    insurance,
    monitoring,
    warranty,
    fullBlack,
    roofSide,
    roofAngel,
    yourEnergyProgram,
    reliefPercentage
  );
}
