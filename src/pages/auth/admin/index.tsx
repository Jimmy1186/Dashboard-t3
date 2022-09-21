import React, { useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { trpc } from "../../../utils/trpc";
import { signupUserType, userTableType } from "../../../types/common";
import Signup from "../../../components/tools/Signup";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { Box, Button, Dialog, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";


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
    onSuccess: () => refetch(),
  });
  const [openAlert, setOpenAlert] = React.useState(false);
  const editMutation = trpc.useMutation(["admin.editUser"], {
    onSuccess: () => refetch(),
  });
  const insertMutation = trpc.useMutation(["admin.inertOneUser"], {
    onSuccess: () => refetch(),
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


  React.useEffect(() => {
    setOpenAlert(true);
  }, [insertMutation.isSuccess,editMutation.isSuccess]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
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
  return (
    <>
      <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={insertMutation.data?.alertStatus as AlertColor}
            >
              {insertMutation.data?.msg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={editMutation.data?.alertStatus as AlertColor}
            >
              {editMutation.data?.msg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
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

      <div className="bgPaper">
        <MaterialReactTable
          columns={columns}
          data={users ? users : []}
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
    </>
  );
}

export default Index;
