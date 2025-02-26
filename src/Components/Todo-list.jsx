import TodoListItem from './Todo-list-item.jsx'

export default function TodoList ({ items, onToggleDone, onDelete})  {

        const elements = items.map((item) => {
            const {id, ...itemProps} = item;

            let classNames = 'task'  //По умолчанию класс списка 'task'
            if (item.done) {
                classNames += ' completed'  //Если done=true, добавляем класс completed(зачеркиваем)
            }

            return (
                <li key={id} className={classNames}>
                        <TodoListItem {...itemProps}                           //передаём наши делишки
                                      onToggleDone={() => onToggleDone(id)}    //передаём зачеркивание
                                      onDelete={() => onDelete(id)}
                        />
                </li>
            );
        });

        return (                                       //Наш todo-лист возвращает только список и его элементы внутри
            <ul className="todo-list">
                {elements}
            </ul>
        )
}