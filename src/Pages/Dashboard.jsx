import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../Api/auth";
import UserDataRow from "./UserDataRow";
import SmallLoader from "../Component/SmallLoader";
import BlogHelmet from "../Component/BlogHelmet";

const Dashboard = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });

  if (isLoading) return <SmallLoader size={74} />;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-4 py-3">
      <BlogHelmet title="Dashboard" />
      <h1 className="text-xl font-semibold mb-2">
        All Users ({data?.result?.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-2 text-center text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.result?.map((user) => (
              <UserDataRow
                key={user._id}
                user={user}
                totalAdmin={data?.totalAdmin}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
