var click = document.querySelector("#click");
var textarea = document.querySelector("#textarea");
var clicks = document.querySelector("#count");
var dcCount = document.querySelector("#dcCount");
var reset = document.querySelector("#reset");
var dstatus = document.querySelector(".status");
var div = document.querySelector(".container");
var c = 0;
var dc = 0;

reset.onclick = function () {
  c = 0;
  dc = 0;
  clicks.textContent = "0";
  dcCount.textContent = "0";
  textarea.value = "";
  dstatus.textContent = "Not Double Clicking";
  dstatus.classList.remove("dc");
};

var prevClickMicrotime = microtime(true);
function microtime(get_as_float) {
  //  discuss at: http://phpjs.org/functions/microtime/
  // original by: Paulo Freitas
  //   example 1: timeStamp = microtime(true);
  //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
  //   returns 1: true
  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);
  return get_as_float ? now : Math.round((now - s) * 1000) / 1000 + " " + s;
}

var prevClickMicrotime = microtime(true);

function clickEvent() {
  clickTime = microtime(true);
  diff = clickTime - prevClickMicrotime;
  if (diff <= 0.08) {
    dc++;
    dcCount.textContent = String(dc);
    dstatus.textContent = "Double Clicking";
    dstatus.classList.add("dc");
  }
  textarea.value = diff + "\n" + textarea.value;
  prevClickMicrotime = clickTime;
  c++;
  clicks.textContent = String(c);
}

function mouseClick() {
  //   var e = window.event;
  //   console.log(e.timeStamp);
  clickEvent();
  return false;
}
const body = document.querySelector(".clickBox");
body.setAttribute("onmousedown", "mouseClick();");
body.setAttribute("oncontextmenu", "return false;");

const disCount = document.querySelector(".disCount");
const disLogs = document.querySelector(".disLogs");
function toggleShowClass(checkbox, element) {
  if (checkbox.checked) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}
disCount.addEventListener("change", function () {
  const countContainer = document.querySelector(".side");
  toggleShowClass(disCount, countContainer);
});

disLogs.addEventListener("change", function () {
  const logsContainer = document.querySelector(".logs");
  toggleShowClass(disLogs, logsContainer);
});
