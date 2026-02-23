import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCursorContext } from "@/contexts/CursorProvider";

export default function TestimonialCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const { setScale } = useCursorContext();

	const testimonials = [
		{
			name: "Marie",
			title: "CEO at COMPANY",
			quote: "COMPANY's product makes planning for the future seamless. Can't recommend them enough!",
			color: "white"
		},
		{
			name: "Andre",
			title: "CEO at COMPANY",
			quote: "If I could give 11 stars, I would give 12.",
			color: "white"
		},
		{
			name: "Jeremy",
			title: "CEO at COMPANY",
			quote: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet your product saved me 100 hours so far.",
			color: "white"
		},
		{
			name: "Pam",
			title: "CEO at COMPANY",
			quote: "Took some convincing, but now that we're on COMPANY, we're never going back.",
			color: "indigo-600"
		},
		{
			name: "Daniel",
			title: "CEO at COMPANY",
			quote: "It's just the best. Period. I'd be lost without COMPANY's in depth analytics. The ROI is phenomenal.",
			color: "white"
		},
		{
			name: "Fernando",
			title: "CEO at COMPANY",
			quote: "I switched 5 years ago and never looked back.",
			color: "white"
		},
		{
			name: "Pete",
			title: "CEO at COMPANY",
			quote: "I've been searching for a solution like this for YEARS. So glad I found you all!",
			color: "white"
		}
	];

	const goToPrevious = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
		setTimeout(() => setIsAnimating(false), 500);
	};

	const goToNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
		setTimeout(() => setIsAnimating(false), 500);
	};

	return (
		<div className="relative w-full md:h-screen h-[120dvh] overflow-hidden">
			<h1
				className='md:text-8xl text-6xl mt-32 text-center font-bebas-neue'
				onMouseEnter={() => setScale(5)}
				onMouseLeave={() => setScale(1)}
			>
				Clients Testimonials
			</h1>
			<div className="absolute w-full h-full flex items-center justify-center">
				{testimonials.map((testimonial, index) => {
					// Calculate position relative to current
					let position = index - currentIndex;
					if (position < -2) position += testimonials.length;
					if (position > 2) position -= testimonials.length;

					// Determine classes based on position
					let translateClass = "translate-x-0";
					let scaleClass = "scale-100";
					let zIndex = "z-10";
					let opacity = "opacity-100";

					if (position === -2) {
						translateClass = "-translate-x-full";
						scaleClass = "scale-75";
						zIndex = "z-0";
						opacity = "opacity-0";
					} else if (position === -1) {
						translateClass = "-translate-x-3/4";
						scaleClass = "scale-90";
						zIndex = "z-10";
						opacity = "opacity-60";
					} else if (position === 0) {
						translateClass = "translate-x-0";
						scaleClass = "scale-100";
						zIndex = "z-30";
						opacity = "opacity-100";
						// Add -translate-y to raise the active card
					} else if (position === 1) {
						translateClass = "translate-x-3/4";
						scaleClass = "scale-90";
						zIndex = "z-10";
						opacity = "opacity-60";
					} else if (position === 2) {
						translateClass = "translate-x-full";
						scaleClass = "scale-75";
						zIndex = "z-0";
						opacity = "opacity-0";
					} else {
						translateClass = "translate-x-full";
						scaleClass = "scale-0";
						zIndex = "z-0";
						opacity = "opacity-0";
					}

					const cardBgColor = position === 0 ? "bg-violet-500 text-white" : "bg-white text-gray-800";

					return (
						<div
							key={index}
							className={`absolute lg:w-[500px] lg:h-[300px] md:w-72 md:h-60 w-60 h-52 p-5 shadow-lg rounded-md ${cardBgColor} ${translateClass} ${scaleClass} ${opacity} ${zIndex} transition-all duration-500 ease-in-out transform ${position === 0 ? '-translate-y-6' : (position === 1 ? 'rotate-2' : '-rotate-2')}`}
							style={{
								transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
							}}
							onMouseEnter={() => setScale(3)}
							onMouseLeave={() => setScale(1)}
						>
							<div className="flex flex-col h-full justify-between">
								<div>
									<p className="md:text-lg text-base font-medium mb-2 font-vogue">"{testimonial.quote}"</p>
								</div>
								<div className="mt-4">
									<p className="text-sm font-medium font-bebas-neue">- {testimonial.name}, {testimonial.title}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
				<button
					onClick={goToPrevious}
					className="p-2 rounded-full bg-background shadow-md hover:bg-black transition-colors"
					disabled={isAnimating}
					onMouseEnter={() => setScale(2)}
					onMouseLeave={() => setScale(1)}
				>
					<ChevronLeft size={20} />
				</button>
				<button
					onClick={goToNext}
					className="p-2 rounded-full bg-background shadow-md hover:bg-black transition-colors"
					disabled={isAnimating}
					onMouseEnter={() => setScale(2)}
					onMouseLeave={() => setScale(1)}
				>
					<ChevronRight size={20} />
				</button>
			</div>
		</div>
	);
}
