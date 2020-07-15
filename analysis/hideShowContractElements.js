/* This function is resposible for visible part of contract in app (it doesn't affect on exported contract anyway) */
hideShowContractElements();
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
