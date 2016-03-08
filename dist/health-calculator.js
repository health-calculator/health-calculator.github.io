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
	};
	function _calculate(inputHeight, inputWeight){
			// Height in Feet
			var feet = Math.trunc( inputHeight);
			var inch = (parseFloat( inputHeight ).getDecimalPart()) / 12;
			var height = _concatDecimal(feet, inch);

			height = height * height;
			console.log("Height "+ height);
			// Weight in pounds
			var weight = parseFloat(inputWeight) * 4.88;
			console.log("Weight "+ weight);

			console.log("BMI "+weight/height);
			return weight/height;
	}

	Plugin.prototype = {
		init: function () {
			this.build();
			this.attachListener();

			this.error(this.options.errorMessage);
		},
		build: function(){
			var container = $(this.element);
			var containerHeading = $("<div class='hc-heading panel-heading'>"+this.options.title+"</div>");
			var containerBody 	= $("<div class='hc-body panel-body'></div>");
			var formGroupHeight = $("<div class='form-group'><input class='hc-height form-control' type='number' placeholder='Height'></div>");
			var formGroupWeight = $("<div class='form-group'><input class='hc-weight form-control' type='number' placeholder='Weight'></div>");
			var formGroupButton = $("<div class='form-group'><a href='#' class='hc-calculate btn btn-success'>Calculate</a><span class='hc-result pull-right'></span></div>");
			var form = $("<div class='form'></div>");
			form.append(formGroupHeight);
			form.append(formGroupWeight);
			form.append(formGroupButton);
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
				$('.hc-calculate').on('click', function(){
					var result = _calculate( $('.hc-height').val(), $('.hc-weight').val() );
					$('.hc-result').html(result);

				});
				// CALL ERROR IF NOT VALID INPUTS

		},
		error: function(message){
			var containerBody = $(this.element).find('.hc-body');
			var error = $('<div class="hc-error alert alert-danger" role="alert">'+message+'</div>');

			containerBody.append(error);
		},
		success: function(){
			var container = $(this.element);
			container.find('.hc-error').remove();
		}

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

