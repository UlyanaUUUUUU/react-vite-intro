import './Footer.css'

export default  function Footer({toDo}) {
    return (
        <footer className="footer">
            <span className="todo-count">{toDo} items left</span>
            <ul className="filters">
                <li>
                    <button className="selected">All</button>
                </li>
                <li>
                    <button>Active</button>
                </li>
                <li>
                    <button>Completed</button>
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}