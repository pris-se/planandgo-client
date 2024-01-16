import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { TaskCard } from "../components/TaskCard";
import { ITask } from "../models/Task.model";
import { SwiperNavigation } from "./SwiperNavigation";

interface CardsSwiperProps {
    tasks: ITask[];
}

export const CardsSwiper = ({ tasks }: CardsSwiperProps) => {
    const [isNavigationShown, setIsNavigationShown] = useState(false)

    if (!tasks) {
        return <p>There is no tasks yet</p>
    }

    return (
        <>
            <Swiper
                watchOverflow={true}
                slidesPerView={1}
                spaceBetween={20}
                freeMode={true}
                autoplay={true}
                onInit={(swiper: any) => {
                    const wrapper = swiper.wrapperEl.scrollWidth
                    const swiperEl = swiper.el.clientWidth
                    setIsNavigationShown(Boolean(wrapper - swiperEl))
                }}

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
            >
                {tasks.map((task) => (
                    <SwiperSlide key={task._id}>
                        <TaskCard task={task} />
                    </SwiperSlide>
                ))}
                {
                    isNavigationShown && (
                        <SwiperNavigation />
                    )
                }
            </Swiper>
        </>
    );
};
