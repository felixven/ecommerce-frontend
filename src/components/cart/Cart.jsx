import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemContent from "./ItemContent";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.carts);
    const { products } = useSelector((state) => state.products);
    const newCart = { ...cart };

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts()); 
        }
    }, [products, dispatch]);

    newCart.totalPrice = cart?.reduce(
        (acc, cur) => acc + Number(cur?.specialPrice) * Number(cur?.quantity), 0
    );

    if (!cart || cart.length === 0) return <CartEmpty />;

    return (
        <div className="lg:px-14 sm:px-8 px-4 py-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                    <MdShoppingCart size={36} className="text-gray-700" />
                    購物車
                </h1>
                <p className="text-lg text-gray-600 mt-2">已加入購物車的商品</p>
            </div>

            <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold items-center">
                <div className="md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4">
                    商品名稱
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    價格
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    數量
                </div>

                <div className="justify-self-center text-lg text-slate-800">
                    總金額
                </div>
            </div>

            <div>
                {cart && cart.length > 0 &&
                    cart.map((item, i) => <ItemContent key={i} {...item} />)}
            </div>

            <div className="border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4">
                <div></div>
                <div className="flex text-sm gap-1 flex-col">
                    <div className="flex justify-between w-full md:text-lg text-sm font-semibold">
                        <span>商品總金額</span>
                        <span>NT{formatPrice(newCart?.totalPrice)}</span>
                    </div>

                    <p className="text-slate-500">
                        運費會於結帳時計算
                    </p>

                    <Link className="w-full flex justify-end" to="/checkout">
                        <button
                            onClick={() => { }}
                            className="font-semibold w-[300px] py-2 px-4 rounded-sm 
             bg-black text-white flex items-center justify-center gap-2 
             hover:bg-gray-800 transition duration-500">
                            <MdShoppingCart size={20} />
                            確認結帳
                        </button>

                    </Link>

                    <Link className="flex gap-2 items-center mt-2 text-slate-500" to="/products">
                        <MdArrowBack />
                        <span>繼續購物</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;