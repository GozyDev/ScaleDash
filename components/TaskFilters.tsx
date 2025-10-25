// app/tasks/TaskFilters.tsx
"use client";

import { Task } from "@/lib//superbase/type";
import { Button } from "@/components/ui/button";

interface TaskFiltersProps {
  filters: {
    status: "All" | Task["status"];
    priority: "All" | Task["priority"];
  };
  onFiltersChange: (filters: TaskFiltersProps["filters"]) => void;
}

export default function TaskFilters({
  filters,
  onFiltersChange,
}: TaskFiltersProps) {
  const statusOptions = ["All", "to-do", "in-progress", "done"] as const;
  const priorityOptions = ["All", "high","medium", "low"] as const;

  return (
    <div className="border-b border-cardCB px-6 py-4 ">
      <div className="flex flex-wrap gap-8">
        {/* Status Filter */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium  mr-2">Status:</span>
          {statusOptions.map((status) => (
            <Button
              key={status}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, status })}
              className={
                filters.status === status
                  ? "butt"
                  : ""
              }
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium">Priority:</span>
          {priorityOptions.map((priority) => (
            <Button
              key={priority}
              size="sm"
              onClick={() => onFiltersChange({ ...filters, priority })}
              className={
                filters.priority === priority
                  ? getPriorityButtonClass(priority)
                  : ""
              }
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getPriorityButtonClass(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-200/10 text-red-300 border-red-200";
    case "medium":
      return "bg-yellow-200/10 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-green-200/10 text-green-700 border-green-200";
    default:
      return "butt";
  }
}
