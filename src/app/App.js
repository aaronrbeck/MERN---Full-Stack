import React, {Component} from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''

        }
        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
    }
    addTask(e){
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)})
                M.toast({html: 'Task Updated'})
                this.setState({title: '', description: '', _id: ''})
                this.fetchTasks()
        } else {
            fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
                .then(res=> res.json())
                .then(data=> {
                    console.log(data)
                    M.toast({html: 'Task Saved'})
                    this.setState({title: '', description: ''})
                    this.fetchTasks()
                })
                .catch(err => console.error(err))
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks:data})
                console.log(this.state.tasks)
            })
    }

    deleteTask(id){
        if(confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Deleted'})
                this.fetchTasks()
            })
        }

    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render (){
        return(
// Navigation 
            <div>
                <nav className="#263238 blue-grey darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/"> To Do List</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className=" col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange}type="text" placeholder="Task title" value={this.state.title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task description" className="materialize-textarea" value={this.state.description}/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(tasks => {
                                            return (
                                                <tr key={tasks._id}>
                                                    <td>{tasks.title}</td>
                                                    <td>{tasks.description}</td>
                                                    <td>
                                                        <button className="btn darken-4">
                                                            <i className="material-icons" onClick={() => this.editTask(tasks._id)}>edit</i>
                                                        </button>
                                                        <button className="btn darken-4" style={{margin:'4px'}} onClick={() => this.deleteTask(tasks._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;