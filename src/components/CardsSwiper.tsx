import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { TaskCard } from "../components/TaskCard";
import { ITask } from "../models/Task.model";
import { SwiperNavigation } from "./SwiperNavigation";

interface CardsSwiperProps {
  tasks: ITask[];
}

export const CardsSwiper = ({ tasks }: CardsSwiperProps) => {

  if(!tasks) {
    return <p>There is no tasks yet</p>
  }
  return (
    <>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}

        slidesPerView={1}
        spaceBetween={20}
        autoplay={true}
      >
        {tasks.map((task) => (
          <SwiperSlide key={task._id}>
            <TaskCard task={task} />
          </SwiperSlide>
        ))}
        <SwiperNavigation />
      </Swiper>
    </>
  );
};
