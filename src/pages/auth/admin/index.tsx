import React, { useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { QueryClient, QueryClientProvider } from 'react-query'
import { trpc } from "../../../utils/trpc";
import { signupUserType, userTableType } from "../../../types/common";
import Signup from "../../../components/tools/Signup";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Dialog, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps,AlertColor } from '@mui/material/Alert';
import Head from "next/head";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const queryClient = new QueryClient();

const initialValues = {
  id: "",
  username: "",
  password: "",
  role: {
    roles: "",
  },
};
function Index() {
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState<any>();
  const [coe, setCoe] = useState(true);
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);
  const { data: session } = useSession();
  const {
    data: users,
    refetch,
    isError,
    isFetching,
    isLoading,
  } = trpc.useQuery(["admin.findAllUser"], {
    keepPreviousData: true,
  });
  const deleteMutation = trpc.useMutation(["admin.deleteUser"], {
    onSuccess: () => {
      refetch()
      setShowingAlert(true);
    },
    onError: () => {
      setShowingAlert(true);
    },
  });
  
  const editMutation = trpc.useMutation(["admin.editUser"], {
    onSuccess: () => {
      refetch()
      setShowingAlert(true);
    },
    onError: () => {
      setShowingAlert(true);
    },
  });
  const insertMutation = trpc.useMutation(["admin.inertOneUser"], {
    onSuccess: () => {
      refetch()
      setShowingAlert(true);
    },
    onError: () => {
      setShowingAlert(true);
    },
  });

  const onDelete = useCallback(
    (row: MRT_Row<userTableType>) => {
      if (!confirm(`確定刪除 ${row.getValue("username")}`)) {
        return;
      }
      deleteMutation.mutate({
        id: row.original.id,
      });
    },
    [deleteMutation, users]
  );

  const OnInsertUser = useCallback(
    (values: signupUserType) => {
      insertMutation.mutate({
        id: values.id,
        username: values.username,
        password: values.password,
        role: {
          roles: values.role.roles,
        },
      });
    },
    [insertMutation]
  );

  const onEdit = useCallback((values: userTableType) => {
    const { id, username, role } = values;
    editMutation.mutate({
      id: id,
      username: username === editData?.username ? undefined : username,
      role:
        JSON.stringify(role) === JSON.stringify(editData?.role)
          ? undefined
          : role,
    });
  }, []);



  const handleCloseAlert = () => {
    setShowingAlert(false);
  };


  const editHandler = (row: MRT_Row<userTableType>) => {
    setOpen(true);
    setEditData(row.original);
    setCoe(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editSubmit = async (values: userTableType, action: any) => {
    onEdit(values);
    action.resetForm();
    setOpen(false);
  };

  const sumbitHandler = async (values: signupUserType, action: any) => {
    OnInsertUser(values);
    setOpen(false);
    action.resetForm();
  };

  const columns = useMemo<MRT_ColumnDef<userTableType>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "員工編號",
      },
      {
        accessorKey: "username",
        header: "名稱",
      },
      {
        accessorKey: "role", //normal accessorKey
        header: "權限",
        Cell: ({ row }) => {
          return <>{row.original.role.roles}</>;
        },
      },
    ],
    []
  );

  if (session?.user?.role != "X") {
    return <h1>無權限</h1>;
  }

  if (isLoading) {
    return (
      <>
        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
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
      </>
    );
  }
  return (
    <>
         <Head>
      <title>SEMBA | 管理員</title>
        
      </Head>
    
      <Snackbar
            open={isShowingAlert}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={insertMutation.data?.alertStatus as AlertColor}
            >
              {insertMutation.data?.msg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={isShowingAlert}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={editMutation.data?.alertStatus as AlertColor}
            >
              {editMutation.data?.msg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={isShowingAlert}
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={deleteMutation.data?.alertStatus as AlertColor}
            >
              {deleteMutation.data?.msg}
            </Alert>
          </Snackbar>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
       
       
        <div className="bgPaper">
          <Signup
            sumbitHandler={sumbitHandler}
            editSubmit={editSubmit}
            handleClose={handleClose}
            coe={coe}
            initialValues={coe ? initialValues : editData}
          />
        </div>
      </Dialog>
     
<div className="flex flex-col gap-5 xl:grid grid-cols-2  max-w-7xl xl:mx-auto">
        
            <div className="bgPaper">
        <MaterialReactTable
          columns={columns}
          data={ users ??  []}
          enableEditing
          state={{
            isLoading,
            showAlertBanner: isError,
            showProgressBars: isFetching,
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => editHandler(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => onDelete(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                disabled={
                  session?.user?.role === "R" || session?.user?.role === "W"
                }
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => {
                  setOpen(!open);
                  setCoe(true);
                }}
              >
                新增
              </Button>
            </Box>
          )}
        />
      </div>
        </div>
      

      
  
    </>
  );
}

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Index />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
