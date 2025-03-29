import './TasksFilter.css';
import propTypes from 'prop-types';

export default function TasksFilter({ onFilterChange, filter }) {
  TasksFilter.defaultProps = {
    filter: () => {
    },
  };

  TasksFilter.propTypes = {
    filter: propTypes.func,
    onFilterChange: propTypes.func,
  };

  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
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

  return (
    <ul className="filters">
      {buttons}
    </ul>
  );
}