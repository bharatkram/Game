import React, { useState } from "react";

// styling import.
import "./rps.css";

// image import
import humanVScomp_img from "./humanVScomp_img.jpg";

// function to decide the winner based on the choices.
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

// function to reset the borders of all the buttons to silver.
function silverBorder() {
	// getting all the button components with id=selection from document.
	let buttons = document.getElementsByClassName("selection");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].style.border = "2px solid silver";
	}
}

// function that computes the game after the user makes a choice.
function play(selection) {
	// dict to convert user's choice to int for internal computation.
	const dict = { rock: 0, paper: 1, scissors: 2 };
	let userSelection = dict[selection];

	// statement to make the computer choose.
	let compSelection = Math.floor(Math.random() * 3);

	// calling the decider function to know the result.
	let result = decider(userSelection, compSelection);

	// changing the look based on the result.
	if (result === 1)
		document.querySelector("#msg").innerHTML =
			"<strong style='color:green;'>You Win.</strong>";
	else if (result === 0)
		document.querySelector("#msg").innerHTML =
			"<strong style='color:orange;'>It's a draw.</strong>";
	else
		document.querySelector("#msg").innerHTML =
			"<strong style='color:red;'>You Lose.</strong>";

	// calling the function to reset the view.
	silverBorder();
	// to change the border of the selected button based on the result.
	if (result === 1)
		document.querySelector(`#${selection}`).style.border = "2px solid green";
	else if (result === 0)
		document.querySelector(`#${selection}`).style.border = "2px solid orange";
	else document.querySelector(`#${selection}`).style.border = "2px solid red";

	return result;
}

// the main function that renders the components.
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
		<div className="container centre border rounded">
			<div className="padding">
				<h1 className="grid-container">
					<p className="grid-child green">{yourScore}</p>
					<p className="grid-child red">{oppScore}</p>
				</h1>
				<div className="grid-container3child">
					<div className="grid-child child-centre player"></div>
					<div className="grid-child child-centre">
						<img
							src={humanVScomp_img}
							alt="humanVScomp"
							width="237"
							height="288"
						/>
					</div>
					<div className="grid-child child-centre computer"></div>
				</div>
				<div id="msg">
					<p>Select one to play.</p>
				</div>
				<div className="col mt-3 mb-3">
					<button
						id="rock"
						className="selection btn btn-circle btn-xl mr-5 row"
						onClick={() => handleSelection("rock")}
					>
						<i className="em em-facepunch"></i>
					</button>
					<button
						id="paper"
						className="selection btn btn-circle btn-xl mr-5 row"
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
				<button
					className="btn btn-outline-light text-dark"
					onClick={handleReset}
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default RPC;
