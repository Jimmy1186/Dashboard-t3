import React, { useCallback, useMemo, useState, useEffect } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import Skeleton from "@mui/material/Skeleton";
import { trpc } from "../../utils/trpc";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { Edit, Delete } from "@mui/icons-material";
import { Tooltip, IconButton, Box, Button } from "@mui/material";
import CreateTask from "../../components/tools/CreateTask";
import Fab from "@mui/material/Fab";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { taskType, tl } from "../../types/task";
import { useSession } from "next-auth/react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import AddIcon from "@mui/icons-material/Add";
const initialValues = {
  id: "",
  task_name: "",
  p: 0,
  pValue: 0,
  startDate: null,
  endDate: null,
  openDate: null,
  createAt: new Date(),
  adapt:"新店",
  locations: {
    id: 11,
    location_name: "臺北市",
  },
  charges: [],
  installments: [
    {
      percent: 0,
      ok: false,
    },
  ],
  companyTypes: [
    {
      c_Type: "pri",
      company: {
        id: 1,
        c_name: "復華",
        c_title: "復華廣告有限公司",
        c_tax: "00000000",
      },
      amount: 0,
      cutPayment: 0,
      notes: null,
    },
  ],
};

function Index() {
  const [coe, setCoe] = useState(true);
  const [print,setPrint] =useState(false);
  const [editData, setEditData] = useState<taskType>();
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const {
    data: task,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = trpc.useQuery(["guest.taskList"]);
  const AllMutation = trpc.useMutation(["add.createTask"], {
    onSuccess: () => refetch(),
  });

  // const [cost, setCost] = useState<number[]>([]);
  const numberWithCommas = (x: number | undefined) => {
    if (x === undefined) x = 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // useEffect(() => {
  //   if (isLoading) return;
  //   if (task===undefined) return;
  //   const costFn = () =>
  //   task.map((i) => {
  //     return i.companyTypes.slice(1).reduce((acc, curr) => {
  //       return acc + Number(curr.amount) - Number(curr.cutPayment);
  //     }, 0);

  //   });

  //   setCost(costFn);
  //   console.log(cost);
  // }, [task]);

  const profit = useMemo(
    () =>
      task &&
      task.map((i) => {
        const mainpro =
          Number(i.companyTypes[0]?.amount) -
          Number(i.companyTypes[0]?.cutPayment);

        const lol = i.companyTypes.slice(1).reduce((acc, curr) => {
          return acc + Number(curr.amount) - Number(curr.cutPayment);
        }, 0);
        return mainpro - lol;
      }),
    [task]
  );

  const cost = useMemo(
    () =>
      task &&
      task.map((i) => {
        return i.companyTypes.slice(1).reduce((acc, curr) => {
          return acc + Number(curr.amount) - Number(curr.cutPayment);
        }, 0);
      }),
    [task]
  );

  // const costFn = useMemo(
  //   () =>
  //     task.map((i) => {
  //       return i.companyTypes.slice(1).reduce((acc, curr) => {
  //         return acc + Number(curr.amount) - Number(curr.cutPayment);
  //       }, 0);
  //     }),
  //   []
  // );

  const outbound = useMemo(
    () =>
      task?.map((i) => {
        let mainpro =
          Number(i.companyTypes[0]?.amount) -
          Number(i.companyTypes[0]?.cutPayment);

        let lol = i.companyTypes.slice(1).reduce((acc, curr) => {
          return acc + Number(curr.amount) - Number(curr.cutPayment);
        }, 0);
        return parseFloat(((lol / mainpro) * 100).toFixed(2));
      }),
    []
  );
  // console.log(task?.map((i)=>{
  //   return i.companyTypes.reduce((acc,curr)=>{
  //     return acc+ Number(curr.amount) -Number(curr.cutPayment)
  //   },0)
  // }))

  const editMutation = trpc.useMutation(["add.edit"], {
    onSuccess: () => refetch(),
  });

  const onEdit = useCallback(
    (values: taskType) => {
      const {
        id,
        task_name,
        p,
        pValue,
        startDate,
        endDate,
        openDate,
        createAt,
        adapt,
        locations,
        charges,
        installments,
        companyTypes,
      } = values;

      editMutation.mutate({
        id: id,
        task_name: task_name === editData?.task_name ? undefined : task_name,
        p: p === editData?.p ? undefined : p,
        pValue: pValue === editData?.pValue ? undefined : Number(pValue),
        startDate: startDate === editData?.startDate ? undefined : startDate,
        endDate: endDate === editData?.endDate ? undefined : endDate,
        openDate: openDate === editData?.openDate ? undefined : openDate,
        createAt: createAt === editData?.createAt ? undefined : createAt,
        adapt:adapt===editData?.adapt? undefined:adapt,
        locations: locations === editData?.locations ? undefined : locations,
        charges:
          JSON.stringify(charges) === JSON.stringify(editData?.charges)
            ? undefined
            : charges,
        companyType:
          JSON.stringify(companyTypes) ===
          JSON.stringify(editData?.companyTypes)
            ? undefined
            : companyTypes,
        installment:
          JSON.stringify(installments) ===
          JSON.stringify(editData?.installments)
            ? undefined
            : installments,
      });

      setOpen(false);
    },
    [editMutation]
  );

  const onAll = useCallback(
    (values: taskType) => {
      const {
        id,
        task_name,
        p,
        pValue,
        startDate,
        endDate,
        openDate,
        createAt,
        adapt,
        locations,
        charges,
        installments,
        companyTypes,
      } = values;

      AllMutation.mutate({
        id: id,
        task_name: task_name,
        p: p,
        pValue: Number(pValue),
        startDate: startDate,
        endDate: endDate,
        openDate: openDate,
        createAt: createAt,
        adapt:adapt,
        locations: locations,
        charges: charges,
        installment: installments,
        companyType: companyTypes,
      });
      setOpen(false);
    },
    [task, AllMutation]
  );

  const editTask = (val: any) => {
    setCoe(false);
    setEditData(val);
    setOpen(!open);
  };

  const deleteMutation = trpc.useMutation(["add.delete"], {
    onSuccess: () => refetch(),
  });

  const onDeleteRow = useCallback(
    (row: MRT_Row<tl>) => {
      if (!confirm(`確定刪除 ${row.getValue("id")} ?`)) {
        return;
      }

      deleteMutation.mutate({
        id: row.getValue("id"),
      });
    },
    [task, deleteMutation]
  );

  const columns = useMemo<MRT_ColumnDef<tl>[]>(
    () => [
      {
        accessorKey: "id",
        header: "編號",
        enableEditing: false,
      },
      {
        accessorKey: "task_name",
        header: "表單名",
      },
      {
        accessorKey: "p",
        header: "坪數",
      },
      {
        accessorKey: "pValue",
        header: "坪單價",
        muiTableBodyCellEditTextFieldProps: {
          type: "number",
        },
        Cell: ({ cell }) => (
          <p className="pValue">{numberWithCommas(cell.getValue<number>())}</p>
        ),
      },
      {
        accessorKey: "adapt",
        header: "工程",
      },
      {
        accessorKey: "locations.location_name",
        header: "地區",
      },
      {
        accessorFn: (row) => row.charges,
        header: "擔當人",
        Cell: ({ cell }) => {
          const users = cell.getValue() as Array<string>;

          return (
            <div className="tableUsers">
              {users.map((i: any) => {
                return <p key={uuidv4()}>{i.users.username}</p>;
              })}

              <br />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.companyTypes,
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
        accessorFn: (row) => row.companyTypes,
        header: "主総額",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
            notes: string;
          }[];
          const cv = cell.getValue() as cvType;

          return <p className="mainTotal">{numberWithCommas(cv[0]?.amount)}</p>;
        },
      },
      {
        accessorFn: (row) => row.companyTypes,
        header: "主差し引い",

        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
            notes: string;
          }[];
          const cv = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {numberWithCommas(cv[0]?.cutPayment)}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.companyTypes,
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
        accessorFn: (row) => row.companyTypes,
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
        accessorFn: (row) => row.companyTypes,
        header: "支払総額",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
          }[];

          const c = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {numberWithCommas(
                c.slice(1).reduce((n, { amount }) => n + Number(amount), 0)
              )}
              <br />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.companyTypes,
        header: "支払差し引い",
        Cell: ({ cell }) => {
          type cvType = {
            amount: number;
            cutPayment: number;
          }[];
          const c = cell.getValue() as cvType;

          return (
            <div className="tableUsers">
              {numberWithCommas(
                c
                  .slice(1)
                  .reduce((n, { cutPayment }) => n + Number(cutPayment), 0)
              )}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.companyTypes,
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
                  <div className="installmenttable" key={uuidv4()}>
                    <Fab variant="extended" disabled={i.ok} color="success">
                      <PriceCheckIcon />
                      <h4>{i.percent}%</h4>
                    </Fab>
                  </div>
                );
              })}
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.createAt,
        header: "作成日",
        Cell: ({ cell }) => {
          const d = cell.getValue() as Date;

          return <p>{format(new Date(d), "yyyy-MM-dd")}</p>;
        },
      },
      {
        accessorFn: (row) => row.startDate,
        header: "開工日",
        Cell: ({ cell }) => {
          const d = cell.getValue() as Date;

          return <p>{format(new Date(d), "yyyy-MM-dd")}</p>;
        },
      },
      {
        accessorFn: (row) => row.endDate,
        header: "完工日",
        Cell: ({ cell }) => {
          const d = cell.getValue() as Date;

          return <p>{format(new Date(d), "yyyy-MM-dd")}</p>;
        },
      },
      {
        accessorFn: (row) => row.openDate,
        header: "開幕日",
        Cell: ({ cell }) => {
          const d = cell.getValue() as Date;

          return <p>{format(new Date(d), "yyyy-MM-dd")}</p>;
        },
      },
      {
        header: "利益",
        Cell: ({ row }) => {
          // const total = cell.getValue() as any;

          // console.log(cell.row.original.companyTypes?.reduce((acc,prr)=>acc + prr.amount))
          if (isLoading) {
            return <>loading</>;
          }
          return profit === undefined ? (
            ""
          ) : (
            <p className="profit">{numberWithCommas(profit[Number(row.id)])}</p>
          );
        },
      },
      {
        header: "総原価合計",
        Cell: ({ row }) => {
          // const total = cell.getValue() as any;

          // console.log(cell.row.original.companyTypes?.reduce((acc,prr)=>acc + prr.amount))
          // return <><p>{cost}</p></>

          return (
            <p className="cost">
              {numberWithCommas(cost && cost[Number(row.id)])}
            </p>
          );
        },
      },
      {
        header: "外注率",
        Cell: ({ row }) => {
          // const total = cell.getValue() as any;

          // console.log(cell.row.original.companyTypes?.reduce((acc,prr)=>acc + prr.amount))
          if (isLoading) {
            return <>loading</>;
          }
          return outbound === undefined ? (
            ""
          ) : (
            <p className="cost">
              {numberWithCommas(outbound[Number(row.id)])}%
            </p>
          );
        },
      },
    ],
    []
  );

  if (isLoading || task === undefined) {
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
        {isLoading ? (
          <Skeleton animation="wave">
            <Paper elevation={3} />
          </Skeleton>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={task ? task : []}
            editingMode="modal" //default
            enableColumnOrdering
            enableRowSelection
            enableEditing
            state={{
              isLoading,
              showAlertBanner: isError,
              showProgressBars: isFetching,
            }}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => editTask(row.original)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => onDeleteRow(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  disabled={session?.user?.role === "R"}
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={() => {
                    setOpen(!open);
                    setCoe(true);
                  }}
                >
                  新增
                </Button>
                <Button
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  //only export selected rows
                  // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                  startIcon={<LocalPrintshopIcon />}
                  variant="contained"
                >
                  列印
                </Button>
              </Box>
            )}
          />
        )}
        {editData != undefined ? (
          <CreateTask
            coe={coe}
            open={open}
            setOpen={setOpen}
            onAll={onAll}
            onEdit={onEdit}
            initialValues={coe ? initialValues : editData}
          />
        ) : (
          <CreateTask
            open={open}
            coe={coe}
            setOpen={setOpen}
            onAll={onAll}
            onEdit={onEdit}
            initialValues={initialValues}
          />
        )}

        {
          print 
        }
      </div>
    </>
  );
}

export default Index;
