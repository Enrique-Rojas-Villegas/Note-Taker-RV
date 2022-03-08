const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

//Post route to add a note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body){
        const newNote = {
            id: uuidv4(),
            title,
            text,
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    }else{
        res.error('Error adding new note');
    }
});

//Get route to return saved notes as a JSON
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


//Delete Request
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', result);

        res.json(`Item ${noteId} has been deleted 🗑️`);
    })
});

module.exports = notes;