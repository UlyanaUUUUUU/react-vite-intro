import './Todo-list-item.css'

export default function TodoListItem({label, onDelete, onToggleDone, done, onEdit}) {

    return (
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   checked={done}
                   onChange={onToggleDone}
            />
            <label>
                <span className="description">{label}</span>
                <span className="created">created 17 seconds ago</span>
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