"use client";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import "./slider.css";

type Props = {
  images: string[];
  title: string;
};

export const SliderProduct = ({ images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  return (
    <>
      {/* Main slider */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={900}
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails - Slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={900}
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
