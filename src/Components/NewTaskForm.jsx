import './NewTaskForm.css';
import { Component } from 'react';

export default class NewTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;

    if (!label.trim() && !minutes && !seconds) return;

    const totalMs = (parseInt(minutes || 0) * 60000 + (parseInt(seconds || 0) * 1000));
    this.props.onCreate(label, totalMs);
    this.setState({ label: '', minutes: '', seconds: '' });
  }

  render() {
    return (
      <form
        className="new-todo-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="new-todo"
          name="label"
          placeholder="What needs to be done?"
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.label}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          name="minutes"
          placeholder="Min"
          type="number"
          min="0"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.minutes}
        />
        <input
          className="new-todo-form__timer"
          name="seconds"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.seconds}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onCreate: () => {
  },
};

