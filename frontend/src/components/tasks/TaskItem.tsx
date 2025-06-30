import type { Task } from "../../types/task";
import styles from "./TaskItem.module.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: TaskItemProps) {
  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task.id, !task.isCompleted)}
        className={styles.checkbox}
      />
      <span
        className={`${styles.title} ${
          task.isCompleted ? styles.titleCompleted : ""
        }`}
      >
        {task.title}
      </span>
      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          title="Editar Tarefa"
          onClick={() => onEdit(task)}
        >
          <FaPencilAlt />
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => onDelete(task.id)}
          title="Excluir Tarefa"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
