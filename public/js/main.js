function toggleMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  if (menu) {
    menu.classList.toggle("hidden");
  } else {
    console.warn(`Menu element with ID 'menu-${id}' not found.`);
  }
}

function toggleEditForm(id) {
  const form = document.getElementById(`edit-form-${id}`);
  if (form) {
    form.classList.toggle("hidden");
  } else {
    console.warn(`Edit form element with ID 'edit-form-${id}' not found.`);
  }
}

// Attach event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for the "⋮" (three dots) button to toggle the menu
  document.querySelectorAll(".toggle-menu-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleMenu(messageId);
    });
  });

  document.querySelectorAll(".toggle-edit-form-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleEditForm(messageId);
    });
  });

  // Event listener for the "Cancel" button inside the edit form
  document.querySelectorAll(".cancel-edit-form-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleEditForm(messageId);
    });
  });
});
