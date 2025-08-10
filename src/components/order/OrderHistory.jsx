import React, { useEffect } from "react";
import { useState } from "react";
import OrderViewModal from "./OrderViewModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../store/actions";
import { Navigate} from 'react-router-dom';
import {displayOrderStatus} from "../../utils/orderStatus"

const OrderHistory = () => {
  const dispatch = useDispatch();
  const [openOrderViewModal, setOpenOrderViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
    if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {orders.map((order) => (
        <div
          key={order.orderId}
          onClick={() => {
            setSelectedOrder(order);
            setOpenOrderViewModal(true);
          }}
          className="bg-white shadow-md rounded-xl p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            訂單編號：#{order.orderId}
          </h2>
          <p className="text-xs text-gray-500">日期：{order.orderDate}</p>
          <p className="text-sm text-gray-600">
            總金額：
            <span className="font-semibold text-black">
              ${order.totalAmount}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            狀態：
            <span className="text-green-600 font-medium">{displayOrderStatus(order.orderStatus)}</span>
          </p>
        </div>
      ))}

      <OrderViewModal
        open={openOrderViewModal}
        setOpen={setOpenOrderViewModal}
        order={selectedOrder}
      />
    </div>
  );
};


export default OrderHistory;
