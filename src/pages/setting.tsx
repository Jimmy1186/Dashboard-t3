import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
import ChangePasswordTab from "./components/tools/ChangePasswordTab";
import AlertBar from "./components/widget/AlertBar";

function setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowingAlert, setShowingAlert] = useState<boolean>(false);

  const { data: session } = useSession();

  const updateMutation = trpc.useMutation(["user.updatePassword"], {
    onSuccess: () => {
      console.log("success");
      setShowingAlert(true);
      refetch();

      setTimeout(() => {
        setShowingAlert(false);
        console.log("clear");
      }, 3000);
    },
    onError: (e) => {
      console.log(e);
      setShowingAlert(true);
      setTimeout(() => {
        setShowingAlert(false);
        console.log("clear");
      }, 3000);
    },
  });
  const { data, refetch } = trpc.useQuery([
    "user.userData",
    {
      userId: session?.id as string,
    },
  ]);

  const onUpdate = useCallback(() => {
    updateMutation.mutate({
      id: data!.id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }, [updateMutation, data]);

  console.log(data);

  return (
    <>
      <div>setting</div>

      <ChangePasswordTab
        id={data?.id}
        username={data?.username}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        onUpdate={onUpdate}
      />


{updateMutation.data!= undefined ? (
     <AlertBar
        alertTitle={updateMutation.data.msg}
        isShowingAlert={isShowingAlert}
        alertStatus={updateMutation.data.alertStatus}
      />
):("")

}
   
    </>
  );
}

export default setting;
