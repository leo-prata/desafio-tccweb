import { useState, useEffect } from "react";
import { setUpAPI } from "../services/api";
import type { Task } from "../types/task";

import { TaskForm } from "../components/tasks/TaskForm";
import { TaskList } from "../components/tasks/TaskList";
import { EditTaskModal } from "../components/tasks/EditTaskModal";

import styles from "./HomePage.module.css";

const api = setUpAPI();

export function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (err) {
      setError("Não foi possível carregar as tarefas.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (title: string) => {
    try {
      const response = await api.post<Task>("/tasks", { title });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (err) {
      alert("Erro ao criar a tarefa!");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      alert("Erro ao deletar a tarefa!");
    }
  };

  const handleUpdateTask = async (
    id: number,
    updates: Partial<Omit<Task, "id">>
  ) => {
    try {
      const response = await api.patch<Task>(`/tasks/${id}`, updates);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task))
      );
      if ("title" in updates) {
        setEditingTask(null);
      }
    } catch (err) {
      alert("Erro ao atualizar a tarefa!");
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Tarefas</h1>
      <TaskForm onTaskCreate={handleCreateTask} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleComplete={(id, isCompleted) =>
          handleUpdateTask(id, { isCompleted })
        }
        onEdit={handleOpenEditModal}
      />
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={handleCloseEditModal}
          onUpdate={(id, title) => handleUpdateTask(id, { title })}
        />
      )}
    </div>
  );
}
