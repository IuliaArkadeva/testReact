import TasksConditionConstants from "../constants/TasksConditionConstants";

const getAmountOfDoneTasks = (tasksList) =>
  tasksList.reduce((sum, task) => (task.checked ? sum + 1 : sum), 0);

const getPercentageOfDoneTasks = (tasksList) => {
  const amountOfDoneTasks = getAmountOfDoneTasks(tasksList);
  const amountOfTasks = tasksList.length;
  return (amountOfDoneTasks / amountOfTasks) * 100;
};

const filterBySearch = (tasksList, val) =>
  tasksList.filter((task) => task.title.search(val) !== -1);

const filterByCondition = (tasksList, val) => {
  switch (val) {
    case TasksConditionConstants.ALL:
      return tasksList;
    case TasksConditionConstants.ACTIVE:
      return tasksList.filter((task) => !task.checked);
    case TasksConditionConstants.DONE:
      return tasksList.filter((task) => task.checked);
    default:
      return tasksList;
  }
};

const TaskUtils = {
  getAmountOfDoneTasks,
  getPercentageOfDoneTasks,
  filterBySearch,
  filterByCondition,
};

export default TaskUtils;
