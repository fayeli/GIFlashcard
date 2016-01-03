var app = angular.module('MainApp', ['ngMaterial', 'ngRoute'])
			.run(function($log){
        		$log.debug("MainApp running ");
            });

app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'MainController',
		templateUrl: 'views/demo.html'
	}).when('/flashcard/:dict/:id', {
		controller: 'MainController',
		templateUrl: 'views/demo.html'
	}).when('/about', {
		templateUrl: 'views/about.html'
	}).otherwise({
		redirectTo: '/' 
	});
});

app.controller('MainController', ['$scope', '$http', '$filter', '$routeParams', '$compile', 
	function($scope, $http, $filter, $routeParams, $compile){
		$scope.test = 'A fun & interactive language learning tool for creating flashcards with animated GIFs.';
		$scope.isFabOpen = false;
		$scope.dictionary = 'ldoce5';
		$scope.gifurl = '//media1.giphy.com/media/3o8doVAxrMjXbIHaU0/200w.gif';
		$scope.translation = '狗';
		$scope.vocab = 'dog';
		$scope.querySearch = querySearch;
		$scope.selectedItemChange = selectedItemChange;
		$scope.searchTextChange = searchTextChange;

		if ($routeParams.dict){
			$scope.dictionary = $routeParams.dict;
		}

		if ($routeParams.id){
			$scope.vocab = $routeParams.id;
			var query = $scope.vocab;

			$http.get('//api.pearson.com/v2/dictionaries/'+ $scope.dictionary + '/entries?headword=' + $scope.vocab)
    		.then(function(response){		
      			$scope.translation = getTranslation($scope.dictionary,response.data.results[0]);

      			if ($scope.dictionary === 'lase'){
      				query = $scope.translation;
      			}
      			$http.get('//api.giphy.com/v1/gifs/search?q=' + query + '&limit=5&rating=g&api_key=dc6zaTOxFJmzC')
    		.success(function(data) {
    				var image = data.data[0].images.fixed_width;
    				if (image.height > 250){
    					image = data.data[0].images.fixed_height;
    				}
					$scope.gifurl = image.url;
				});
      		});

    		
      		

      		$scope.shareURL = 'https://giflashcard.herokuapp.com/#/' + $scope.vocab
		}

		$scope.shareURL = 'https://giflashcard.herokuapp.com/#/' + $scope.vocab

		function querySearch(query){
			return $http.get('//api.pearson.com/v2/dictionaries/' + $scope.dictionary + '/entries?headword=' + query)
					.then(function(response){
      				
      				return response.data.results;
    		});
		};

		function searchTextChange(text){
			// console.log('Text changed to ' + text);
		};

		function selectedItemChange(item){
			// console.log('Item selected is' + item.headword);
			$scope.vocab = item.headword;
			var query = item.headword;

			$scope.translation = getTranslation($scope.dictionary, item);
			if ($scope.dictionary === 'lase'){
				query = $scope.translation;
			}
			$http.get('//api.giphy.com/v1/gifs/search?q=' + query + '&limit=5&rating=g&api_key=dc6zaTOxFJmzC')
    .success(function(data) {
    		var image = data.data[0].images.fixed_width;
    		if (image.height > 250){
    			image = data.data[0].images.fixed_height;
    		}
			$scope.gifurl = image.url;
			});

    		$scope.shareURL = 'https://giflashcard.herokuapp.com/#/' + $scope.vocab;
    		// var item = angular.element(document.getElementById('fb-share-button'));
    		// var newitem = $compile('<div class="fb-share-button" data-href="{{shareURL}}" data-layout="button"></div>')($scope);
    		// item.replaceWith(newitem);

		};

		function getTranslation(dict, item){
			if (dict === 'ldec'){
				return item.senses[0].translation;
			} else if (dict === 'brep'){
				return item.senses[0].translations[0].text[0];
			} else if (dict === 'lase'){
				return item.senses[0].translations[0].text[0];
			} else if (dict === 'ldoce5'){
				return item.senses[0].definition[0];
			}
		}

}]);