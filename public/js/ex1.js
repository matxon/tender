/*
Из книги Строим сайт на AJAX
Қателері бар, кітап ұнамады, осымен бітті ары қарай оқымаймын
 для Internet Explorer: 
    var xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 
либо 
    var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
 для других браузеров: 
    var xmlHttp = new XMLHttpRequest(); 
*/

if (window.XMLHttpRequest) { 
    Request = new XMLHttpRequest(); 
} else if (window.ActiveXObject) { 
    try { 
        // IE version 1
        Request = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 
        // IE version 2
    catch (CatchException) { 
        Request = new ActiveXObject("Msxml2.XMLHTTP"); 
    } 
}

Request.onreadystatechange = function() {
    if (XMLHttpRequest.readyState == 4) {
        var response = XMLHttpRequest.responseText;
        alert(response);
    }
}
Request.open("GET", "/getlist");
Request.send("hello");
