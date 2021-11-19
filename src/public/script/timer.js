let time = 3*60;
let tempTime = time;
let left_pie = document.querySelector('.timer-pie-left');
let right_pie = document.querySelector('.timer-pie-right');
let pie = document.querySelector('.timer-pie');
let timerHtml = document.querySelector('.timer-shadow');
function progressCircle() {
    let timeLeft = tempTime - time;
    let percent = timeLeft / tempTime;
    if(percent > 0.5) {
        right_pie.style.display = "none";
        pie.classList.add('hide-left');
    }
    else {
        pie.classList.remove('hide-left');
        right_pie.style.display = "block";
    }
    let deg = -(360 * percent);
    left_pie.style.transform = `rotate(${deg}deg)`;
}
function countDown() {
    if(time > 0){
        time--;
        let minutes = String(Math.floor(time / 60)).padStart(2, '0');
        let seconds = String(time % 60).padStart(2, '0');
        let timer = `${minutes} : ${seconds}`;
        timerHtml.innerHTML = timer;
        progressCircle();
    }
}
setInterval(countDown, 1000);