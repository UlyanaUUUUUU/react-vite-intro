import './Header.css';
import NewTaskForm from './NewTaskForm.jsx';
import propTypes from 'prop-types';

export default function Header({ onCreate }) {
  Header.defaultProps = {
    onCreate: () => {},
  };

  Header.propTypes = {
    onCreate: propTypes.func,
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onCreate={onCreate} />
    </header>
  );
}
