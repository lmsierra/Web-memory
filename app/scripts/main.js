'use strict';

(function init() {

    var _logoButtons = [];
    _logoButtons = document.getElementById('logo').getElementsByTagName('button');

    for (var i = 0; i < _logoButtons.length; i++) {
        _logoButtons[i].addEventListener('click', function() {
            $("#logo").hide();
            $("#header").show();
            $("#nivel").show();
        });
    }
}());

$("#header").on('click', 'a', function() {
    $("#logo").show();
    $("#header").hide();
    $("#nivel").hide();
    return false;
});

$("#cuerpo").on('click', 'button', function() {
    $("#cuerpo").hide();
    alert($(this).text());
    console.log($("button"));
    return false;
});
