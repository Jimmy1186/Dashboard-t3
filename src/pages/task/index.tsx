import React, { useCallback, useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

import { z } from "zod";

import AddTaskBtn, { createTaskType } from "../components/tools/AddTaskBtn";
import { trpc } from "../../utils/trpc";

const taskSchema = z.object({
  id: z.string(),
});

export type taskType = z.infer<typeof taskSchema>;



type tl ={
  task_name:string|null,
}


function index() {
const { data: task,isLoading } = trpc.useQuery(["add.test"]);
const columns = useMemo<MRT_ColumnDef<tl>[]>(()=>[
  {
    accessorKey:'task_name',
    header:"表單名"
  }
],[]) 



  const createTaskMutation = trpc.useMutation(["add.create"]);
  
  console.log(task);
  const onCreate = useCallback(
    (values: createTaskType) => {
      createTaskMutation.mutate({
        id: values.id,
      });
    },
    [createTaskMutation]
  );



  return (
    <>
      <AddTaskBtn onCreateFn={onCreate} />
      <MaterialReactTable columns={columns} data={task? task:[]} />;
    </>
  );
}

export default index;
