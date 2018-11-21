// Element Selectors
const playButton = document.querySelector(".player__button");
const video = document.querySelector(".player__video");
const ranges = document.querySelectorAll(".player__slider");
const progressBar = document.querySelector(".progress");
const progressCurrent = document.querySelector(".progress__filled");
const skipButtons = document.querySelectorAll("[data-skip]");

// Functions
let isPlaying = false;
function togglePlay() {
  isPlaying ? (playButton.innerHTML = "►") : (playButton.innerHTML = "❚❚");
  isPlaying ? video.pause() : video.play();
  isPlaying = !isPlaying;
}

function changeRange() {
  video[this.name] = this.value;
}

function progress() {
  progressCurrent.style.flexBasis = `${(video.currentTime * 100) /
    video.duration}%`;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function timeSlider(e) {
  const sliderTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = sliderTime;
  progressCurrent.style.flexBasis = `${(sliderTime * 100) / video.duration}%`;
}

// Event Listeners
playButton.addEventListener("click", togglePlay);
ranges.forEach(e => e.addEventListener("change", changeRange));
video.addEventListener("timeupdate", progress);
video.addEventListener("click", togglePlay);
skipButtons.forEach(e => e.addEventListener("click", skip));

let mouseDown = false;
progressBar.addEventListener("mousemove", e => mouseDown && timeSlider(e));

progressBar.addEventListener("mousedown", () => (mouseDown = true));
progressBar.addEventListener("mouseup", () => (mouseDown = false));
