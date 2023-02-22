import TaskUtils from "../../utils/taskUtils";
import styles from "./styles.module.scss";

const TasksCounter = ({ tasksList }) => {
  const amountOfDoneTasks = TaskUtils.getAmountOfDoneTasks(tasksList);
  const amountOfTasks = tasksList.length;
  const percentageOfDoneTasks = TaskUtils.getPercentageOfDoneTasks(tasksList);

  return (
    <div className={styles.taskCounter}>
      {amountOfDoneTasks}/{amountOfTasks}
      <span style={{
        width: `${percentageOfDoneTasks}%`
      }} className={styles.bg}></span>
    </div>
  );
};

export default TasksCounter;
