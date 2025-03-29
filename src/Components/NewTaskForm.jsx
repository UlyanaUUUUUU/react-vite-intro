import './NewTaskForm.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ onCreate }) {
  NewTaskForm.defaultProps = {
    onCreate: () => {
    },
  };

  NewTaskForm.propTypes = {
    onCreate: PropTypes.func,
  };
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'label':
        setLabel(value);
        break;
      case 'minutes':
        setMinutes(value);
        break;
      case 'seconds':
        setSeconds(value);
        break;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!label.trim() && !minutes && !seconds) return;

    const totalMs = (parseInt(minutes || 0) * 60000 + (parseInt(seconds || 0) * 1000));
    onCreate(label, totalMs);
    setLabel('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form
      className="new-todo-form"
      onSubmit={handleSubmit}
    >
      <input
        className="new-todo"
        name="label"
        placeholder="What needs to be done?"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={label}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        placeholder="Min"
        type="number"
        min="0"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={minutes}
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        placeholder="Sec"
        type="number"
        min="0"
        max="59"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={seconds}
      />
    </form>
  );
}