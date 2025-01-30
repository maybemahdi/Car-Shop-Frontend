/* eslint-disable @typescript-eslint/no-explicit-any */

import { Select } from "antd";
import { toast } from "sonner";
import { useUpdateUserStatusMutation } from "../../../redux/features/auth/authApi";
import { useGetAllUsersQuery } from "../../../redux/features/Users/userApi";
import Loading from "../../shared/Loading/Loading";
import { cn } from "../../../lib/utils";

const UserManagementPage = () => {
  const { data: response, isLoading, isError } = useGetAllUsersQuery(undefined);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const handleChange = async (value: string, id: string) => {
    const toastId = toast.loading("Updating User Status");
    const payload = {
      id: id,
      status: value === "Block",
    };
    try {
      const res = await updateUserStatus(payload).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Broh! Refresh and try again
      </h3>
    );
  }

  const allUsers = response?.data;

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-sm buser buser-gray-200 overflow-hidden">
        <div className="px-6 py-4 buser-b buser-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Manage users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers?.map((user: any) => (
                <tr key={user?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user?._id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user?.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={cn("text-sm", {
                        "text-blue-500": !user?.isBlocked,
                        "text-rose-500": user?.isBlocked,
                    })}>
                      {user?.isBlocked ? "Blocked" : "Active"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select
                      defaultValue={user?.isBlocked ? "Blocked" : "Active"}
                      style={{ width: 120 }}
                      onChange={(value) => handleChange(value, user?._id)}
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Block", label: "Block" },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
