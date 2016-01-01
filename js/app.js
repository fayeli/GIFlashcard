var app = angular.module('MainApp', ['ngMaterial'])
			.run(function($log){
        		$log.debug("MainApp running ");
            });

app.controller('MainController', ['$scope', '$http', '$filter', 
	function($scope, $http, $filter){
		$scope.test = 'A fun & interactive language learning tool for creating flashcards with animated GIFs.';
		$scope.gifurl = 'http://media1.giphy.com/media/3o8doVAxrMjXbIHaU0/200w.gif';
		$scope.translation = '狗';
		$scope.vocab = 'dog';
		$scope.querySearch = querySearch;
		$scope.selectedItemChange = selectedItemChange;
		$scope.searchTextChange = searchTextChange;

		function querySearch(query){
			return $http.get('http://api.pearson.com/v2/dictionaries/ldec/entries?headword=' + query)
					.then(function(response){
      				console.log(response.data.results);
      				return response.data.results;
    		});
		};

		function searchTextChange(text){
			console.log('Text changed to ' + text);
		};

		function selectedItemChange(item){
			console.log('Item selected is' + item.headword);
			$scope.vocab = item.headword;
			$scope.translation = item.senses[0].translation;

			$http.get('http://api.giphy.com/v1/gifs/search?q=' + item.headword + '&limit=5&rating=g&api_key=dc6zaTOxFJmzC')
    .success(function(data) {
    		var image = data.data[0].images.fixed_width;
    		if (image.height > 250){
    			image = data.data[0].images.fixed_height;
    		}
			$scope.gifurl = image.url;
			});
		};

}]);