import ProductCard from "./shared/ProductCard";

const products = [
    {
        image: "https://res.cloudinary.com/drbhr7kmb/image/upload/v1754923603/epqwckg0jyix9eglp0eu.png",
        productName: "iPhone XE",
        description:
            "高效處理器搭配清晰螢幕，支援多種應用程式，讓生活與工作一手掌握",
        specialPrice: 28000,
        price: 23800,
    },
    {
        image: "https://res.cloudinary.com/drbhr7kmb/image/upload/v1754922800/qzk2pxmsl7pzdalrfe4a.png",
        productName: "實木茶几",
        description:
            "採用天然實木打造，紋理細膩且耐用，建立居家美感",
        specialPrice: 6800,
        price: 5780,
    },
    {
        image: "https://res.cloudinary.com/drbhr7kmb/image/upload/v1754924302/myn9om3c2axfsw5bxju3.png",
        productName: "MacBook Pro 14",
        description:
            "Apple M 系列晶片，結合高效能與長續航，配備 Liquid Retina XDR 顯示器與優異的色彩準確度，無論是創意設計、影像剪輯還是日常工作，都能流暢運行，滿足專業與日常的多元需求",
        price: 38800,
        specialPrice: 32980,
    }
];

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                關於我們
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                <div className="max-w-3xl mx-auto px-4 py-8 text-center">
                    <div className="text-xl leading-relaxed space-y-5 text-gray-800">
                        <p>
                            我們是一個專注於日常好物的平台，致力於提供實用而有質感的用品。
                        </p>
                        <p>
                            不追流行，只挑經得起時間考驗的商品。
                        </p>
                        <p>
                            希望你在這裡，找到適合自己的東西，打造質感生活。
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img src="https://res.cloudinary.com/drbhr7kmb/image/upload/v1754923230/uyl8vt1z0ceejyff3wqg.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                    </img>
                </div>
            </div>

            <div className="py-7 space-y-8">
                <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                    我們提供的產品
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.image}
                            productName={product.productName}
                            description={product.description}
                            specialPrice={product.specialPrice}
                            price={product.price}
                            about
                        />

                    ))

                    }

                </div>
            </div>
        </div>
    );
}
export default About;