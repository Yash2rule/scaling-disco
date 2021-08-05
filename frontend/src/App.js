import React,{useEffect} from "react";
import axios from "axios";
import "./App.css";
import {Form,Button} from 'react-bootstrap';
import Todo from './Todo';

function App() {
  const [todos,setTodos] = React.useState([])
  const [title,setTitle] = React.useState('');
  const [description,setDescription] = React.useState('');
  const [isPinned,setIsPinned] = React.useState(false);
  const [error,setError] = React.useState(null)

  useEffect(() => {
    async function getAllTodos() {
      try {
        const response = await axios.get('/api/todo')
        setTodos(response.data);
      } catch (error) {
        setError(error)
      }
    }
    getAllTodos();
  }, [todos,error]);

  const addTodo = async (e) => {
    e.preventDefault();
    if(title !== '' && description !== ''){
      try {
        const createdTodo = await axios.post('/api/todo',{
          todoId:Math.floor(Math.random(0,1)*1000),
          title,
          description,
          isPinned
        },{
          headers: {
            'content-type': 'application/json'
          }
        })
        setTitle('');
        setDescription('');
        setIsPinned(false);
      } catch (error) {
        setError(error)
      }
      // setTodos([...todos,{
      //   todoId:Math.random(0,1)*1000,
      //   title,
      //   description,
      //   isPinned,
      // }]);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todo/${id}`)
    } catch (error) {
      setError(error)
    }
    // setTodos(todos.filter(todo => todo.todoId !== id))
  }

  const getTodoById = async (id) => {
    try {
      const todo = await axios.get(`/api/todo/${id}`)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
    <h1 style={{textAlign: 'center'}}>Todo List App</h1>
    <Form onSubmit={addTodo} style={{width:'60%',margin:'auto'}}>
      <Form.Group className="mb-3" controlId="noteTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" 
        value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="noteDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="5" 
        placeholder="Enter description" 
        value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="isPinned">
        <Form.Check type="checkbox" label="Mark as Pinned" 
        checked={isPinned}
        onChange={(e) => setIsPinned(e.target.checked)}/>
      </Form.Group>
      <Button variant="secondary" type="submit">
        Add
      </Button>
    </Form>
    {error && <h3 style={{textAlign:'center',color:'red'}}>{error.message}</h3>}
    {todos.length > 0 ? todos.map((todo) => (
      <Todo key={todo.todoId} id={todo.todoId} title={todo.title} 
      description={todo.description} isPinned={todo.isPinned}
      deleteTodo={deleteTodo}/>
    )) : <h1 style={{textAlign:'center'}}>No Todos Added</h1>}
    </>
  );
}

export default App;
