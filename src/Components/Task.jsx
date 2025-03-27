import './Task.css';
import propTypes from 'prop-types';

export default function Task({
                               label,
                               onDelete,
                               onToggleDone,
                               done,
                               onEdit,
                               timeAgo,
                               id,
                               timerDuration,
                               onToggleTimer,
                               activeTimers,
                             }) {
  Task.defaultProps = {
    label: '',
    toDoDate: () => {
    },
    onDelete: () => {
    },
    onToggleDone: () => {
    },
    done: false,
    onEdit: () => {
    },
    timeAgo: '',
    id: null,
    timerDuration: null,
    onToggleTimer: () => {
    },
    activeTimers: {},
  };

  Task.propTypes = {
    label: propTypes.string,
    toDoDate: propTypes.object,
    onDelete: propTypes.func,
    onToggleDone: propTypes.func,
    done: propTypes.func,
    onEdit: propTypes.func,
    timeAgo: propTypes.string,
    id: propTypes.number,
    timerDuration: propTypes.number,
    onToggleTimer: propTypes.func,
    activeTimers: propTypes.object,
  };

  const timer = activeTimers?.[id];
  const showTimer = timerDuration > 0;

  const formatTime = (ms) => {
    if (isNaN(ms)) return '00:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const formattedTime = timer ? formatTime(timer.remainingMs) : formatTime(timerDuration);

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
      <label>
        <span className="title">{label}</span>
        {showTimer && (
          <span className="description">
            <button
              className={`icon icon-${timer?.isPaused ? 'play' : 'pause'}`}
              onClick={() => onToggleTimer(id)}
            />
            {formattedTime}
          </span>
        )}
        <span className="description">{timeAgo}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </div>
  );
}