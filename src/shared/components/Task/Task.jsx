import { useState } from "react";
import styles from "./styles.module.scss";

const Task = ({ task, onDeleteTask, onEditTask }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const { id, title, checked } = task;

  const handleAddTask = (e) => {
    if (e.code !== "Enter") return;

    onEditTask({
      ...task,
      title: editValue,
    });
    setIsEditMode(false);
  };

  const onCheckedChange = (e) => {
    onEditTask({
      ...task,
      checked: e.target.checked,
    });
  };

  return (
    <li>
      <input onChange={onCheckedChange} checked={checked} type="checkbox" />
      {isEditMode ? (
        <input
          onKeyUp={handleAddTask}
          onChange={(e) => setEditValue(e.target.value)}
          value={editValue}
          type="text"
        />
      ) : (
        <p
          style={{
            textDecoration: checked ? "line-through" : "none",
          }}
        >
          {title}
        </p>
      )}
      {!isEditMode && (
        <button onClick={() => setIsEditMode(true)} className={styles.edit}>
          edit
        </button>
      )}
      <button onClick={() => onDeleteTask(id)} className={styles.delete}>
        X
      </button>
    </li>
  );
};

export default Task;
