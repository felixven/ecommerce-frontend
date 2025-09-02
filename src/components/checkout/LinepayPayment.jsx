import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertTitle, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import api from '../../api/api'; //
import toast from 'react-hot-toast';
import linePay from "../../assets/linepay.webp";

const LinepayPayment = () => {
  const { cart } = useSelector((state) => state.carts);
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLinePay = async () => {
    if (!selectedUserCheckoutAddress || cart.length === 0) {
      toast.error("Address or cart missing.");
      return;
    }
    setLoading(true);

    try {
      //1: 建立預訂單（PENDING）
      const orderItems = cart.map((item) => ({
        product: { productId: item.productId },
        quantity: item.quantity,
      }));

      const orderData = {
        addressId: selectedUserCheckoutAddress.addressId,
        orderItems,
      };

      const orderRes = await api.post("/order/create-for-linepay", orderData);
      const order = orderRes.data;
      const orderId = order.orderId;
      const amountFromServer = order.totalAmount;

      // 儲存必要資訊
      localStorage.setItem("LINEPAY_ORDER_ID", String(orderId));
      localStorage.setItem("LINEPAY_TOTAL_AMOUNT", String(amountFromServer));
      localStorage.setItem("LINEPAY_ADDRESS_ID", String(selectedUserCheckoutAddress.addressId));
      const origin = import.meta.env.VITE_FRONT_END_URL || window.location.origin;
     const confirmUrl = `${origin}/linepay/confirm?orderId=${orderId}&amount=${amountFromServer}`;

      // 2: 呼叫 Line Pay reserve
      const reserveBody = {
        amount: amountFromServer,
        currency: "TWD",
        orderId: orderId,
        productName: "Your Order",
        confirmUrl,
        cancelUrl: `${origin}/linepay/cancel`,
      };

      const reserveRes = await api.post("/order/linepay-reserve", reserveBody);

      const paymentUrl = typeof reserveRes.data === "string" ? reserveRes.data : null;
      if (paymentUrl && /^https?:\/\//.test(paymentUrl)) {
        window.location.href = paymentUrl; //3: 導向 Line Pay 頁面
      } else {
        console.error("Unexpected reserve response:", reserveRes.data);
        toast.error("LinePay failed to return URL.");
      }

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "LinePay failed. Please try again.";
      console.error("LinePay reserve error:", err?.response || err);
      toast.error(msg);
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