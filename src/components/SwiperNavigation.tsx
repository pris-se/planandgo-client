import { useSwiper } from "swiper/react";
import { Button } from "./ui/Button";

import { ReactComponent as NextIcon } from "../assets/img/chevron-left.svg";
import { ReactComponent as PrevIcon } from "../assets/img/chevron-right.svg";


export const SwiperNavigation = () => {
	const swiper = useSwiper();
	return (
		<div className="row-group gap--sm w-fit mt-8 mx-auto">
			<Button
				classes="btn--outline-primary btn--square btn--md"
				onClick={() => {
					swiper.slidePrev();
				}}
			>
				<span className="ico">
					<PrevIcon />
				</span>
			</Button>
			<Button
				classes="btn--outline-primary btn--square btn--md"
				onClick={() => swiper.slideNext()}
			>
				<span className="ico">
					<NextIcon />
				</span>
			</Button>
		</div>
	);
};
