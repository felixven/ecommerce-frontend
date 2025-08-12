import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { displayOrderStatus } from "../../utils/orderStatus"

function OrderViewModal({ open, setOpen, order }) {
  if (!order) return null;

  const {
    orderId,
    orderDate,
    totalAmount,
    orderStatus,
    orderItems = []
  } = order;



  return (
    <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
            <DialogTitle as="h2" className="text-xl font-semibold mb-4">
              訂單編號 #{orderId}
            </DialogTitle>

            <p className="text-sm text-gray-600 mb-1">訂單日期：{orderDate}</p>
            <p className="text-sm text-gray-600 mb-1">總金額：${totalAmount}</p>
            <p className="text-sm text-gray-600 mb-3">狀態：{displayOrderStatus(order.orderStatus)}</p>

            <div className="border-t pt-4">
              <h3 className="text-sm font-bold mb-2">商品清單：</h3>
              <ul className="text-sm text-gray-700 list-disc ml-4">
                {orderItems.map((item) => (
                  <li key={item.orderItemId}>
                    {item.product.productName} × {item.quantity}
                    （原價 ${item.orderedProductPrice + (item.discount || 0)}，特價 ${item.orderedProductPrice}）
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border text-sm rounded-md text-slate-700 border-slate-700 hover:bg-slate-100"
              >
                關閉
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default OrderViewModal;
