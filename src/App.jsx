import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import TaskList from './Components/TaskList.jsx';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timeAgo, setTimeAgo] = useState({});
  const [activeTimers, setActiveTimers] = useState({});
  const maxId = useRef(100);

  const toggleProperty = useCallback((arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };

    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  }, []);

  const updateTimeAgo = useCallback(() => {
    const newTimeAgo = {};
    items.forEach((item) => {
      if (item.toDoDate) {
        newTimeAgo[item.id] = formatDistanceToNow(new Date(item.toDoDate));
      }
    });
    setTimeAgo(newTimeAgo);
  }, [items]);

  useEffect(() => {
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [updateTimeAgo]);

  const onDelete = useCallback((id) => {
    if (activeTimers[id]?.intervalId) {
      clearInterval(activeTimers[id].intervalId);
    }

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setActiveTimers((prevTimers) => {
      const newTimers = { ...prevTimers };
      delete newTimers[id];
      return newTimers;
    });
  }, [activeTimers]);

  const onEdit = useCallback((id, newLabel) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, label: newLabel } : item,
      ),
    );
  }, []);

  const onCreate = useCallback((text, timerDuration = 0) => {
    if (!text.trim() && timerDuration <= 0) return;

    const newItem = {
      id: maxId.current++,
      label: text,
      done: false,
      toDoDate: new Date(),
      timerDuration,
    };

    setItems((prevItems) => [...prevItems, newItem]);

    if (timerDuration > 0) {
      startTimer(newItem.id, timerDuration);
    }
  }, []);

  const startTimer = useCallback((id, duration) => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateTimer = () => {
      const now = Date.now();
      const remainingMs = Math.max(0, endTime - now);

      setActiveTimers((prevTimers) => ({
        ...prevTimers,
        [id]: {
          ...prevTimers[id],
          remainingMs,
        },
      }));

      if (remainingMs <= 0) {
        clearInterval(activeTimers[id]?.intervalId);
      }
    };

    const intervalId = setInterval(updateTimer, 1000);

    setActiveTimers((prevTimers) => ({
      ...prevTimers,
      [id]: {
        remainingMs: duration,
        intervalId,
        isPaused: false,
      },
    }));

    updateTimer();
  }, []);

  const toggleTimer = useCallback((id) => {
    const timer = activeTimers[id];
    if (!timer) return;

    if (timer.isPaused) {
      const newEndTime = Date.now() + timer.remainingMs;
      const updateTimer = () => {
        const now = Date.now();
        const remainingMs = Math.max(0, newEndTime - now);

        setActiveTimers((prevTimers) => ({
          ...prevTimers,
          [id]: {
            ...prevTimers[id],
            remainingMs,
          },
        }));

        if (remainingMs <= 0) {
          clearInterval(activeTimers[id]?.intervalId);
        }
      };

      const intervalId = setInterval(updateTimer, 1000);

      setActiveTimers((prevTimers) => ({
        ...prevTimers,
        [id]: {
          remainingMs: timer.remainingMs,
          intervalId,
          isPaused: false,
        },
      }));

      updateTimer();
    } else {
      clearInterval(timer.intervalId);
      setActiveTimers((prevTimers) => ({
        ...prevTimers,
        [id]: {
          ...prevTimers[id],
          isPaused: true,
          intervalId: null,
        },
      }));
    }
  }, [activeTimers]);

  const clearCompleted = useCallback(() => {
    setItems((prevItems) => prevItems.filter((item) => !item.done));
  }, []);

  const onToggleDone = useCallback((id) => {
    setItems((prevItems) => toggleProperty(prevItems, id, 'done'));
  }, [toggleProperty]);

  const filterItems = useCallback((items, filter) => {
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
  }, []);

  const visibleItems = filterItems(items, filter);
  const doneCount = items.filter((item) => item.done).length;
  const toDoCount = items.length - doneCount;

  return (
    <section className="todoapp">
      <Header onCreate={onCreate} />
      <section className="main">
        <TaskList
          onDelete={onDelete}
          onToggleDone={onToggleDone}
          items={visibleItems}
          onEdit={onEdit}
          timeAgo={timeAgo}
          activeTimers={activeTimers}
          onToggleTimer={toggleTimer}
        />
        <Footer
          toDo={toDoCount}
          filter={filter}
          onFilterChange={setFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}
