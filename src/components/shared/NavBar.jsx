import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { UserMenu } from "../UserMenu";


const NavBar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        setNavbarOpen(false);     // 路由改變就收合
    }, [location.pathname]);

    return (
        <div className="h-[70px] bg-custom-gradient text-black z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="mr-2 text-3xl" />
                    <span className="font-[Poppins]">Flex-Shop</span>
                </Link>

                <ul className={`flex sm:gap-10 gap-4 sm:items-center sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"} transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-black sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>

                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/" ? "font-semibold" : "hover:font-semibold"}`}
                            to="/"
                        >
                            首頁
                        </Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/products" ? "font-semibold" : "hover:font-semibold"}`}
                            to="/products"
                        >
                            全站商品
                        </Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/about" ? "font-semibold" : "hover:font-semibold"}`}
                            to="/about"
                        >
                            關於我們
                        </Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/contact" ? "font-semibold" : "hover:font-semibold"}`}
                            to="/contact"
                        >
                            聯繫客服
                        </Link>
                    </li>

                    <li className="font-[500] transition-all duration-150">
                        <Link
                            className={`${path === "/cart" ? "font-semibold" : "hover:font-semibold"}`}
                            to="/cart"
                        >
                            <Badge
                                showZero
                                badgeContent={
                                    <span className="text-[10px] text-[#f9f6f2] font-bold">
                                        {cart?.length || 0}
                                    </span>
                                }
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        backgroundColor: "#000", // 圓圈黑色
                                        color: "transparent",    // 數字透明（透出底色）
                                        backdropFilter: "blur(2px)", // 模糊一下底色
                                        WebkitBackdropFilter: "blur(2px)",
                                        fontWeight: "bold",
                                    }
                                }}
                            >
                                <FaShoppingCart size={18} className="text-black" />
                            </Badge>
                        </Link>
                    </li>

                    {(user && user.id) ? (
                        <li className="font-[500] transition-all duration-150">
                            <UserMenu />
                        </li>
                    ) : (
                        <li className="font-[500] transition-all duration-150">
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 px-4 py-[6px]
    bg-[#3e3025] text-white font-semibold rounded-md shadow-lg
    hover:bg-[#5a4536] transition duration-300 ease-in-out transform"
                            >
                                <FaSignInAlt />
                                <span>登入</span>
                            </Link>
                        </li>
                    )}
                </ul>

                <button onClick={() => setNavbarOpen(!navbarOpen)} className="sm:hidden flex items-center sm:mt-0 mt-2">
                    {navbarOpen ? (
                        <RxCross2 className="text-black text-3xl" />
                    ) : (
                        <IoIosMenu className="text-black text-3xl" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default NavBar;
