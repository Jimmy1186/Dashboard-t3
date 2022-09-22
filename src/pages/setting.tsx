import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { changePasswordType } from "../types/common";
import { trpc } from "../utils/trpc";
import ChangePasswordTab from "../components/tools/ChangePasswordTab";
import { Skeleton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps,AlertColor } from '@mui/material/Alert';
import Head from "next/head";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Setting() {
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

  const { data: session } = useSession();

  const updateMutation = trpc.useMutation(["user.updatePassword"],{
    onSuccess: () => {
      setShowingAlert(true);
    },
    onError: () => {
      setShowingAlert(true);
    },
  });

  const handleClose = () => {
    setShowingAlert(false);
  };

  const onUpdate = useCallback(
    (values: changePasswordType) => {
      updateMutation.mutate({
        id: session?.user?.id as string,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    },
    [updateMutation]
  );



  const sumbitHandler = async (values: changePasswordType, action: any) => {
    onUpdate(values);

    action.resetForm();
  };

  if (!session) {
    return (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={210}
        height={60}
      />
    );
  }
  return (
    <>
    <Head>
        <title>SEMBA | 設定</title>

      </Head>
      <Snackbar
        open={isShowingAlert}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={updateMutation.data?.alertStatus as AlertColor}>
          {updateMutation.data?.msg}
        </Alert>
      </Snackbar>
      <ChangePasswordTab sumbitHandler={sumbitHandler} />
    </>
  );
}

export default Setting;
