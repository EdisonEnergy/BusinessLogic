/* Function which is resposible for finding values for calculations */

// Declaration for every input change and on application load

// $(document).ready(function() {
//   //console.log("::~> (M) OBJ:" + JSON.stringify(clientSession));
//   //declareCalculation();
// });

// $("input").on("change", function() {
//   console.log("::~> (M)" + $(this).attr("id"));
//   console.log("::~> (M) Insurance State:" + clientSession.st_insurance);
//   updateState();
//   //declareCalculation();
// });

function declareCalculation() {
  console.log("::~> (M) Insurance State:" + clientSession.st_insurance);

  var priceGrow = clientSession.st_priceGrow;
  var energyGrow = clientSession.st_energyGrow;
  var amountOfPanels = clientSession.st_numberOfPanels;

  /* supplierValue */

  //var energySupplier = $("input[name='EnergySupplier']:checked").val();
  var energySupplier = clientSession.st_energySupplier;
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

  var modulePower = clientSession.st_module;

  var insurance = clientSession.st_insurance;
  var warranty = clientSession.st_warranty;
  var monitoring = clientSession.st_monitoring;
  var fullBlack = clientSession.st_blackPanels;

  /* powerUse */
  var powerUse = clientSession.st_powerUse; // Zużycie prądu

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

// $("input[name='Modul']").on("change", function() {
//   countNumberOfPanels();
//   console.log("start counting");
// });

function countNumberOfPanels() {
  var powerUse = clientSession.st_powerUse;
  var moduleAmount = clientSession.st_module;
  var numberOfPanels = 0;
  while (numberOfPanels * moduleAmount < powerUse) {
    numberOfPanels++;
  }
  console.log("numberOfPanels: " + numberOfPanels);
  clientSession.st_numberOfPanels = numberOfPanels;
  updateState();
}
