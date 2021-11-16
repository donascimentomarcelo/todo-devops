import Axios from 'axios';
import React, { Component } from 'react'
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export class TodoApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            todos: []
        };
    }
    
    componentDidMount() {
        this.getAll();
    }

    getAll = () => {
        this.setState({loading: true});
        Axios
            .get('http://devops.local:30100/todo')
            .then(resp => {
                const { data } = resp;
                this.setState({todos: data});
            })
            .catch(error => {
                this.setState({errorMessage: true});
                console.log(error);
            })
            .then(() => this.setState({loading: false}));
    }

    updateTable = data => this.setState({todos: [...this.state.todos, data]});

    removeFromTable = id => this.setState({todos: this.state.todos.filter(todo => todo.id !== id)});

    errorSuccess = () => this.state.errorMessage ? 
        <div className="alert alert-danger" role="alert">Ops! Something is wrong!</div> :
        null;

    renderTable = () =>
            !this.state.loading ?
            <TodoList 
                todos={this.state.todos}
                removeFromTable={id => this.removeFromTable(id)}/> :
            <div>loading...</div>;

    render() {
        return (
            <div>
                <TodoForm 
                    todos={this.state.todos}
                    updateTable={data => this.updateTable(data)}/>
                { this.errorSuccess() }
                { this.renderTable() }
            </div>
        )
    }
}

export default TodoApp
