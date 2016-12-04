'use strict';
 
angular.module('Home')
  
.controller('HomeController',
    ['$scope', 
    function ($scope) {  
    	//Get Counties List
 		var settings = {
				"async": true,
				"crossDomain": true,
				"url": "http://developer.digitalcube.rs:8999/api/countries",
				"method": "GET",
				
				"headers": {
				"authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
		}				
		$.ajax(settings).success(function (response) {		
				return $scope.countries = JSON.parse(response);						  
		});
		
    	// Get List of Contacts
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
			    	// Click Edit this Contact
		    		$scope.modify = function(contact){
		        		$scope.editingData[contact.id] = true;	        		
						
		       			$scope.newFirstName = this.contact.first_name;
		       			$scope.newLastName = this.contact.last_name;
		       			$scope.newPhones = this.contact.phones;
		       			$scope.newEmails = this.contact.emails;
		       			$scope.newCountry = this.contact.country;
		       			$scope.newCity = this.contact.city;
		       			$scope.newZip = this.contact.zip;     

		       			jQuery('.editButton').addClass('disabled'); 			
		    		};
		    	
			});	
			// Click Update edited Contact and List
   				$scope.update = function(contact){
	 				$scope.editingData[contact.id] = false;
					var id = this.contact.id;
					var settings = {
						"async": true,
						 "crossDomain": true,
						 "url": "http://developer.digitalcube.rs:8999/api/contacts/" + id + "?first_name=" + jQuery("input[name=" + contact.id + "firstName]").val()+ "&csv_phones=" + jQuery("input[name=" + contact.id + "phones]").val() +"&csv_emails=" + jQuery("input[name=" + contact.id + "emails]").val() + "&last_name=" + jQuery("input[name=" + contact.id + "lastName]").val()+ "&zip=" + jQuery("input[name=" + contact.id + "zip]").val() + "&city=" + jQuery("input[name=" + contact.id + "city]").val()  + "&country=" +jQuery("select[name=" + contact.id + "country]").val(),
						"dataType": "json",
					    "type" : "PATCH",
						"headers": { "authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
					}
					$.ajax(settings).done(function (response) {		
						    $scope.newFirstName =  jQuery("input[name=" + contact.id + "firstName]").val();
							$scope.newLastName =  jQuery("input[name=" + contact.id + "lastName]").val();
							$scope.newPhones =  jQuery("input[name=" + contact.id + "phones]").val();
							$scope.newEmails =  jQuery("input[name=" + contact.id + "emails]").val();
							$scope.newCountry =  jQuery("select[name=" + contact.id + "country]").val();
							$scope.newCity =  jQuery("input[name=" + contact.id + "city]").val();
							$scope.newZip =  jQuery("input[name=" + contact.id + "zip]").val();

						    $scope.changedName = $scope.newFirstName;
						    $scope.changedLastName = $scope.newLastName;
						    $scope.changedPhones = $scope.newPhones;
						    $scope.changedEmails = $scope.newEmails;
						    $scope.changedCountry = $scope.newCountry;
						    $scope.changedCity = $scope.newCity;
						    $scope.changedZip = $scope.newZip;

						  	jQuery("#"+ contact.id +"firstName").text($scope.changedName);
						  	jQuery("#"+ contact.id +"lastName").text($scope.changedLastName);
						  	jQuery("#"+ contact.id +"phones").text($scope.changedPhones);
						  	jQuery("#"+ contact.id +"emails").text($scope.changedEmails);
						  	jQuery("#"+ contact.id +"country").text($scope.changedCountry);
						  	jQuery("#"+ contact.id +"city").text($scope.changedCity);
						  	jQuery("#"+ contact.id +"zip").text($scope.changedZip);

						  	jQuery('.editButton').removeClass('disabled'); 

					});
    	};
    	//Add Contact
		$scope.addData = function() {
			if(jQuery("input[name=firstName]").val() != ""){
				var settings = {
						"async": true,
						"crossDomain": true,
						"url": "http://developer.digitalcube.rs:8999/api/contacts?first_name=" + jQuery("input[name=firstName]").val() + "&csv_phones=" + jQuery("input[name=fieldsPhone]").val() +"&csv_emails=" + jQuery("input[name=fieldsEmail]").val() + "&last_name=" + jQuery("input[name=lastName]").val()+ "&zip=" + jQuery("input[name=zip]").val() + "&city=" + jQuery("input[name=city]").val()  + "&country=" +jQuery("select[name=country]").val(),
						"method": "PUT",
						"headers": {"authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
				}					
				$.ajax(settings).done(function (response) {
					$("#modal").modal("show");
					$('#addContactForm').each(function(){
    					this.reset();
					});					
				});
			} 				
		}	
			//Delete Contact
			$scope.removeData = function(contact) {
					var index = $scope.contacts.contacts.indexOf(this.contact);
					$scope.contacts.contacts.splice(index, 1);
					var id = this.contact.id;
					var settings = {
						 "async": true,
						 "crossDomain": true,
						 "url": "http://developer.digitalcube.rs:8999/api/contacts/id_contact/" + id,
						 "method": "DELETE",
						 "headers": {"authorization": "s00000kBNr8wkLe92ThX36fnv5f1uAkAUfjnSA6c2cl6QyrGdgw5h1Cv91DI3b84"}
					}		
				$.ajax(settings).done(function (response) {		
						 
				});
			}							
    }]);