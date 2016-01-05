var app = angular.module('MainApp', ['ngMaterial', 'ngRoute', 'djds4rce.angular-socialshare'])
			.config(function($locationProvider){
				$locationProvider.html5Mode(true).hashPrefix('!');
			})
			.run(function($log){
        		$log.debug("MainApp running ");
            });

app.config(function ($routeProvider){
	$routeProvider.when('/', {
		controller: 'MainController',
		templateUrl: 'views/demo.html'
	}).when('/flashcard/:dict/:word/:id', {
		controller: 'MainController',
		templateUrl: 'views/card.html'
	}).when('/about', {
		templateUrl: 'views/about.html'
	}).otherwise({
		redirectTo: '/' 
	});
});

app.controller('MainController', ['$scope', '$http', '$filter', '$routeParams', '$compile', 
	function($scope, $http, $filter, $routeParams, $compile){
		$scope.selectedGif = 0;
		$scope.step = 0;
		$scope.isFabOpen = false;
		$scope.dictionary = 'ldoce5';
		$scope.dictionaries = {
			'ldoce5': 'Longman Dictionary of Contemporary English (5th edition)',
			'ldec': 'Longman English-Chinese Dictionary of 100,000 Words (New 2nd Edition)',
			'brep': 'English to Brazilian Portuguese Dictionary',
			'lase': 'Latin American Spanish to English'
		};
		$scope.gifurl = '//media1.giphy.com/media/3o8doVAxrMjXbIHaU0/200w.gif';
		$scope.gifs = [{"type":"gif","id":"xTk9ZLmAX9VtDNi3U4","slug":"xTk9ZLmAX9VtDNi3U4","url":"http:\/\/giphy.com\/gifs\/xTk9ZLmAX9VtDNi3U4","bitly_gif_url":"http:\/\/gph.is\/1NWIF0y","bitly_url":"http:\/\/gph.is\/1NWIF0y","embed_url":"http:\/\/giphy.com\/embed\/xTk9ZLmAX9VtDNi3U4","username":"giphycam","source":"giphy.com\/apps#giphycam","rating":"y","content_url":"","user":{"avatar_url":"https:\/\/media3.giphy.com\/avatars\/giphycam\/ErC3WyTEdiI4.gif","banner_url":"","profile_url":"https:\/\/giphy.com\/giphycam\/","username":"giphycam","display_name":"GIPHY CAM"},"source_tld":"","source_post_url":"giphy.com\/apps#giphycam","import_datetime":"2015-12-13 06:50:06","trending_datetime":"2015-12-15 06:12:57","images":{"fixed_height":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200.gif","width":"200","height":"200","size":"1267074","mp4":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200.mp4","mp4_size":"29648","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200.webp","webp_size":"309154"},"fixed_height_still":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200_s.gif","width":"200","height":"200"},"fixed_height_downsampled":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200_d.gif","width":"200","height":"200","size":"122317","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200_d.webp","webp_size":"26022"},"fixed_width":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w.gif","width":"200","height":"200","size":"1267074","mp4":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w.mp4","mp4_size":"29648","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w.webp","webp_size":"309154"},"fixed_width_still":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w_s.gif","width":"200","height":"200"},"fixed_width_downsampled":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w_d.gif","width":"200","height":"200","size":"122317","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/200w_d.webp","webp_size":"26022"},"fixed_height_small":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100.gif","width":"100","height":"100","size":"401171","mp4":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100.mp4","mp4_size":"13681","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100.webp","webp_size":"136994"},"fixed_height_small_still":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100_s.gif","width":"100","height":"100"},"fixed_width_small":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100w.gif","width":"100","height":"100","size":"401171","mp4":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100w.mp4","mp4_size":"13681","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100w.webp","webp_size":"136994"},"fixed_width_small_still":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/100w_s.gif","width":"100","height":"100"},"downsized":{"url":"http:\/\/media.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy-tumblr.gif","width":"250","height":"250","size":"1553491"},"downsized_still":{"url":"http:\/\/media.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy-tumblr_s.gif","width":"250","height":"250"},"downsized_large":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy.gif","width":"480","height":"480","size":"6459383"},"downsized_medium":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy-downsized-medium.gif","width":"384","height":"384","size":"3846427"},"original":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy.gif","width":"480","height":"480","size":"6459383","frames":"73","mp4":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy.mp4","mp4_size":"179979","webp":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy.webp","webp_size":"1000864"},"original_still":{"url":"http:\/\/media2.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy_s.gif","width":"480","height":"480"},"looping":{"mp4":"http:\/\/media.giphy.com\/media\/xTk9ZLmAX9VtDNi3U4\/giphy-loop.mp4"}}},{"type":"gif","id":"EGn6QuuvGO9BS","slug":"dog-puppy-EGn6QuuvGO9BS","url":"http:\/\/giphy.com\/gifs\/dog-puppy-EGn6QuuvGO9BS","bitly_gif_url":"http:\/\/gph.is\/XIQlyM","bitly_url":"http:\/\/gph.is\/XIQlyM","embed_url":"http:\/\/giphy.com\/embed\/EGn6QuuvGO9BS","username":"","source":"http:\/\/littleanimalgifs.tumblr.com\/post\/30097943029","rating":"g","content_url":"","source_tld":"littleanimalgifs.tumblr.com","source_post_url":"http:\/\/littleanimalgifs.tumblr.com\/post\/30097943029","import_datetime":"2013-03-21 03:13:59","trending_datetime":"2016-01-05 02:41:12","images":{"fixed_height":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200.gif","width":"343","height":"200","size":"134268","mp4":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200.mp4","mp4_size":"19335","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200.webp","webp_size":"133596"},"fixed_height_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200_s.gif","width":"343","height":"200"},"fixed_height_downsampled":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200_d.gif","width":"343","height":"200","size":"261992","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200_d.webp","webp_size":"79466"},"fixed_width":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w.gif","width":"200","height":"117","size":"63232","mp4":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w.mp4","mp4_size":"20036","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w.webp","webp_size":"49890"},"fixed_width_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w_s.gif","width":"200","height":"117"},"fixed_width_downsampled":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w_d.gif","width":"200","height":"117","size":"104893","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/200w_d.webp","webp_size":"29886"},"fixed_height_small":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100.gif","width":"171","height":"100","size":"134268","mp4":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100.mp4","mp4_size":"109962","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100.webp","webp_size":"37044"},"fixed_height_small_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100_s.gif","width":"171","height":"100"},"fixed_width_small":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100w.gif","width":"100","height":"58","size":"63232","mp4":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100w.mp4","mp4_size":"44592","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100w.webp","webp_size":"17330"},"fixed_width_small_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/100w_s.gif","width":"100","height":"58"},"downsized":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.gif","width":"490","height":"286","size":"510201"},"downsized_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy_s.gif","width":"490","height":"286"},"downsized_large":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.gif","width":"490","height":"286","size":"510201"},"downsized_medium":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.gif","width":"490","height":"286","size":"510201"},"original":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.gif","width":"490","height":"286","size":"510201","frames":"10","mp4":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.mp4","mp4_size":"73693","webp":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy.webp","webp_size":"250124"},"original_still":{"url":"http:\/\/media0.giphy.com\/media\/EGn6QuuvGO9BS\/giphy_s.gif","width":"490","height":"286"},"looping":{"mp4":"http:\/\/media.giphy.com\/media\/EGn6QuuvGO9BS\/giphy-loop.mp4"}}},{"type":"gif","id":"3o8doVAxrMjXbIHaU0","slug":"afv-funny-fail-lol-3o8doVAxrMjXbIHaU0","url":"http:\/\/giphy.com\/gifs\/afv-funny-fail-lol-3o8doVAxrMjXbIHaU0","bitly_gif_url":"http:\/\/gph.is\/1OcAPQh","bitly_url":"http:\/\/gph.is\/1OcAPQh","embed_url":"http:\/\/giphy.com\/embed\/3o8doVAxrMjXbIHaU0","username":"afv","source":"","rating":"g","content_url":"","user":{"avatar_url":"https:\/\/media3.giphy.com\/avatars\/afv\/duCgJiq67muO.jpg","banner_url":"https:\/\/media3.giphy.com\/headers\/afv\/TAOb1kS1fcLv.gif","profile_url":"https:\/\/giphy.com\/afv\/","username":"afv","display_name":"America's Funniest Home Videos","twitter":"@afvofficial"},"source_tld":"","source_post_url":"","import_datetime":"2015-12-18 19:02:49","trending_datetime":"2015-12-28 11:26:43","images":{"fixed_height":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200.gif","width":"161","height":"200","size":"1111798","mp4":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200.mp4","mp4_size":"51671","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200.webp","webp_size":"544906"},"fixed_height_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200_s.gif","width":"161","height":"200"},"fixed_height_downsampled":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200_d.gif","width":"161","height":"200","size":"94236","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200_d.webp","webp_size":"45586"},"fixed_width":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w.gif","width":"200","height":"249","size":"834642","mp4":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w.mp4","mp4_size":"70928","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w.webp","webp_size":"863548"},"fixed_width_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w_s.gif","width":"200","height":"249"},"fixed_width_downsampled":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w_d.gif","width":"200","height":"249","size":"81577","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/200w_d.webp","webp_size":"71856"},"fixed_height_small":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100.gif","width":"80","height":"100","size":"333773","mp4":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100.mp4","mp4_size":"18253","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100.webp","webp_size":"167452"},"fixed_height_small_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100_s.gif","width":"80","height":"100"},"fixed_width_small":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100w.gif","width":"100","height":"125","size":"503046","mp4":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100w.mp4","mp4_size":"22530","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100w.webp","webp_size":"250578"},"fixed_width_small_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/100w_s.gif","width":"100","height":"125"},"downsized":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.gif","width":"200","height":"249","size":"826221"},"downsized_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy_s.gif","width":"200","height":"249"},"downsized_large":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.gif","width":"200","height":"249","size":"826221"},"downsized_medium":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.gif","width":"200","height":"249","size":"826221"},"original":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.gif","width":"200","height":"249","size":"826221","frames":"73","mp4":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.mp4","mp4_size":"447734","webp":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy.webp","webp_size":"863548"},"original_still":{"url":"http:\/\/media4.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy_s.gif","width":"200","height":"249"},"looping":{"mp4":"http:\/\/media.giphy.com\/media\/3o8doVAxrMjXbIHaU0\/giphy-loop.mp4"}}},{"type":"gif","id":"dzpAvSpdEibWU","slug":"dog-lol-dzpAvSpdEibWU","url":"http:\/\/giphy.com\/gifs\/dog-lol-dzpAvSpdEibWU","bitly_gif_url":"http:\/\/gph.is\/1OfP9Mp","bitly_url":"http:\/\/gph.is\/1OfP9Mp","embed_url":"http:\/\/giphy.com\/embed\/dzpAvSpdEibWU","username":"","source":"http:\/\/gifsboom.net\/post\/136047090194\/dog-slides-across-the-snow","rating":"g","content_url":"","source_tld":"gifsboom.net","source_post_url":"http:\/\/gifsboom.net\/post\/136047090194\/dog-slides-across-the-snow","import_datetime":"2015-12-27 16:45:10","trending_datetime":"2015-12-27 17:08:05","images":{"fixed_height":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200.gif","width":"297","height":"200","size":"920672","mp4":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200.mp4","mp4_size":"70115","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200.webp","webp_size":"478256"},"fixed_height_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200_s.gif","width":"297","height":"200"},"fixed_height_downsampled":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200_d.gif","width":"297","height":"200","size":"87694","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200_d.webp","webp_size":"43906"},"fixed_width":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w.gif","width":"200","height":"135","size":"476088","mp4":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w.mp4","mp4_size":"43154","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w.webp","webp_size":"276144"},"fixed_width_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w_s.gif","width":"200","height":"135"},"fixed_width_downsampled":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w_d.gif","width":"200","height":"135","size":"45107","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/200w_d.webp","webp_size":"25588"},"fixed_height_small":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100.gif","width":"149","height":"100","size":"292827","mp4":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100.mp4","mp4_size":"28997","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100.webp","webp_size":"173908"},"fixed_height_small_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100_s.gif","width":"149","height":"100"},"fixed_width_small":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100w.gif","width":"100","height":"67","size":"149271","mp4":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100w.mp4","mp4_size":"17399","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100w.webp","webp_size":"95328"},"fixed_width_small_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/100w_s.gif","width":"100","height":"67"},"downsized":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.gif","width":"400","height":"269","size":"1930352"},"downsized_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy_s.gif","width":"400","height":"269"},"downsized_large":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.gif","width":"400","height":"269","size":"1930352"},"downsized_medium":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.gif","width":"400","height":"269","size":"1930352"},"original":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.gif","width":"400","height":"269","size":"1930352","frames":"65","mp4":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.mp4","mp4_size":"156663","webp":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy.webp","webp_size":"773754"},"original_still":{"url":"http:\/\/media4.giphy.com\/media\/dzpAvSpdEibWU\/giphy_s.gif","width":"400","height":"269"},"looping":{"mp4":"http:\/\/media.giphy.com\/media\/dzpAvSpdEibWU\/giphy-loop.mp4"}}}];
		$scope.translation = 'a common animal with four legs, fur, and a tail. Dogs are kept as pets or trained to guard places, find drugs etc';
		$scope.vocab = 'dog';
		$scope.querySearch = querySearch;
		$scope.selectedItemChange = selectedItemChange;
		$scope.searchTextChange = searchTextChange;

		if ($routeParams.dict){
			$scope.dictionary = $routeParams.dict;
			$scope.vocab = $routeParams.word;
			$scope.selectedGif = $routeParams.id;
			var query = $scope.vocab;

			$http.get('//api.pearson.com/v2/dictionaries/'+ $scope.dictionary + '/entries?headword=' + $scope.vocab)
    		.then(function(response){		
      			$scope.translation = getTranslation($scope.dictionary,response.data.results[0]);

      			if ($scope.dictionary === 'lase'){
      				query = $scope.translation;
      			}
      			$http.get('//api.giphy.com/v1/gifs/search?q=' + query + '&limit=4&rating=g&api_key=dc6zaTOxFJmzC')
    		.success(function(data) {
    				var image = data.data[$scope.selectedGif].images.fixed_width;
    				if (image.height > 250){
    					image = data.data[$scope.selectedGif].images.fixed_height;
    				}
					$scope.gifurl = image.url;
					$scope.shareURL = 'https://giflashcard.herokuapp.com/flashcard/' + $scope.dictionary + '/' + $scope.vocab + '/' + $scope.selectedGif;
				});
      		});

    		
      		

      		
		}

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
		
			$scope.vocab = item.headword;
			var query = item.headword;

			$scope.translation = getTranslation($scope.dictionary, item);
			if ($scope.dictionary === 'lase'){
				query = $scope.translation;
			}

			$http.get('//api.giphy.com/v1/gifs/search?q=' + query + '&limit=4&rating=g&api_key=dc6zaTOxFJmzC')
    .success(function(data) {
    		$scope.gifs = data.data;
    		$scope.selectedGif = 0;
    		var image = $scope.gifs[0].images.fixed_width;
    		if (image.height > 250){
    			image = $scope.gifs[0].images.fixed_height;
    		}
			$scope.gifurl = image.url;
    		
    		});
    		$scope.shareURL = 'https://giflashcard.herokuapp.com/flashcard/' + $scope.dictionary + '/' + $scope.vocab + '/' + $scope.selectedGif;

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

		$scope.nextStep = function(){
			$scope.step++;

		}

		$scope.prevStep = function(){
			$scope.step--;
		}

		$scope.setSelectedGif = function(i){
			$scope.selectedGif = i;
			var image = $scope.gifs[i].images.fixed_width;
    		if (image.height > 250){
    			image = $scope.gifs[i].images.fixed_height;
    		}
			$scope.gifurl = image.url;
			$scope.shareURL = 'https://giflashcard.herokuapp.com/flashcard/' + $scope.dictionary + '/' + $scope.vocab + '/' + $scope.selectedGif;
		}



}]);