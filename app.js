const notes = require('./notes.js')
const yargs = require('yargs')

yargs.command( {
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.addNote(argv.title, argv.body)
    }
})

yargs.command( {
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type: 'string'    
        }
    },
    handler(argv) {
       notes.removeNote(argv.title)
    }
} )

yargs.command( {
    command:'list',
    describe:'List of notes',
    handler() {
        notes.listNotes()
    }
} )

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
yargs.parse()