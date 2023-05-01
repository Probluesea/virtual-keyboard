import keysArr from "./keysArray.js";

class Keyboard {
  #lang = "Eng";
  #keysArr;
  #keysContainerEl;
  #kbContainer;
  #Caps = false;

  constructor(keysArr) {
    this.#keysArr = keysArr;
  }
}
new Keyboard(keysArr);
