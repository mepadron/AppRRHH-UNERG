angular.module('starter.controllers', [ 'angular.filter' ])

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
    .controller('PlaylistsCtrl', function($scope,$state,$timeout,$http,$stateParams,$httpParamSerializerJQLike) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
        $scope.logo='img/UNERG.jpg';
        $scope.NombreUser=$stateParams.user;
        $scope.ApellidoUser=$stateParams.ape;
        $scope.Cedula=$stateParams.cedula;
        $scope.Token=$stateParams.token;
        //$scope.year= $httpParamSerializerJQLike($scope.Year);
        $scope.listOfOptions = ['2015', '2016', '2017'];
        // console.log($scope.NombreUser)

        $scope.doYear=function(){
            //console.log(dataYear);
            // alert(this.Year);
            console.log($scope.NombreUser+" "+ $scope.ApellidoUser+" "+$scope.Cedula+" "+$scope.Token+" "+this.Year);
            $state.go('app.recibosAll',{cedula:$scope.Cedula,token:$scope.Token,year:this.Year});
        };


    })

    .controller('recibosAllCtrl', function($scope, $stateParams,$http) {
        $scope.dataRecibos=[];
        $scope.byTime = [];
        $http.get("http://rrhh.unerg.edu.ve/movil/recibos/"+$stateParams.cedula+"/"+$stateParams.token+"/"+$stateParams.year)
            .success(function(response){
                if (response.status=="success"){
                    var hasta=0;
                    //console.log(response);
                    //console.log(response.data);
                    //console.log(response.data.Nomina[0].hasta);
                    //console.log(response.data.Nomina.length);
                    //console.log(response.data.User);
                    //var dataRecibos = angular.toJson(response);
                    //$state.go('app.recibosAll',{r:response});
                    $scope.dataRecibos=response;
                    /*for (var i=0;i<=response.data.Nomina.length;i++){
                    //console.log(response.data.Nomina[i].hasta);
                        console.log(response.data.Nomina[i].hasta);
                        var obj = response.data.Nomina[i];
                        for (var key in obj){
                            var value = obj[key];
                             console.log( key + ": " + value);
                        }
                    }*/
                    Array.prototype.groupBy = function(prop) {
                        return this.reduce(function(groups, item) {
                            var val = item[prop];
                            groups[val] = groups[val] || [];
                            groups[val].push(item);
                            return groups;
                        },{});
                    };
                    $scope.byTime = response.data.Nomina.groupBy('hasta');
                    console.log($scope.byTim);
                    /*angular.forEach($scope.dataRecibos.Nomina, function(value, key){
                        console.log(key + ': ' + value);
                    });*/
                }

            }).error(function(data, status, headers, config) {
                // handle error things
                console.error(data,status);
            });
    });
