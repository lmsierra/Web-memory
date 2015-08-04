'use strict';

var _tamanio;

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
	    _tamanio = this.textContent.split('X')[0];

		return false;
	});
}

document.getElementById('home').addEventListener('click', function(){
	document.getElementById('logo').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    document.getElementById('nivel').style.display = 'none';
    return false;
});
