/*
Name 				: health-calculator
Author Name 		: Malkio
Date Created 		: March 8 2016
*/

// Semi-colon to end any unclosed js code

/*\
|*|
|*|
|*|
|*|
|*|
|*|
|*|
|*| The ACTUAL PLUGIN
\*/
Number.prototype.getDecimalPart = function(){
	// Get integer
	var temp = this.valueOf() - Math.trunc(this.valueOf());
	return Math.round(temp * 100);
};


;(function($, window, document, undefined){

	// Checks whether or not jquery is defined
	var pluginName = "healthCalculator";
	var defaults = {
		errorMessage: "Something went wrong",
		panelTitle: "BMI Calculator",
	};
	// Plugin Constructor
	function Plugin( element, type ,options ){
		this.element = element;
		// Now merge the default options with options
		// passed through our construtor
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this.init(type, element);
	}

	Plugin.prototype = {
		init: function (type, element) {
			if(typeof(type) === "string" && (type === "bmi" || type === "BMI" || type === "BodyMassIndexCalculator") ){
				new BodyMassIndexCalculator(this, this.options);
			 }
			 if(typeof(type) === "string" && (type === "ctgw" || type === "CTGW" || type === "CaloriesToGainWeight") ){
			 	new CaloriesToGainWeight(this, this.options);
			 }

		},

	};

	// A lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( type,options ) {
		return this.each(function () {
			if ( !$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" +pluginName, new Plugin(this, type, options));
			}
		});
	};


})(jQuery, window, document, undefined);



