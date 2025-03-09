import './TasksFilter.css';
import { Component } from 'react';
import propTypes from 'prop-types';

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : 'btn';
      return (
        <li key={name}>
          <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.defaultProps = {
  filter: () => {},
};

TasksFilter.propTypes = {
  filter: propTypes.func,
  onFilterChange: propTypes.func,
};
