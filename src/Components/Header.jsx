import './Header.css'
import NewTaskForm from './NewTaskForm.jsx'

export default function Header({onCreate}) {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm
                onCreate={onCreate}
            />
        </header>
    )
}