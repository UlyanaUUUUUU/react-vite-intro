import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from "./Components/Todo-list.jsx";

import './App.css'
import {Component} from "react";

export default class App extends Component {                      //единственный класс, где хранятся все функции

    state = {                      //Список дел и состояние. По умолчанию 'не выполнено'
        items: [
            {id: 1, label: 'Drink Coffee', done: false },
            {id: 2, label: 'Make Awesome App', done: false },
            {id: 3, label: 'Have a lunch', done: false },
        ]
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id)
        const oldItem = arr[idx]
        const value = !oldItem[propName]

        const item = {...arr[idx], [propName] : value}

        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx + 1)
        ]
    }

    onDelete = (id) => {
        this.setState((state) => {
            const idx = state.items.findIndex((item) => item.id === id)
            const items = [
                ...state.items.slice(0, idx),
                ...state.items.slice(idx + 1)
            ]

            return {items}
        })
    }

    onToggleDone = (id) => {                                    //Зачеркивание элемента
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done')
            return {items}
        });
    };


    render() {
        const { items } = this.state;
        const doneCount = items.filter((item) => item.done).length
        const toDoCount = items.length - doneCount
        return (
            <section className="todoapp">
                <Header/>
                <section className="main">
                    <TodoList
                        onDelete={this.onDelete}
                        onToggleDone={this.onToggleDone}
                        items={items}//передаём зачеркивание текста
                    ></TodoList>
                    <Footer
                        toDo={toDoCount}
                    >
                    </Footer>
                </section>
            </section>
        )
    }
}