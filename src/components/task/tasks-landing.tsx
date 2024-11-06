import { ArrowBigLeft, ListPlus } from "lucide-react";
import { useState } from "react";

import { DataTable } from "../data-table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { taskColumns } from "./columns";
import { TaskCreationAndUpdateForm } from "./task-create-update-form";
import { useFetchTasksQuery } from "./task-hooks";

export const TaskLanding: React.FC = () => {
  return <TaskTable />;
};

const TaskTable: React.FC = () => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const { data: tasks, isLoading, isError, error } = useFetchTasksQuery();

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
            Create a Task
          </Button>
        )}
      </div>

      {/* Display either the task creation form or the data table */}
      {!isCreateFormVisible ? (
        <DataTable columns={taskColumns} data={tasks?.tasks ?? []} />
      ) : (
        <TaskCreationAndUpdateForm
          onCancel={() => setIsCreateFormVisible(false)}
          isEditMode={false}
          initialValues={null}
        />
      )}
    </div>
  );
};
