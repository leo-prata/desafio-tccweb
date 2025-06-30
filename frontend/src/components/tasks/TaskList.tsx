import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onEdit: (task: Task) => void;
}

export function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onEdit,
}: TaskListProps) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
