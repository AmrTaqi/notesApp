const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicatedItems = notes.find(note => note.title === title)
    if (!duplicatedItems)
        {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('new note has been added'))
        } else {
            console.log(chalk.red.inverse('this title is already exist'))
        }
}

const removeNote = title => {
        const notes = loadNotes()
        const notesToKeep = notes.filter(note => note.title !== title)
        if (notes.length > notesToKeep.length)
        {
            saveNotes(notesToKeep)
            console.log(chalk.green.inverse(title + ' is removed from your notes'))
        } else {
            console.log(chalk.red.inverse('Not found'))
        }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your Notes'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNotes = title => {
    const notes = loadNotes()
    const requiredTitle = notes.find(note => note.title === title)
    if (requiredTitle) {
        console.log(chalk.green.inverse(title))
        console.log(requiredTitle.body)
    } else {
        console.log(chalk.red.inverse('Not found'))
    }
}

const loadNotes = () => {
    try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    const parsedData = JSON.parse(dataJson)
    return parsedData
    } catch(e) {
        return []
    }
}
const saveNotes = notes => {
    const stringData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', stringData)
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}