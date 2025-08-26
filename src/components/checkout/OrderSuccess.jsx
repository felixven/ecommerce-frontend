import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from '../../api/api';
import { BsBagCheckFill } from "react-icons/bs";
import { displayOrderStatus } from "../../utils/orderStatus"
import Loader from "../shared/Loader";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api.get("/users/orders").then((res) => {
      const found = res.data.find((o) => o.orderId === Number(orderId));
      setOrder(found);
      setLoading(false); 
    });
  }, [orderId]);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded border"><Loader text={"請稍後..."}/></div> 
    </div>
  );
}

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 rounded border">找不到訂單 {orderId}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-10 rounded-lg shadow-lg text-center max-w-xl w-full mx-auto border border-gray-200">
        <div className="mb-6 flex justify-center">
          <BsBagCheckFill size={72} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">付款成功!</h2>
           <p className="text-gray-600 leading-relaxed mb-6">
      感謝您的訂購！<br />
      訂單號碼：<span className="font-semibold">{order.orderId}</span><br />
      金額：<span className="font-semibold">{order.totalAmount} 元</span><br />
      狀態：<span className="font-semibold">{displayOrderStatus(order.orderStatus)}</span>
    </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/orders"
            className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition-all">
            訂單查詢
          </Link>
          <Link
            to="/"
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            回首頁
          </Link>
        </div>
      </div>
    </div>


  );
};

export default OrderSuccess;
