timerRunning = localStorage.getItem('timerRunning') ? (localStorage.getItem('timerRunning') == 'true') : false
timeLeft = localStorage.getItem('timeLeft') ? localStorage.getItem('timeLeft') : 1500
lastUpdatedSecond = localStorage.getItem('lastUpdatedSecond') ? localStorage.getItem('lastUpdatedSecond') : null
period = localStorage.getItem('period') ? localStorage.getItem('period') : 'Working'

window.addEventListener('load', (event) => {
	document.getElementById('button').addEventListener('click', (event) => { buttonClicked() })
	document.getElementById('reset').addEventListener('click', (event) => { resetTimer() })
	runInterval()
	updateDom()
	updateTime()
})

function updateLocalStorage() {
	localStorage.setItem('timerRunning', timerRunning)
	localStorage.setItem('timeLeft', timeLeft)
	localStorage.setItem('lastUpdatedSecond', lastUpdatedSecond)
	localStorage.setItem('period', period)
}

function updateDom() {
	document.getElementById('period').innerHTML = period
	document.body.style.backgroundColor = (period == 'Working') ? 'lightblue' : 'pink'
	document.getElementById('button').innerHTML = timerRunning ? 'Pause' : 'Play'

	// formatting time
	timeString = ''
	timeString += Math.floor(timeLeft / 60) + ':'
	timeString += (timeLeft % 60 > 9) ? timeLeft % 60 : '0' + timeLeft % 60
	document.getElementById('time').innerHTML = timeString
}

function resetTimer() {
	timeLeft = 1500
	lastUpdatedSecond = Math.floor(new Date() / 1000)
	period = 'Working'
	updateLocalStorage()
	updateDom()
}

function buttonClicked() {

	// last updated second is now
	lastUpdatedSecond = Math.floor(new Date() / 1000)

	// play or pause
	timerRunning = !timerRunning

	updateLocalStorage()
	updateDom()
}

function changeState() {
	period = (period == 'Working') ? 'Break' : 'Working'
	timeLeft = (period == 'Working') ? 1500 : 300
	updateLocalStorage()
	updateDom()
}

function runInterval() {
	interval = setInterval(function () {
		updateTime()
	}, 1000)
}

function updateTime() {
	// seconds is now
	seconds = Math.floor(new Date() / 1000)

	// if we are running and the time is different
	if (timerRunning && (lastUpdatedSecond != seconds)) {

		// time left is the remaining seconds in the timer
		timeLeft = timeLeft - (seconds - lastUpdatedSecond)

		if (timeLeft < 0) {
			changeState()
		}

		lastUpdatedSecond = seconds

		updateLocalStorage()
		updateDom()
	}
}