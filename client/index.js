const form = document.querySelector("form");
const notesContainer = document.querySelector(".note-container");

const deleteNote = async (id) => {
    await fetch(`/${id}`, { method: "DELETE" });
    getNotes();
};

const updateNote = async (text, id) => {
    if (form.text.value === text) return alert("Enter text in the form input");

    await fetch(`/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: form.text.value })
    });

    form.text.value = "";

    document.querySelector(".submit-btn").value = "Send";
    document.querySelector(".title").textContent = "Add note";

    getNotes();
}

const getNotes = async () => {
    const resp = await fetch("/notes");
    const data = await resp.json();

    notesContainer.innerHTML = null;

    data.forEach(note => {
        notesContainer.innerHTML += `
            <div class="note flex justify-between" data-id="${note._id}">
                <span class="text flex items-center">${note.text}</span>
                <div class="btn-container">
                    <button class="bg-blue-500
                        hover:bg-blue-700
                        text-white
                        font-bold
                        py-2
                        px-4
                        rounded
                        cursor-pointer edit"
                    >
                        Editar
                    </button>
                    <button class="bg-blue-500
                        hover:bg-blue-700
                        text-white
                        font-bold
                        py-2
                        px-4
                        rounded
                        cursor-pointer delete"
                    >
                        Eliminar
                    </button>
                </div>
            </div>`;
    });
};

document.addEventListener("click", async (e) => {
    if (e.target.matches(".delete")) {
        const id = e.target.parentElement.parentElement.dataset.id;
        deleteNote(id);
    }

    if (e.target.matches(".edit")) {
        const id = e.target.parentElement.parentElement.dataset.id;
        const text = e.target.parentElement.previousElementSibling.textContent;

        document.querySelector(".submit-btn").value = "Edit";
        document.querySelector(".title").textContent = "Edit note";

        form.text.value = text;

        form.addEventListener("submit", (e) => {
            if (document.querySelector(".submit-btn").value !== "Edit") return;
            e.preventDefault();
            updateNote(text, id);
        });
    };
});

form.addEventListener("submit", async (e) => {
    if (document.querySelector(".submit-btn").value === "Edit") return;

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