const express = require('express');
const path = require('path');
// const savedNotes = require('./public/assets/js/index');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const savedNotes = req.body;
    res.json(true)
});

app.get('/api/notes', (req, res) => {
    res.json(noteData);
})



app.listen(PORT, () => console.log(`It's over ${PORT}!!!`));