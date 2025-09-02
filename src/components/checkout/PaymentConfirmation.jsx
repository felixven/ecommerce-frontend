import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");

  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : {};

  useEffect(() => {
    if (paymentIntent && redirectStatus === "succeeded" && selectedUserCheckoutAddress?.addressId) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment successful",
      };

      (async () => {
        try {
          const order = await dispatch(
            stripePaymentConfirmation(sendData, null, null, toast)
          );
          // ✅ Stripe 成功後導向共用成功頁
          navigate(`/orders/${order.orderId}/success`, { replace: true });
        } catch (e) {
          toast.error("付款落袋失敗");
        }
      })();
    }
  }, [paymentIntent, redirectStatus, selectedUserCheckoutAddress, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">正在確認付款...</h2>
        <p className="text-gray-600">請稍候，不要關閉此頁面。</p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;