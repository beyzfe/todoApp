import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";

export default function NoteCard() {
  const [note, setNote] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos !== null) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const addTodo = () => {
    if (note.trim() !== "") {
      setTodos([...todos, note]);
      setNote("");
    }
  };

  const showModal = (index: number) => {
    setEditingIndex(index);
    setEditingValue(todos[index]);
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleOk = () => {
    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = editingValue;
      setTodos(updatedTodos);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white  mt-3 shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Add Note</h2>
          <input
            className="text-gray-700 border w-100 p-2 rounded border-gray-300 outline-0"
            placeholder="This is a note description."
            value={note}
            onChange={handleInputChange}
          />
          <button
            className="p-2 border border-gray-300 w-20 rounded ml-2 cursor-pointer hover:bg-gray-100 transition"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
      </div>

      <div className="shadow-md mt-3 bg-white rounded-lg p-4">
        <h2 className="text-xl font-bold">Notes</h2>
        <ul>
          {todos.map((todo: string, index: number) => (
            <li
              key={index}
              className="text-gray-700  flex items-center justify-between border-t border-gray-300 p-2"
            >
              {todo}
              <div className="flex items-center gap-2">
                <Button onClick={() => showModal(index)}>Edit</Button>
                <Button onClick={() => handleDeleteTodo(index)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={editingValue} onChange={handleModalInputChange} />
      </Modal>
    </>
  );
}
