import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import api from '../../api/api'; // ← 你 axios instance 的位置，確認有沒有這個檔案
import toast from 'react-hot-toast';
import linePay from "../../assets/linepay.webp";

const LinepayPayment = () => {
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLinePay = async () => {
    if (!selectedUserCheckoutAddress || cart.length === 0 || !totalPrice) {
      toast.error("Address, cart, or total price missing.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: 建立訂單
      const orderItems = cart.map((item) => ({
        product: { productId: item.productId },
        quantity: item.quantity,
        discount: 0,
        orderedProductPrice: item.price,
      }));

      const orderData = {
        addressId: selectedUserCheckoutAddress.addressId,
        totalAmount: totalPrice,
        orderItems,
      };

      const orderRes = await api.post("/order/create-for-linepay", orderData);
      const orderId = orderRes.data.orderId;

      localStorage.setItem("LINEPAY_ORDER_ID", orderId); // 👈 確保是純數字
localStorage.setItem("LINEPAY_TOTAL_AMOUNT", totalPrice);

      // Step 2: 呼叫 Line Pay reserve
      const reserveBody = {
        amount: totalPrice,
        currency: "TWD",
        orderId: orderId,
        productName: "Your Order",
        confirmUrl: `${import.meta.env.VITE_FRONT_END_URL}/linepay/confirm`,
        cancelUrl: `${import.meta.env.VITE_FRONT_END_URL}/linepay/cancel`,
      };

      const reserveRes = await api.post("/order/linepay-reserve", reserveBody);

      if (reserveRes.data) {
        // Step 3: 導向 Line Pay 頁面
        window.location.href = reserveRes.data;
      } else {
        toast.error("LinePay failed to return URL.");
      }

    } catch (err) {
      console.error(err);
      toast.error("LinePay failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="h-96 flex justify-center items-center">
    {loading ? (
      <CircularProgress />
    ) : (
      <div className="flex flex-col items-center space-y-4">
        <img src={linePay} alt="Line Pay" className="w-40 h-auto" />
        <Button variant="contained" color="primary" onClick={handleLinePay}>
          開啟 Line Pay 付款
        </Button>
      </div>
    )}
  </div>
);
};

export default LinepayPayment;
