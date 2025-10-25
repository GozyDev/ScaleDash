import TaskClient from "@/components/TaskClient";
import React from "react";

export default async function Taskpage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  console.log("project", projectId);
  return (
    <div>
      <TaskClient project_id={projectId} />
    </div>
  );
}
