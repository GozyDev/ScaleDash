// app/tasks/TaskList.tsx
"use client";

import { Task } from "@/lib/superbase/type";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No tasks found</div>
        <div className="text-gray-500 text-sm mt-2">
          Create your first task to get started
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TaskCard task={task} onClick={() => onTaskClick(task)} />
        </motion.div>
      ))}
    </div>
  );
}
