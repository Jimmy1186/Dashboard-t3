import React, { useCallback, useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { z } from "zod";
import Skeleton from "@mui/material/Skeleton";
import AddTaskBtn, { createTaskType } from "../components/tools/AddTaskBtn";
import { trpc } from "../../utils/trpc";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client'




const taskSchema = z.object({
  id: z.string(),
});

export type taskType = z.infer<typeof taskSchema>;

type tl = {
  id: string;
  task_name: string | null;
  locations: {
    location_name: string | null;
  } | null;
  charges:
    | {
        users: {
          username: string;
        } | null;
      }[]
    | null;
  CompanyTypes:
    | {
        company: {
          c_name: string | null;
        } | null;
        amount: Prisma.Decimal
      }[];
};

function index() {
  const { data: task, isLoading,refetch } = trpc.useQuery(["add.taskList"]);
  const columns = useMemo<MRT_ColumnDef<tl>[]>(
    () => [
      {
        accessorKey: "id",
        header: "編號",
      },
      {
        accessorKey: "task_name",
        header: "表單名",
      },
      {
        accessorKey: "locations.location_name",
        header: "地區",
      },
      {
        accessorFn: (row) => row.charges,
        header: "擔當人",
        Cell: ({ cell }) => {
          const users = cell.getValue() as Array<String>;

          return (
            <div className="tableUsers">
              {users.map((i: any, n: number) => {
                return <p key={uuidv4()}>{i.users.username}</p>;
              })}

              <br />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "主会社",
        Cell: ({ cell }) => {
          type cType = {
            company: {
              c_name: string | null;
            };
          }[];
          const c = cell.getValue() as cType;

          return <div className="tableUsers">{c[0]?.company.c_name}</div>;
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "主総額",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
          }[];
          const cv = cell.getValue() as cvType;

          return <div className="tableUsers">{cv[0]?.amount}</div>;
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "支払業者",
        Cell: ({ cell }) => {
          type cType = {
            company: {
              c_name: string | null;
            };
          }[];
          const c = cell.getValue() as cType;

          return (
            <div className="tableUsers">
              {c.slice(1).map((i: any, n: number) => {
                return <p key={uuidv4()}>{i.company.c_name}</p>;
              })}

              <br />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "支払総額",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
          }[];
      
          const c = cell.getValue() as cvType;

          return (
            <div className="tableUsers" >
              {c.slice(1).map((i: any) => {
                return <p key={uuidv4()}>{i.amount}</p>;
              })}

              <br />
            </div>
          );
        },
      },
    ],
    []
  );

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

  if (isLoading) {
    return (
      <>
        <Skeleton />

        <Skeleton animation={false} />
      </>
    );
  }
  return (
    <>
      <AddTaskBtn onCreateFn={onCreate} />
      {isLoading ? (
        <Skeleton animation="wave">
          <Paper elevation={3} />
        </Skeleton>
      ) : (
        <MaterialReactTable columns={columns} data={task ? task : []} />
      )}
      ;
    </>
  );
}

export default index;
