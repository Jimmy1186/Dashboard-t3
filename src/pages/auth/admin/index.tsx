import { useMemo, useState } from "react";

import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import { useQuery } from "react-query";
import { alerType, signupUserType } from "../../../types/common";
import Signup from "../../components/tools/Signup";
import { useCallback } from "react";

function index() {
  const { data: users, refetch } = trpc.useQuery(["admin.findAllUser"]);
  // const users = useMemo(() => data, []);
  const [msg, setMsg] = useState<alerType>({
    alertTitle: null,
    alertStatus: null,
  });

  const insertMutation = trpc.useMutation(["temp.inertOneUser"], {
    onError: (e) => {
      if (e.data?.code === "CONFLICT") {
        setMsg({ alertTitle: e.message, alertStatus: "warn" });
        return;
      }
      setMsg({ alertTitle: e.message, alertStatus: "error" });
    },
    onSuccess: () => {
      setMsg({
        alertTitle: "新增成功",
        alertStatus: "success",
      });
      refetch();
    },
  });

  const OnInsertUser = useCallback(
    (values: signupUserType) => {
      insertMutation.mutate({
        id: values.id,
        username: values.username,
        password: values.password,
        role: Number(values.role),
      });
    },
    [users, insertMutation]
  );

  const sumbitHandler = async (values: signupUserType, action: any) => {
    OnInsertUser(values);

    action.resetForm();
  };

  return (
    <>
      <div className="controlBox">
        <div className="addUser">
          <svg className="icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4M15,5.9C16.16,5.9 17.1,6.84 17.1,8C17.1,9.16 16.16,10.1 15,10.1A2.1,2.1 0 0,1 12.9,8A2.1,2.1 0 0,1 15,5.9M4,7V10H1V12H4V15H6V12H9V10H6V7H4M15,13C12.33,13 7,14.33 7,17V20H23V17C23,14.33 17.67,13 15,13M15,14.9C17.97,14.9 21.1,16.36 21.1,17V18.1H8.9V17C8.9,16.36 12,14.9 15,14.9Z"
            />
          </svg>
          <span>新增使用著</span>
        </div>
        <div className="deleteUser">
          <svg className="icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M1.46,8.88L2.88,7.46L5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88M15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4M15,5.9A2.1,2.1 0 0,0 12.9,8A2.1,2.1 0 0,0 15,10.1C16.16,10.1 17.1,9.16 17.1,8C17.1,6.84 16.16,5.9 15,5.9M15,13C17.67,13 23,14.33 23,17V20H7V17C7,14.33 12.33,13 15,13M15,14.9C12,14.9 8.9,16.36 8.9,17V18.1H21.1V17C21.1,16.36 17.97,14.9 15,14.9Z"
            />
          </svg>
          <span>刪除使用著</span>
        </div>
      </div>

      <div className="multiPanel">
        <Signup sumbitHandler={sumbitHandler} />
        <div className="table-box">
          <table className="home-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.roleId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default index;
