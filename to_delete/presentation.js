var PriceGrow = 0;
var EnergyGrow = 0;
var FullBlack = 0;
var d24 = 0;
var EnergySupplier = "";
var supplierValue = 0;
var l27 = 0;
var d32 = 0;
var d35 = 0;

$("#EnergyGrowSlide").hide();

var EnergyGrowYesNo = $("input[name='EnergyGrowYesNo']:checked").val();
if (EnergyGrowYesNo == 1) {
  $("#EnergyGrowSlide").show();
  $("#EnergyGrowYesNo").hide();
}

$(
  "#PowerUse, #PriceGrow,input[name='Forma'], #EnergyGrow, #EnergySupplier input , #EnergyGrowYesNo input"
).on("change", function() {
  priceFunction();
});

$("#FullBlack input").on("change", function() {
  FullBlack = $("input[name='FullBlack']:checked").val();
  if (FullBlack == 1) {
    $("input[name='FullBlCheck']").prop("checked", true);
  } else {
    $("input[name='FullBlCheck']").prop("checked", false);
  }
  priceFunction();
});

$("#Ubezpieczenie input").on("change", function() {
  var Ubezpieczenie = $("input[name='Ubezpieczenie']:checked").val();
  if (Ubezpieczenie == 1) {
    $("input[name='UbezpieczenieCheck']").prop("checked", true);
  } else {
    $("input[name='UbezpieczenieCheck']").prop("checked", false);
  }
  priceFunction();
});

$("#Monitoring input").on("change", function() {
  var Monitoring = $("input[name='Monitoring']:checked").val();
  if (Monitoring == 1) {
    $("input[name='MonitoringCheck']").prop("checked", true);
  } else {
    $("input[name='MonitoringCheck']").prop("checked", false);
  }
  priceFunction();
});

$("#Gwarancja input").on("change", function() {
  var Gwarancja = $("input[name='Gwarancja']:checked").val();
  if (Gwarancja == 1) {
    $("input[name='GwarancjaCheck']").prop("checked", true);
  } else {
    $("input[name='GwarancjaCheck']").prop("checked", false);
  }
  priceFunction();
});

$("#montaz-wrap").hide();

$("#more-panels").on("click", function() {
  var lPanl = $("#Liczba-Paneli").val();
  lPanl = parseInt(lPanl);
  if (lPanl < 60) {
    $("#Liczba-Paneli").val(lPanl + 2);

    // These objects resides within the edison.client.quote.js file.
    // DO NOT REMOVE. - [RVE 2020-07-06]
    clientSession.st_numberOfPanels = $("#Liczba-Paneli").val();
    updateState();
  }
});

$("#less-panels").on("click", function() {
  var lPanl = $("#Liczba-Paneli").val();
  lPanl = parseInt(lPanl);
  if (lPanl > 10) {
    $("#Liczba-Paneli").val(lPanl - 2);

    // These objects resides within the edison.client.quote.js file.
    // DO NOT REMOVE. - [RVE 2020-07-06]
    clientSession.st_numberOfPanels = $("#Liczba-Paneli").val();
    updateState();
  }
});

$("#Liczba-Paneli").on("change", function() {
  lPanl();
});

$("#less-panels, #more-panels").on("click", function() {
  lPanl();
});

$("#Liczba-Paneli").val(10);
lPanl();
function lPanl() {
  var lPanl = $("#Liczba-Paneli").val();
  $(".panel-img").hide();
  if (lPanl <= 10) {
    $("#panels-10").show();
  } else if (lPanl <= 14) {
    $("#panels-14").show();
  } else if (lPanl <= 16) {
    $("#panels-16").show();
  } else if (lPanl <= 20) {
    $("#panels-20").show();
  } else if (lPanl <= 24) {
    $("#panels-24").show();
  } else if (lPanl <= 28) {
    $("#panels-28").show();
  } else {
    $("#panels-32").show();
  }
  priceFunction();
}

