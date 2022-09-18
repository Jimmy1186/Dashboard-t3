import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { changePasswordType } from "../types/common";
import { trpc } from "../utils/trpc";
import ChangePasswordTab from "../components/tools/ChangePasswordTab";
import AlertBar from "../components/tools/AlertBar";

function Setting() {
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

  const { data: session } = useSession();

  const updateMutation = trpc.useMutation(["user.updatePassword"], {
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
  const { data, refetch } = trpc.useQuery([
    "user.userData",
    {
      userId: session?.user?.id as string
    },
  ]);

  const onUpdate = useCallback(
    (values: changePasswordType) => {
      updateMutation.mutate({
        id: data!.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    },
    [updateMutation, data]
  );

  const sumbitHandler = async (values: changePasswordType, action: any) => {
    onUpdate(values);

    action.resetForm();
  };

  return (
    <>
      {data ? (
        <ChangePasswordTab id={data?.id} sumbitHandler={sumbitHandler} />
      ) : (
        ""
      )}

      {updateMutation.data != undefined ? (
        <AlertBar
          alertTitle={updateMutation.data.msg}
          isShowingAlert={isShowingAlert}
          alertStatus={updateMutation.data.alertStatus}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Setting;
