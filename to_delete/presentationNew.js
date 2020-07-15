/* Function which is resposible for visual aspect of presentation */
function hideShowPresentationElements() {
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

/* This function is resposible for visible part of contract in app (it doesn't affect on exported contract anyway) */
function hideShowContractElements() {
  var Forma = $("input[name='Forma']:checked").val();
  if (Forma == "plan") {
    $("#umowa_kredyt .true").show();
    $("#umowa_kredyt .false").hide();
    $("#umowa_gotowka .true").hide();
    $("#umowa_gotowka .false").show();
  } else {
    $("#umowa_gotowka .true").show();
    $("#umowa_gotowka .false").hide();
    $("#umowa_kredyt .true").hide();
    $("#umowa_kredyt .false").show();
  }

  var Montaz = "";
  Montaz = $("input[name='MontazKredyt']:checked").val();
  if (Montaz == "1") {
    $("#montaz_kredyt .true").show();
    $("#montaz_kredyt .false").hide();
    $("#montaz_gotowka .true").hide();
    $("#montaz_gotowka .false").show();
  } else {
    $("#montaz_kredyt .true").hide();
    $("#montaz_kredyt .false").show();
    $("#montaz_gotowka .true").show();
    $("#montaz_gotowka .false").hide();
  }

  if ($("input[name='UbezpieczenieCheck']").prop("checked")) {
    $("#umowa_ubezpieczenie .true").show();
    $("#umowa_ubezpieczenie .false").hide();
  } else {
    $("#umowa_ubezpieczenie .true").hide();
    $("#umowa_ubezpieczenie .false").show();
  }
  if ($("input[name='MonitoringCheck']").prop("checked")) {
    $("#umowa_monitoring .true").show();
    $("#umowa_monitoring .false").hide();
  } else {
    $("#umowa_monitoring .true").hide();
    $("#umowa_monitoring .false").show();
  }

  if ($("input[name='GwarancjaCheck']").prop("checked")) {
    $("#umowa_gwarancja .true").hide();
    $("#umowa_gwarancja .false").show();
  } else {
    $("#umowa_gwarancja .true").show();
    $("#umowa_gwarancja .false").hide();
  }

  if ($("input[name='FullBlCheck']").prop("checked")) {
    $("#umowa_full .true").show();
    $("#umowa_full .false").hide();
  } else {
    $("#umowa_full .false").show();
    $("#umowa_full .true").hide();
  }

  var miejsceInstalacji = $("input[name='MiejsceInstalacji']:checked").val();
  if (miejsceInstalacji != "grunt") {
    $("#nieruchomosci .true").show();
    $("#nieruchomosci .false").hide();
    $("#instalacja_grunt .true").hide();
    $("#instalacja_grunt .false").show();
  } else {
    $("#nieruchomosci .true").hide();
    $("#nieruchomosci .false").show();
    $("#instalacja_grunt .true").show();
    $("#instalacja_grunt .false").hide();
  }
}

/* Declaring slide image for change of amount of panels */
$("#montaz-wrap").hide();

var amountOfPanels = $("#Liczba-Paneli").val();
amountOfPanels = parseInt(amountOfPanels);

// Manual change of Amount of Panels Input
$("#Liczba-Paneli").on("change", function() {
  imageAmountOfPanels(amountOfPanels);
});

// Click in button Plus
$("#more-panels").on("click", function() {
  if (amountOfPanels < 60) {
    $("#Liczba-Paneli").val(amountOfPanels + 2);
    clientSession.st_numberOfPanels = amountOfPanels;
    updateState(); // Firebase State Update
    imageAmountOfPanels(amountOfPanels);
  }
});

// Click in button Minus
$("#less-panels").on("click", function() {
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

/* Function which is resposible for finding values for calculations */

// Declaration for every input change and on application load
$("input").on("change", function() {
  declareCalculation();
});
$(function() {
  declareCalculation();
});

function declareCalculation() {
  /* priceGrow */
  var priceGrow = $("#PriceGrow").val();
  priceGrow = priceGrow / 100;

  /* energyGrow */
  var energyGrow = $("#EnergyGrow").val();
  energyGrow = energyGrow / 100;

  var amountOfPanels = $("#Liczba-Paneli").val();
  amountOfPanels = parseInt(amountOfPanels);

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

/* Functions which are resposible for calculations in presentation */

function calculatePrice(
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
) {
  var yearlyEnergyCostNow = supplierValue * powerUse;
  var yearlyEnergyCostAfter25Years = Math.pow(1 + priceGrow, 25);
  yearlyEnergyCostAfter25Years =
    yearlyEnergyCostNow * yearlyEnergyCostAfter25Years * (1 + energyGrow);

  var totalEnergyCostFor25Years =
    ((yearlyEnergyCostAfter25Years - yearlyEnergyCostNow) / 2) * 25 + 3600 * 24;

  var interestBNP = 0.035; // Oprocentowanie BNP
  var amountOfInstallments = 120; // Liczba rat
  var assemblyFeeGross8 = 1900; // Opłata montażowa brutto 8% (zł)
  var assemblyFeeGross23 = 2100; // Opłata montażowa brutto 23% (zł)
  var assemblyCostPerKwNet10kW = 4900; // Cena instalacji netto do 10 kW ( zł / kW )
  var assemblyCostPerKwNet20kW = 4600; // Cena Instalacji netto plus 10-20kW ( zł / kW )
  var assemblyCostPerKwNet30kW = 4400; // Cena Instalacji netto plus 20-30kW ( zł / kW )
  var insurancePercantageAdditionalCost = 0.05; // Ubezpieczenie (% ceny zestawu netto)
  var monitoringPercantageAdditionalCost = 0.03; // Monitoring 24/7 (% ceny zestawu netto)
  var warrantyPercantageAdditionalCost = 0.17; // Gwarancja 4x25 lat (% ceny zestawu netto)
  var fullBlackPercantageAdditionalCost = 250; // Panele Full Black (PLN za panel)

  var panelSpace = amountOfPanels * 1.7; // Powieżchnia potrzebna m2

  var powerRequired = 3000; // Moc wymagana
  var power = modulePower * amountOfPanels; // Moc [W]

  var powerReserve = powerRequired - power; // Zapas

  var powerKw = power / 1000; // Moc [kW]

  var setPriceNettoBasic = powerKw * assemblyCostPerKwNet10kW;

  if (powerKw > 10) {
    setPriceNettoBasic = powerKw * assemblyCostPerKwNet20kW;
  }

  if (powerKw > 20) {
    setPriceNettoBasic = powerKw * assemblyCostPerKwNet30kW;
  }

  var insurancePrice,
    monitoringPrice,
    warrantyPrice,
    fullBlackPrice = 0;

  if (insurance == true) {
    insurancePrice = setPriceNettoBasic * insurancePercantageAdditionalCost;
  }

  if (monitoring == true) {
    monitoringPrice = setPriceNettoBasic * monitoringPercantageAdditionalCost;
  }

  if (warranty == true) {
    warrantyPrice = setPriceNettoBasic * warrantyPercantageAdditionalCost;
  }

  if (fullBlack == true) {
    fullBlackPrice = setPriceNettoBasic * fullBlackPercantageAdditionalCost;
  }

  var setPriceNettoWithExtraAdditions =
    setPriceNettoBasic +
    insurancePrice +
    monitoringPrice +
    warrantyPrice +
    fullBlackPrice;

  var financePriceBrutto8 =
    setPriceNettoWithExtraAdditions * 1.08 - assemblyFeeGross8; // Kwota finansowania Brutto 8%
  var financePriceBrutto23 =
    setPriceNettoWithExtraAdditions * 1.23 - assemblyFeeGross23; // Kwota finansowania Brutto 23%

  var edisonPlanVat8 =
    (financePriceBrutto8 * (1 + interestBNP * amountOfInstallments)) /
    amountOfInstallments; // Plan Edison Vat 8%
  var edisonPlanVat23 =
    (financePriceBrutto23 * (1 + interestBNP * amountOfInstallments)) /
    amountOfInstallments; // Plan Edison Vat 23%

  var cashPriceVat8 = financePriceBrutto8 + 1900; // Cena w przypadku zakupu gotówkowego brutto VAT 8%
  var assemblyFeeGrossVat8Installment =
    (cashPriceVat8 * (1 + interestBNP * amountOfInstallments)) /
    amountOfInstallments; // Opłata montażowa kredytowana rata planu brutto VAT 8%

  var reductionCO2 = powerKw * 25 * 0.812; // Redukcja CO2
  reductionCO2 = reductionCO2.toFixed(0);

  var roofSideIndicator = 1000;
  if (roofSide == "wschód-zachód") {
    roofSideIndicator = 950;
  }

  var roofAngelIndicator = 0.95;
  if (roofAngel == "skosny") {
    roofAngelIndicator = 1.05;
  }

  var yearlyEnergyProduction = powerKw * roofSideIndicator * roofAngelIndicator; // Produkcja roczna [kWh]

  // Program Twój Prąd

  var yourEnergyProgramValue = 0;
  if (yourEnergyProgram == 1) {
    yourEnergyProgramValue = 5000;
  }

  var relief = (reliefPercentage * cashPriceVat8) / 100;
  relief = relief.toFixed(0);

  var yourContribution = cashPriceVat8 - yourEnergyProgramValue - relief; // Twój wkład

  var savings = totalEnergyCostFor25Years - cashPriceVat8;

  /* Function results */

  $("#value_per_month_now").text(yearlyEnergyCostNow.toFixed(0));
  $("#value_per_month").text(yearlyEnergyCostAfter25Years.toFixed(0));
  $("#total-cost").text(totalEnergyCostFor25Years.toFixed(0));

  $("#Moc-instalacji").val(powerKw); // Moc [kW]
  $("#redukcja").text(reductionCO2); // Redukcja CO2

  $("#liczba_paneli").text($("#Liczba-Paneli").val());
  $("#minimalna_moc").text(powerKw);

  $("#Produkcja-roczna").val(yearlyEnergyProduction); // Produkcja roczna [kWh]

  $("#cena-gotowka").text(cashPriceVat8.toFixed(0));

  $("#moj-prad").text(yourEnergyProgramValue);

  $("#ulga").text(relief);
  $("#ulga_plan").text(relief);

  $("#twoj-wklad").text(yourContribution);

  $("#oszczednosci").text(savings.toFixed(0));

  $("#cena_plan").text(edisonPlanVat8.toFixed(0));
  $("#umowa_rata").val(edisonPlanVat8.toFixed(0));
  $("#Oplata-montazowa").val(assemblyFeeGross8);
}
