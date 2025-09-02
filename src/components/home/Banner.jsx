import bannerImage from "../../assets/sliders/banner-expanded.webp";

const Banner = () => {
  return (
    <div
      className="w-full bg-banner-color1 bg-no-repeat bg-cover bg-center py-20 sm:py-32 px-6 sm:px-16"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-black drop-shadow-[1px_1px_3px_rgba(255,255,255,0.4)]">
          擇你所愛<br /> 建立美好生活
        </h1>
        <p className="text-black text-base sm:text-lg font-medium drop-shadow-[1px_1px_2px_rgba(255,255,255,0.35)]">
          輕鬆、快速、便利！<br />
          Flexible. Fast. Fully Yours.
        </p>
        <a
          href="/products"
          className="inline-block mt-5 bg-black text-white font-semibold px-6 py-2 rounded-md hover:bg-[#333] transition-colors duration-300"
        >
          瀏覽所有商品
        </a>
      </div>
    </div>
  );
};

export default Banner;