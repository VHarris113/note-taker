const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        const notes = JSON.parse(data);

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Added new note to your log!");
    });

    app.get("api/notes/:id", (req, res) => {
        res.json(notes[req.params.id]);
    });

    app.delete("api/notes/:id", (req, res) => {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Note deleted.");
    });

    app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), err => {
            if (err) throw err;
            return true;
    })}

    });
}