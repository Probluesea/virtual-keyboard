import keysArr from "./keys.js";
import generateDOM from "./generateDOM.js";
import animateKey from "./animateKey.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  generateDOM(keysArr);
  const keys = document.querySelectorAll(".key");

  document.addEventListener("keydown", (e) => {
    animateKey(e, keys);
  });
  document.addEventListener("keyup", (e) => {
    animateKey(e, keys);
  });
}
