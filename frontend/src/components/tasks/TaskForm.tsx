import { useState } from "react";
import type { FormEvent } from "react";

import styles from "./TaskForm.module.css";

interface TaskFormProps {
  onTaskCreate: (title: string) => void;
}

export function TaskForm({ onTaskCreate }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      alert("Por favor, insira um título para a tarefa.");
      return;
    }
    onTaskCreate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Adicionar nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Adicionar
      </button>
    </form>
  );
}
