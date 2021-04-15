const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 9000;
const notePage = path.join(__dirname, "/public");

app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(notePage, "notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(notePage, "index.html"));
})

app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteId = (savedNotes.length).toString();
    newNote.id = noteId;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved!", newNote);
    res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteWithId = req.params.id;
    let oldId = 0;
    console.log("Note Deleted!");
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteWithId;
    });

    for (currentNote of savedNotes) {
        currentNote.id = oldId.toString();
        oldId++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.listen(PORT, () => console.log(`It's over ${PORT}!!!`));