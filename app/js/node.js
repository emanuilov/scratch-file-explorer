var os = require("os"),
	fs = require("fs"),
	path = require("path"),
	process = require("process"),
	dir = "C:/Program Files/Bulvest2000/Уроци",
	indexedFolders = {};
if (!fs.existsSync(dir)) {
	dir = "C:/Program Files (x86)/Bulvest2000/Уроци";
}

function unixSlashes(input) {
	const isExtendedLengthPath = /^\\\\\?\\/.test(input);
	const hasNonAscii = /[^\u0000-\u0080]+/.test(input);

	if (isExtendedLengthPath || hasNonAscii) {
		return input;
	}

	return input.replace(/\\/g, "/");
}

function crawl(dir, currentFolderID) {
	var files = fs.readdirSync(dir);
	for (var x in files) {
		var next = path.join(dir, files[x]);
		if (indexedFolders[currentFolderID] == undefined) {
			indexedFolders[currentFolderID] = [];
		}
		indexedFolders[currentFolderID].push(unixSlashes(next));
	}
}

for (var currentFolderID = 1; currentFolderID <= 30; currentFolderID++) {
	var directoryToLookUp = dir + "/Урок " + currentFolderID + "/";
	if (fs.existsSync(directoryToLookUp)) {
		crawl(directoryToLookUp, currentFolderID);
	}
}