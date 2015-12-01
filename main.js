// Cotrola las rutas, es el nucleo de la aplicacion
// 1. Creo el modulo router que hace uso del modulo ngRoute
var router = angular.module('routerApp', ['firebase', 'ngRoute', 'forms'])

// Configuración de las rutas
router.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'login.html',
			controller 	: 'loginCtrl'
		})
		.when('/registro', {
			templateUrl : 'registro.html',
			controller 	: 'registroCtrl'
		})
		.when('/dashboard', {
			templateUrl : 'acciones.html', // aca debe de redirigir al dashboard
			controller  : 'dashboardCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// --------------------------------------- Controladores--------------------------------------
// url de la BD en Firebase: rentas.firebaseIO.com 
// 1. Controlador del Login
router.controller('loginCtrl', function($scope, $firebaseAuth, $location) {
	var firebaseRef = new Firebase('https://rentas.firebaseIO.com')
	var autenticacion = $firebaseAuth(firebaseRef) // Objeto firebaseAuth proporcionado por firebase
	$scope.user = {}

	//Funcion para logear Usuarios
	$scope.login = function(e) {
		e.preventDefault()
		var username = $scope.user.email
		var password = $scope.user.password
		autenticacion.$authWithPassword({
			email : username,
			password : password
		}).then(function(datos_autenticacion) {
			console.log("EXITO",datos_autenticacion)
		}).catch(function(error) {
			console.log("ERROR", error)
		});

	}

	//funcion para autenticacion federada
	$scope.auth_federada = function(red_social) {
				
		autenticacion.$authWithOAuthPopup(red_social)
			.then(function(datos_autenticacion) {
				console.log("EXITO AL AUTENTICAR CON "+red_social+"",datos_autenticacion)
			})
			.catch(function(error) {
				console.log("ERROR AL AUTENTICAR CON "+red_social+"",error)
			})
		
	}
});

//2. Controlador de registro de usuarios
router.controller('registroCtrl', function($scope, $firebaseObject) {
	var firebaseRef = new Firebase('https://rentas.firebaseIO.com')
	$scope.usuarios_registrados = $firebaseObject(firebaseRef.child('usuarios'))//aca obtengo los usuarios que tengo en firebase
	console.log('Usuarios Registrados',$scope.usuarios_registrados)
	// $scope.hola_mundo = 'Hola Registro'
	// console.log($scope.hola_mundo)
	// controller-body
});

//3. Controlador del Dashboard
router.controller('dashboardCtrl', function($scope) {

});