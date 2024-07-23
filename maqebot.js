const robot = {
  x: 0,
  y: 0,
  direction: "North",
};

const FORMULAR = {
  North: {
    axis: "y",
    factor: 1,
    R: "East",
    L: "West",
  },
  East: {
    axis: "x",
    factor: 1,
    R: "South",
    L: "North",
  },
  South: {
    axis: "y",
    factor: -1,
    R: "West",
    L: "East",
  },
  West: {
    axis: "x",
    factor: -1,
    R: "North",
    L: "South",
  },
};

const command = process.argv.at(-1);
let distance = [];

for (i = 0; i < command.length; i++) {
  const c = command[i].toUpperCase();

  if (c === "R" || c === "L") {
    if (distance.length > 0) {
      const totalDistance = calculateDistance(distance);
      const { axis, factor } = FORMULAR[robot.direction];
      robot[axis] += totalDistance * factor;
    }

    const newDirection = FORMULAR[robot.direction][c];
    robot.direction = newDirection;
    distance = [];
  } else if (c === "W") {
    if (distance.length > 0) {
      const totalDistance = calculateDistance(distance);
      const { axis, factor } = FORMULAR[robot.direction];
      robot[axis] += totalDistance * factor;
    }

    distance = [];
  } else if (/\d/.test(c) && i) {
    distance.push(c);
    const isLatestCommand = i === command.length - 1;

    if (isLatestCommand) {
      const totalDistance = calculateDistance(distance);
      const { axis, factor } = FORMULAR[robot.direction];

      robot[axis] += totalDistance * factor;
    }
  }
}

function calculateDistance(arrDistance) {
  let totalDistance = 0;

  for (const [index, value] of arrDistance.entries()) {
    totalDistance += value * Math.pow(10, distance.length - 1 - index);
  }

  return totalDistance;
}

console.log(robot);
