var app = angular.module('MainApp', ['ngMaterial', 'ngRoute'])
			.run(function($log){
        		$log.debug("MainApp running ");
            });

app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'MainController',
		templateUrl: 'views/demo.html'
	}).when('/flashcard/:id', {
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
		$scope.gifurl = '//media1.giphy.com/media/3o8doVAxrMjXbIHaU0/200w.gif';
		$scope.translation = '狗';
		$scope.vocab = 'dog';
		$scope.querySearch = querySearch;
		$scope.selectedItemChange = selectedItemChange;
		$scope.searchTextChange = searchTextChange;

		if ($routeParams.id){
			$scope.vocab = $routeParams.id;

			$http.get('//api.giphy.com/v1/gifs/search?q=' + $routeParams.id + '&limit=5&rating=g&api_key=dc6zaTOxFJmzC')
    		.success(function(data) {
    			var image = data.data[0].images.fixed_width;
    			if (image.height > 250){
    				image = data.data[0].images.fixed_height;
    			}
				$scope.gifurl = image.url;
			});

    		$http.get('//api.pearson.com/v2/dictionaries/ldec/entries?headword=' + $routeParams.id)
    		.then(function(response){		
      			$scope.translation = response.data.results[0].senses[0].translation;
      		});

      		$scope.shareURL = 'https://giflashcard.herokuapp.com/#/' + $scope.vocab
		}

		$scope.shareURL = 'https://giflashcard.herokuapp.com/#/' + $scope.vocab
		
		function querySearch(query){
			return $http.get('//api.pearson.com/v2/dictionaries/ldec/entries?headword=' + query)
					.then(function(response){
      				// console.log(response.data.results);
      				return response.data.results;
    		});
		};

		function searchTextChange(text){
			// console.log('Text changed to ' + text);
		};

		function selectedItemChange(item){
			// console.log('Item selected is' + item.headword);
			$scope.vocab = item.headword;
			$scope.translation = item.senses[0].translation;

			$http.get('//api.giphy.com/v1/gifs/search?q=' + item.headword + '&limit=5&rating=g&api_key=dc6zaTOxFJmzC')
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

}]);