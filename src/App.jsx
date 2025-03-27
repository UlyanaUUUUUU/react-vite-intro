import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import TaskList from './Components/TaskList.jsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './App.css';
import { Component } from 'react';


export default class App extends Component {
  maxId = 100;

  state = {
    items: [],
    filter: 'all',
    timeAgo: {},
    activeTimers: {},
  };


  componentDidMount() {
    this.updateTimeAgo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items !== this.state.items) {
      this.updateTimeAgo();
    }
  }

  updateTimeAgo = () => {
    const { items } = this.state;
    const timeAgo = {};

    items.forEach((item) => {
      if (item.toDoDate) {
        timeAgo[item.id] = formatDistanceToNow(new Date(item.toDoDate));
      }
    });

    this.setState({ timeAgo });

    this.timeAgoInterval = setInterval(() => {
      const updatedTimeAgo = { ...this.state.timeAgo };
      items.forEach((item) => {
        if (item.toDoDate) {
          updatedTimeAgo[item.id] = formatDistanceToNow(new Date(item.toDoDate));
        }
      });
      this.setState({ timeAgo: updatedTimeAgo });
    }, 60000);
  };

  componentWillUnmount() {
    clearInterval(this.timeAgoInterval);
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };

    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  onDelete = (id) => {
    clearInterval(this.state.activeTimers[id]?.intervalId);

    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [...state.items.slice(0, idx), ...state.items.slice(idx + 1)];


      const activeTimers = { ...state.activeTimers };
      delete activeTimers[id];

      return { items, activeTimers };
    });
  };

  onEdit = (id, newLabel) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const updatedItem = { ...state.items[idx], label: newLabel };
      const items = [...state.items.slice(0, idx), updatedItem, ...state.items.slice(idx + 1)];
      return { items };
    });
  };

  onCreate = (text, timerDuration = 0) => {
    if (!text.trim() && timerDuration <= 0) return;

    const newItem = {
      id: this.maxId++,
      label: text,
      done: false,
      toDoDate: new Date(),
      timerDuration,
    };

    this.setState(({ items }) => ({
      items: [...items, newItem],
    }), () => {
      if (timerDuration > 0) {
        this.startTimer(newItem.id, timerDuration);
      }
    });
  };


  startTimer = (id, duration) => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateTimer = () => {
      const now = Date.now();
      const remainingMs = Math.max(0, endTime - now);

      this.setState(prevState => ({
        activeTimers: {
          ...prevState.activeTimers,
          [id]: {
            ...prevState.activeTimers[id],
            remainingMs,
          },
        },
      }));

      if (remainingMs <= 0) {
        clearInterval(this.state.activeTimers[id]?.intervalId);
      }
    };

    const intervalId = setInterval(updateTimer, 1000);

    this.setState(prevState => ({
      activeTimers: {
        ...prevState.activeTimers,
        [id]: {
          remainingMs: duration,
          intervalId,
          isPaused: false,
        },
      },
    }));

    updateTimer();
  };

  toggleTimer = (id) => {
    const timer = this.state.activeTimers[id];
    if (!timer) return;

    if (timer.isPaused) {
      const newEndTime = Date.now() + timer.remainingMs;
      const updateTimer = () => {
        const now = Date.now();
        const remainingMs = Math.max(0, newEndTime - now);

        this.setState(prevState => ({
          activeTimers: {
            ...prevState.activeTimers,
            [id]: {
              ...prevState.activeTimers[id],
              remainingMs,
            },
          },
        }));

        if (remainingMs <= 0) {
          clearInterval(this.state.activeTimers[id]?.intervalId);
        }
      };

      const intervalId = setInterval(updateTimer, 1000);

      this.setState(prevState => ({
        activeTimers: {
          ...prevState.activeTimers,
          [id]: {
            remainingMs: timer.remainingMs,
            intervalId,
            isPaused: false,
          },
        },
      }));

      updateTimer();
    } else {
      clearInterval(timer.intervalId);
      this.setState(prevState => ({
        activeTimers: {
          ...prevState.activeTimers,
          [id]: {
            ...prevState.activeTimers[id],
            isPaused: true,
            intervalId: null,
          },
        },
      }));
    }
  };

  formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  clearCompleted = () => {
    this.setState((state) => {
      const items = state.items.filter((item) => !item.done);
      return { items };
    });
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };


  render() {
    const { items, filter, timeAgo } = this.state;
    const visibleItems = this.filter(items, filter);
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;


    return (
      <section className="todoapp">
        <Header onCreate={this.onCreate} />
        <section className="main">
          <TaskList
            onDelete={this.onDelete}
            onToggleDone={this.onToggleDone}
            items={visibleItems}
            onEdit={this.onEdit}
            timeAgo={timeAgo}
            activeTimers={this.state.activeTimers}
            onToggleTimer={this.toggleTimer}
          ></TaskList>
          <Footer
            toDo={toDoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          ></Footer>
        </section>
      </section>
    );
  }
}
