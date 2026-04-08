import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddTodo = (props) => {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({description: '', date: '', priority: ''});

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});

    }

    const handleSave = () => {
        props.addTodo(todo);
        handleClose();
    }

    return (
        <>
            <Button variant='outlined' onClick={handleOpen}>
                Add Todo
            </Button>

            <Dialog open={open}>
                <DialogTitle>Add Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        name='description'
                        value={todo.description}
                        onChange={inputChanged}
                        margin='dense'
                        label='Description'
                        fullWidth
                    />

                    <TextField
                        name='date'
                        value={todo.date}
                        onChange={inputChanged}
                        margin='dense'
                        label='date'
                        fullWidth
                    />

                    <TextField
                        name='priority'
                        value={todo.priority}
                        onChange={inputChanged}
                        margin='dense'
                        label='priority'
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button color='primary' onClick={handleClose}>Cancel</Button>

                    <Button color='primary' onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>

        </>
    )
}

export default AddTodo