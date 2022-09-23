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
<div className="flex flex-col  gap-5 md:grid md:grid-cols-3 lg:grid-cols-4 max-w-7xl xl:mx-auto">
<div className="bgPaper w-full flex flex-col gap-1 md:gap-3 md: p-7 " >
        <h3>用戶資料</h3>
        <p>名稱: {session.user?.name}</p>
        <p>編號: {session.user?.id}</p>
        <p>權限: 
        {session.user?.role==="X"? "管理員":""}
        {session.user?.role==="W"? "使用者":""}
        {session.user?.role==="R"? "訪客":""}
        </p>
      </div>
      <ChangePasswordTab sumbitHandler={sumbitHandler} />

</div>
      
    </>
  );
}

export default Setting;
