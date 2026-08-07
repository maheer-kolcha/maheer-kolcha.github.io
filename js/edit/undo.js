/******************************************************************************
 * js/edit/undo.js
 *
 * Undo / Redo Manager
 *
 * Responsibilities:
 *  - Store editing actions
 *  - Undo changes
 *  - Redo changes
 *
 * No map logic
 * No KML logic
 ******************************************************************************/

export const UndoManager = {


    undoStack: [],

    redoStack: [],



    //----------------------------------------------------------
    // Add command
    //----------------------------------------------------------

    execute(command) {


        if(!command)
            return;



        command.execute();



        this.undoStack.push(
            command
        );


        this.redoStack = [];


    },



    //----------------------------------------------------------
    // Undo
    //----------------------------------------------------------

    undo() {


        const command =
            this.undoStack.pop();



        if(!command)
            return;



        command.undo();



        this.redoStack.push(
            command
        );


    },



    //----------------------------------------------------------
    // Redo
    //----------------------------------------------------------

    redo() {


        const command =
            this.redoStack.pop();



        if(!command)
            return;



        command.execute();



        this.undoStack.push(
            command
        );


    },



    //----------------------------------------------------------
    // Clear history
    //----------------------------------------------------------

    clear() {


        this.undoStack = [];

        this.redoStack = [];


    },



    canUndo() {


        return this.undoStack.length > 0;


    },


    canRedo() {


        return this.redoStack.length > 0;


    }

};