import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTasks = () => {
  const [tasksList, setTasksList] = useState([]);

  const onAddTask = (addValue) => {
    const id = uuidv4();

    setTasksList([
      ...tasksList,
      {
        id,
        title: addValue,
        checked: false,
      },
    ]);
  };

  const onDeleteTask = (id) => {
    const newTasksList = tasksList.filter((task) => task.id !== id);

    setTasksList(newTasksList);
  };
  
  const onEditTask = (newTask) => {
    const newTasksList = tasksList.map((task) => {
      if (newTask.id === task.id) return newTask;

      return task;
    });

    setTasksList(newTasksList);
  };

  return {
    tasksList,
    setTasksList,
    onAddTask,
    onDeleteTask,
    onEditTask,
  };
};

export default useTasks;
