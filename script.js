'use strict';
angular
	.module('randomQuoteMachine', [])
	.controller('dynamicQuote', ['$scope', '$http', function ($scope, $http) {
		var colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen']
		var req = {
			type: "GET",
			url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=",
			dataType: "json",
			headers: {
				"X-Mashape-Key": "xqSCrxrwg9msh4iUnJDhRR99rbdqp11C33OjsnstdvmVwwTgpp",
				"Accept": "application/json"
			}
		};
		
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		}
		
		function newColor() {
			var colorIndex = getRandomInt(0, colors.length);
			return colors[colorIndex];
		}
		
		function makeTwitterLink() {
			var baselink = 'https://twitter.com/intent/tweet?hashtags=quotes,parloti&related=freecodecamp&text='
			return baselink + '"' + $scope.quote.message + '" ' + $scope.quote.author;
		}
		
		function makeTumblrLink() {
			var prefixLink = 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=';
			var suffix = '&canonicalUrl=https://www.tumblr.com/buttons&shareSource=tumblr_share_button';
			return prefixLink + $scope.quote.author + '&content=' + $scope.quote.message + suffix;
		}
		
		$scope.quote = {
			message: "",
			author: "",
			color: ""
		};
		$scope.share = {
			twitter: "",
			tumblr: ""
		}
		$scope.newQuote = function () {
			$http(req).then(function (response) {
				$scope.quote.message = response.data.quote;
				$scope.quote.author = response.data.author;
				$scope.quote.color = newColor();
				$scope.share.twitter = makeTwitterLink();
				$scope.share.tumblr = makeTumblrLink();
			}, function (a, b, c, d) {
				console.log(a, b, c, d);
			});
		}
		$scope.newQuote();
	}]);