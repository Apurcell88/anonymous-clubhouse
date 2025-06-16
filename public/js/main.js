// function toggleMenu(id) {
//   const menu = document.getElementById(`menu-${id}`);
//   menu.classList.toggle("hidden");
// }

// function toggleEditForm(id) {
//   const form = document.getElementById(`edit-form-${id}`);
//   form.classList.toggle("hidden");
// }

function toggleMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  if (menu) {
    menu.classList.toggle("hidden");
  }
}

function toggleEditForm(id) {
  const form = document.getElementById(`edit-form-${id}`);
  if (form) {
    form.classList.toggle("hidden");
    const menu = document.getElementById(`menu-${id}`);
    if (menu && !menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleMenuButtons = document.querySelectorAll(".toggle-menu-btn");
  toggleMenuButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleMenu(messageId);
    });
  });

  const toggleEditFormButtons = document.querySelectorAll(
    ".toggle-edit-form-btn"
  );
  toggleEditFormButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleEditForm(messageId);
    });
  });

  const cancelEditFormButtons = document.querySelectorAll(
    ".cancel-edit-form-btn"
  );
  cancelEditFormButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const messageId = event.currentTarget.dataset.messageId;
      toggleEditForm(messageId); // Re-use the toggle function to hide it
    });
  });
});
