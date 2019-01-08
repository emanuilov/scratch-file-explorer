var colors = ["green", "yellow", "blue", "red", "orange", "pink"];
var opn = require('opn');
$(document).ready(function () {
	//Navigation
	$('.back-button').click(function () {
		goBack();
	});
	$('.forward-button').click(function () {
		goForwards();
	});
	//Lessons
	$('.start-button').click(function () {
		goToLessons();
	});

	$('td').click(function () {
		openLesson($(this).data('id'), $(this).find("p:last-of-type").text());
	});

	//Open file/link
	$(".content").on("click", ".sub-plate", function () {
		var action = $(this).attr('data-location');
		opn(action);
	});

	//Authors
	$("footer .right").click(function () {
		goToAuthors();
	});

	//Open author's personal page
	$(".content").on("click", ".authors li", function () {
		var link = $(this).attr('data-link');
		opn(link);
	});

	//Open bulvest page
	$(".content").on("click", ".authors img", function () {
		opn('http://www.bulvest.com/');
	});

	$("footer .left").click(function () {
		opn('http://www.bulvest.com/');
	});
});

function goToLessons() {
	hideContent(true);
	$("table").removeClass("hidden");
	updateCurrentStage(1);
}

function openLesson(folderID, lessonID) {
	if (indexedFolders[folderID] != undefined) {
		updateCurrentStage(2);
		hideContent(true);
		var lesson = $("div.content div:nth-of-type(2)");
		lesson.removeClass("hidden");
		var numbers;
		if (folderID == 26) {
			numbers = [];
		} else {
			numbers = lessonID.split('');
		}
		for (var numberID = 0; numberID < numbers.length; numberID++) {
			lesson.find(".lesson-title").append('<img src="./images/lessons/lesson-numbers/' + numbers[numberID] + '.png" alt="' + numbers[numberID] + '">');
		}
		var subPlates = lesson.find(".sub-plates");
		var subPlateCnt = 0;
		var row = '<div class="row"></div>';
		var shouldIAppendRow = true;
		indexedFolders[folderID].forEach(function (el) {
			subPlates.append('<div class="sub-plate ' + colors[subPlateCnt] + '" data-location="' + el + '">' + lessonID + '_' + (subPlateCnt + 1) + '</div>');
			subPlateCnt++;
			if (subPlateCnt >= 3 && shouldIAppendRow) {
				subPlates.append(row);
				subPlates = subPlates.find(".row");
				shouldIAppendRow = false;
			}
		});
	}
}

function goToAuthors() {
	hideContent(true);
	updateCurrentStage(3);
	$(".content div:last-of-type").removeClass("hidden");
}

function goToHome() {
	hideContent();
	$(".content div:first-of-type").removeClass("hidden");
	$("footer").removeClass("hidden");
}

function hideContent(containerSpacersDisabled) {
	var el = [$(".start-button"), $("footer"), $("table"), $(".authors"), $(".lesson")];
	el.forEach(function (el) {
		if (!el.hasClass("hidden")) {
			el.addClass("hidden");
		}
	});
	//Disable the spacer removing
	var el = $("div.content");
	if (el.hasClass("zero-padding")) {
		el.removeClass("zero-padding");
	}

	//Clear the displayed lesson
	var el = $("div.lesson .lesson-title");
	el.empty();
	el.append('<img src="./images/lessons/lesson-text.png" alt="Урок">');
	$("div.lesson .sub-plates").empty();

	if (containerSpacersDisabled) {
		var el = $("div.content");
		if (!el.hasClass("zero-padding")) {
			el.addClass("zero-padding");
		}
	}
}