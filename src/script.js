'use strict';


/**
 * @param {EventTarget} target
 * @param {string} eventName 
 * @param {(...any) => any} callback 
 * @param {boolean | EventListenerOptions} options
 * @returns {() => void}
 */
function listen(target, eventName, callback, options) {
  target.addEventListener(eventName, callback, options);
  return () => target.removeEventListener(eventName, callback);
}


const cube = document.getElementById('cube');

// angle limit: 0 ~ 360
let cameraAngleX = 30;
let cameraAngleY = 45;

cube.style.transform = `rotateX(${360 - cameraAngleX}deg) rotateY(${cameraAngleY}deg)`;


let offsetX = 0;
let offsetY = 0;

let mouseDownPointX = 0;
let mouseDownPointY = 0;


/** @param {MouseEvent} event */
function onMouseMove({ clientX, clientY }) {
  cameraAngleY = offsetY + clientX - mouseDownPointX;
  cameraAngleX = offsetX + clientY - mouseDownPointY;

  cube.style.transform = `rotateX(${360 - cameraAngleX}deg) rotateY(${cameraAngleY}deg)`;
}



/** @param {MouseEvent} event */
function onMouseDown({ clientX, clientY }) {
  offsetX = cameraAngleX;
  offsetY = cameraAngleY;

  mouseDownPointX = clientX;
  mouseDownPointY = clientY;

  window.onmouseup = listen(window, 'mousemove', onMouseMove, { passive: true });
}


cube.addEventListener('mousedown', onMouseDown);
