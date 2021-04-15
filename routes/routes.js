const fs = require('fs');
const database = require('./db/db.json');
const index = require('./public/assets/js/index')

app.get('/api/index', (req, res) => {
    res.json(database);

});

app.post('/api/index', (req, res) => {
    console.log(req.body);
    const savedNotes = path.join(__dirname, '/db/db.json');
    const newNote = req.body;

    let noteAmount = 99;
    for(let i = 0; i < database.length; i++) {
        const note = database[i];
        if (note.id > noteAmount) {
            noteAmount = note.id;
        }
    }
    newNote.id = noteAmount + 1;
    database.push(newNote);

    fs.writeFile(savedNotes, JSON.stringify(database), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("You saved one note!");
    });
    res.json(newNote);
});

app.delete('api/index', (req, res) => {

});