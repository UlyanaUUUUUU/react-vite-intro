import './Footer.css';
import TasksFilter from './TasksFilter.jsx';
import propTypes from 'prop-types';

export default function Footer({ toDo, onFilterChange, filter, clearCompleted }) {
  Footer.defaultProps = {
    toDo: 0,
    onFilterChange: () => {},
    filter: () => {},
    clearCompleted: () => {},
  };

  Footer.propTypes = {
    toDo: propTypes.number,
    onFilterChange: propTypes.func,
    filter: propTypes.func,
    clearCompleted: propTypes.func,
  };
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilterChange={onFilterChange} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
