// app/tasks/TaskDrawer.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Task, TaskInsert, TaskUpdate } from "@/lib/superbase/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Save, Trash2, Calendar } from "lucide-react";

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: TaskUpdate | Omit<TaskInsert, "project_id">) => void;
  onDelete?: () => void;
}

export default function TaskDrawer({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: TaskDrawerProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium" as Task["priority"],
    status: "To-do" as Task["status"],
    due_date: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        due_date: task.due_date || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "to-do",
        due_date: "",
      });
    }
  }, [task]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    if (!onDelete) {
      return;
    }
    try {
      onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-96 max-w-full bg-cardCB/70 shadow-xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cardCB">
          <h2 className="text-lg font-semibold">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 px-4 space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-textNc">
              Title{" "}
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              className="border-b rounded-none border-b-primaryC bg-bgPrimary/50 outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="mt-1 h-[100] resize-none bg-bgPrimary/50 border-cardCB"
            />
          </div>

          {/* Priority & Status */}
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task["priority"]) =>
                  handleChange("priority", value)
                }
              >
                <SelectTrigger className="border-cardCB bg-bgPrimary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-cardCB text-textNb border-cardCB">
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Task["status"]) =>
                  handleChange("status", value)
                }
              >
                <SelectTrigger className="border-cardCB bg-bgPrimary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-do">To-do</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="due_date">Due Date</Label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => handleChange("due_date", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-cardCB">
          <div>
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-red-800 border-red-200 bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || isSaving}
              className="butt"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
