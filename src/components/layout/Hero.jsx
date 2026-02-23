import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useNavColor } from "@/contexts/NavColorProvider";
import { useCursorContext } from "@/contexts/CursorProvider";

// Make sure to register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
	const containerRef = useRef(null);
	const clipRef = useRef(null);
	const ref = useRef(null);
	const { scrollY } = useScroll();
	const { setColor } = useNavColor();
	const { setScale } = useCursorContext();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const secTop = ref?.current?.offsetTop;
		const secHeight = ref?.current?.offsetHeight;

		if (latest >= secTop && latest < secTop + secHeight) {
			setColor("text-foreground");
		} else {
			setColor("text-background");
		}
	});


	useEffect(() => {
		// Initialize the animation when component mounts
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: "+=100 center",
				scrub: 2.5,
				duration: 2.5,
				pin: true,
				pinSpacing: true,
			},
		});

		// Animate the clip mask to expand from its initial size to cover the entire screen
		clipAnimation.to(clipRef.current, {
			width: "100dvw",
			height: "100dvh",
			top: "0",
			left: "0",
			borderRadius: "0",
			ease: "power2.inOut",
			duration: 1.5,
		});

		return () => {
			if (clipAnimation.scrollTrigger) {
				clipAnimation.scrollTrigger.kill();
			}
			clipAnimation.kill();
		};
	}, []);

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen w-screen overflow-hidden"
		>
			{/* Fixed Text Content */}
			<div className="absolute inset-0 flex flex-col justify-center z-10">
				<div
					className="container mx-auto px-4 zoom-hover"
					onMouseEnter={() => setScale(6)}
					onMouseLeave={() => setScale(1)}
				>
					<h1 className="text-center text-6xl md:text-9xl font-vogue">
						Fueling the future
					</h1>
					<h1 className="text-center text-6xl md:text-9xl mb-8 font-bebas-neue">
						with fearless creativity.
					</h1>
				</div>
			</div>

			<div className="relative w-full h-full flex items-center justify-center">
				<div
					ref={clipRef}
					className="absolute w-[100px] h-[100px] top-[40%] overflow-hidden z-20"
					style={{
						borderRadius: "10px",
					}}
				>

					{/* For Bigger Screens */}
					<Image
						src="/hero/background.jpg"
						alt="Background"
						fill
						className="md:block hidden object-cover"
						priority
					/>

					{/* For Smaller Screens */}
					<Image
						src="/hero/background1.jpg"
						alt="Background"
						fill
						className="block md:hidden object-cover"
						priority
					/>

				</div>

			</div>
		</section>
	);
}
