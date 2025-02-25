import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from "./Components/Todo-list.jsx";

import './App.css'
import {Component} from "react";

export default class App extends Component {

    state = {
        todoData: [
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Make Awesome App', important: true, id: 2},
            {label: 'Have a lunch', important: false, id: 3},
        ]
    };

    deleteItem = (id) => {
        console.log(id);
        // this.setState(({todoData}) => {
        //     const idx = todoData.items.findIndex((item) => item.id === id);
        //     todoData.splice(idx, 1)
            // const before = todoData.slice(0, idx)
            // const after = todoData.slice(idx, +1)
            //
            // const newArr = [...before, ...after];
        //     return {
        //         todoData: todoData  };
        // })
    }


    render() {
        return (
            <section className="todoapp">
                <Header/>
                <section className="main">
                    <TodoList todos={this.state.todoData}
                              onDeleted ={this.deleteItem}></TodoList>
                    <Footer></Footer>
                </section>
            </section>
        )
    }
}