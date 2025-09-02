import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { linepayPaymentConfirmation } from '../../store/actions';

const LinepayConfirm = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("transactionId");
  const orderId = Number(searchParams.get("orderId") ?? localStorage.getItem("LINEPAY_ORDER_ID"));
  const amountStr = searchParams.get("amount") ?? localStorage.getItem("LINEPAY_TOTAL_AMOUNT");
  const amount = amountStr != null ? Number(amountStr) : NaN; 
  const [flowStatus, setFlowStatus] = useState("processing");

  useEffect(() => {
    console.log("[LinePayConfirm] txn:", transactionId, "orderId:", orderId, "amount:", amount);
    const ready = transactionId && Number.isFinite(orderId) && Number.isFinite(amount) && amount > 0;
    if (!ready) {
      setFlowStatus("missing");
      toast.error("缺少了必要內容：（transactionId / orderId / amount）");
      return;
    }

    (async () => {
      try {
        // @ts-expect-error: thunk returns a promise at runtime
        const order = await (dispatch)(
          linepayPaymentConfirmation(
            transactionId,
            "linepay",
            transactionId,
            "PAID",
            "Line Pay confirmed",
            toast,
            orderId,
            amount,
            "TWD"
          )
        );
        setFlowStatus("success");
        navigator(`/orders/${order.orderId}/success`, { replace: true });

      } catch (err) {
        console.error("LinePay confirm/finalize error", err);
        setFlowStatus("error");
      }
    })();
  }, [transactionId, orderId, amount, dispatch]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
        {flowStatus === "processing" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">正在確認付款…</h2>
            <p className="text-gray-600">請稍候，不要關閉此頁面。</p>
          </>
        )}

        {flowStatus === "success" && (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">感謝你的購買，正在跳轉訂單頁…</p>
          </>
        )}

        {flowStatus === "missing" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">參數缺失</h2>
            <p className="text-gray-600">請回到購物車重新發起付款流程。</p>
          </>
        )}

        {flowStatus === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-2">付款確認失敗</h2>
            <p className="text-gray-600">請稍後再試，或聯繫客服。</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LinepayConfirm;