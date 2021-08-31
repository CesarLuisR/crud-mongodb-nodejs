const form = document.querySelector("form");
const notesContainer = document.querySelector(".note-container");

const getNotes = async () => {
    const resp = await fetch("/notes");
    const data = await resp.json();

    notesContainer.innerHTML = null;
    data.forEach(note => {
        notesContainer.innerHTML += `<div class="note">${note.text}</div>`;
    });
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: e.target.text.value })
    });

    e.target.reset();

    getNotes();
});

document.addEventListener("DOMContentLoaded", getNotes);