import './Header.css'
import NewTaskForm from './NewTaskForm.jsx'

export default function Header() {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm></NewTaskForm>
        </header>
    )
}