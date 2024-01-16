import { useSwiper } from "swiper/react";
import { Button } from "./ui/Button";

import { ReactComponent as NextIcon } from "../assets/img/chevron-left.svg";
import { ReactComponent as PrevIcon } from "../assets/img/chevron-right.svg";


export const SwiperNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center justify-center gap-[64px] mt-8">
      <Button
        classes="btn--outline-primary btn-icon--md border--md"
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <PrevIcon />
      </Button>
      <Button
        classes="btn--outline-primary btn-icon--md border--md"
        onClick={() => swiper.slideNext()}
      >
        <NextIcon />
      </Button>
    </div>
  );
};
