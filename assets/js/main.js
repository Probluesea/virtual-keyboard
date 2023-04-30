import keysArr from "./keys.js";
import generateDOM from "./generateDOM.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  generateDOM(keysArr);
}
