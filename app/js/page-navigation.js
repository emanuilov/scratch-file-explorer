var lessonID = 1;
var stages = { "0": true, "1": false, "2": false, "3": false };

function updateCurrentStage(current) {
	for (var i = 0; i <= 3; i++) {
		stages[i] = false;
	}
	if (current == 2) {
		stages[current] = [lessonID];
	} else {
		stages[current] = true;
	}
}

function goForwards() {
	for (var i = 0; i <= 3; i++) {
		if (stages[i] != false) {
			var key = i + 1;
			var nextEl = stages[key];
			if (nextEl != undefined && key != 2) {
				goToStage(key);
			} else if (key == 2) {
				goToStage(lessonID);
			}
			break;
		}
	}
}

function goBack() {
	for (var i = 0; i <= 3; i++) {
		if (stages[i] != false) {
			var key = i - 1;
			var prevEl = stages[key];
			if (prevEl != undefined && key != 2) {
				goToStage(key);
			} else if (key == 2) {
				goToStage(lessonID);
			}
			break;
		}
	}
}

function goToStage(stageID) {
	switch (stageID) {
		case 0:
			goToHome();
			break;
		case 1:
			goToLessons();
			break;
		case 3:
			goToAuthors();
			break;
		default:
			openLesson(stageID[0]);
			break;
	}
}