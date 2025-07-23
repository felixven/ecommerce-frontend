import ProductCard from "./shared/ProductCard";

const products = [
    {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "iPhone 13 Pro Max",
        description:
            "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
        specialPrice: 720,
        price: 780,
    },
    {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Samsung Galaxy S21",
        description:
            "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
        specialPrice: 699,
        price: 799,
    },
    {
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Google Pixel 6",
        description:
            "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
        price: 599,
        specialPrice: 400,
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
                    <img src="https://embarkx.com/sample/placeholder.png"
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