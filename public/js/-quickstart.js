
var XMLHttpRequest = XMLHttpRequest || 
    window.ActiveXObject && 
    function() { return new ActiveXObject('Msxml2.XMLHTTP'); };

var xmlHttp = new XMLHttpRequest;

// выполнить асинхронный запрос HTTP с помощью объекта XMLHttpRequest
function process()
{
    // получить имя, введенное пользователем в форму
    name = encodeURIComponent(document.getElementById("myName").value);
    // обратиться к сценарию quickstart.php на сервере
    xmlHttp.open("GET", "quickstart?name=" + name, true);
    // обработка ответа сервера

    xmlHttp.onreadystatechange = function() {
        if ( this.readyState !=4 ) return;

        if ( this.status != 200 ) {
            alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
            return;
        }

        var response = this.responseText;
        document.getElementById("divMessage").innerHTML =
            '<i>' + response + '</i>';
    };
    // послать асинхронный запрос серверу
    xmlHttp.send(null);
    
}

