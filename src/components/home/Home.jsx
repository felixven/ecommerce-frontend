import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";


const Home = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {/*HeroBanner 獨立在最外層，才能 w-full 沒邊界 */}
            <HeroBanner />
            <div className="lg:px-14 sm:px-8 px-4">
                <div className="py-5">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h1 className="text-slate-800 text-4xl font-bold"> 嚴選商品</h1>
                      
                        <span className="text-slate-700">
                        家具、服飾、電器、3C，樣樣都有！
                    </span>
                    </div>
                    {/* <div className="flex flex-col justify-center items-center">
                        <h1 className="text-slate-800 text-4xl font-bold"> 嚴選好物</h1>
                        <div className="text-slate-700 text-center leading-relaxed">
                            <p>為您精選！</p>
                        </div>
                    </div> */}

                    {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                        <div className="flex justify-center items-center h-[200px]">
                            <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
                            <span className="text-slate-800 text-lg font-medium">
                                {errorMessage}
                            </span>
                        </div>
                    ) : (




                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {products &&
                                products?.slice(0, 8)
                                    .map((item, i) => <ProductCard key={i} {...item} />
                                    )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;