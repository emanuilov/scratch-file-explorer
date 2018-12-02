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
		if (!unixSlashes(next).includes('desktop.ini')) {
			indexedFolders[currentFolderID].push(unixSlashes(next));
		}
	}
}

fs.readdir(dir, function (err, folders) {
	var collator = new Intl.Collator(undefined, {
		numeric: true,
		sensitivity: 'base'
	});
	folders.sort(collator.compare);
	folders.push(folders.shift());
	$(document).ready(function () {
		for (var folderID = 0; folderID < folders.length; folderID++) {
			var rowID = getRowID(folderID);
			var box = $('.content table tr:nth-of-type(' + rowID + ') td:nth-of-type(' + getColumnID(folderID, rowID) + ')');
			box.attr("data-id", folderID);
			box.append(getBoxLabel(folderID, folders[folderID]));
			crawl(dir + '/' + folders[folderID], folderID);
		}
	});
	console.log(indexedFolders);
});

function getBoxLabel(folderID, folderName) {
	if (folderID < 26) {
		var textRows = folderName.split(' ');
		return "<p>" + textRows[0] + "</p>" + "<p>" + textRows[1] + "</p>";
	} else {
		return "<p>" + folderName + "</p>";
	}
}

function getRowID(folderID) {
	switch (true) {
		case folderID < 6:
			return 1;
		case folderID < 12:
			return 2;
		case folderID < 18:
			return 3;
		case folderID < 24:
			return 4;
		case folderID < 28:
			return 5;
	}
}

function getColumnID(folderID, rowID) {
	if (rowID > 1) {
		return folderID + 1 - (rowID - 1) * 6;
	} else {
		return folderID + 1;
	}
}