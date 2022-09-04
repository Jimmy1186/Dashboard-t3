import React, { useCallback, useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { z } from "zod";
import Skeleton from "@mui/material/Skeleton";
import AddTaskBtn, { createTaskType } from "../components/tools/AddTaskBtn";
import { trpc } from "../../utils/trpc";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@prisma/client";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  installments:
    | {
        percent: number | null;
        ok: boolean;
      }[]
    | null;
  CompanyTypes:
    | {
        company: {
          c_name: string | null;
        } | null;
        amount: Prisma.Decimal;
        cutPayment: Prisma.Decimal | null;
        notes: string | null;
      }[];
};

function index() {
  const {
    data: task,
    isLoading,
    refetch,
  } = trpc.useQuery(["add.taskList"], {
    keepPreviousData: true,
  });
  const createTaskMutation = trpc.useMutation(["add.create"]);


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
            cutPayment: number;
            notes: string;
          }[];
          const cv = cell.getValue() as cvType;

          return <div className="tableUsers">{cv[0]?.amount}</div>;
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "主差し引い",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
            notes: string;
          }[];
          const cv = cell.getValue() as cvType;

          return <div className="tableUsers">{cv[0]?.cutPayment}</div>;
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "主備註",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
            notes: string;
          }[];
          const cv = cell.getValue() as cvType;

          return <div className="tableUsers">{cv[0]?.notes}</div>;
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
              {c.slice(1).map((i: any) => {
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
          type cvTypes = {
            amount: number;
          };

          const c = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {c.slice(1).reduce((n, { amount }) => n + Number(amount), 0)}
              <br />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "支払差し引い",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
          }[];
          const c = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {c
                .slice(1)
                .reduce((n, { cutPayment }) => n + Number(cutPayment), 0)}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.CompanyTypes,
        header: "支払備註",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
            notes: string;
          }[];
          type cvTypes = {
            amount: number;
            cutPayment: number;
            notes: string;
          };

          const cv = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {cv.slice(1).map((i: cvTypes) => {
                return <p key={uuidv4()}>{i.notes}</p>;
              })}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.installments,
        header: "分割払い",
        Cell: ({ cell }) => {
          type iType = {
            percent: number;
            ok: boolean;
          }[];
          type iTypes = {
            percent: number;
            ok: boolean;
          };

          const cv = cell.getValue() as iType;

          return (
            <div className="tableUsers">
              {cv.map((i: iTypes) => {
                return (
                  <div className="installmenttable"  key={uuidv4()}>
                    <FormControlLabel control={<Checkbox defaultChecked={i.ok} />} label={i.percent} />
                  </div>
                );
              })}
            </div>
          );
        },
      },
    ],
    []
  );

  

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
    <div className="task-wrapper">
  <AddTaskBtn onCreateFn={onCreate} />
      {isLoading ? (
        <Skeleton animation="wave">
          <Paper elevation={3} />
        </Skeleton>
      ) : (
        <MaterialReactTable  columns={columns} data={task ? task : []} />
      )}

    </div>
    </>
  );
}

export default index;
