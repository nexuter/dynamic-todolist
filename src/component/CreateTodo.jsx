import { useState } from "react";

function CreateTodo({ todos, getTodos, lastTodoId }) {
  const [newTodo, setNewTodo] = useState("");

  function onSubmitNewTodo(e) {
    e.preventDefault();

    if (!newTodo) return;

    const newTodos = [
      ...todos,
      { id: lastTodoId + 1, title: newTodo, isDone: false },
    ];

    localStorage.setItem("todos", JSON.stringify(newTodos));

    getTodos();
    setNewTodo("");
  }

  return (
    <form className="w-96 mx-auto mt-12 flex" onSubmit={onSubmitNewTodo}>
      <input
        className="w-3/4 mr-4 rounded-md p-2 focus:outline-none border-2 focus:border-blue-300"
        type="text"
        vlaue={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        className="w-1/4 bg-blue-400 hover:bg-blue-600 active:bg-blue-400 text-white font-semibold rounded-md"
        type="submit"
        value="Create"
      />
    </form>
  );
}

export default CreateTodo;
