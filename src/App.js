import "./App.css";
import { useState } from "react";

const ToDo = (props) => {

  const checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('click', function() {
    if (this.checked) {
      this.classList.add('checked');
    } else {
      this.classList.remove('checked');
    }
  });

  const [completed, setCompleted] = useState(props.completed);
  const [important, setImportant] = useState(props.important);
  const [description, setDescription] = useState(props.description);
  const [startTime, setStartTime] = useState(props.startTime);
  const [endTime, setEndTime] = useState(props.endTime);

  const handleUpdate = () => {
    props.onUpdate({
      id: props.id,
      completed,
      important,
      description,
      startTime,
      endTime
    });
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
      </td>
      <td onClick={() => setImportant(!important)}>
        {important ? "⭐️" : ""}
      </td>
      <td>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        -
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </td>
      <td>
        <button onClick={handleUpdate}>Saglabāt/Save</button>
        <button onClick={props.onDelete}>Dzēst/Delete</button>
      </td>
    </tr>
  );
};

function App() {
  const [todos, setTodos] = useState([
    {
      id: "todo1",
      description: "Pirkt pienu",
      completed: false,
      important: false,
      startTime: "18:00",
      endTime: "18:30"
    },
    {
      id: "todo2",
      description: "Iziet ar suni",
      completed: false,
      important: false,
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
      completed: false,
      important: false,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime
    };
    setTodos([...todos, newTask]);
    setNewTaskDescription("");
    setNewTaskStartTime("");
    setNewTaskEndTime("");
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTask.id ? updatedTask : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  
  return (
  <div className="App">
  <h1>ToDo List - Uzdevumu saraksts</h1>
  <table>
  <thead>
  <tr>
  <th>Uzdevums/Task</th>
  <th>Pabeigts/Finished</th>
  <th>Svarīgs/Important</th>
  <th>Laiks/Time</th>
  <th>Darbības/Options</th>
  </tr>
  </thead>
  <tbody>
  {todos.map((todo) => (
  <ToDo
  key={todo.id}
  id={todo.id}
  completed={todo.completed}
  important={todo.important}
  description={todo.description}
  startTime={todo.startTime}
  endTime={todo.endTime}
  onUpdate={handleUpdateTask}
  onDelete={() => handleDeleteTask(todo.id)}
  />
  ))}
  <tr>
  <td>
  <input
  type="text"
  placeholder="Apraksts"
  value={newTaskDescription}
  onChange={(e) => setNewTaskDescription(e.target.value)}
  />
  </td>
  <td></td>
  <td></td>
  <td>
  <input
  type="time"
  value={newTaskStartTime}
  onChange={(e) => setNewTaskStartTime(e.target.value)}
  />
  -
  <input
  type="time"
  value={newTaskEndTime}
  onChange={(e) => setNewTaskEndTime(e.target.value)}
  />
  </td>
  <td>
  <button onClick={handleAddTask}>Pievienot/Add</button>
  </td>
  </tr>
  </tbody>
  </table>
  <button onClick={reverseOrder}>Apgriezt secību/Reorder</button>
  </div>
  );
  }
  
  export default App;
