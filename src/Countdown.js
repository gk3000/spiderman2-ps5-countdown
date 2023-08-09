import React, { useState, useRef, useEffect } from 'react'
import Grid from 'react-easy-css-grid-layout'

const Countdown = () => {
	// We need ref in this, because we are dealing
	// with JS setInterval to keep track of it and
	// stop it when needed
	const Ref = useRef(null);

	// The state for our timer
	const [timer, setTimer] = useState('00:00:00:00');

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / 1000 / 60 / 60) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));
		return {
			total, days,  hours, minutes, seconds
		};
	}

	const startTimer = (e) => {
		let { total, days, hours, minutes, seconds }
		= getTimeRemaining(e);
		if (total >= 0) {

			// update the timer
			// check if less than 10 then we need to
			// add '0' at the beginning of the variable
			setTimer({
				days:(days > 9 ? days : '0' + days),
				hours:(hours > 9 ? hours : '0' + hours),
				minutes:(minutes > 9 ? minutes : '0' + minutes),
				seconds:(seconds > 9 ? seconds : '0' + seconds)
			}
				// (days > 9 ? days : '0' + days) + ':' + 
				// (hours > 9 ? hours : '0' + hours) + ':' +
				// (minutes > 9 ? minutes : '0' + minutes) + ':'
				// + (seconds > 9 ? seconds : '0' + seconds)
			)
		}
	}

	const clearTimer = (e) => {

		// If you adjust it you should also need to
		// adjust the Endtime formula we are about
		// to code next
		// setTimer('00:00:10');

		// If you try to remove this line the
		// updating of timer Variable will be
		// after 1000ms or 1sec
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000)
		Ref.current = id;
	}

	const getDeadTime = () => {
		let deadline = new Date("10/20/2023");

		// This is where you need to adjust if
		// you entend to add more time
		// deadline.setSeconds(deadline.getSeconds());
		return deadline;
	}

	// We can use useEffect so that when the component
	// mount the timer will start as soon as possible

	// We put empty array to act as componentDid
	// mount only
	useEffect(() => {
		clearTimer(getDeadTime());
	}, []);

	// Another way to call the clearTimer() to start
	// the countdown is via action event from the
	// button first we create function to be called
	// by the button
	// const onClickReset = () => {
	// 	clearTimer(getDeadTime());
	// }

	return (
		<Grid columns={"4"} gap={'10px'}>
		<span>{timer.days}</span>
		<span>{timer.hours}</span>
		<span>{timer.minutes}</span>
		<span>{timer.seconds}</span>
		<span>days</span>
		<span>hours</span>
		<span>minutes</span>
		<span>seconds</span>
		</Grid>
		)
}

export default Countdown;
