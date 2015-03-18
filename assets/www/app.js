// Une fois la fenêtre du navigateur chargée, initialise PhoneGap
window.addEventListener('load', function(){
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

//Cette méthode est appelée une fois que PhoneGap est chargé
function onDeviceReady() {
	// Identifiant utilisé pour garder trace du watcher
	var watchID = null;
	// Récupération des valeurs de l'accéléromètre au lancement de l'application
	navigator.accelerometer.getCurrentAcceleration (onSuccess, onError);        
	// A la pression du bouton de démarrage, on démarre le watcher avec la méthode watchAcceleration
	var btnStartWatch = $('#btnStartWatch');
	btnStartWatch.click(function(){
		// On démarre le watcher, qui interrogera l'accélérateur toutes les 1000 ms
		watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 1000});
	});
	// A la pression du bouton d'arrêt, on arrête le watcher avec la méthode clearWatch
	var btnStopWatch = $('#btnStopWatch');
	btnStopWatch.click(function(){
		if (watchID) {
			// On arrête le watcher correspondant à l'identifiant retourné par la méthode watchAcceleration
			navigator.accelerometer.clearWatch (watchID);
			watchID = null;
		}
	});
	alert('avant');
    window.plugins.CallLog.list('all', onCallLogSuccess, onCallLogError);
	alert('après');
}

function onCallLogSuccess() {
	alert ('Success');
}

function onCallLogError() {
	alert ('Erreur');
}

// A chaque récupération de la valeur de l'accéléromètre, on affiche les composantes x, y, z et l'heure de récupération
function onSuccess(acceleration) {
	var element = document.getElementById('accelerometer');
	element.innerHTML = 'Acceleration X: ' + acceleration.x + ', Y: ' + acceleration.y + 
						', Z: ' + acceleration.z + ', timestamp: ' + acceleration.timestamp;
}

// Une erreur est survenue lors de la récupération des valeurs de l'accéléromètre
function onError() {
	alert ('Erreur !');
}
