import { useState, useEffect } from "react";
import Task from "../Task/Task";
import TasksCounter from "../TasksCounter/TasksCounter";
import useTasks from "../../hooks/useTasks";
import TasksConditionConstants from "../../constants/TasksConditionConstants";
import TaskUtils from "../../utils/taskUtils";
import { TABS_LIST } from "./constants";
import styles from "./styles.module.scss";

const Todo = () => {
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterConditionValue, setFilterConditionValue] = useState(
    TasksConditionConstants.ALL
  );
  const { tasksList, setTasksList, onAddTask, onDeleteTask, onEditTask } =
    useTasks();

  const FILTERING_FUNCS = [
    (tasks) => TaskUtils.filterBySearch(tasks, searchValue),
    (tasks) => TaskUtils.filterByCondition(tasks, filterConditionValue),
  ];

  const filteredTasksList = FILTERING_FUNCS.reduce((tasks, func) => {
    return func(tasks);
  }, tasksList);

  useEffect(() => {
    restoreData();
  }, []);

  useEffect(() => {
    const saveTasksToLS = () => {
      localStorage.setItem("tasksList", JSON.stringify(tasksList));
    };

    window.addEventListener("beforeunload", saveTasksToLS);

    return () => {
      window.removeEventListener("beforeunload", saveTasksToLS);
    };
  }, [tasksList]);

  const restoreData = () => {
    const chachedTasksList = localStorage.getItem("tasksList");
    chachedTasksList && setTasksList(JSON.parse(chachedTasksList));
  };

  const onChangeAddValue = (e) => {
    setAddValue(e.target.value);
  };

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddTask = () => {
    if (!addValue) return;

    onAddTask(addValue);
    setAddValue("");
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const removeChecked = () => {
    setTasksList(
      tasksList.map((task) => ({
        ...task,
        checked: false,
      }))
    );
  };

  return (
    <div className={styles.todo}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          value={addValue}
          onChange={onChangeAddValue}
          onKeyUp={onEnterPress}
          placeholder="Input some task"
          type="text"
        />
        <button className={styles.addButton} onClick={handleAddTask}>
          Add
        </button>
      </div>
      <input
        onChange={onChangeSearchValue}
        value={searchValue}
        placeholder="Find task"
        type="text"
      />
      <div>
        {TABS_LIST.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterConditionValue(tab.value)}
            style={{
              border:
                filterConditionValue === tab.value ? "1px solid red" : "none",
            }}
          >
            {tab.text}
          </button>
        ))}
      </div>
      <ul>
        {filteredTasksList.map((task) => (
          <Task
            key={task.id}
            task={task}
            setTasksList={setTasksList}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))}
      </ul>
      <TasksCounter tasksList={filteredTasksList} />
      <button onClick={removeChecked}>Remove checked</button>
    </div>
  );
};

export default Todo;
