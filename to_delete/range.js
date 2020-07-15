var slider = document.getElementById("EnergyGrow");
var output = document.getElementById("EnergyGrowValue");
var sliderPrice = document.getElementById("PriceGrow");
var outputPrice = document.getElementById("PriceGrowValue");
output.innerHTML = slider.value;
outputPrice.innerHTML = sliderPrice.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};

sliderPrice.oninput = function() {
  outputPrice.innerHTML = this.value;
};
