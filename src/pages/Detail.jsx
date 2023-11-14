import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FiCheck, FiTrash2, FiEdit } from "react-icons/fi";

function Detail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const title = searchParams.get("title");
  const isDone = searchParams.get("is-done");

  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(title);

  function onClickIsDone() {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v) => {
      if (v.id == id) {
        return { id: v.id, title: v.title, isDone: !v.isDone };
      } else {
        return v;
      }
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  }

  function onClickDel() {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const deletedTodos = parsedTodos.filter((v) => {
      if (v.id !== +id) {
        return v;
      }
    });

    if (deletedTodos.length === 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
    }

    navigate("/");
  }

  function onClickEditToggle() {
    setIsEdit(!isEdit);
  }

  function onSubmitEdit(e) {
    e.preventDefault();

    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v) => {
      console.log(typeof v.id + " " + typeof id);
      if (v.id == id) {
        return { id: v.id, title: editTodo, idDone: v.isDone };
      } else {
        return v;
      }
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  }
  return (
    <main className="max-w-screen-md min-h-screen mx-auto justify-center items-center text-2xl">
      <div className="flex items-center">
        <span>{id}</span>
        <span className="ml-4">
          {isEdit ? (
            <form className="flex" onSubmit={onSubmitEdit}>
              <input
                className="border-2 focus:outline-none focus:border-blue-300 mr-2 px-2 py-1"
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <input className="focus:font-bold" type="submit" value="Submit" />
            </form>
          ) : (
            title
          )}
        </span>
        <button
          onClick={onClickIsDone}
          className="ml-4 bg-green-400 hover:bg-green-600 active:bg-green-400 rounded-md px-2 h-10 flex justify-center items-center"
        >
          <FiCheck /> {isDone === "true" ? "Done" : "In progress"}
        </button>
        <button
          onClick={onClickEditToggle}
          className="ml-4 bg-blue-400 hover:bg-blue-600 active:bg-red-400 rounded-md px-2 h-10 flex justify-center items-center"
        >
          <FiEdit /> {isEdit ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={onClickDel}
          className="ml-4 bg-red-400 hover:bg-red-600 active:bg-red-400 rounded-md px-2 h-10 flex justify-center items-center"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </main>
  );
}

export default Detail;
