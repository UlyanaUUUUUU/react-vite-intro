import './Footer.css'
import TasksFilter from './TasksFilter.jsx'

export default  function Footer({toDo, onFilterChange, filter, clearCompleted}) {
    return (
        <footer className="footer">
            <span className="todo-count">{toDo} items left</span>
               <TasksFilter
                   onFilterChange={onFilterChange}
                   filter={filter}
               />
            <button className="clear-completed"
                    onClick={clearCompleted}
            >Clear completed</button>
        </footer>
    )
}