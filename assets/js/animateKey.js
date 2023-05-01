export default function animateKey(keyEvent, keys) {
  keyEvent.preventDefault();

  for (const key of keys) {
    if (keyEvent.code === key.dataset.code) {
      key.closest(".key").classList[`${keyEvent.type === "keydown" ? "add" : "remove"}`]("active");
    }
  }
}
