const START_DIAMETER=10, END_DIAMETER = 100;
const START_VALUE=1, END_VALUE = 10;
export const CONTAINER_WIDTH = 450, CONTAINER_HEIGHT = 550;
export const MIN_SPEED = 10, MAX_SPEED = 100;

const createRandomDiameter = () => {
	return parseInt(START_DIAMETER + Math.random()*(END_DIAMETER-START_DIAMETER));
}

const createRandomLeft = (diameter) => {
	return parseInt(Math.random()*(CONTAINER_WIDTH-diameter));		
}

let id = 0;
export const createNewDot = () => {
	let diameter = createRandomDiameter();
	id++;
	return {
			id,
			left: createRandomLeft(diameter),
			diameter,
			top : 0,
			value : getDotsValue(diameter)
		}
}

export const getDotsValue = (diameter) => {
	return parseInt(START_VALUE + 
		( ((END_DIAMETER - diameter)*(END_VALUE-START_VALUE)) / (END_DIAMETER-START_DIAMETER) )
	);
}