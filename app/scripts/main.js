'use strict';

var imagenes = ['aguila', 'buho' , 'camaleon', 'cangrejo', 'castor', 'cocodrilo', 'delfin', 'elefante',
 'escarabajo', 'escorpion', 'hipopotamo', 'jabali', 'jirafa', 'martin', 'mono', 'morsa', 'oso',
 'panda','pandarojo','pez','pinguinos','polar','rana','raya','rinoceronte','salamandra','sepia',
 'serpiente','tiburon','tigre','tortuga','tucan'];

var imagenAnterior = -1;
var enlaceAnterior;
var arrayImagenes;
var bloqueado = false;
var aciertos = 0;
var parejasRealizadas = 0;
var dificultad;

window.addEventListener("resize", calcularTamanio);

document.getElementById('empezarBtn').addEventListener('click', function(){
	elegirDificultad();
    return false;
});

var _opcionesDificultad = document.getElementsByClassName('dificultadBtn');
for(var i = 0; i < _opcionesDificultad.length; i++){

	_opcionesDificultad[i].addEventListener('click', function(){
	    
	    document.getElementById('juego').style.display = 'inline-block';
	    document.getElementById('cuerpo').style.display = 'none';
	    dificultad = this.textContent.split('X')[0];

	    iniciarJuego();

		return false;
	});
}

document.getElementById('home').addEventListener('click', function(){
	document.getElementById('logo').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    document.getElementById('nivel').style.display = 'none';
    return false;
});

function establecerFuncionalidad(){
	var enlaces = document.getElementsByClassName('enlace-imagen');
	
	for(var i = 0; i < enlaces.length; i++){

		enlaces[i].addEventListener('click', function(){
			
			if(!bloqueado){
				if(!this.classList.contains('activada')){
					levantarCarta(this);
					if(imagenAnterior === -1){
						imagenAnterior = arrayImagenes[this.getAttribute('data-imagen')];
						enlaceAnterior = this;
					}else{
						parejasRealizadas ++;
						if(imagenAnterior != arrayImagenes[this.getAttribute('data-imagen')]){
							bloqueado = true;
							var _this = this;
							var func = 
							setTimeout(function(){
								console.log('1');
								esconderCarta(_this);
								esconderCarta(enlaceAnterior);
								
								var f = setTimeout(function(){
									bloqueado = false;
									var _img =_this.getElementsByClassName('back')[0].getElementsByTagName('img')[0];
									var _img2 = enlaceAnterior.getElementsByClassName('back')[0].getElementsByTagName('img')[0];
									_img.src = '/images/fondo.png';
									_img2.src = '/images/fondo.png';
								}, 500);
							},1500);
						}else{
							aciertos ++;
							if(aciertos === dificultad*dificultad/2){
								alert('Total de intentos: ' + parejasRealizadas);
								reset();
							}
						}
						imagenAnterior = -1;
					}
				}
			}
			
		});
	}
}

function levantarCarta(carta){
	carta.classList.add('activada');
	var _img = carta.getElementsByClassName('back')[0].getElementsByTagName('img')[0];
	_img.src = '/images/' + arrayImagenes[carta.getAttribute('data-imagen')] + '.jpg';
	animacion(carta);
}

function esconderCarta(carta){
	carta.classList.remove('activada');
	animacion(carta);
}

function animacion(elemento){
	if(elemento.classList.contains('activada')){
		console.log('animar');
		findAncestor(elemento, 'animation_container').classList.add('animated');
	}else{
		console.log('cancelar');
		findAncestor(elemento, 'animation_container').classList.remove('animated');
	}
}

function reset(){
	parejasRealizadas = 0;
	aciertos = 0;
	elegirDificultad();
}

function elegirDificultad(){
	document.getElementById('logo').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('nivel').style.display = 'block';
    document.getElementById('cuerpo').style.display = 'inline-block';
    document.getElementById('juego').style.display = 'none';
}

function iniciarJuego(){

	arrayImagenes = new Array(dificultad*dificultad);

	for(var i = 0; i < arrayImagenes.length; i++){
		arrayImagenes[i] = -1;
	}

	var _tablero = '<div class="row">';
	var _tamanio = dificultad * dificultad;

	for(var i = 0; i < _tamanio; i++){
		generarImagen(i);
		_tablero += '<div class="animation_container">' +
						'<div class="foto">' +
							'<a href="#" data-imagen=' + i + ' class="enlace-imagen">'+
								'<div id="f1_card" class="shadow">' +
						  			'<div class="front face">' +
						    			'<img src="/images/fondo.png"/>' +
						  			'</div>' +
									'<div class="back face center">' +
						    			'<img src=""/>' +
						  			'</div>' +
								'</div>' +
							'</a>' +
						'</div>' +
					'</div>';
	}

	_tablero += "</div>";
	document.getElementById('juego').innerHTML = _tablero;

	calcularTamanio();
	establecerFuncionalidad();
}



function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function generarImagen(posicion){

	var _randomImage = Math.floor((Math.random() *1000) % (dificultad * dificultad / 2));

	while(arrayImagenes.indexOf(imagenes[_randomImage]) !== arrayImagenes.lastIndexOf(imagenes[_randomImage])){
		_randomImage = Math.floor((Math.random() *1000) % (dificultad * dificultad / 2));
	}

	arrayImagenes[posicion] = imagenes[_randomImage];
}

function calcularTamanio(){
	var _fotos = document.getElementById('juego').getElementsByTagName('img');
	var ctnr = document.getElementById('juego').getElementsByClassName('animation_container');

	for(var i = 0; i < _fotos.length; i++){
		if(i <_fotos.length/2){
			ctnr[i].style.width = ((window.innerWidth - 300)/dificultad) + 'px';
			ctnr[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
		}
		_fotos[i].style.width = ((window.innerWidth - 300)/dificultad) + 'px';
		_fotos[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
	}
}
