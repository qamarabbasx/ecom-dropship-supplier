import React, { useState } from "react";
import { Table, Select, Button } from "antd";
import { columns } from "./columns";
import { StyledTableContainer } from "./styles";
import { useGetUsersQuery } from "../../../api/authApi";
import { useUpdateUserRoleAndStatusMutation } from "../../../api/authApi";

const data = [
  {
    key: "1",
    userName: "Albert Flores",
    email: "michael.mitc@example.com",
    phoneNumber: "(671) 555-0110",
    userRole: "Supplier",
    status: "Active",
  },
  {
    key: "2",
    userName: "Jacob Jones",
    email: "debbie.baker@example.com",
    phoneNumber: "(229) 555-0109",
    userRole: "Drop shipper",
    status: "Inactive",
  },
];

const UsersListing = ({ searchFilter }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editingUserId, setEditingUserId] = useState(null); // To track the user being edited
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [originalRole, setOriginalRole] = useState('');
  const [originalStatus, setOriginalStatus] = useState('');

  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({
    page,
    limit,
    sortBy: "firstName",
    sortOrder: "ASC",
    searchFilter,
  });

  console.log('\n\n userData \n\n', userData);

  const [updateUserRoleAndStatus, { isLoading: isUpdating }] = useUpdateUserRoleAndStatusMutation();  

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const handleEditClick = (record) => {
    setEditingUserId(record.id); // Set the user being edited
    setNewRole(record.role); // Toggle role based on current
    setNewStatus(record.subscription?.status); // Toggle status
    setOriginalRole(record.role); // Store the original role value
    setOriginalStatus(record.subscription?.status); // Store the original status value
  };

  const handleSave = async (record) => {
    if (!editingUserId) return;

    try {
      await updateUserRoleAndStatus({
        userId: record.id,
        newRole,
        newStatus,
      }).unwrap();

      refetch();

      // Clear editing state after saving
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    setEditingUserId(null); // Clear editing state
    setNewRole(originalRole); // Reset to original role
    setNewStatus(originalStatus); // Reset to original status
  };

  return (
    <StyledTableContainer>
      <Table
        columns={columns({
          editingUserId,
          onEditClick: handleEditClick,
          onSaveClick: handleSave,
          onCancelClick: handleCancel,
          setNewRole,
          setNewStatus,
          newRole,
          newStatus,
          originalRole,
          originalStatus,
        })}
        dataSource={userData?.users || []}
        rowKey="id"
        loading={isLoading || isUpdating}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize: limit,
          position: ["bottomRight"],
          total: userData?.total | 0,
          showTotal: (total) => `Total ${total} Users`,
        }}
      />
    </StyledTableContainer>
  );
};

export default UsersListing;
