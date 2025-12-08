const container = document.getElementById("slider-container");
const slider = document.getElementById("slider");
const beforeVideo = document.getElementById("before-video");
const afterVideo = document.getElementById("after-video");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const beforeUpload = document.getElementById("before-upload");
const afterUpload = document.getElementById("after-upload");
const controls = document.getElementById("controls");

let isDragging = false;
let inactivityTimer;
// Hide controls after inactivity
function hideControls() {
	controls.classList.add("hidden");
}

function showControls() {
	controls.classList.remove("hidden");
	clearTimeout(inactivityTimer);
	inactivityTimer = setTimeout(hideControls, 2000);
}

// Show controls on mouse move or interaction
container.addEventListener("mousemove", showControls);
container.addEventListener("mouseenter", showControls);
container.addEventListener("click", showControls);
container.addEventListener("touchstart", showControls);

function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	}
}

document.addEventListener("keydown", function (event) {
	if (event.key == "f" || event.ey == "F") {
		fullscreen();
	}
});

// Sync video playback
function syncVideos() {
	afterVideo.currentTime = beforeVideo.currentTime;
}

beforeVideo.addEventListener("play", () => afterVideo.play());
beforeVideo.addEventListener("pause", () => afterVideo.pause());
beforeVideo.addEventListener("seeked", syncVideos);

// Play/Pause controls
playBtn.addEventListener("click", () => {
	beforeVideo.play();
	afterVideo.play();
});

pauseBtn.addEventListener("click", () => {
	beforeVideo.pause();
	afterVideo.pause();
});

// Slider functionality
function updateSlider(x) {
	const rect = container.getBoundingClientRect();
	let position = ((x - rect.left) / rect.width) * 100;
	position = Math.max(0, Math.min(100, position));

	slider.style.left = position + "%";
	afterVideo.style.clipPath = `inset(0 0 0 ${position}%)`;
}

slider.addEventListener("mousedown", () => {
	isDragging = true;
});

container.addEventListener("mousemove", (e) => {
	if (isDragging) {
		updateSlider(e.clientX);
	}
});

document.addEventListener("mouseup", () => {
	isDragging = false;
});

container.addEventListener("click", (e) => {
	if (e.target.tagName !== "BUTTON") {
		updateSlider(e.clientX);
	}
});

// Touch support
slider.addEventListener("touchstart", (e) => {
	isDragging = true;
	e.preventDefault();
});

container.addEventListener("touchmove", (e) => {
	if (isDragging) {
		updateSlider(e.touches[0].clientX);
	}
});

document.addEventListener("touchend", () => {
	isDragging = false;
});
