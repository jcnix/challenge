var aquentApp = angular.module('aquentApp', ['ui.bootstrap']);

aquentApp.controller('AquentCtrl', function($scope, $http) {
	$scope.filteredMembers = [];
	$scope.currentPage = 1;
	$scope.numPerPage = 10;
	$scope.totalItems = 0;
	$scope.maxSize = 5;
	$http.get('http://private-a73e-aquentuxsociety.apiary-mock.com/members').success(function(data) {
		$scope.members = data;
		$scope.totalItems = data.length;
		$scope.detail = data[0];
		$scope.setPage(1);
	});

	$scope.setMember = function(member) {
		$scope.detail = member;
	};

	$scope.setPage = function(pageNo) {
		$scope.currentPage = pageNo;
		$scope.pageChanged();
	};

	$scope.pageChanged = function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		var end = begin + $scope.numPerPage;

		$scope.filteredMembers = $scope.members.slice(begin, end);
	};

	/* When we search we want to revert back to listing all
	 * items at once. Without this a search will only filter
	 * based on the current page */
	$scope.$watch('query', function(term) {
		$scope.filteredMembers = $scope.members;
		
		/* This sets the pagination widget to 1 page */
		$scope.totalItems = 1;

		/* When search query is deleted from search box, set
		 * page to 1 which will trigger pageChanged() and bring
		 * back the pagination widget */
		if(term == '') {
			$scope.totalItems = $scope.members.length;
			$scope.setPage(1);
		}
	});
});
