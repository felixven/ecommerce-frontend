export const displayOrderStatus = (raw) => {
    if (!raw)
        return "-";
    const norm = String(raw).toLowerCase().replace(/[^a-z]/g, ""); // 忽略大小寫/空白/符號
    const map = {
        orderaccepted: "訂單成立",
        pending: "處理中",
        processing: "處理中",
        paid: "已付款",
        shipped: "已出貨",
        delivered: "已送達",
        cancelled: "已取消",
        failed: "付款失敗",
    };
    return map[norm] ?? raw; 
}