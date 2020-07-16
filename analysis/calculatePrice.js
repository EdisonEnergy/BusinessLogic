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
  priceGrow = priceGrow / 100;
  energyGrow = energyGrow / 100;

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

  var insurancePrice = 0;
  var monitoringPrice = 0;
  var warrantyPrice = 0;
  var fullBlackPrice = 0;

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
    fullBlackPrice = amountOfPanels * fullBlackPercantageAdditionalCost;
  }

  console.log("ins" + insurancePrice);
  console.log("mon" + monitoringPrice);
  console.log("war" + warrantyPrice);
  console.log("ful" + fullBlackPrice);

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

  $("#value_per_month_now").text(
    decimalSeparator(yearlyEnergyCostNow.toFixed(0))
  );
  $("#value_per_month").text(
    decimalSeparator(yearlyEnergyCostAfter25Years.toFixed(0))
  );
  $("#total-cost").text(decimalSeparator(totalEnergyCostFor25Years.toFixed(0)));

  $("#Moc-instalacji").val(powerKw); // Moc [kW]
  $("#redukcja").text(reductionCO2); // Redukcja CO2

  $("#liczba_paneli").text($("#Liczba-Paneli").val());
  $("#minimalna_moc").text(powerKw);

  $("#Produkcja-roczna").val(yearlyEnergyProduction); // Produkcja roczna [kWh]

  $("#cena-gotowka").text(decimalSeparator(cashPriceVat8.toFixed(0)));

  $("#moj-prad").text(decimalSeparator(yourEnergyProgramValue));

  $("#ulga").text(relief);
  $("#ulga_plan").text(relief);

  $("#twoj-wklad").text(yourContribution.toFixed(0));

  $("#oszczednosci").text(savings.toFixed(0));

  $("#Cena-w-Planie-Edison").val(edisonPlanVat8.toFixed(0));

  $("#cena_plan").text(edisonPlanVat8.toFixed(0));
  $("#umowa_rata").val(edisonPlanVat8.toFixed(0));
  $("#Oplata-montazowa").val(assemblyFeeGross8);

  function decimalSeparator(nStr) {
    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + " " + "$2");
    }
    return x1 + x2;
  }
}
