import axiosSecure from ".";

export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName || "anonymous",
    email: user?.email.toLowerCase(),
    photo: user?.photoURL || import.meta.env.VITE_Default_URL,
    timestamp: [user.metadata?.createdAt, user.reloadUserInfo?.lastLoginAt],
  };
  const { data } = await axiosSecure.put("/add-user", currentUser);
  return data;
};

export const getUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

// update role
export const updateRole = async (email, role) => {
  const { data } = await axiosSecure.patch(`/user-update/${email}`, { role });
  return data;
};

export const getRole = async (email) => {
  const { data } = await axiosSecure(`/role/${email}`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosSecure.delete(`/delete-user/${id}`);
  return data;
};
