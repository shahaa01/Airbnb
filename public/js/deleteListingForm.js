document.addEventListener("DOMContentLoaded", () => {
  // grab ALL delete forms
  const deleteForms = document.querySelectorAll('form[action*="delete"]');

  deleteForms.forEach(form => {
    form.addEventListener("submit", e => {
      // show confirm on *every* delete
      const confirmed = confirm('Are you sure you want to delete? It cannot be recovered/undone.');
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });
});