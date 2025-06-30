import { useState, useEffect, type FormEvent } from "react";
import type { Task } from "../../types/task";
import styles from "./EditTaskModal.module.css";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (id: number, title: string) => void;
}

export function EditTaskModal({ task, onClose, onUpdate }: EditTaskModalProps) {
  const [newTitle, setNewTitle] = useState(task.title);

  useEffect(() => {
    setNewTitle(task.title);
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(task.id, newTitle);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Editar Tarefa</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveButton}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
