import Axios from 'axios';
import React, { Component } from 'react';

export class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            id: '',
            successMessage: false,
            errorMessage: false,
        }
    }

    onChangeHandler = (field, value) => this.setState({[field]: value});

    handleSubmit = ev => {
        const {name, description} = this.state;
        Axios
            .post('http://localhost:8080/todo', {name, description})
            .then(resp => {
                const { data } = resp;
                this.setState({successMessage: true});
                this.props.updateTable(data);
                this.setState({id: '', name: '', description: ''});
                setTimeout(() => this.setState({successMessage: false}), 2000);
            })
            .catch(error => {
                this.setState({errorMessage: true});
                console.log(error);
                setTimeout(() => this.setState({errorMessage: false}), 2000);
            });
        ev.preventDefault();
    }

    showSuccess = () => this.state.successMessage ? 
                        <div className="alert alert-success" role="alert">Task created successful</div> :
                        null;

    errorSuccess = () => this.state.errorMessage ? 
                        <div className="alert alert-danger" role="alert">Ops! Something is wrong!</div> :
                        null;

    render() {
        return (
            <div className="card">
                <div className="card-body form-align">
                    { this.showSuccess() }
                    { this.errorSuccess() }
                    <div className="form-row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-md-10">
                                <label htmlFor="name">Nome: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={ev => this.onChangeHandler('name', ev.target.value)}/>
                            </div>
                            <div className="form-group col-md-10">
                                <label htmlFor="description">Descrição: </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="description" 
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={ev => this.onChangeHandler('description', ev.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg float-right mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoForm
