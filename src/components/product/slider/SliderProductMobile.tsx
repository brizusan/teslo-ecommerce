"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import "./slider.css";

type Props = {
  images: string[];
  title: string;
};

export const SliderProductMobile = ({ images, title }: Props) => {
  return (
    <>
      {/* Main slider */}
      <Swiper
        style={{ height: "100%", width: "100%" }}
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        className="mySwiper2"
        modules={[Autoplay, Pagination]}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={`imagen de ${title}`}
              width={600}
              height={450}
              className="w-full object-fill"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
