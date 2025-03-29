document.getElementById("obituaryForm").addEventListener("submit", function(event) {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value;
    const dod = document.getElementById("dod").value;
    const content = document.getElementById("content").value.trim();
    const author = document.getElementById("author").value.trim();

    if (!name || !dob || !dod || !content || !author) {
        alert("All fields are required.");
        event.preventDefault();
        return;
    }

    if (new Date(dob) >= new Date(dod)) {
        alert("Date of Death must be after Date of Birth.");
        event.preventDefault();
    }
});

