import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { changePasswordType } from "../types/common";
import { trpc } from "../utils/trpc";
import ChangePasswordTab from "../components/tools/ChangePasswordTab";
import { Skeleton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

function Setting() {
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

  const { data: session } = useSession();

  const updateMutation = trpc.useMutation(["user.updatePassword"]);

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

  React.useEffect(() => {
    setShowingAlert(true);
  }, [updateMutation.isSuccess]);


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
      <Snackbar
        open={isShowingAlert}
        autoHideDuration={3000}
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
