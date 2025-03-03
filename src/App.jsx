import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from "./Components/Todo-list.jsx";

import './App.css'
import {Component} from "react";

export default class App extends Component {

    maxId = 100

    state = {                      //Список дел и состояние. По умолчанию 'не выполнено'
        items: [
            {id: 1, label: 'All', done: false, isEdit : false},
            {id: 2, label: 'People', done: false, isEdit : false},
            {id: 3, label: 'Listen Me', done: false, isEdit : false},
        ],
        filter: 'all'
    };

    toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id)
        const oldItem = arr[idx]
        const value = !oldItem[propName]

        const item = {...arr[idx], [propName]: value}

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

    onEdit = (id, newLabel) => {
        this.setState((state) => {
            const idx = state.items.findIndex((item) => item.id === id)
            const updatedItem = {...state.items[idx], label: newLabel}
            const items = [
                ...state.items.slice(0, idx),
                updatedItem,
                ...state.items.slice(idx + 1)
            ]
            return {items}
        })
    }

    onCreate = (text) => {
        const newItem = {
            id: this.maxId++,
            label: text,
            done: false
        }

        this.setState((state) => {
            const newArr = [
                ...state.items,
                newItem,
            ]
            return {
                items: newArr
            }
        })

    }

    clearCompleted = () => {
        this.setState((state) => {
                const items = state.items.filter((item) => !item.done)
                return {items}
        })
    }



    onToggleDone = (id) => {                                    //Зачеркивание элемента
        this.setState((state) => {
            const items = this.toggleProperty(state.items, id, 'done')
            return {items}
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done)
            case 'completed':
                return items.filter((item) => item.done)
            default:
                return items
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter })
    }




    render() {
        const {items, filter} = this.state;
        const visibleItems = this.filter(items, filter);
        const doneCount = items.filter((item) => item.done).length
        const toDoCount = items.length - doneCount
        return (
            <section className="todoapp">
                <Header
                    onCreate = {this.onCreate}
                >
                </Header>
                <section className="main">
                    <TodoList
                        onDelete={this.onDelete}
                        onToggleDone={this.onToggleDone}
                        items={visibleItems}//передаём зачеркивание текста
                        onEdit={this.onEdit}
                    ></TodoList>
                    <Footer
                        toDo={toDoCount}
                        filter = {filter}
                        onFilterChange = {this.onFilterChange}
                        clearCompleted = {this.clearCompleted}
                    >
                    </Footer>
                </section>
            </section>
        )
    }
}