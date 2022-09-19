import React, { useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { trpc } from "../../../utils/trpc";
import { signupUserType, userTableType } from "../../../types/common";
import Signup from "../../../components/tools/Signup";
import { useCallback } from "react";
import AlertBar from "../../../components/tools/AlertBar";
import { useSession } from "next-auth/react";
import { Box, Button, Dialog, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
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
  } = trpc.useQuery(["admin.findAllUser"]);
  const deleteMutation = trpc.useMutation(["admin.deleteUser"], {
    onSuccess: () => refetch(),
  });
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);
  const editMutation = trpc.useMutation(["temp.editUser"], {
    onSuccess: () => {
      setShowingAlert(true);
      refetch();

      setTimeout(() => {
        setShowingAlert(false);
      }, 3000);
    },
    onError: (e) => {
      console.log(e);
      setShowingAlert(true);
      setTimeout(() => {
        setShowingAlert(false);
      }, 3000);
    },
  });
  const insertMutation = trpc.useMutation(["temp.inertOneUser"], {
    onSuccess: () => {
      setShowingAlert(true);
      refetch();

      setTimeout(() => {
        setShowingAlert(false);
      }, 3000);
    },
    onError: (e) => {
      console.log(e);
      setShowingAlert(true);
      setTimeout(() => {
        setShowingAlert(false);
      }, 3000);
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

  const editHandler = (val: userTableType) => {
    setOpen(true);
    setEditData(val);
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
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <div className="bgPaper">
          <Signup
            sumbitHandler={sumbitHandler}
            editSubmit={editSubmit}
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
                <IconButton onClick={() => editHandler(row.original)}>
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

      {insertMutation.data != undefined ? (
        <AlertBar
          alertTitle={insertMutation.data.msg}
          isShowingAlert={isShowingAlert}
          alertStatus={insertMutation.data.alertStatus}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
