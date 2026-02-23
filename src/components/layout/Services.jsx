import { useMotionValueEvent, useScroll } from "framer-motion";
import WhatWeDo from "../screens/WhatWeDo";
import { useRef } from "react";
import { useNavColor } from "@/contexts/NavColorProvider";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";
import { useCursorContext } from "@/contexts/CursorProvider";

export default function Services() {
	const ref = useRef(null);
	const { scrollY } = useScroll();
	const { setColor } = useNavColor();
	const { setScale } = useCursorContext();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const secTop = ref.current.offsetTop;
		const secHeight = ref.current.offsetHeight;

		if (latest >= secTop && latest < secTop + secHeight) {
			setColor("text-background");
		} else {
			setColor("text-foreground");
		}
	});

	return (
		<section ref={ref} className="min-h-screen w-full bg-foreground text-background transition-colors duration-500">
			<WhatWeDo />
			<div className="mt-10 px-6 w-full">
				{
					navLinks.map((item, index) => (
						<Link
							href={item.href}
							key={index}
							className={`w-full min-h-64 grid grid-cols-3 gap-5 border-background relative 
								${index === 0 ? 'border-y' : 'border-b'}`}
							onMouseEnter={() => setScale(4)}
							onMouseLeave={() => setScale(1)}
						>

							<div className="flex items-start justify-center p-4 hover:scale-110 transition-all duration-700">
								<h2 className={`text-violet-500 text-center text-sm font-creato-display-bold`} >
									Service 00{index + 1}
								</h2>
							</div>

							<div className="flex justify-center items-center hover:scale-110 transition-all duration-700">
								<h1 className={`md:text-6xl text-4xl text-center font-vogue`}>
									{item.title}
								</h1>
							</div>

							<div className="flex items-start justify-center p-4 hover:scale-110 transition-all duration-700">
								<button className={`text-violet-500 text-center text-sm font-creato-display-bold`}>
									Learn More
								</button>
							</div>
						</Link>
					))
				}
			</div>
		</section>
	)
}
