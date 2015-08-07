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
var intentos = 0;
var dificultad;
var initTime;
var endTime;

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

document.getElementById('salir-modal').addEventListener('click', function(){
	mostrarModal();
	reset();
	document.getElementById('logo').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    document.getElementById('nivel').style.display = 'none';
});

document.getElementById('dificultad-modal').addEventListener('click', function(){
	mostrarModal();
	reset();
	elegirDificultad();
});

document.getElementById('reintentar-modal').addEventListener('click', function(){
	mostrarModal();
	reset();
	iniciarJuego();
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
						intentos ++;
						if(imagenAnterior != arrayImagenes[this.getAttribute('data-imagen')]){
							bloqueado = true;
							var _this = this;
							var func = 
							setTimeout(function(){
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
								endTime = new Date().getTime();
								finalizar();
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
		findAncestor(elemento, 'animation_container').classList.add('animated');
	}else{
		findAncestor(elemento, 'animation_container').classList.remove('animated');
	}
}

function reset(){
	intentos = 0;
	aciertos = 0;
}

function finalizar(){
	var _modal = document.getElementById('modal');
	document.getElementById('intentos').innerHTML = intentos;
	document.getElementById('aciertos').innerHTML = aciertos;
	document.getElementById('porcentaje-aciertos').innerHTML = parseInt((aciertos / intentos)*100) + '%';
	document.getElementById('tiempo').innerHTML = calcularTiempo();
	mostrarModal();
}

function mostrarModal(){
	var _modal = document.getElementById('modal');
	_modal.style.visibility = (_modal.style.visibility === 'visible') ? 'hidden' : 'visible';
}

function calcularTiempo(){

	function dosCifras(digito) {
		return (digito<10? '0':'') + digito;
	}

	var milisegundos = endTime - initTime;

	var ms = milisegundos % 1000;
	milisegundos = (milisegundos - ms) / 1000;
	var seg = milisegundos % 60;
	milisegundos = (milisegundos - seg) / 60;
	var min = milisegundos % 60;

	return dosCifras(min) + "' " + dosCifras(seg) + "''";
}

function elegirDificultad(){
	document.getElementById('logo').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('nivel').style.display = 'block';
    document.getElementById('cuerpo').style.display = 'inline-block';
    document.getElementById('juego').style.display = 'none';
}

function iniciarJuego(){
	initTime = new Date().getTime();

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
							'<div data-imagen=' + i + ' class="enlace-imagen">'+
								'<div id="f1_card">' +
						  			'<div class="front face">' +
						    			'<img src="/images/fondo.png"/>' +
						  			'</div>' +
									'<div class="back face center">' +
						    			'<img src="/images/fondo.png"/>' +
						  			'</div>' +
								'</div>' +
							'</div>' +
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
			ctnr[i].style.width = ((document.getElementById('nivel').offsetWidth - 30)/dificultad) + 'px';
			ctnr[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
		}
		
		console.log(document.getElementById('nivel'));
		console.log(document.getElementById('nivel').offsetWidth);
		console.log(window.innerHeight - document.getElementById('header').offsetHeight - 30);
		_fotos[i].style.width = ((document.getElementById('nivel').offsetWidth - 30)/dificultad) + 'px';
		_fotos[i].style.height = ((window.innerHeight - document.getElementById('header').offsetHeight -30)/dificultad) + 'px';
	}
}
