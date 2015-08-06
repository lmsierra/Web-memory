'use strict';

var imagenes = ['aguila', 'buho' , 'camaleon', 'cangrejo', 'castor', 'cocodrilo', 'delfin', 'elefante',
 'escarabajo', 'escorpion', 'hipopotamo', 'jabali', 'jirafa', 'martin', 'mono', 'morsa', 'oso',
 'panda','pandarojo','pez','pinguinos','polar','rana','raya','rinoceronte','salamandra','sepia',
 'serpiente','tiburon','tigre','tortuga','tucan'];

var _click = [];
var _mostrado = -1;

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

	var _apariciones = new Array(imagenes.length);

	for(var i = 0; i < _apariciones.length; i++){
		_apariciones[i] = 0;
	}

	var _tablero = "<div class='row'>";
	var _tamanio = dificultad * dificultad;

	for(var i = 0; i < _tamanio; i++){
		_tablero += '<div class="foto"><a href="#"><img class="imagen" src="/images/' +
		 imagenes[generarImagen(_apariciones, dificultad)] + 
		 '.jpg"/><img class="fondo" src="/images/fondo.png"></a></div>'
	}

	_tablero += "</div>";
	document.getElementById('juego').innerHTML = _tablero;

	var _fotos = document.getElementById('juego').getElementsByTagName('img');

	for(var i = 0; i < _fotos.length; i++){

		_fotos[i].style.width = ((window.innerWidth - 300)/dificultad) + 'px';
		_fotos[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
	}

	jugar();
}

function generarImagen(apariciones, dificultad){

	var _random = Math.floor((Math.random() *1000) % (dificultad * dificultad / 2));

	while(apariciones[_random] > 1){
		_random = Math.floor((Math.random() *1000) % (dificultad * dificultad / 2));
	}

	apariciones[_random] ++;
	return _random;
}

function jugar (){
	
	_click = document.getElementsByClassName('foto');

	for(var i = 0; i < _click.length; i++){

		_click[i].addEventListener('click', function(){
			
			comprobarPulsados();

		    this.getElementsByClassName('fondo')[0].style.display = 'none';
			this.getElementsByClassName('imagen')[0].style.display = 'inline-block';

			return false;
		});
	}
}