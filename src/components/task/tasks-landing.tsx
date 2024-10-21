import { taskColumns } from "./columns";
import { DataTable } from "../data-table";
import { useCreateTaskMutation, useFetchTasksQuery } from "./task-hooks";
import { Button } from "../ui/button";
import { ArrowBigLeft, ListPlus } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { TaskCreationAndUpdateForm } from "./task-create-update-form";

export const TaskLanding: React.FC = () => {
  return <TaskTable />;
};

const TaskTable: React.FC = () => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const { data: tasks, isLoading, isError, error } = useFetchTasksQuery();
  const { mutate: createTask } = useCreateTaskMutation();

  const handleCreateTask = (newTask: any) => {
    createTask(newTask);
    setIsCreateFormVisible(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Skeleton className="mb-4 h-8 w-full" />
        <Skeleton className="h-18 mb-4 w-full" />
        <Skeleton className="h-18 mb-4 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div
        className={`flex items-center ${isCreateFormVisible ? "justify-between" : "justify-end"}`}
      >
        {/* Toggle between showing the create form or table */}
        {isCreateFormVisible ? (
          <Button
            variant="outline"
            className="mb-1 shadow"
            onClick={() => setIsCreateFormVisible(false)}
          >
            <ArrowBigLeft size={16} />
            Back
          </Button>
        ) : (
          <Button
            variant="outline"
            className="mb-1 shadow"
            onClick={() => setIsCreateFormVisible(true)}
          >
            <ListPlus size={16} />
            Edit Task
          </Button>
        )}
      </div>

      {/* Display either the task creation form or the data table */}
      {!isCreateFormVisible ? (
        <DataTable columns={taskColumns} data={tasks?.tasks ?? []} />
      ) : (
        <TaskCreationAndUpdateForm
          onCancel={() => setIsCreateFormVisible(false)}
          onCreate={handleCreateTask}
          isEditMode={false}
          initialValues={null}
        />
      )}
    </div>
  );
};
