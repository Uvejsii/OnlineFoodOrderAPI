import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrderStatus, getOrders } from "../features/orders/ordersSlice";
import GoToAdminPageButton from "./GoToAdminPageButton";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { ThreeDotsVertical, CaretLeftFill } from "react-bootstrap-icons";

const PlacedOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.adminOrders);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    orderDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const statuses = [
    { label: "Pending", value: 0 },
    { label: "Preparing", value: 1 },
    { label: "Underway", value: 2 },
    { label: "Delivered", value: 3 },
  ];
  const [showStatusAction, setShowStatusAction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrders());
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(false);
    }
  }, [orders]);

  const handleStatusActionToggle = (index) => {
    setShowStatusAction(showStatusAction === index ? null : index);
  };

  const getOrderStatusSeverity = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return "danger";
      case 1:
        return "warning";
      case 2:
        return "primary";
      case 3:
        return "success";
      default:
        return null;
    }
  };

  const orderStatusToText = (orderStatus) => {
    switch (orderStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Preparing";
      case 2:
        return "Underway";
      case 3:
        return "Delivered";
      default:
        return "Unknown Status";
    }
  };

  const formatDateForFilter = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    }
    return null;
  };

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    // console.log("Formatted Date:", date);
    return isNaN(date)
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
    setGlobalFilterValue(value);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    dispatch(editOrderStatus({ orderId, newStatus }));
  };

  const renderHeader = () => (
    <div className="flex justify-content-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
      </IconField>
    </div>
  );

  const clearFilter = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      userEmail: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      city: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      orderDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  useEffect(() => {
    // console.log("Updated Filters:", filters);
  }, [filters]);

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={
          filters.orderDate?.value ? new Date(filters.orderDate.value) : null
        }
        onChange={(e) => {
          const selectedDate = e.value;
          console.log("Selected Date in Calendar:", selectedDate);

          if (selectedDate) {
            // Ensure selectedDate is of type Date
            console.log("Selected Date Type:", typeof selectedDate);
            console.log(
              "Selected Date Instance Check:",
              selectedDate instanceof Date
            );
            console.log(
              "Selected Date Valid Check:",
              !isNaN(selectedDate.getTime())
            );

            if (
              selectedDate instanceof Date &&
              !isNaN(selectedDate.getTime())
            ) {
              const formattedDate = formatDateForFilter(selectedDate);
              // console.log("Formatted Date:", formattedDate);

              setFilters({
                ...filters,
                orderDate: {
                  value: formattedDate,
                  matchMode: FilterMatchMode.DATE_IS,
                },
              });
            } else {
              console.log("Invalid Date Selected");
              // Handle invalid date case
              setFilters({
                ...filters,
                orderDate: {
                  value: null,
                  matchMode: FilterMatchMode.DATE_IS,
                },
              });
            }
          } else {
            console.log("Selected Date is null");
            // Clear the filter if no valid date is selected
            setFilters({
              ...filters,
              orderDate: {
                value: null,
                matchMode: FilterMatchMode.DATE_IS,
              },
            });
          }
        }}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const statusItemTemplate = (option) => (
    <Tag value={option.label} severity={getOrderStatusSeverity(option.value)} />
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GoToAdminPageButton />
      <div className="card">
        <DataTable
          value={orders}
          paginator
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          globalFilterFields={["userEmail", "city", "orderDate", "status"]}
          header={renderHeader()}
          emptyMessage="No orders found."
        >
          <Column
            field="userEmail"
            header="User Email"
            filter
            filterPlaceholder="Search by email"
            style={{ minWidth: "6rem" }}
          />
          <Column
            field="city"
            header="User City"
            filter
            filterPlaceholder="Search by city"
            style={{ minWidth: "6rem" }}
          />
          <Column
            header="Order Date"
            field="orderDate"
            dataType="date"
            style={{ minWidth: "10rem" }}
            body={(rowData) => formatDate(rowData.orderDate)}
            filter
            filterElement={dateFilterTemplate}
          />
          <Column
            field="status"
            header="Status"
            showFilterMenu={false}
            filterMenuStyle={{ width: "6rem" }}
            style={{ minWidth: "6rem" }}
            body={(rowData, rowProps) => (
              <div className="d-flex align-items-center justify-content-between ps-1 pe-4 position-relative">
                <Tag
                  value={orderStatusToText(rowData.status)}
                  severity={getOrderStatusSeverity(rowData.status)}
                />
                <div
                  className="bg-secondary-subtle rounded edit-status-dots"
                  onClick={() => handleStatusActionToggle(rowProps.rowIndex)}
                >
                  <ThreeDotsVertical className="three-dots-vertical-icon" />
                </div>
                {showStatusAction === rowProps.rowIndex ? (
                  <div className="position-absolute top-25 start-100 z-3">
                    <div className="position-absolute top-50 start-0 translate-middle pe-2 pb-1 fs-1">
                      <CaretLeftFill className="caret-left-fill-icon" />
                    </div>
                    <div className="edit-status-container d-flex flex-column gap-3 p-3 bg-body-secondary rounded shadow">
                      <button
                        className="btn btn-danger fw-semibold"
                        onClick={() => updateOrderStatus(rowData.id, 0)}
                      >
                        Pending
                      </button>
                      <button
                        className="btn btn-warning fw-semibold"
                        onClick={() => updateOrderStatus(rowData.id, 1)}
                      >
                        Preparing
                      </button>
                      <button
                        className="btn btn-primary fw-semibold"
                        onClick={() => updateOrderStatus(rowData.id, 2)}
                      >
                        Underway
                      </button>
                      <button
                        className="btn btn-success fw-semibold"
                        onClick={() => updateOrderStatus(rowData.id, 3)}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            filter
            filterElement={(options) => (
              <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.filterApplyCallback(e.value)}
                itemTemplate={statusItemTemplate}
                placeholder="Select One"
                className="p-column-filter"
                showClear
                style={{ minWidth: "6rem" }}
              />
            )}
          />

          <Column
            header="Order Items"
            body={(rowData) =>
              rowData.orderItems.map((item, index) => (
                <div key={index}>
                  {item.name} x{item.quantity}, € {item.price.toFixed(2)}
                </div>
              ))
            }
          />
          <Column
            header="Total Amount"
            style={{ minWidth: "1rem" }}
            body={(rowData) => `€ ${rowData.totalAmount.toFixed(2)}`}
          />
        </DataTable>
      </div>
    </>
  );
};

export default PlacedOrders;
