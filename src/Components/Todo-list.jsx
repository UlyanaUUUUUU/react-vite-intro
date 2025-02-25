import TodoListItem from './Todo-list-item.jsx'
import {Component} from "react";


export default class TodoList extends Component {

    state = {
        done: {}
    }

    onLabelClick = (id) => {
        this.setState(({done}) => {
            return {
                done: {
                    ...done,
                    [id]: !done[id]
                }
            };
        });
    };


    list = ({todoData}) => {
        todoData.map((item) => {
            const {id, ...itemProps} = item;

            return (
                {id, ...itemProps}
            );
        });

    };

    render() {

        const {todos} = this.props;
        const {onDelete} = this.props;

        const elements = todos.map((item) => {
            const {id, ...itemProps} = item;

            let classNames = 'task'
            const isDone = this.state.done[id];
            if (isDone) {
                classNames += ' completed'
            }

            return (
                <li key={id} className={classNames}>
                        <TodoListItem {...itemProps}
                            onDelete={() => onDelete(id)}
                        />
                </li>
            );
        });

        return (
            <ul className="todo-list">
                {elements}
            </ul>
        )
    }
}