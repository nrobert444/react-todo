import React, { Component } from 'react'
import AddTodo from './addTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    state = { todos: [] }
    componentDidMount = async() => {
        await this.reloadTodos();
    }

    reloadTodos = async() => {
        const todos = await request.get('https://nameless-brushlands-64319.herokuapp.com/api/todos')

        this.setState({ todos: todos.body })
    };

    handleClick = async () => {
        const newTodo = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };


        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post('https://nameless-brushlands-64319.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
    }


    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        return (
            <div className = 'todo-container'>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
            />
                {
                    this.state.todos.map((todo, index) => <p className='todo-item'
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // lets mutate! make a copy of the array in state
                        const newTodos = this.state.todos.slice();
                            // go find whichever todo we're talking about here
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                                 
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://nameless-brushlands-64319.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }} key={todo.id}>
                        {todo.task}
                            <button className= 'myButton' onClick={async () => { 
                                await request.delete(`https://nameless-brushlands-64319.herokuapp.com/api/todos/${todo.id}`)
                                const deletedTodos = this.state.todos.slice();
                                deletedTodos.splice(index, 1);
                                this.setState({ todos: deletedTodos});
                            }}>Delete</button>
                    </p>)
                }
            </div>
        )
    }
}

