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


	var html1 = '<div id="primeraFila" class="row fila"></div><div id="segundaFila"class="row fila"></div>';
	document.getElementById('juego').innerHTML = html1;




	for(var i = 0; i < dificultad; i++){

		var div = document.createElement('DIV');
		div.className = 'row foto';
		document.getElementById('juego').appendChild(div);
		
		for(var j = 0; j < dificultad; j++){

			var _row = document.getElementById('juego').getElementsByClassName('row')[i];
			_row.insertAdjacentHTML('beforeend','<div class="foto"><a href="#"><img src="/images/rana.jpg"></a></div>');
		}
	}

	var _fotos = document.getElementById('juego').getElementsByTagName('img');
	for(var i = 0; i < _fotos.length; i++){
		/*
		var x = 100/dificultad;

		console.log(_fotos[i].offsetWidth);
		var w = _fotos[i].offsetWidth * x;
		var h = _fotos[i].offsetHeight * x;

		//var tamanio = (w < h)? tamanio = h : tamanio = w;
		console.log(w); 
		console.log(h);

		//_fotos[i].style.width = tamanio;
		*/

		var y = window.innerHeight;
		var z = document.getElementById('header').offsetHeight;
		console.log(y);
		console.log(z);

		_fotos[i].style.width = ((window.innerWidth - 300)/dificultad) + 'px';
		_fotos[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
	}
}