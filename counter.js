timerRunning = localStorage.getItem('timerRunning') ? localStorage.getItem('timerRunning') : false
timeLeft = localStorage.getItem('timeLeft') ? localStorage.getItem('timeLeft') : 1500
lastUpdatedSecond = localStorage.getItem('lastUpdatedSecond') ? localStorage.getItem('lastUpdatedSecond') : null
period = localStorage.getItem('period') ? localStorage.getItem('period') : 'Working'

window.addEventListener('load', (event) => {
	document.getElementById('button').addEventListener('click', (event) => { buttonClicked() })
	document.getElementById('button').innerHTML = timerRunning ? 'Pause' : 'Play'
	document.getElementById('reset').addEventListener('click', (event) => { resetTimer() })
	document.getElementById('period').innerHTML = period
	document.body.style.backgroundColor = (period == 'Working') ? 'lightblue' : 'pink'
	runInterval()

	updateTime()
})

function updateLocalStorage() {
	localStorage.setItem('timerRunning', timerRunning)
	localStorage.setItem('timeLeft', timeLeft)
	localStorage.setItem('lastUpdatedSecond', lastUpdatedSecond)
}

function resetTimer() {
	timeLeft = 1500
	lastUpdatedSecond = Math.floor(new Date() / 1000)
	updateLocalStorage()
}

function buttonClicked() {

	// last updated second is now
	lastUpdatedSecond = Math.floor(new Date() / 1000)

	// play or pause
	timerRunning = !timerRunning

	document.getElementById('button').innerHTML = timerRunning ? 'Pause' : 'Play'

	localStorage.setItem('timerRunning', timerRunning)
}

function changeState() {

	period = (period == 'Working') ? 'Break' : 'Working'

	document.getElementById('period').innerHTML = period
	document.body.style.backgroundColor = (period == 'Working') ? 'lightblue' : 'pink'
	timeLeft = (period == 'Working') ? 1500 : 300
	updateLocalStorage()
}

function runInterval() {
	interval = setInterval(
		function () {
			updateTime()
		}, 1000
	)
}

function updateTime() {
	// seconds is now
	seconds = Math.floor(new Date() / 1000)

	// if we are running and the time is different
	if (timerRunning && timeLeft != seconds) {

		// time left is the remaining seconds in the timer
		timeLeft = timeLeft - (seconds - lastUpdatedSecond)

		if (timeLeft < 0) {
			changeState()
		}

		// last updated now
		lastUpdatedSecond = seconds

		updateLocalStorage()

		// update dom
		timeString = ''
		timeString += Math.floor(timeLeft / 60) + ':'
		timeString += (timeLeft % 60 > 9) ? timeLeft % 60 : '0' + timeLeft % 60
		document.getElementById('time').innerHTML = timeString
	}
}