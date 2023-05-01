import keysArr from "./keysArray.js";

class Keyboard {
  #lang = "Eng";
  #keysArr;
  #keysContainerEl;
  #kbContainer;
  #Caps = false;

  constructor(keysArr) {
    this.#keysArr = keysArr;
    this.#init();
  }

  #init() {
    this.#generateBasicLayout();
    this.#displayKeys();
    this.#setLocalStorage();
    this.#eventListeners();
  }

  #generateBasicLayout() {
    const root = document.body;
    this.#kbContainer = document.createElement("div");
    this.#kbContainer.classList = "keyboard keyboard--description";

    const kbTextarea = `
    <div class="keyboard__wrapper">
      <textarea class="keyboard__textarea" id="kbTextarea" placeholder="Type here..." autofocus></textarea>
    </div>
    `;
    this.#kbContainer.insertAdjacentHTML("afterbegin", kbTextarea);

    this.#keysContainerEl = document.createElement("div");
    this.#keysContainerEl.classList = "keyboard__wrapper";
    this.#keysContainerEl.id = "keysContainer";
    this.#kbContainer.append(this.#keysContainerEl);

    root.prepend(this.#kbContainer);
  }

  #displayKeys() {
    this.#keysContainerEl.innerHTML = "";

    for (const row of this.#keysArr) {
      const rowEl = document.createElement("div");
      rowEl.classList = "row";

      for (const key of row) {
        const keyEl = document.createElement("button");
        keyEl.classList = "key";

        if (key.additional) keyEl.classList.add("key--add");
        if (key.stretch) keyEl.classList.add(`key--stretch-${key.stretch}`);

        keyEl.dataset.code = key.code;

        const titleEl = document.createElement("div");
        titleEl.classList = "key__title";
        if (key.additional) {
          titleEl.innerText = key.displayChar;
        } else {
          titleEl.innerText = key[`char${localStorage.lang ? localStorage.lang : this.#lang}`];
        }

        keyEl.append(titleEl);
        rowEl.append(keyEl);
      }

      this.#keysContainerEl.append(rowEl);
    }
  }

  #changeLanguage(e) {
    if (e.shiftKey && e.code === "AltLeft") {
      if (this.#lang === "Eng") this.#lang = "Rus";
      else this.#lang = "Eng";
      localStorage.lang = this.#lang;
      this.#displayKeys();
    }
  }

  #setLocalStorage() {
    if (!localStorage.lang) localStorage.lang = this.#lang;
  }

  #eventListeners() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      this.#animateKeys(e);
      this.#changeLanguage(e);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      this.#animateKeys(e);
    });
  }

  #animateKeys(e) {
    const keys = this.#kbContainer.querySelectorAll(".key");

    for (const key of keys) {
      if (e.code === key.dataset.code) key.classList[`${e.type === "keydown" ? "add" : "remove"}`]("active");
    }
  }
}
new Keyboard(keysArr);
