import swal from "sweetalert";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { deleteUser, updateRole } from "../Api/auth";

const UserDataRow = ({ user, totalAdmin, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role);
  const modalRef = useRef(null);

  const handleRoleUpdate = async () => {
    if (selectedRole === "user" && totalAdmin <= 1) {
      toast.error(
        "You cannot downgrade role to 'user' as there is only one admin."
      );
      setIsModalOpen(false);
      return;
    }
    try {
      const res = await updateRole(user?.email, selectedRole);
      if (res?.modifiedCount > 0) {
        toast.success(`Role updated to ${selectedRole}`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role.");
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (confirmDelete) {
      try {
        const res = await deleteUser(user?._id);
        if (res?.deletedCount > 0) {
          swal("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        console.log(error);
        swal("Failed!", "Unable to delete user.", "error");
      }
    }
  };

  const openRoleModal = () => setIsModalOpen(true);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  return (
    <>
      <tr>
        <td className="px-5 py-4">{user.name}</td>
        <td className="px-5 py-4">{user.email}</td>
        <td className="px-5 py-4">{user.role}</td>
        <td className="px-5 py-4 flex justify-center">
          <button
            onClick={openRoleModal}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Update Role
          </button>
          <button
            onClick={handleDelete}
            className="ml-3 bg-red-500 text-white px-2 py-1 rounded"
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
            <h2>Select Role</h2>
            <div className="mt-4">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === "admin"}
                  onChange={() => setSelectedRole("admin")}
                />
                Admin
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={selectedRole === "user"}
                  onChange={() => setSelectedRole("user")}
                />
                User
              </label>
              <div className="mt-6">
                <button
                  onClick={handleRoleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-3 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDataRow;
