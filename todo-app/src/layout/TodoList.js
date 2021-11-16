import Axios from 'axios';
import React, { Component } from 'react'

export class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            successMessage: false,
            errorMessage: false,
        }
    }

    delete = (id, ev) => {
        Axios
            .delete(`http://devops.local:30100/todo/${id}`)
            .then(() => {
                this.setState({successMessage: true});
                this.props.removeFromTable(id);
                setTimeout(() => this.setState({successMessage: false}), 1200);
            })
            .catch(error => {
                this.setState({errorMessage: true});
                console.log(error);
                setTimeout(() => this.setState({errorMessage: false}), 1200);
            })
            .then(() => this.setState({loading: false}));
            ev.preventDefault();
    }

    renderRows = () => {
        return this.props.todos.map(todo => (
                <tr key={todo.id}>
                    <td>{todo.name}</td>
                    <td>{todo.description}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={ev => this.delete(todo.id, ev)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr className="bg-primary text-light">
                    <th>Name</th>
                    <th>Description</th>
                    <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderRows() }
                </tbody>
            </table>
        )
    }
}

export default TodoList
