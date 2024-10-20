import { taskColumns } from "./columns";
import { DataTable } from "../data-table";
import { apiRequest } from "@/lib/utils";
import { tasks } from "@/lib/constants";

export const Tasks: React.FC = () => {
  return <TaskTable />;
};

const TaskTable: React.FC = () => {
  const fetchTasks = async () => {
    return await apiRequest("tasks/", { method: "GET" });
  };

  console.log("test", fetchTasks());

  return (
    <div className="container mx-auto">
      {/* @ts-ignore */}
      <DataTable columns={taskColumns} data={tasks} />
    </div>
  );
};
