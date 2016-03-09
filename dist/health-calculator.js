/*
Name 				: health-calculator
Author Name 		: Malkio
Date Created 		: March 8 2016
*/

// Semi-colon to end any unclosed js code
;(function($, window, docuement, undefined){

	// Checks whether or not jquery is defined
	var pluginName = "healthCalculator";
	var defaults = {
		errorMessage: "Something went wrong",
		title: "BMI Calculator"
	};

	// Plugin Constructor
	function Plugin( element, options ){
		this.element = element;

		// Now merge the default options with options
		// passed through our construtor
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Number.prototype.getDecimalPart = function(){
		// Get integer
		var temp = this.valueOf() - Math.trunc(this.valueOf());
		return Math.round(temp * 100);
	};

	function _concatDecimal(num1, num2){
		// A cheat solution i think
		return parseFloat(num1+"."+num2);
	}

	function _calculate(inputHeight, inputWeight){
			// Height in Feet
			var feet = Math.trunc( inputHeight );
			var inch = ( parseFloat( inputHeight ).getDecimalPart() ) / 12;
			var height = _concatDecimal(feet, inch);

			height = height * height;
			// Weight in pounds
			var weight = parseFloat(inputWeight) * 4.88;
			return weight/height;
	}
	function _getCategory(bmi){
		 if( bmi < 18.5 ) return "Underweight";					// Below 18.5
		 if( bmi > 18.5 && bmi < 24.9) return "Normal weight"; 	// between 18-24
		 if( bmi > 25.0 && bmi < 29.9) return "Overweight"; 	// between 25-29
		 if( bmi > 30.0 && bmi < 34.9) return "Obese";			//	between 30-35
		 else{
		 	return "uncategorized";
		 }
	}

	Plugin.prototype = {
		init: function () {
			this.build();
			this.attachListener();
		},
		build: function(){
			var container = $(this.element);
			var containerHeading = $("<div class='hc-heading panel-heading'>"+this.options.title+"</div>");
			var containerBody 	= $("<div class='hc-body panel-body'></div>");
			var formGroupHeight = $("<div class='form-group'><input class='hc-height form-control' type='number' placeholder='Height'></div>");
			var formGroupWeight = $("<div class='form-group'><input class='hc-weight form-control' type='number' placeholder='Weight'></div>");
			var formGroupButton = $("<div class='form-group'><a href='#' class='hc-calculate btn btn-success'>Calculate</a></div>");
			var formGroupResult = $("<div class='form-group'><span class='hc-result-category pulll-left'></span> <span class='hc-result-calculation pull-right'></span></div>");
			var form = $("<div class='form'></div>");

			form.append(formGroupHeight);
			form.append(formGroupWeight);
			form.append(formGroupButton);
			form.append(formGroupResult);
			containerBody.append(form);

			container.addClass('panel panel-default');

			// Attach Heading
			container.append(containerHeading);

			// Attach Body;
			container.append(containerBody);
			return containerBody;
		},
		attachListener: function(){
			// CALL CLICK
			var _plugin = this;
			function error() {
				console.log("error");
				$('.hc-result-calculation').html("");
				$('.hc-result-category').html("");
				$('.hc-body').append('<div class="hc-error alert alert-danger">'+_plugin.options.errorMessage+'</div>');
			}
			function success() {
				$('.hc-error').remove();
				$('.hc-result-calculation').html(_plugin.resultCalculation);
				$('.hc-result-category').html(_plugin.resultBmiCategory);
			}

			$('.hc-calculate').on('click', function(){
				var inputHeight = $('.hc-height').val();
				var inputWeight = $('.hc-weight').val();

				_plugin.resultCalculation = _calculate( inputHeight , inputWeight );
				_plugin.resultBmiCategory = _getCategory( _plugin.resultCalculation );
				if( inputHeight == "" || inputWeight == "" ) error();
				else success();
			});
		},
	};

	// A lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( !$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" +pluginName, new Plugin(this, options));
			}
		});
	};
	console.log("hello world");


})(jQuery, window, document, undefined);

