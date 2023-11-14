import { useEffect, useState } from "react";
import CreateTodo from "../component/CreateTodo";
import TodoCard from "../component/TodoCard";

function Main() {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);

  function getTodos() {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    setTodos(parsedTodos);
    setLastTodoId(parsedTodos[parsedTodos.length - 1].id);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="max-w-screen-md min-h-screen bg-yello-100 mx-auto">
      <h1 className="py-12 text-center text-4xl font-bold">Todo list</h1>

      <CreateTodo
        todos={todos}
        setTodos={setTodos}
        getTodos={getTodos}
        lastTodoId={lastTodoId}
      />

      <ul className="w-96 mx-auto h-[30rem] mt-12 overflow-y-auto">
        {todos.length === 0 ? (
          <div>Todo list is empty.</div>
        ) : (
          todos.map((v, i) => <TodoCard key={i} todo={v} />)
        )}
      </ul>
    </main>
  );
}

export default Main;
