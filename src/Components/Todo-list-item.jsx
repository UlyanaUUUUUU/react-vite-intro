import {Component} from "react";


// eslint-disable-next-line react/prop-types
export default function TodoListItem({label, onDelete}) {

    return (
        <div className="view">
            <input className="toggle"
                   type="checkbox"
                   onClick={() => this.onLabelClick(id)}
            />
            <label>
                <span className="description">{label}</span>
                <span className="created">created 17 seconds ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"
                    onClick={onDelete}
            ></button>
        </div>
    )
}
// export default class TodoListItem extends Component {
//
//     render() {
//
//         const {label} = this.props;
//         return (
//             <div>
//                 <label>
//                     <span className="description">{label}</span>
//                     <span className="created">created 17 seconds ago</span>
//                 </label>
//                 <button className="icon icon-edit"></button>
//                 <button className="icon icon-destroy"
//                         onClick={onDelete}
//                 ></button>
//             </div>
//         )
//     }
// }

// export default class TodoListItem extends Component {
//
//     state = {
//         done: false
//     }
//     onLabelClick = () => {
//         this.setState(({done}) => {
//             return {
//                 done: !done
//             };
//         });
//     };
//
//      Id = ({ todoData }) => {
//          todoData.map((item) => {
//             const { ...itemProps } = item;
//
//             return (
//                 { ...itemProps }
//             );
//         });
//
//     };
//
//
//
//     render() {
//         let classNames = 'task'
//         const { done} = this.state;
//         let {label} = this.props;
//
//         if(done) {
//             classNames += ' completed'
//         }
//
//
//         return (
//             <li className={classNames} key={this.id}>
//                 <div className="view">
//                     <input className="toggle"
//                            onClick={this.onLabelClick}
//                            type="checkbox"/>
//                     <label>
//                     <span
//                         className="description"
//                     >{label}</span>
//                         <span className="created">created 17 seconds ago</span>
//                     </label>
//                     <button className="icon icon-edit"></button>
//                     <button className="icon icon-destroy"></button>
//                 </div>
//             </li>
//
//         )
//     }
// }