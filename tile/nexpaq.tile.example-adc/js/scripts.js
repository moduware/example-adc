/**
 * Actions when html and all external files are loaded
 */
document.addEventListener('DOMContentLoaded', function(event) {
	// Creating header on top of tile
  Nexpaq.Header.create('ADC');
});

/**
 * Actions when nexpaq API completely initialized 
 * and we can start working with it
 */
document.addEventListener('NexpaqAPIReady', function() {

	Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
		/**
		 * There are 3 arguments passed when app runs tile:
		 * - Target module UUID
		 * - Target module slot in gateway
		 * - Target module type (i.e. nexpaq.module.laser)
		 */
		var targetModuleUuid = Nexpaq.Arguments[0];
		// we don't care about data not related to our module
		if(event.moduleUuid != targetModuleUuid) return;

		// Module can send multiple types of data, so we are filtering it by type
		if(event.dataSource == 'AdcSensorValue') {
			// And routing it to correct function that will handle it for us
			handleAdcValue(event.variables.adc);
		}

	});  	
});

/**
 * Handles adc value received from module and outputs it to UI
 * 
 * @param {int} adc Number representing ADC value
 */
function handleAdcValue(adc) {
	var voltage = adc * 3.3 / 1023; // Calculating voltage out of ADC value

	document.getElementById('adc-value').textContent = adc.toFixed(2);
	document.getElementById('voltage-value').textContent = voltage.toFixed(2);
}