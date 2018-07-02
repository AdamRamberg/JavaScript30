const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen__button');

const togglePlay = () => video.paused ? video.play() : video.pause();

const updateButton = () => toggle.textContent = video.paused ? '►' : '❚ ❚';

const skip = (time) => video.currentTime += parseFloat(time);

const handleRangeUpdate = (value, name) => video[name] = value;

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

const toggleFullscreen = () => screenfull.enabled && screenfull.toggle(player);

document.body.onkeyup = (e) => e.keyCode === 32 && togglePlay();

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', () => skip(button.dataset.skip)));

ranges.forEach(range => range.addEventListener('change', () => handleRangeUpdate(range.value, range.name)));
ranges.forEach(range => range.addEventListener('mousemove', () => range.dataset.mousedown == 'true' && handleRangeUpdate(range.value, range.name)));
ranges.forEach(range => range.addEventListener('mousedown', () => range.dataset.mousedown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => range.dataset.mousedown = false));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progress.dataset.mousedown == 'true' && scrub(e));
progress.addEventListener('mousedown', () => progress.dataset.mousedown = true);
progress.addEventListener('mouseup', () => progress.dataset.mousedown = false);

fullscreen.addEventListener('click', toggleFullscreen);