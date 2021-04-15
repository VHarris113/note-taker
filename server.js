const express = require('express');
const path = require('path');
const fs = require('fs');
const database = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/api/notes', (req, res) => {
    res.json(database);

});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const savedNotes = path.join(__dirname, '/db/db.json');
    const newNote = req.body;

    let firstNote = 100;
    for(let i = 0; i < database.length; i++) {
        const note = database[i];
        if (note.id > firstNote) {
            firstNote = note.id;
        }
    }

    
});

app.delete('api/notes', (req, res) => {

});



app.listen(PORT, () => console.log(`It's over ${PORT}!!!`));