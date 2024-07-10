

app=angular.module('webApp',['ngRoute','web','web2']);
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'log/signin.html',
        controller: 'ctrin'
  
    })
    .when('/log/signin',{
        templateUrl: 'log/signin.html',
        controller: 'ctrup'
       
    })
	.when('/log/signup',{
        templateUrl: 'log/signup.html',
        controller: 'ctrin'
    })

    .otherwise({
        redirectTo:'/'
    });
});
// sign in
app1=angular.module('web',[]);
app1.controller('ctrin', ['$scope','$window', function($scope,$window) {
    // Fonction pour connecter un utilisateur
    $scope.signIn = function() {
        // Utiliser le service Firebase Authentication pour se connecter avec email et mot de passe
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function() {
              
                console.log("Utilisateur connecté avec succès !");
                $window.location.href = '/angulaireJS/app/index.html';
            })
            .catch(function(error) {
                alert("Email ou mot de passe incorrect.");
            });
    };
    $scope.a="3alah";
}]);
// sign up
app2=angular.module('web2',[]);
app2.controller('ctrup', ['$scope', function($scope) {
    $scope.signUp = function() {
        // Utiliser le service Firebase Authentication pour se connecter avec email et mot de passe
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
            .then(function() {

                alert("Utilisateur cree avec succes !");
            })
            .catch(function(error) {
                alert("Erreur de S'inscription");
            });
    };
    $scope.a="3alah";
}]);