export default function generateDOM(keys) {
  document.body.innerHTML = "";
  function generateBaseLayout() {
    const html = `
    <div class="keyboard keyboard--description">
      <div class="keyboard__wrapper">
        <textarea class="keyboard__textarea" placeholder="Type here..." autofocus></textarea>
      </div>
      <div class="keyboard__wrapper" id="kb-container"></div>
    </div>  
    `;
    document.body.insertAdjacentHTML("afterbegin", html);
  }
  generateBaseLayout();

  for (const row of keys) {
    const rowTemplate = document.createElement("div");
    rowTemplate.classList = "row";

    for (const key of row) {
      const btnTemplate = document.createElement("button");
      btnTemplate.classList = "key";
      btnTemplate.dataset.code = key.code;
      if (key.additional) btnTemplate.classList.add("key--add");
      if (key.stretch) btnTemplate.classList.add(`key--stretch-${key.stretch}`);

      const titleTemplate = document.createElement("div");
      titleTemplate.classList = "key__title";
      if (!key.additional) titleTemplate.innerText = key[`char${localStorage.lang ? localStorage.lang : "Eng"}`];
      else titleTemplate.innerText = key.displayChar;

      btnTemplate.append(titleTemplate);
      rowTemplate.append(btnTemplate);
    }

    document.getElementById("kb-container").append(rowTemplate);
  }
}
