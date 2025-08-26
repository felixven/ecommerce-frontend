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
  const amount = amountStr != null ? Number(amountStr) : NaN;  // ⬅︎ 避免 Number(null) 變 0


  // [變更] 避免使用變數名 "status"（和 window.status 衝突被標記為 deprecated）
  const [flowStatus, setFlowStatus] = useState("processing"); // processing | success | error | missing

  useEffect(() => {
    console.log("[LinePayConfirm] txn:", transactionId, "orderId:", orderId, "amount:", amount);

    // 參數檢查放在 IIFE 之前，缺就直接 return，不再往下跑
    const ready = transactionId && Number.isFinite(orderId) && Number.isFinite(amount) && amount > 0;
    if (!ready) {
      setFlowStatus("missing");
      toast.error("缺少必要參數（transactionId / orderId / amount）");
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

        // 成功：停留在此頁顯示成功訊息（不跳轉）
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