import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosThunk } from "./store/todos-reducer";

import { TodoList } from "./components/Todo/TodoList";
import { TodosToolbar } from "./components/Todo/TodosToolbar";
import { AddTodoDialog } from "./components/Todo/AddTodoDialog";

function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const [todos, setTodos] = useState([]);

  const allTodos = useSelector((state) => state.todos.todos);
  const selectNewTodos = createSelector(
    [(state) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => !t.completed);
    },
  );
  const selectDoneTodos = createSelector(
    [(state) => state.todos],
    ({ todos }) => {
      return todos.filter((t) => t.completed);
    },
  );

  const newTodos = useSelector(selectNewTodos);
  const doneTodos = useSelector(selectDoneTodos);

  const filterTodos = (filter) => {
    const filterMap = {
      active: () => setTodos([...newTodos]),
      completed: () => setTodos([...doneTodos]),
      all: () => setTodos([...allTodos]),
    };
    if (typeof filterMap[filter] === "function") {
      filterMap[filter]();
    }
  };

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  useEffect(() => {
    filterTodos(filter);
  }, [filter, allTodos]);

  return (
    <div className="flex flex-col w-3/4 m-auto p-5 bg-neutral-100 min-h-screen">
      <h1 className="py-5 text-2xl border-b">Todo Application</h1>
      <div className="py-5 mb-6 border-b">
        <AddTodoDialog />
      </div>
      <TodosToolbar
        onClickAll={() => setFilter("all")}
        onClickActive={() => setFilter("active")}
        onClickCompleted={() => setFilter("completed")}
        activeButton={filter}
      />
      {todos.length > 0 && (
        <div className="p-5 bg-white">
          <TodoList todos={todos} />
        </div>
      )}
    </div>
  );
}

export default App;
