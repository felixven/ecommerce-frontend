// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { bannerLists } from '../../utils';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import heroImage from "../../assets/sliders/banner-expanded.webp";

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

const HeroBanner = () => {
  return (
    <div
      className="w-full bg-banner-color1 bg-no-repeat bg-cover bg-center py-20 sm:py-32 px-6 sm:px-16"
      style={{ backgroundImage: `url(${heroImage})` }}
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

export default HeroBanner;


// const HeroBanner = () => {
//   return (
//     <div className='py-2 rounded-md'>
//       <Swiper
//         grabCursor={true}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         navigation
//         modules={[Pagination, EffectFade, Navigation, Autoplay]}
//         pagination={{ clickable: true }}
//         scrollbar={{ draggable: true }}
//         slidesPerView={1}>


//         {bannerLists.map((item, i) => (
//           <SwiperSlide key={item.id}>
//             <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}>
//               <div className='flex items-center justify-center'>
//                 <div className='hidden lg:flex justify-center w-1/2 p-8'>
//                   <div className='text-center'>
//                     <h3 className='text-3xl text-white font-bold'>
//                       {item.title}
//                     </h3>
//                     <h1 className='text-5xl text-white font-bold mt-2'>
//                       {item.subtitle}
//                     </h1>
//                     <p className='text-white font-bold mt-4'>
//                       {item.description}
//                     </p>
//                     <Link
//                       className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'
//                       to="/products">
//                       Shop
//                     </Link>
//                   </div>
//                 </div>
//                 <div className='w-full flex justify-center lg:w-1/2 p-4'>
//                   <img src={item?.image}></img>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}

//       </Swiper>

//     </div>
//   )
// }

// export default HeroBanner;