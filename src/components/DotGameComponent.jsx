import React, {useState, useEffect} from 'react';
import ReactDOM from  "react-dom";
import {createNewDot, CONTAINER_WIDTH, CONTAINER_HEIGHT, MIN_SPEED, MAX_SPEED} from "../utilities.js";


let timerId;
const DotGameComponent = () => {
	
	let [playGame, setPlayGame] = useState(false);
	let [dots, setDots] = useState([createNewDot()]);
	let [speed, setSpeed] = useState(50);
	let [score, setScore] = useState(0);
	let [gameFinished, setGameFinished] = useState(false);
	
	useEffect(()=>{

		let hasAnyDotReachedBottom;

		const checkIfDotReachedBottom = (obj, moveDownBy) => {
			return obj.top + obj.diameter + moveDownBy >= CONTAINER_HEIGHT
		}

		const updateDotsPosition = () => {
			let moveDownBy = speed*1;
			return dots.map((obj)=>{
				let newObj = Object.assign({},obj);
				if(checkIfDotReachedBottom(newObj, moveDownBy)){
					newObj.top = CONTAINER_HEIGHT - obj.diameter;
					hasAnyDotReachedBottom = (obj.diameter != 0); // Check to see if dot that has reached bottom should not be of = 0 diameter.
				}
				else{
					newObj.top = obj.top + moveDownBy;
				}
				return newObj;
			})
		}


		if(playGame){
			timerId = setTimeout(()=>{	
				hasAnyDotReachedBottom = false;			
				let updatedDots = updateDotsPosition();
				
				if(hasAnyDotReachedBottom){
					// For batching multiple setState statements in async timeout function. This will save unnecessary renders !
					ReactDOM.unstable_batchedUpdates(()=>{
						setPlayGame(false);
						setGameFinished(true);
					})
				}
				else{
					updatedDots = [...updatedDots, createNewDot()];
					setDots(updatedDots);
				}
			},1000);
		}
		else{
			clearTimeout(timerId);
		}

	},[playGame, speed, dots])


	const burstDot = (obj,e) => {
		if(playGame){
			let alteredDots = [...dots];
			alteredDots.forEach((dObj)=>{
				if(dObj.id == obj.id){
					dObj.diameter = 0;
				}
			})

			clearTimeout(timerId);
			setDots(alteredDots);
			setScore((prevScore)=>prevScore+obj.value);
		}
	}


	const playPauseGame = () => {
		let newGameState = !playGame;
		if(newGameState && gameFinished){
			setDots([]);
			setScore(0);
			setGameFinished(false);
		}
		setPlayGame(newGameState)
	}


	const changeSpeed = (e) => {
		clearTimeout(timerId);
		setSpeed(parseInt(e.target.value));
	}

	return (
		<div className="project">
			<div className="controls-section">
				<div className="score-and-start">
					<div className="score">Your Score: {score}</div>
					<button type="button" onClick={playPauseGame}>{`${playGame && "PAUSE" || "PLAY"}`}</button>
				</div>
				
				<input type="range" min={MIN_SPEED} max={MAX_SPEED} value={speed} onInput={changeSpeed}/>
				<div>Speed</div>				
			</div>
			
			<div className="game-container" style={{width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT}}>
				{dots.map((obj,index)=>{
					let dotStyle = {
						left : obj.left+"px",
						top : obj.top+"px",
						width : obj.diameter+"px",
						height : obj.diameter+"px"
					}
					return (
						<div className="dots" key={index} style={dotStyle} onClick={burstDot.bind(null,obj)}>
							
						</div>
					)
				})}
			</div>
		</div>
	)	
}


export default DotGameComponent;