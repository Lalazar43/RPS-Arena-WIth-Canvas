let canvas = document.querySelector("canvas");
let rockImg = document.getElementById("Rock");
let scissorsImg = document.getElementById("Scissors");
let paperImg = document.getElementById("Paper");
let restartButton = document.getElementById("restartButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

let arrayRocks, arrayScissors, arrayPaper, animationFrameId;

const initializeGame = () => {
  restartButton.style.display = "none";
  arrayRocks = [];
  arrayScissors = [];
  arrayPaper = [];

  for (let i = 0; i < 20; i++) {
    arrayRocks.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() + 0.5,
      img: rockImg,
      type: "R",
    });
  }
  for (let i = 0; i < 20; i++) {
    arrayScissors.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() + 0.5,
      img: scissorsImg,
      type: "S",
    });
  }
  for (let i = 0; i < 20; i++) {
    arrayPaper.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() + 0.5,
      img: paperImg,
      type: "P",
    });
  }
};

const animation = () => {
  animationFrameId = requestAnimationFrame(animation);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  let rockCount = 0;
  let scissorsCount = 0;
  let paperCount = 0;
  const allObjects = [...arrayRocks, ...arrayScissors, ...arrayPaper];
  allObjects.forEach((obj) => {
    ctx.beginPath();

    if (obj.type === "R") {
      rockCount += 1;
    } else if (obj.type === "S") {
      scissorsCount += 1;
    } else {
      paperCount += 1;
    }
    ctx.drawImage(obj.img, obj.x, obj.y, 35, 35);

    let target = null;
    let minDistance = Infinity;
    allObjects.forEach((other) => {
      if (
        (obj.type === "R" && other.type === "S") ||
        (obj.type === "S" && other.type === "P") ||
        (obj.type === "P" && other.type === "R")
      ) {
        let distance = Math.hypot(other.x - obj.x, other.y - obj.y);
        if (distance < minDistance) {
          minDistance = distance;
          target = other;
        }
      }
    });

    if (target) {
      let angle = Math.atan2(target.y - obj.y, target.x - obj.x);
      obj.x += Math.cos(angle) * obj.speed;
      obj.y += Math.sin(angle) * obj.speed;
    }

    if (target && Math.hypot(target.x - obj.x, target.y - obj.y) < 25) {
      target.type = obj.type;
      target.img = obj.img;
    }
  });

  ctx.font = "15px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Rock amount: ${rockCount}`, 20, 20);
  ctx.fillText(`Scissors amount: ${scissorsCount}`, 20, 50);
  ctx.fillText(`Paper amount: ${paperCount}`, 20, 80);

  if (rockCount === 60) {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Rocks Win!", window.innerWidth / 2 - 150, window.innerHeight / 2 - 50);
    restartButton.style.display = "block";
  }else if (scissorsCount === 60) {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Scissors Win!", window.innerWidth / 2 - 150, window.innerHeight / 2 - 50);
    restartButton.style.display = "block";
  }else if (paperCount === 60) {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Paper Win!", window.innerWidth / 2 - 150, window.innerHeight / 2 - 50);
    restartButton.style.display = "block";
  }
};

restartButton.addEventListener("click", () => {
  initializeGame();
  animation();
});

initializeGame();
animation();
