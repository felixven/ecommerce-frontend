import toast from "react-hot-toast";
import api from "../../api/api";
import React from "react";
import { Link } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "無法讀取商品",
        });
    }
};

export const fetchCategories = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "無法讀取商品類型",
        });
    }
};

export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        //Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.prodctId === data.prodctId
        );

        const isQuantityExist = getProduct.quantity >= qty;
        if (isQuantityExist) {
            dispatch({
                type: "ADD_CART",
                payload: { ...data, quantity: qty }
            });
            toast.success(
                React.createElement(
                    "div",
                    {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            whiteSpace: "nowrap" 
                        }
                    },
                    `${data?.productName} 已加入購物車`,
                    React.createElement(
                        "a",
                        {
                            href: "/cart",
                            style: {
                                textDecoration: "underline",
                                fontWeight: "500",
                                whiteSpace: "nowrap"
                            },
                            onClick: (e) => {
                                e.preventDefault();
                                window.location.href = "/cart";
                            }
                        },
                        "立即結帳"
                    )
                ),
                {
                    autoClose: 8000,
                    closeOnClick: true,
                    pauseOnHover: true,
                }
            );

            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("商品無庫存");
        }

    };


export const increaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {
            const { products } = getState().products;

            const getProduct = products.find(
                (item) => item.productId === data.productId
            );

            const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

            if (isQuantityExist) {
                const newQuantity = currentQuantity + 1;
                setCurrentQuantity(newQuantity);

                dispatch({
                    type: "ADD_CART",
                    payload: { ...data, quantity: newQuantity + 1 },
                });
                localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
            } else {
                toast.error("商品數量已達購買上限");
            }

        };

export const decreaseCartQuantity =
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: { ...data, quantity: newQuantity },
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName}已從購物車移除`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const authenticateSignInUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("登入成功");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "系統異常，請稍後重試");
        } finally {
            setLoader(false);
        }
    }

export const registerNewUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "帳號註冊完成");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "系統異常，請稍後重試");
        } finally {
            setLoader(false);
        }
    };

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("login");
}

export const addUpdateUserAddress =
    (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
        dispatch({ type: "BUTTON_LOADER" });
        try {
            if (!addressId) {
                const { data } = await api.post("/addresses", sendData);
            } else {
                await api.put(`/addresses/${addressId}`, sendData);
            }
            dispatch(getUserAddresses());
            toast.success("地址成功儲存");
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "系統異常，請稍後重試");
            dispatch({ type: "IS_ERROR", payload: null });
        } finally {
            setOpenAddressModal(false);
        }
    }


export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/addresses`);
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
        });
    }
};

export const deleteUserAddress =
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
        try {
            dispatch({ type: "BUTTON_LOADER" });
            await api.delete(`/addresses/${addressId}`);
            dispatch({ type: "IS_SUCCESS" });
            dispatch(getUserAddresses());
            dispatch(clearCheckoutAddress());
            toast.success("已刪除地址");
        } catch (error) {
            console.log(error);
            dispatch({
                type: "IS_ERROR",
                payload: error?.response?.data?.message || "Some Error Occured",
            });
        } finally {
            setOpenDeleteModal(false);
        }
    };

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};

export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
        });
    }
};

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');

        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });

    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
        });
    }
};

export const createStripePaymentSecret
    = (totalPrice) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const amountInCents = Math.round(Number(totalPrice) * 100); 

            const { data } = await api.post("/order/stripe-client-secret", {
                amount: amountInCents,  
                currency: "twd", 
            });
            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
    };


export const stripePaymentConfirmation = (
    sendData,
    setErrorMessage,  
    setLoading, 
    toast
) => async (dispatch) => {
    try {
        setLoading?.(true);
        const { data: order } = await api.post("/order/users/payments/CARD", {
            ...sendData,
            pgName: "stripe",           
            pgStatus: sendData.pgStatus || "succeeded",
            pgResponseMessage: sendData.pgResponseMessage || "Stripe success",
        });

        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast?.success("訂單已接受");
        return order;
    } catch (error) {
        console.error("stripePaymentConfirmation error:", error);
        setErrorMessage?.("付款失敗，請重新付款");
        toast?.error("付款失敗，請重新付款");
        throw error; 
    } finally {
        setLoading?.(false);
    }
};


export const createLinepayOrder = (sendData, setLoading, setErrorMessage, navigate) => async (dispatch) => {
    try {
        setLoading(true);
        const res = await api.post("/order/create-for-linepay", sendData);
        const order = res.data;

        localStorage.setItem("LINEPAY_ORDER_ID", String(order.orderId));       
        localStorage.setItem("LINEPAY_TOTAL_AMOUNT", String(order.totalAmount));  
        localStorage.setItem("LINEPAY_ADDRESS_ID", String(order.addressId || sendData.addressId)); 
        dispatch({ type: "SAVE_LINEPAY_ORDER", payload: order });
        navigate("/checkout/linepay/reserve");
    } catch (err) {
        setErrorMessage("建立訂單失敗");
    } finally {
        setLoading(false);
    }
};

export const linepayPaymentConfirmation =
    (transactionId, pgName, pgPaymentId, pgStatus, pgResponseMessage, toast, orderIdArg, amountArg, currencyArg) =>
        async (dispatch) => {
            try {
                const orderId = Number(orderIdArg ?? localStorage.getItem("LINEPAY_ORDER_ID"));
                const amount = Number(amountArg ?? localStorage.getItem("LINEPAY_TOTAL_AMOUNT"));
                const currency = String(currencyArg ?? "TWD");
                const addressId = Number(localStorage.getItem("LINEPAY_ADDRESS_ID"));

                if (!orderId || !amount || !addressId) {
                    toast.error("缺少必要資訊（orderId/amount/addressId）");
                    return;
                }
                const confirmRes = await api.post(`/order/linepay-confirm/${transactionId}`, {
                    amount,
                    currency,
                });
                if (confirmRes.data !== "CONFIRMED") {
                    toast.error("LinePay 確認失敗");
                    return;
                }
                const finalizeRes = await api.post(`/order/users/payments/linepay`, {
                    orderId,
                    addressId,
                    pgName: pgName || "linepay",
                    pgPaymentId: pgPaymentId || transactionId, 
                    pgStatus: pgStatus || "PAID",
                    pgResponseMessage: pgResponseMessage || "Line Pay confirmed",
                });
                const order = finalizeRes.data;
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("LINEPAY_ORDER_ID");
                localStorage.removeItem("LINEPAY_TOTAL_AMOUNT");
                localStorage.removeItem("LINEPAY_ADDRESS_ID");
                dispatch({ type: "CLEAR_CART" });

                toast.success("LinePay 付款完成，訂單已成立");
                return order;
            } catch (err) {
                console.error("LinePay confirm/finalize error", err);
                toast.error("LinePay 流程失敗，請稍後再試");
                throw err;
            }
        };


export const getUserOrders = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/users/orders`);
        dispatch({ type: "SET_USER_ORDERS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch orders",
        });
    }
};



