import TodoListItem from './Todo-list-item.jsx'
import './Todo-list.css'
import {useState} from "react";

export default function TodoList ({ items, onToggleDone, onDelete, onEdit})  {

    const [editingId, setEditingId] = useState(null)
    const [newLabel, setNewLabel] = useState('')

    const editLabel = (id, label) => {
        setEditingId(id)
        setNewLabel(label)
    }

    const saveNewLabel = (id) => {
        onEdit(id, newLabel)
        setEditingId(id)
    }

    const changeLabel = (e) => {
        e.preventDefault()
        setNewLabel(e.target.value)
    }

    const keyDown = (e, id) => {
        if (e.key === 'Enter') {
            saveNewLabel(id)
            setEditingId(null)
        }
    }

        const elements = items.map((item) => {
            const {id, ...itemProps} = item;

            let classNames = 'task'
            if (item.done) {
                classNames += ' completed'
            }

            if (editingId === id) {
                classNames += ' editing'
            }

            return (
                <li key={id} className={classNames}>
                    {editingId === id ? (
                        <>
                            <input
                                type="text"
                                className="edit"
                                value={newLabel}
                                onChange={changeLabel}
                                onKeyDown={(e) => keyDown(e, id)}
                                autoFocus
                            />
                        </>
                    ) : (
                        <TodoListItem {...itemProps}
                                      onToggleDone={() => onToggleDone(id)}
                                      onDelete={() => onDelete(id)}
                                      onEdit={() => editLabel(id, item.label)}
                        />
                    )}
                </li>
            );
        });

    return (
        <ul className="todo-list">
                {elements}
            </ul>
        )
}