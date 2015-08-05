'use strict';

document.getElementById('empezarBtn').addEventListener('click', function(){
	document.getElementById('logo').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('nivel').style.display = 'block';
    document.getElementById('cuerpo').style.display = 'inline-block';
    return false;
});

var _opcionesDificultad = document.getElementsByClassName('dificultadBtn');
for(var i = 0; i < _opcionesDificultad.length; i++){

	_opcionesDificultad[i].addEventListener('click', function(){
	    
	    document.getElementById('cuerpo').style.display = 'none';
	    var _dificultad = this.textContent.split('X')[0];

	    iniciarJuego(_dificultad);

		return false;
	});
}

document.getElementById('home').addEventListener('click', function(){
	document.getElementById('logo').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    document.getElementById('nivel').style.display = 'none';
    return false;
});

function iniciarJuego(dificultad){


	document.getElementById('juego').innerHTML = "";

	for(var i = 0; i < dificultad; i++){

		var _div = "<div class='row'></div>";
		document.getElementById('juego').innerHTML = document.getElementById('juego').innerHTML + _div;
		
		for(var j = 0; j < dificultad; j++){

			var _row = document.getElementById('juego').getElementsByClassName('row')[i];

			_row.innerHTML = _row.innerHTML + '<div class="foto"><a href="#"><img src="/images/fondo.png"/></a></div>';
		}
	}

	var _fotos = document.getElementById('juego').getElementsByTagName('img');

	for(var i = 0; i < _fotos.length; i++){

		_fotos[i].style.width = ((window.innerWidth - 300)/dificultad) + 'px';
		_fotos[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
	}
}