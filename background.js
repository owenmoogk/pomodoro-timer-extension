function audioNotification() {
	var yourSound = new Audio('alarm.mp3');
	yourSound.play();
}

function createNotification() {
	var opt = {
		type: "basic",
		title: "Pomodero Timer",
		message: "Timer Complete!",
		iconUrl: "icon.png",
		priority: 2,
		buttons: [
			{
				title: (localStorage.getItem('period') == 'Working') ? "Start Break" : "Start Working"
			},
			{
				title: 'Stop'
			}
		]
	}
	chrome.notifications.create("notificationName", opt, function () { });
}

// chrome notification button
chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex){
	if (buttonIndex == 0){
		nextSession = (localStorage.getItem('period') == 'Working') ? 'Break' : "Working"
		localStorage.setItem('period', nextSession)
		localStorage.setItem('timeLeft', (nextSession == 'Working') ? 1500 : 300)
		localStorage.setItem('lastUpdatedSecond', Math.floor(new Date() / 1000))
	}
	else{
		localStorage.setItem('timerRunning', false)
	}
})


// KEEPING TRACK OF TIME WHEN POPUP IS CLOSED

rang = true

function runInterval() {
	interval = setInterval(function () {
		updateTime()
	}, 1000)
}

function updateTime() {

	// if we are running
	if (localStorage.getItem('timerRunning')) {

		timePassed = Math.floor(new Date() / 1000) - localStorage.getItem('lastUpdatedSecond')

		// if the timer is done
		if (localStorage.getItem('timeLeft') <= timePassed){
			if (!rang){
				createNotification();
				audioNotification();
				rang = true
			}
		}
		else{
			rang = false
		}
	}
}

runInterval()