import React, { useCallback, useMemo } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import TextField from "@mui/material/TextField";

import { companySchema, companyType } from "../../types/common";
import { Box, Button, Dialog, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { trpc } from "../../utils/trpc";


import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";

const initialValues = {
  c_name: "",
  c_title: "",
  c_tax: "",
};

type toggleCompanyType = {
  openAddCompany: boolean;
  setOpenAddCompany: (toggle: boolean) => void;
};

function AddCompony({ openAddCompany, setOpenAddCompany }: toggleCompanyType) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const {
    data: cList,
    refetch,
    isLoading,
    isError,
    isFetching,
  } = trpc.useQuery(["add.listCompany"], {
    keepPreviousData: true,
  });
  const deleteCompanyMutation = trpc.useMutation(["add.deleteCompany"], {
    onSuccess: () => refetch(),
  });
  const addCompanyMutation = trpc.useMutation(["add.company"], {
    onSuccess: () => refetch(),
  });

  const onDelete = useCallback(
    (row: MRT_Row<companyListType>) => {
      if (!confirm(`確定刪除 ${row.getValue("c_name")} ?`)) {
        return;
      }
      deleteCompanyMutation.mutate({
        id: row.getValue("id"),
      });
    },
    [deleteCompanyMutation]
  );

  const onAddCompany = useCallback(
    ({ c_name, c_title, c_tax }: companyType) => {
      addCompanyMutation.mutate({
        c_name,
        c_title,
        c_tax,
      });
    },
    [addCompanyMutation]
  );
  const handleClose = () => {
    setOpenAddCompany(false);
  };
  React.useEffect(() => {
    setOpenAlert(true);
  }, [addCompanyMutation.isSuccess,deleteCompanyMutation.isSuccess]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  type companyListType = {
    id: number;
    c_name: string | null;
    c_title: string;
    c_tax: string | null;
  };

  const columns = useMemo<MRT_ColumnDef<companyListType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "編號",
      },
      {
        accessorKey: "c_name",
        header: "名稱",
      },
      {
        accessorKey: "c_title",
        header: "抬頭",
      },
      {
        accessorKey: "c_tax",
        header: "抬頭",
      },
    ],
    []
  );

  const sumbitHandler = (values: companyType, action: any) => {
    onAddCompany(values);
    action.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(companySchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid }) => (
        <Dialog open={openAddCompany} onClose={handleClose} maxWidth="lg">
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={addCompanyMutation.data?.alertStatus as AlertColor}
            >
              {addCompanyMutation.data?.msg}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              severity={deleteCompanyMutation.data?.alertStatus as AlertColor}
            >
              {deleteCompanyMutation.data?.msg}
            </Alert>
          </Snackbar>
          <div className="p-3 lg:flex">
            <Form className="flex flex-col gap-5 p-3">
              <h3>新增公司</h3>

              <p className="errormsg">{errors.c_name}</p>

              <TextField
                id="outlined-basic"
                label="公司名稱"
                name="c_name"
                value={values.c_name}
                onChange={handleChange}
                variant="outlined"
              />
              <p className="errormsg">{errors.c_title}</p>

              <TextField
                id="outlined-basic"
                label="公司抬頭"
                name="c_title"
                value={values.c_title}
                onChange={handleChange}
                variant="outlined"
              />
              <p className="errormsg">{errors.c_tax}</p>

              <TextField
                id="outlined-basic"
                label="統編"
                name="c_tax"
                value={values.c_tax}
                onChange={handleChange}
              />
              <Button variant="outlined" onClick={() => handleClose}>
                取消
              </Button>
              <Button variant="contained" type="submit" disabled={!isValid}>
                存檔
              </Button>
            </Form>

            <div className="bgPaper">
              <MaterialReactTable
                columns={columns}
                data={cList ? cList : []}
                enableEditing
                state={{
                  isLoading,
                  showAlertBanner: isError,
                  showProgressBars: isFetching,
                }}
                renderRowActions={({ row }) => (
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Tooltip arrow placement="right" title="Delete">
                      <IconButton color="error" onClick={() => onDelete(row)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              />
            </div>
          </div>
        </Dialog>
      )}
    </Formik>
  );
}

export default AddCompony;
