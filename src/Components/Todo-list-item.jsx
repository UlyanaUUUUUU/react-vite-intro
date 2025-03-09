import './Todo-list-item.css';
import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import propTypes from 'prop-types';

export default function TodoListItem({ label, toDoDate, onDelete, onToggleDone, done, onEdit }) {
  TodoListItem.defaultProps = {
    label: '',
    toDoDate: () => {},
    onDelete: () => {},
    onToggleDone: () => {},
    done: false,
    onEdit: () => {},
  };

  TodoListItem.propTypes = {
    label: propTypes.string,
    toDoDate: propTypes.object,
    onDelete: propTypes.func,
    onToggleDone: propTypes.func,
    done: propTypes.func,
    onEdit: propTypes.func,
  };
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date()));

  const date = toDoDate ? new Date(toDoDate) : null;

  useEffect(() => {
    if (!date) return;

    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className="description">{label}</span>
        <span className="created">{timeAgo}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </div>
  );
}
