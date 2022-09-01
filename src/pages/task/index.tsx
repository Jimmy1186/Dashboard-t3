import React, { useCallback ,useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';


import { z } from "zod";

import AddTaskBtn, { createTaskType } from "../components/tools/AddTaskBtn";
import { trpc } from "../../utils/trpc";

const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  p: z.number(),
  pValue: z.number(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  open: z.date().nullable(),
  createAt: z.date().nullable(),
  location: z.number(),
});

export type taskType = z.infer<typeof taskSchema>;













function index() {
  const createTaskMutation = trpc.useMutation(["add.create"]);
  const {data, isError, isFetching, isLoading } = trpc.useQuery(['add.findAllTask'])
  const onCreate = useCallback(
    (values: createTaskType) => {
      createTaskMutation.mutate({
        id: values.id,
        name: values.name,
      });
    },
    [createTaskMutation]
  );


  return (
    <>
      <AddTaskBtn onCreateFn={onCreate} />
      {/* <MaterialReactTable columns={columns} data={data} />; */}
    </>
  );
}

export default index;
