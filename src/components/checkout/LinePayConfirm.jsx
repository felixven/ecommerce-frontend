import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { linepayPaymentConfirmation } from '../../store/actions';

const LinepayConfirm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  
  const transactionId = searchParams.get("transactionId");
const orderId = Number(localStorage.getItem("LINEPAY_ORDER_ID")); // ✅ 確保是 Long 數字
const amount = Number(localStorage.getItem("LINEPAY_TOTAL_AMOUNT")); // ✅ 取出 amount


  useEffect(() => {
    if (transactionId && orderId) {
      dispatch(
        linepayPaymentConfirmation(
          transactionId,
          "LinePay",
          transactionId,
          "succeeded",
          "LinePay payment succeeded",
          toast,
          orderId, // 👈 新增這個參數
          amount,
        "TWD"
        )
      );
    }
  }, [transactionId, orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your LinePay payment was successful.
        </p>
      </div>
    </div>
  );
};


export default LinepayConfirm;
