function toggleMenu(id) {
  const menu = document.getElementById(`menu-${id}`);
  menu.classList.toggle("hidden");
}

function toggleEditForm(id) {
  const form = document.getElementById(`edit-form-${id}`);
  form.classList.toggle("hidden");
}
