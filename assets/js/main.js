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
    this.#inputTextarea();
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
      this.#inputTextarea(e);
    });
    document.addEventListener("keyup", (e) => {
      e.preventDefault();
      this.#animateKeys(e);
    });
    document.addEventListener("click", (e) => {
      this.#inputTextarea(e.target.closest(".key")?.dataset);
    });
  }

  #animateKeys(e) {
    const keys = this.#kbContainer.querySelectorAll(".key");

    for (const key of keys) {
      if (e.code === key.dataset.code) key.classList[`${e.type === "keydown" ? "add" : "remove"}`]("active");
    }
  }

  #inputTextarea(e) {
    const textarea = this.#kbContainer.querySelector("#kbTextarea");
    if (e) {
      const { code } = e;
      for (const row of this.#keysArr) {
        for (const key of row) {
          if (code === key.code) {
            this.#handleCaps(code);
            if (!e.shiftKey && !this.#Caps) textarea.value += key[`char${localStorage.lang}`];
            if (e.shiftKey) textarea.value += key[`altChar${localStorage.lang}`];
            if (this.#Caps) textarea.value += key[`altChar${localStorage.lang}`];

            if (e.code === "Backspace") {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const length = textarea.value.length;

              textarea.value = textarea.value.substring(0, start - 1) + textarea.value.substring(end, length);
              textarea.focus();
              textarea.selectionStart = start - 1;
              textarea.selectionEnd = start - 1;
            }
          }
        }
      }
    }
  }

  #handleCaps(code) {
    const keys = document.querySelectorAll(".key");

    if (code === "CapsLock") {
      if (!this.#Caps) {
        for (const key of keys) {
          if (code === key.dataset.code) key.classList.add("indicator");
        }
        this.#Caps = true;
      } else {
        for (const key of keys) {
          if (code === key.dataset.code) key.classList.remove("indicator");
        }
        this.#Caps = false;
      }
    }
  }
}
new Keyboard(keysArr);
