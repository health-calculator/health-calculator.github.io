
/*\
|*|
|*|
|*|
|*| 1.)
|*| BodyMassIndex
\*/

var BodyMassIndexCalculator = function(_plugin,options) {
		this.options = options;
		this.element = $(_plugin.element);
		this.res = {
			category: "",
			calculation: ""
		};

		this._error = function() {
			this.element.find('.hc-result-calculation').html("");
			this.element.find('.hc-result-category').html("");
			this.element.find('.hc-body').append('<div class="hc-error alert alert-danger">'+this.options.errorMessage+'</div>');
		};

		this._success = function(){
			this.element.find('.hc-error').remove();
			this.element.find('.hc-result-calculation').html(this.res.calculation);
			this.element.find('.hc-result-category').html(this.res.category);
		};

		this.getCategory = function(bmi){
			 if( bmi < 18.5 ) return "Underweight";					// Below 18.5
			 if( bmi > 18.5 && bmi < 24.9) return "Normal weight"; 	// between 18-24
			 if( bmi > 25.0 && bmi < 29.9) return "Overweight"; 	// between 25-29
			 if( bmi > 30.0 && bmi < 34.9) return "Obese";			//	between 30-35
			 else {
			 	return "uncategorized";
			}
		};

		this.concatDecimal = function(num1, num2){
			// A cheat solution i think
			// example 15.23
			return parseFloat(num1+"."+num2);
		};

		this.calculate = function(inputHeight, inputWeight){
			// Height in Feet
			var feet = Math.trunc( inputHeight );
			var inch = ( parseFloat( inputHeight ).getDecimalPart() ) / 12;
			var height = this.concatDecimal(feet, inch);

			height = height * height;
			// Weight in pounds
			var weight = parseFloat(inputWeight) * 4.88;
			return weight/height;
		};

		this.init = function() {
			this.render();
			this.listen();
		};

		this.init();
	};

	BodyMassIndexCalculator.prototype.render = function () {
		this.element.append('<h6>'+ this.options.panelTitle +'</h6>')
			.append('<div class="form-group"><input class="hc-height form-control" placeholder="Height"></div>')
			.append('<div class="form-group"><input class="hc-weight form-control" placeholder="Weight"></div>')
			.append('<div class="form-group"><a class="hc-calculate btn btn-success">'+"Calculate"+'</a></div>')
			.append('<div class="form-group"><span class="hc-result-category pulll-left"></span> <span class="hc-result-calculation pull-right"></span></div>');
		this.element.addClass('form');
	};

	BodyMassIndexCalculator.prototype.listen = function () {
		this.element.find('.hc-calculate').on('click', function(){
			var inputHeight = this.element.find('.hc-height').val();
			var inputWeight = this.element.find('.hc-weight').val();
			this.res.calculation = this.calculate( inputHeight , inputWeight );
			this.res.category = this.getCategory( this.res.calculation );
			if( inputHeight === "" || inputWeight === "" ) this._error();
			else this._success();
		}.bind(this));
	};
