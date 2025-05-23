document.addEventListener("DOMContentLoaded", () => {
  // grab ALL delete forms
  const deleteForms = document.querySelectorAll('form[action^="/deleteList/"]');

  deleteForms.forEach(form => {
    form.addEventListener("submit", e => {
      // show confirm on *every* delete
      const confirmed = confirm('Are you sure you want to delete? It cannot be recovered/undone.')
      if (!confirmed) {
        e.preventDefault();
      }
    });
  });

  console.log("Attached confirm to", deleteForms.length, "form(s).");
});