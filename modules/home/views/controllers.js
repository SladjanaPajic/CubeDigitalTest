'use strict';
 
angular.module('Home')
 
.controller('HomeController',
    ['$scope', 
    function ($scope) {  	
    	 var settings = {
				"async": true,
				"crossDomain": true,
				"url": "http://developer.digitalcube.rs:8999/api/contacts",
				"method": "GET",
				"headers": {
				"authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
		}				
	$.ajax(settings).done(function (response) {		

			$scope.contacts = JSON.parse(response);
			

			$scope.editingData = {};
		    for (var i = 0, length = $scope.contacts.length; i < length; i++) {
		      $scope.editingData[$scope.contacts[i].id] = false;
		    }
    		$scope.modify = function(contact){
        		$scope.editingData[contact.id] = true;
       			$scope.newFirstName = this.contact.first_name;
    		};
   			$scope.update = function(contact){
 				$scope.editingData[contact.id] = false;
 			
				var id = this.contact.id;
			 	var settings = {
					 "async": true,
					 "crossDomain": true,
					 "url": "http://developer.digitalcube.rs:8999/api/contacts/" + id + "?first_name=" + jQuery("input[name=" + contact.id + "]").val(),
					 "dataType": "json",
				    "type" : "PATCH",
					"headers": { "authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
				}
				$.ajax(settings).done(function (response) {		
					  	
				});
    		};
	});

		$scope.removeData = function(contact) {
			var index = $scope.contacts.contacts.indexOf(this.contact);
			$scope.contacts.contacts.splice(index, 1);
			var id = contact.id;
			var settings = {
					 "async": true,
					 "crossDomain": true,
					 "url": "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" + id,
					 "method": "DELETE",
					 "headers": {"authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
			}		
			$.ajax(settings).done(function (response) {		
					 alert(response);
			});
		}



	

/*

			
	$scope.addData = function() {
			$scope.contacts.contacts.push($scope.firstName);
			$scope.firstName="";
			var id = contact.id;

			var settings = {
					 "async": true,
					 "crossDomain": true,
					 "url": "http://developer.digitalcube.rs:8999/api/contacts/" + id + "first_name=" + firstName,
					 "method": "POST",
					 "headers": {
					 "authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84",
					 }
					}
					
			$.ajax(settings).done(function (response) {
	 			$scope.contacts.contacts = JSON.parse(response);
			});
	}
*/
  

    }]);