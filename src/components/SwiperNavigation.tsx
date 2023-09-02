import React from "react";
import { Button } from "./ui/Button";
import { useSwiper } from "swiper/react";

export const SwiperNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center justify-center gap-[64px] mt-8">
      <Button
        // classes={
        //   swiper.isBeginning
        //     ? "btn--outline-gray-30 btn-icon--md border--md disabled"
        //     : "btn--outline-primary btn-icon--md border--md"
        // }
        classes="btn--outline-primary btn-icon--md border--md"
        onClick={() => {
          swiper.slidePrev();
          console.log(swiper);
        }}
        //   disabled={swiper.isBeginning && true}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="19"
          viewBox="0 0 9 19"
          fill="none"
        >
          <path
            d="M8 1L1 9.5L8 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        // classes={
        //   swiper.isEnd
        //     ? "btn--outline-gray-30 btn-icon--md border--md disabled"
        //     : "btn--outline-primary btn-icon--md border--md"
        // }
        classes="btn--outline-primary btn-icon--md border--md"
        onClick={() => swiper.slideNext()}
        // disabled={swiper.isEnd && true}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
        >
          <path
            d="M19 14L26 22.5L19 31"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};
