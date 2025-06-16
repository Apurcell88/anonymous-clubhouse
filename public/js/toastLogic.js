document.addEventListener("DOMContentLoaded", () => {
  const successMsgElement = document.getElementById("success-msg-data");
  const errorMsgElement = document.getElementById("error-msg-data");

  if (successMsgElement && successMsgElement.textContent.trim() !== "") {
    Toastify({
      text: successMsgElement.textContent.trim(),
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#4ade80",
    }).showToast();
  } else if (errorMsgElement && errorMsgElement.textContent.trim() !== "") {
    Toastify({
      text: errorMsgElement.textContent.trim(),
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f87171",
    }).showToast();
  }
});
