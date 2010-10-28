#!/usr/bin/env python
# This is a really very simple script.
# GNU GPL (v2 only)

import zipfile
from os import remove

try:

	print "Creating skffext.jar.."
	file = zipfile.ZipFile("skffext.jar", "w")
	file.write("src/chrome/content/skffext/contents.rdf", "content/skffext/contents.rdf", zipfile.ZIP_DEFLATED)
	file.write("src/chrome/content/skffext/skffextOverlay.js", "content/skffext/skffextOverlay.js", zipfile.ZIP_DEFLATED)
	file.write("src/chrome/content/skffext/skffextOverlay.xul", "content/skffext/skffextOverlay.xul", zipfile.ZIP_DEFLATED)
	file.close()

	print "Creating skffext.xpi.."
	file = zipfile.ZipFile("skffext.xpi", "w")
	file.write("src/install.rdf", "install.rdf", zipfile.ZIP_DEFLATED)
	file.write("src/chrome.manifest", "chrome.manifest", zipfile.ZIP_DEFLATED)
	file.write("skffext.jar", "chrome/skffext.jar", zipfile.ZIP_DEFLATED)
	file.close()

	print "Removing skffext.jar.."
	remove("skffext.jar")
except KeyboardInterrupt:
	print "Aborted"
