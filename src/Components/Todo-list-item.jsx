import './Todo-list-item.css'
import {useEffect, useState} from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function TodoListItem({label, toDoDate, onDelete, onToggleDone, done, onEdit}) {

    const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date()));

    const date = toDoDate ? new Date(toDoDate) : null

    useEffect(() => {
        if (!date) return

        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(date));
        }, 60000);

        return () => clearInterval(interval);
    }, [date]);


    return (
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={done}
                   onChange={onToggleDone}
            />
            <label>
                <span className="description">{label}</span>
                <span className="created">{timeAgo}</span>
            </label>
            <button className="icon icon-edit"
                    onClick = {onEdit}
            ></button>
            <button className="icon icon-destroy"
                    onClick={onDelete}>
            </button>
        </div>
    )
}