import React, { useState } from "react";

import "./rpc.css";

function decider(userSelection, compSelection) {
	// if both choose the same option.
	if (userSelection === compSelection) return 0;
	// when the difference is 1, the greater one wins.
	if (Math.abs(userSelection - compSelection) === 1)
		if (userSelection > compSelection) return 1;
		else return -1;
	// the one who chose rock wins.
	return userSelection === 0 ? 1 : -1;
}

function silverBorder() {
	let buttons = document.getElementsByClassName("selection");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].style.border = "2px solid silver";
	}
}

function play(selection) {
	// console.log(selection);
	const dict = { rock: 0, paper: 1, scissors: 2 };
	let userSelection = dict[selection];
	let compSelection = Math.floor(Math.random() * 3);

	// console.log(userSelection, compSelection);
	let result = decider(userSelection, compSelection);

	// console.log(result);
	if (result === 1)
		document.querySelector("#msg").innerHTML =
			"<strong style='color:green;'>You Win.</strong>";
	else if (result === 0)
		document.querySelector("#msg").innerHTML = "<p>It's a draw.</p>";
	else document.querySelector("#msg").innerHTML = "<p>You Lose.</p>";

	silverBorder();
	if (result === 1)
		document.querySelector(`#${selection}`).style.border = "2px solid green";
	else if (result === 0)
		document.querySelector(`#${selection}`).style.border = "2px solid orange";
	else document.querySelector(`#${selection}`).style.border = "2px solid red";

	return result;
}

function RPC() {
	const [yourScore, setYourScore] = useState(0);
	const [oppScore, setOppScore] = useState(0);

	const handleSelection = (selection) => {
		let result = play(selection);
		if (result > 0) setYourScore(yourScore + 1);
		else if (result < 0) setOppScore(oppScore + 1);
	};

	const handleReset = () => {
		setYourScore(0);
		setOppScore(0);
		document.getElementById("msg").innerHTML = "Select one to play.";
		silverBorder();
	};

	return (
		<div className="container border rounded">
			<h2>Your Score:{yourScore}</h2>
			<h2>Opponents Score:{oppScore}</h2>
			<div id="msg">
				<p>Select one to play.</p>
			</div>
			<div className="col mt-5 mb-5">
				<button
					id="rock"
					className="selection btn btn-circle btn-xl row"
					onClick={() => handleSelection("rock")}
				>
					<i className="em em-facepunch"></i>
				</button>
				<button
					id="paper"
					className="selection btn btn-circle btn-xl row"
					onClick={() => handleSelection("paper")}
				>
					<i className="em em-raised_hand_with_fingers_splayed"></i>
				</button>
				<button
					id="scissors"
					className="selection btn btn-circle btn-xl row"
					onClick={() => handleSelection("scissors")}
				>
					<i className="em em-v"></i>
				</button>
			</div>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
}

export default RPC;
