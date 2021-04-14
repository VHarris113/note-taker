const express = require('express');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('./public/index', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('./public/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));



app.listen(PORT, () => console.log(`It's over ${PORT}!!!`));