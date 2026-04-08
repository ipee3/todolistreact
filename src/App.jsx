import { useState, useEffect } from 'react'
import './App.css'
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTodo from './components/AddTodo';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [todo, setTodos] = useState ([]);

  const [colDefs, setColDefs] = useState([
    {field: 'description', sortable: true, filter: true},
    {field: 'date', sortable: true, filter: true},
    {field: 'priority', sortable:true, filter: true},
    {
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params =>
      <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton>
    }
  ])

  useEffect( () => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://todolist-d68e6-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
      .then(response => response.json())
      .then(data => addKeys(data))
      .catch(error => console.error(error))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setTodos(valueKeys);
  }

  const addTodo = (newTodo) => {
    fetch('https://todolist-d68e6-default-rtdb.europe-west1.firebasedatabase.app/items/.json',
      {
        method: 'POST',
        body: JSON.stringify(newTodo)
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch(`https://todolist-d68e6-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
      {
        method: 'DELETE'
      })
      .then(response => fetchItems())
      .catch(err => console.error(err))
  }



  return (
    <> 
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <AddTodo addTodo={addTodo} />
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={todo}
          columnDefs={colDefs}
        />
      </div>
    </>
  )
}

export default App
