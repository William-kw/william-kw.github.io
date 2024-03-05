inputs.forEach(input => {
  input.addEventListener("input", checkValue);
});
function checkValue() {
  const empty = inputs.every(input => input.value !== "");
  btnSend.disabled = !empty;
}
