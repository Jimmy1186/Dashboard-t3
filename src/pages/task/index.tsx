import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import Skeleton from "@mui/material/Skeleton";
import { trpc } from "../../utils/trpc";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { Edit, Delete } from "@mui/icons-material";
import { Tooltip, IconButton, Box, Button, Stack, Menu } from "@mui/material";
import CreateTask from "../../components/tools/CreateTask";
import Fab from "@mui/material/Fab";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { taskType, tl } from "../../types/task";
import { useSession } from "next-auth/react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadXlsx from "../../components/tools/DownloadXlsx";
import AddCompony from "../../components/widget/AddCompony";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";
import Head from "next/head";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValues = {
  id: "",
  task_name: "",
  p: 0,
  pValue: 0,
  startDate: null,
  endDate: null,
  openDate: null,
  createAt: new Date(),
  adapt: "新店",
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
        c_name: "聚思怡",
        c_title: "台灣聚思怡股份有限公司",
        c_tax: "90443462",
      },
      amount: 0,
      cutPayment: 0,
      notes: null,
    },
  ],
};
const numberWithCommas = (x: number | undefined) => {
  if (x === undefined) x = 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Index() {
  const [coe, setCoe] = useState(true);
  const [msgType, setMsgType] = useState<boolean>(false);
  const [editData, setEditData] = useState<taskType>();
  const [openAddCompany, setOpenAddCompany] = React.useState(false);
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openTool = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAlert = () => {
    setShowingAlert(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    data: task,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = trpc.useQuery(["guest.taskList"], {
    keepPreviousData: true,
  });

  const AllMutation = trpc.useMutation(["add.createTask"], {
    onSuccess: () => {
      refetch();
      setShowingAlert(true);
      setMsgType(true)
    },
    onError: () => {
      setShowingAlert(true);
      setMsgType(true)
    },
  });

  const profit = useMemo(
    () =>
      task &&
      task.map((i) => {
        const mainProfit =
          Number(i.companyTypes[0]?.amount) -
          Number(i.companyTypes[0]?.cutPayment);

        const cutValue = i.companyTypes.slice(1).reduce((acc, curr) => {
          return acc + Number(curr.amount) - Number(curr.cutPayment);
        }, 0);

        return mainProfit - cutValue;
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

  const outbound = useMemo(
    () =>
      task &&
      task.map((i) => {
        const mainpro =
          Number(i.companyTypes[0]?.amount) -
          Number(i.companyTypes[0]?.cutPayment);

        const lol = i.companyTypes.slice(1).reduce((acc, curr) => {
          return acc + Number(curr.amount) - Number(curr.cutPayment);
        }, 0);
        const o = parseFloat(((lol / mainpro) * 100).toFixed(2));

        return isNaN(o) ? 0 : o;
      }),
    [task]
  );

  const editMutation = trpc.useMutation(["add.edit"], {
    onSuccess: () => {
      refetch();
      setShowingAlert(true);
      setMsgType(false)
    },
    onError: () => {
      setShowingAlert(true);
      setMsgType(false)
    },
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
        adapt: adapt === editData?.adapt ? undefined : adapt,
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
        adapt: adapt,
        locations: locations,
        charges: charges,
        installment: installments,
        companyType: companyTypes,
      });
      setOpen(false);
    },
    [AllMutation]
  );

  const editTask = (val: any) => {
    setCoe(false);
    setEditData(val);
    setOpen(!open);
  };

  const deleteMutation = trpc.useMutation(["add.delete"], {
    onSuccess: () => {
      refetch();
      setShowingAlert(true);
    },
    onError: () => {
      setShowingAlert(true);
    },
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
    [deleteMutation]
  );

  const columns = useMemo<MRT_ColumnDef<tl>[]>(
    () => [
      {
        accessorKey: "id",
        header: "編號",
        enableEditing: false,
        enableGrouping: false,
      },
      {
        accessorKey: "task_name",
        header: "表單名",
        enableGrouping: false,
      },
      {
        accessorKey: "p",
        header: "坪數",
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
      },
      {
        accessorFn: (row) => row.companyTypes,
        header: "主差し引い",
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
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
        enableGrouping: false,
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
                    <Fab variant="extended" disabled={!i.ok} color="success">
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
        enableGrouping: false,
        Cell: ({ row }) => {
          if (isLoading) {
            return <CircularProgress color="success" />;
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
        enableGrouping: false,
        Cell: ({ row }) => {
          if (isLoading) {
            return <CircularProgress color="success" />;
          }
          return (
            <p className="cost">
              {numberWithCommas(cost && cost[Number(row.id)])}
            </p>
          );
        },
      },
      {
        header: "外注率",
        enableGrouping: false,
        Cell: ({ row }) => {
          if (isLoading) {
            return <CircularProgress color="success" />;
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
    [profit, cost, outbound]
  );

  if (isLoading || task === undefined) {
    return (
      <>
        <div className="bgPaper">
          <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
            </Stack>

            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton animation="wave" height={50} />
          </Stack>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>SEMBA | 報告</title>
      </Head>
      <div className="task-wrapper">
        <div className="bgPaper">
          {" "}
          <MaterialReactTable
            columns={columns}
            data={task ? task : []}
            editingMode="modal" //default
            enableColumnOrdering
            enableRowSelection
            enableEditing
            enableMultiRowSelection={false}
            enableGrouping
            state={{
              isLoading,
              showAlertBanner: isError,
              showProgressBars: isFetching,
            }}
            renderRowActions={({ row }) => (
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
              <>
                <div className="flex md:hidden">
                  <Button
                    id="basic-button"
                    aria-controls={openTool ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openTool ? "true" : undefined}
                    onClick={handleClick}
                  >
                    工具
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openTool}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "1rem", p: "0.5rem" }}>
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
                      <DownloadXlsx
                        clickableState={table.getIsSomeRowsSelected()}
                        rowValue={table.getSelectedRowModel().rows}
                        profit={profit}
                        cost={cost}
                        outbound={outbound}
                      />

                      <Button
                        startIcon={<AddBusinessIcon />}
                        variant="contained"
                        onClick={() => {
                          setOpenAddCompany(true);
                        }}
                      >
                        新增公司資料
                      </Button>
                    </Box>
                  </Menu>
                </div>

                <div className="hidden md:flex">
                  <Box sx={{ display: "flex", gap: "1rem", p: "0.5rem" }}>
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
                    <DownloadXlsx
                      clickableState={table.getIsSomeRowsSelected()}
                      rowValue={table.getSelectedRowModel().rows}
                      profit={profit}
                      cost={cost}
                      outbound={outbound}
                    />

                    <Button
                      startIcon={<AddBusinessIcon />}
                      variant="contained"
                      onClick={() => {
                        setOpenAddCompany(true);
                      }}
                    >
                      新增公司資料
                    </Button>
                  </Box>
                </div>
              </>
            )}
          />
        </div>

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
        <AddCompony
          openAddCompany={openAddCompany}
          setOpenAddCompany={setOpenAddCompany}
        />
      </div>
    


      <Snackbar
        open={isShowingAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity={msgType? (AllMutation.data?.alertStatus as AlertColor):(editMutation.data?.alertStatus as AlertColor)}>
         {msgType?(AllMutation.data?.msg):(editMutation.data?.msg)}

        </Alert>
      </Snackbar>
    </>
  );
}

export default Index;
