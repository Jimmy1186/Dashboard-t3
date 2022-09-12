import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import Skeleton from "@mui/material/Skeleton";
import { trpc } from "../../utils/trpc";
import Paper from "@mui/material/Paper";
import { v4 as uuidv4 } from "uuid";
import { Prisma } from "@prisma/client";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { format } from "date-fns";
import { Edit, Delete } from "@mui/icons-material";
import { Tooltip, IconButton, Box, Autocomplete } from "@mui/material";
import CreateTask from "../../components/tools/CreateTask";
import { taskType } from "../../types/task";


type tl = {
  id: string;
  task_name: string | null;
  p:number|null;
  pValue: Prisma.Decimal | null ;
  startDate: Date | null;
  endDate: Date | null;
  createAt: Date;
  openDate: Date | null;
  locations: {
    location_name: string | null;
    id:number;
  } | null;
  charges:
    | {
        users: {
          username: string;
          id:string;
        } | null;
      }[]
    | null;
  installments:
    | {
        percent: number | null;
        ok: boolean;
      }[]
    | null;
  companyTypes:
    | {
        company: {
          id:number | null;
          c_name: string | null;
          c_title:string | null;
          c_tax:string | null;
        } | null;
        c_Type:string;
        amount: Prisma.Decimal;
        cutPayment: Prisma.Decimal | null;
        notes: string | null;
      }[] | null;
};



const initialValues = {
  id: "",
  task_name: "",
  p: 0,
  pValue: 0,
  startDate: null,
  endDate: null,
  openDate: null,
  createAt: new Date(),
  locations: {
    id: 11,
    location_name: "臺北市南港區"
  },
  charges:[],
  installments: [
    {
      percent: 0,
      ok: false,
    },
  ],
  companyTypes: [
    {
      c_Type: "pri",
      company:{
        
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
  const [coe,setCoe]=useState(true)
  const [editData,setEditData]= useState<taskType>()
  const [open, setOpen] = React.useState(false);
  const { data: task, isLoading, refetch } = trpc.useQuery(["add.taskList"]);
  const AllMutation = trpc.useMutation(["add.createTask"], {
    onSuccess: () => refetch(),
  });
  const editMutation = trpc.useMutation(['add.edit'],{
    onSuccess:()=>refetch()
  })

const onEdit = useCallback((values:taskType)=>{
  const {
    id,
    task_name,
    p,
    pValue,
    startDate,
    endDate,
    openDate,
    createAt,
    locations,
    charges,
    installments,
    companyTypes,
  } = values;

// console.log(charges===editData?.charges? true:false)
// console.log(JSON.stringify(charges)===JSON.stringify(editData?.charges))
console.log(JSON.stringify(companyTypes)===JSON.stringify(editData?.companyTypes))

  editMutation.mutate({
    id: id,
    task_name: task_name===editData?.task_name? undefined:task_name,
    p: p===editData?.p? undefined:p,
    pValue: pValue===editData?.pValue? undefined:Number(pValue),
    startDate: startDate===editData?.startDate? undefined:startDate,
    endDate: endDate===editData?.endDate? undefined:endDate,
    openDate: openDate===editData?.openDate? undefined:openDate,
    createAt: createAt===editData?.createAt? undefined:createAt,
    locations: locations===editData?.locations? undefined:locations,
    charges: JSON.stringify(charges)===JSON.stringify(editData?.charges)? undefined:charges,
    companyType:JSON.stringify(companyTypes)===JSON.stringify(editData?.companyTypes)? undefined:companyTypes,
    installment:JSON.stringify(installments)===JSON.stringify(editData?.installments)? undefined:installments
  })


  setOpen(false);


},[editMutation])

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
        locations,
        charges,
        installments,
        companyTypes,
      } = values;

  

      AllMutation.mutate({
        id: id,
        task_name: task_name,
        p:p,
        pValue: Number(pValue),
        startDate: startDate,
        endDate: endDate,
        openDate: openDate,
        createAt: createAt,
        locations: locations,
        charges: charges,
        installment: installments,
        companyType: companyTypes,
      });
      setOpen(false);
    },
    [task, AllMutation]
  );

  const editTask =(val:any)=>{
    setCoe(false)
    console.log(val)
    setEditData(val)
    setOpen(!open)
  }

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
          type: 'number',
        },
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

          return <div className="tableUsers">{cv[0]?.amount}</div>;
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

          return <div className="tableUsers">{cv[0]?.cutPayment}</div>;
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
              {c.slice(1).reduce((n, { amount }) => n + Number(amount), 0)}
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
              {c
                .slice(1)
                .reduce((n, { cutPayment }) => n + Number(cutPayment), 0)}
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
                    <FormControlLabel
                      control={<Checkbox defaultChecked={i.ok} />}
                      label={i.percent}
                    />
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
    ],
    []
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
        <div className="addTaskBtn" onClick={() => {
          setOpen(!open)
          setCoe(true)
        }}>
          <svg className="addTaskSvg" viewBox="0 0 24 24">
            <path
              className="addTaskSvgPath"
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </div>

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
            enableEditing
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
          />
        )}
        {editData!=undefined?(
          <CreateTask 
          coe={coe}
          open={open} 
          setOpen={setOpen} 
          onAll={onAll} 
          onEdit={onEdit}
          initialValues={coe?initialValues:editData}
          />
        ):(
        <CreateTask 
        open={open} 
        coe={coe}
        setOpen={setOpen} 
        onAll={onAll} 
        onEdit={onEdit}
        initialValues={initialValues}
        />
        )}
      </div>
    </>
  );
}

export default Index;