$(
  "#Liczba-Paneli,#Forma input, #MonitoringCheck,input[name='MiejsceInstalacji'],input[name='MontazKredyt'], #GwarancjaCheck, #UbezpieczenieCheck, #FullBlCheck, input[name='Modul'], input[name='Poziom-ulgi'], input[name='Program'] "
).on("change", function() {
  priceFunction();
});

priceFunction();

function priceFunction() {
  EnergyGrowYesNo = $("input[name='EnergyGrowYesNo']:checked").val();
  if (EnergyGrowYesNo == 1) {
    $("#EnergyGrowSlide").show();
    $("#EnergyGrowYesNo").hide();
  }

  EnergyGrowYesNo = $("input[name='Forma']:checked").val();
  if (EnergyGrowYesNo == "plan") {
    $("#forma-platnosci-plan").show();
    $("#forma-platnosci-gotowka").hide();
  } else {
    $("#forma-platnosci-plan").hide();
    $("#forma-platnosci-gotowka").show();
  }

  PriceGrow = $("#PriceGrow").val();
  PriceGrow = PriceGrow / 100;
  EnergyGrow = $("#EnergyGrow").val();
  EnergyGrow = EnergyGrow / 100;
  EnergySupplier = $("input[name='EnergySupplier']:checked").val();
  if (EnergySupplier == "PGE") {
    supplierValue = 0.58;
  } else if (EnergySupplier == "Tauron") {
    supplierValue = 0.54;
  } else if (EnergySupplier == "Enea") {
    supplierValue = 0.52;
  } else if (EnergySupplier == "Energa") {
    supplierValue = 0.6;
  } else if (EnergySupplier == "Innogy") {
    supplierValue = 0.52;
  }
  d24 = $("#PowerUse").val(); // powerUse

  l27 = supplierValue * d24; // helper1
  d32 = PriceGrow;
  d35 = EnergyGrow;

  var power = Math.pow(1 + d32, 25);
  var l30 = l27 * power * (1 + d35);

  var value_per_month = l30 / 12;
  var value_per_month_now = l27 / 12;

  var value = ((l30 - l27) / 2) * 25 + 3600 * 24;

  $("#value_per_month_now").text(value_per_month_now.toFixed(0));
  $("#value_per_month").text(value_per_month.toFixed(0));
  $("#total-cost").text(value.toFixed(0));

  var Forma = "";

  Forma = $("input[name='Forma']:checked").val();
  if (Forma == "plan") {
    $("#montaz-wrap").show();
    $("#umowa_kredyt .true").show();
    $("#umowa_kredyt .false").hide();
    $("#umowa_gotowka .true").hide();
    $("#umowa_gotowka .false").show();
  } else {
    $("#montaz-wrap").hide();
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

  //var lP = $("#Liczba-Paneli").val();
  var c2 = 0;
  c2 = $("input[name='Modul']:checked").val();

  var c3 = 0.0035;
  var c4 = 120;
  var c5 = 1900;
  var c6 = 2100;
  var c7 = 4900;
  var c8 = 4600;
  var c9 = 4400;
  var c10 = 0.05;
  var c11 = 0.03;
  var c12 = 0.17;
  var c13 = 250;

  var c16 = $("#Liczba-Paneli").val();
  var c17 = c16 * 1.7;
  var c18 = 3000;
  var c19 = c16 * c2;
  var c20 = c18 - c19;
  var c21 = c19 / 1000;

  var c22 = c21 * c7;
  var c23 = 0;
  var c24 = 0;
  var c25 = 0;
  var c26 = 0;
  if ($("input[name='UbezpieczenieCheck']").prop("checked")) {
    c23 = c22 * c10;
    $("#umowa_ubezpieczenie .true").show();
    $("#umowa_ubezpieczenie .false").hide();
  } else {
    c23 = 0;
    $("#umowa_ubezpieczenie .true").hide();
    $("#umowa_ubezpieczenie .false").show();
  }
  if ($("input[name='MonitoringCheck']").prop("checked")) {
    c24 = c22 * c11;
    $("#umowa_monitoring .true").show();
    $("#umowa_monitoring .false").hide();
  } else {
    c24 = 0;
    $("#umowa_monitoring .true").hide();
    $("#umowa_monitoring .false").show();
  }

  if ($("input[name='GwarancjaCheck']").prop("checked")) {
    c25 = c22 * c12;
    $("#umowa_gwarancja .true").hide();
    $("#umowa_gwarancja .false").show();
  } else {
    c25 = 0;
    $("#umowa_gwarancja .true").show();
    $("#umowa_gwarancja .false").hide();
  }

  if ($("input[name='FullBlCheck']").prop("checked")) {
    c26 = c16 * c13;
    $("#umowa_full .true").show();
    $("#umowa_full .false").hide();
  } else {
    c26 = 0;
    $("#umowa_full .false").show();
    $("#umowa_full .true").hide();
  }

  var c27 = c22 + c23 + c24 + c25 + c26; // Wybór klienta( Cena Netto Podstawowa + dodatki)

  var c28 = c27 * 1.08 - c5; // Kwota finansowania Brutto 8%
  var c29 = c27 * 1.23 - c6; // Kwota finansowania Brutto 23%
  var c30 = (c28 * (1 + c3 * 120)) / 120; // Plan Edison Vat 8%
  var c31 = (c29 * (1 + c3 * 120)) / 120; // Plan Edison Vat 23%

  var c34 = c28 + 1900; // Cena w przypadku zakupu gotówkowego brutto VAT 8%
  var c33 = (c34 * (1 + c3 * 120)) / 120; // Opłata montażowa kredytowana rata planu brutto VAT 8%

  $("#Moc-instalacji").val(c21);

  var redukcja = c21 * 25 * 0.812;
  redukcja = redukcja.toFixed(0);
  $("#redukcja").text(redukcja);

  var stronaDachu = $("input[name='StronaDachu']:checked").val();

  var wskaznikDach = 1000;
  if (stronaDachu == "wschód-zachód") {
    wskaznikDach = 950;
  }
  if (stronaDachu == "południe") {
    wskaznikDach = 1000;
  }
  var katDachu = $("input[name='KatDachu']:checked").val();
  var wskaznikKatDachu = 1;
  if (katDachu == "plaski") {
    wskaznikKatDachu = 0.95;
  }
  if (katDachu == "skosny") {
    wskaznikKatDachu = 1.05;
  }
  if (katDachu == "stromy") {
    wskaznikKatDachu = 0.95;
  }

  $("#liczba_paneli").text($("#Liczba-Paneli").val());
  $("#minimalna_moc").text(c21);

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

  var produkcjaRoczna = c21 * wskaznikDach * wskaznikKatDachu;

  $("#Produkcja-roczna").val(produkcjaRoczna);

  $("#cena-gotowka").text(c34.toFixed(0));

  var Program = $("input[name='Program']:checked").val();
  if (Program == 1) {
    ProgramValue = 5000;
  } else {
    ProgramValue = 0;
  }
  var PoziomUlgi = $("input[name='Poziom-ulgi']:checked").val();
  var ulga = (PoziomUlgi * c34) / 100;
  ulga = ulga.toFixed(0);

  $("#ulga").text(ulga);
  $("#ulga_plan").text(ulga);

  $("#moj-prad").text(ProgramValue);

  var total_cost = value.toFixed(0);

  var TwojWklad = 0;
  TwojWklad = c34 - ProgramValue - ulga;
  TwojWklad = TwojWklad.toFixed(0);
  $("#twoj-wklad").text(TwojWklad);

  console.log(total_cost);

  var oszczednosci = total_cost - c34;

  $("#oszczednosci").text(oszczednosci.toFixed(0));

  $c30 = $("#Cena-w-Planie-Edison").val(c30.toFixed(0));

  $("#cena_plan").text(c30.toFixed(0));
  $("#umowa_rata").val(c30.toFixed(0));
  $("#Oplata-montazowa").val(1900);
}
