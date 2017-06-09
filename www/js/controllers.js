angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })


    .controller("IntroCtrl", function($scope ,$state,$timeout){
        //$scope.logo='img/logo-unerg-750.png'

        $scope.logo='img/UNERG.jpg';
        setTimeout(function(){
            $state.go('app.logins');
        },9000);


    })
    .controller("LoginCtrl", function($scope ,$state,$timeout,$http,$httpParamSerializerJQLike){
        //$scope.logo='img/logo-unerg-750.png'
        //$scope.loginData=[];
        $scope.data={};
        $scope.datapersonal= [];
        $scope.logo='img/UNERG.jpg';



        $scope.doLogin= function(data2){
            // $scope.username="";
            //$scope.password="";
            //var data=JSON.stringify(data);
            $http({
                method: 'POST',
                url: 'http://rrhh.unerg.edu.ve/movil/login',
                data: $httpParamSerializerJQLike(data2),
                headers: {'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Control':'*'}
            })
                .success(function(response) {
                    // handle success things
                    //console.log(response);
                    //console.log(response.status);
                    if (response.status=="success") {
                        //console.log(response);
                        $scope.datapersonal = response;
                        console.log($scope.datapersonal.data.User.nombres+" "+ $scope.datapersonal.data.User.id+" "+$scope.datapersonal.data.User.password);
                        $state.go('app.playlists',{user:$scope.datapersonal.data.User.nombres,ape:$scope.datapersonal.data.User.apellidos,cedula:$scope.datapersonal.data.User.id,token:$scope.datapersonal.data.User.password});
                    }if(response.status=="error") {
                        console.log(response.mensaje);
                        alert(response.mensaje);
                    }
                })
                .error(function(data, status, headers, config) {
                    // handle error things
                    console.error(data,status);
                });
        };

    })
    .controller('PlaylistsCtrl', function($scope,$state,$timeout,$http,$stateParams) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
        $scope.NombreUser=$stateParams.user;
        $scope.ApellidoUser=$stateParams.ape;
        $scope.Cedula=$stateParams.cedula;
        $scope.Token=$stateParams.token;
       // console.log($scope.NombreUser)
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });
