import toast from "react-hot-toast";
import api from "../../api/api"; import { Elements } from '@stripe/react-stripe-js';

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        //console.log("queryString:", queryString);
        const { data } = await api.get(`/public/products?${queryString}`);
        //?${queryString}
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
            payload: error?.response?.data?.message || "Failed to fetch products",
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
            payload: error?.response?.data?.message || "Failed to fetch categories",
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

        //Check for stocks
        const isQuantityExist = getProduct.quantity >= qty;

        // If in stock -> add
        if (isQuantityExist) {
            dispatch({
                type: "ADD_CART",
                payload: { ...data, quantity: qty }
            });
            toast.success(`${data?.productName} 已加入購物車`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            //if not -> error
            // error
            toast.error("商品無庫存");
        }

    };


export const increaseCartQuantity =
    (data, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {
            // Find the product
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
        });//update redux
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
    dispatch({ type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName}已從購物車移除`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const authenticateSignInUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {//from Login.jsx line:25
        try {
            setLoader(true);//updating the loading state, user is authenticated
            const { data } = await api.post("/auth/signin", sendData);//對應一下line:7
            dispatch({ type: "LOGIN_USER", payload: data });//authReducer裡面handle了LOGIN_USER
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("登入成功");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
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
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
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

        //const { user } = getState().auth;
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
            toast.error(error?.response?.data?.message || "Internal Server Error");
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
        //console.log("sendCartItems:", sendCartItems);
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
            const { data } = await api.post("/order/stripe-client-secret", {
                "amount": Number(totalPrice) * 100,
                "currency": "usd"
            });
            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
    };

export const stripePaymentConfirmation
    = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            const response = await api.post("/order/users/payments/online", sendData);
            if (response.data) {
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
                dispatch({ type: "CLEAR_CART" });
                toast.success("訂單已接受");
            } else {
                setErrorMesssage("付款失敗，請重新付款");
            }
        } catch (error) {
            setErrorMesssage("付款失敗，請重新付款");
        }
    };

export const createLinepayOrder = (sendData, setLoading, setErrorMessage, navigate) => async (dispatch) => {
    try {
        setLoading(true);
        const res = await api.post("/order/create-for-linepay", sendData);
        const order = res.data;
        // 儲存 orderId 給下一步 reserve 用
        dispatch({ type: "SAVE_LINEPAY_ORDER", payload: order });
        navigate("/checkout/linepay/reserve");
    } catch (err) {
        setErrorMessage("建立訂單失敗");
    } finally {
        setLoading(false);
    }
};

export const linepayPaymentConfirmation =
    (transactionId, pgName, pgPaymentId, pgStatus, pgResponseMessage, toast, orderId, amount, currency) =>
        async (dispatch) => {
            try {
                const body = {
                    orderId,
                    amount,
                    currency,
                    pgName,
                    pgPaymentId,
                    pgStatus,
                    pgResponseMessage,
                };

                const res = await api.post(`/order/linepay-confirm/${transactionId}`, body);

                if (res.data) {
                    localStorage.removeItem("CHECKOUT_ADDRESS");
                    localStorage.removeItem("cartItems");
                    dispatch({ type: "CLEAR_CART" });
                    localStorage.removeItem("LINEPAY_ORDER_ID");
                    localStorage.removeItem("LINEPAY_TOTAL_AMOUNT");
                    toast.success("LinePay 付款完成");
                } else {
                    toast.error("LinePay 付款失敗");
                }
            } catch (err) {
                console.error("LinePay confirm error", err);
                toast.error("LinePay confirm failed.");
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



