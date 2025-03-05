import './NewTaskForm.css'
import {Component} from "react";

export default class NewTaskForm extends Component {

    state = {
        label: ''
    }
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onCreate(this.state.label)
        this.setState({label: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    type="text"
                    onChange={this.onLabelChange}
                    value={this.state.label}
                    autoFocus/>
            </form>
        )
    }

}