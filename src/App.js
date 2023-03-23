import "./App.css";
import { useState } from "react";

const ToDo = (props) => {
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  return (
    <tr>
      <td>
        <label>{props.description}</label>
      </td>
      <td>
        <input type="checkbox" onChange={() => setCompleted(!completed)} />
      </td>
      <td onClick={() => setImportant(!important)}>
        {important ? "⭐️" : ""}
      </td>
      <td className={completed ? "completed" : ""}>
        <label>{props.startTime} - {props.endTime}</label>
      </td>
      <td>
        <button onClick={props.onDelete}>Dzēst</button>
      </td>
    </tr>
  );
};

function App() {
  const [todos, setTodos] = useState([
    {
      id: "todo1",
      description: "Pirkt pienu",
      startTime: "18:00",
      endTime: "18:30"
    },
    {
      id: "todo2",
      description: "Iziet ar suni",
      startTime: "20:30",
      endTime: "21:00"
    },
  ]);

  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStartTime, setNewTaskStartTime] = useState("");
  const [newTaskEndTime, setNewTaskEndTime] = useState("");

  const reverseOrder = () => {
    const newTodos = [...todos].reverse();
    setTodos(newTodos);
  };

  const handleAddTask = () => {
    if (newTaskDescription.trim() === "") return;
    const newTask = {
      id: `todo${todos.length + 1}`,
      description: newTaskDescription,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime
    };
    setTodos([...todos, newTask]);
    setNewTaskDescription("");
    setNewTaskStartTime("");
    setNewTaskEndTime("");
  };

  const handleDeleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <div>
        Uzdevuma apraksts:
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        Sākuma laiks:
        <input
          type="time"
          value={newTaskStartTime}
          onChange={(e) => setNewTaskStartTime(e.target.value)}
        />
        Beigu laiks:
        <input
          type="time"
          value={newTaskEndTime}
          onChange={(e) => setNewTaskEndTime(e.target.value)}
        />
        <button onClick={handleAddTask}>Pievienot jaunu uzdevumu</button>
      </div>

      <button onClick={reverseOrder}>Pārkārtot</button>

      <table>
        <tbody>
          {todos.map((todo, index) => (
            <ToDo key={index} {...todo} onDelete={() => handleDeleteTask(index)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;