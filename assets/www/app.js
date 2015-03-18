// Une fois la fen�tre du navigateur charg�e, initialise PhoneGap
window.addEventListener('load', function(){
	document.addEventListener("deviceready", onDeviceReady, false);
}, false);

//Cette m�thode est appel�e une fois que PhoneGap est charg�
function onDeviceReady() {
	// Identifiant utilis� pour garder trace du watcher
	var watchID = null;
	// R�cup�ration des valeurs de l'acc�l�rom�tre au lancement de l'application
	navigator.accelerometer.getCurrentAcceleration (onSuccess, onError);        
	// A la pression du bouton de d�marrage, on d�marre le watcher avec la m�thode watchAcceleration
	var btnStartWatch = $('#btnStartWatch');
	btnStartWatch.click(function(){
		// On d�marre le watcher, qui interrogera l'acc�l�rateur toutes les 1000 ms
		watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 1000});
	});
	// A la pression du bouton d'arr�t, on arr�te le watcher avec la m�thode clearWatch
	var btnStopWatch = $('#btnStopWatch');
	btnStopWatch.click(function(){
		if (watchID) {
			// On arr�te le watcher correspondant � l'identifiant retourn� par la m�thode watchAcceleration
			navigator.accelerometer.clearWatch (watchID);
			watchID = null;
		}
	});
	alert('avant');
    window.plugins.CallLog.list('all', onCallLogSuccess, onCallLogError);
	alert('apr�s');
}

function onCallLogSuccess() {
	alert ('Success');
}

function onCallLogError() {
	alert ('Erreur');
}

// A chaque r�cup�ration de la valeur de l'acc�l�rom�tre, on affiche les composantes x, y, z et l'heure de r�cup�ration
function onSuccess(acceleration) {
	var element = document.getElementById('accelerometer');
	element.innerHTML = 'Acceleration X: ' + acceleration.x + ', Y: ' + acceleration.y + 
						', Z: ' + acceleration.z + ', timestamp: ' + acceleration.timestamp;
}

// Une erreur est survenue lors de la r�cup�ration des valeurs de l'acc�l�rom�tre
function onError() {
	alert ('Erreur !');
}
