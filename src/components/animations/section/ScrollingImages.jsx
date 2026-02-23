import { useEffect, useState, useRef } from 'react';

export default function ScrollingImages({
	array1 = [],
	array2 = [],
	array3 = [],
	overlayContent = null, // New prop for overlay content
	overlayClassName = "bg-black bg-opacity-50" // Default styling for overlay
}) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const sectionRef = useRef(null);
	const containerRef = useRef(null);

	// Ensure we have at least one image in each array to avoid errors
	const images1 = array1.length > 0 ? array1 : ["/api/placeholder/400/320"];
	const images2 = array2.length > 0 ? array2 : ["/api/placeholder/400/320"];
	const images3 = array3.length > 0 ? array3 : ["/api/placeholder/400/320"];

	useEffect(() => {
		const section = sectionRef.current;
		const container = containerRef.current;

		if (!section || !container) return;

		// Update container width on mount and resize
		const updateContainerWidth = () => {
			setContainerWidth(container.offsetWidth);
		};

		const handleScroll = () => {
			// Get section's position relative to viewport
			const rect = section.getBoundingClientRect();

			// Calculate how far the section has been scrolled
			const scrollValue = -rect.top;

			// Only update state if section is in view or near it
			if (rect.bottom > -500 && rect.top < window.innerHeight + 500) {
				setScrollPosition(scrollValue);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateContainerWidth);

		// Initial calculations
		updateContainerWidth();
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateContainerWidth);
		};
	}, []);

	// Create infinitely scrolling effect with limited images
	const createInfiniteRow = (images, speed, direction = 'left') => {
		const singleImageWidth = 320; // w-80 = 20rem = 320px
		const gap = 16; // gap-4 = 1rem = 16px

		// Calculate width of a single set of images
		const imageSetWidth = images.length * (singleImageWidth + gap) - gap; // Subtract last gap

		// Calculate how many sets we need to fill the container width
		// Add extra sets to ensure no empty spaces
		const setsNeeded = Math.ceil(containerWidth / imageSetWidth) + 2;
		const totalWidth = imageSetWidth + setsNeeded;

		// Calculate transform with modulo to create infinite loop effect
		let transform;
		if (direction === 'left') {
			// When scrolling left, we need to reset once we've moved one full set width
			transform = `translateX(${-(scrollPosition * speed) % totalWidth}px)`;
		} else {
			transform = `translateX(${(scrollPosition * speed) % totalWidth}px)`;
		}

		return (
			<div className="flex overflow-hidden w-full">
				<div
					className="flex gap-4"
					style={{ transform }}
				>
					{Array(setsNeeded).fill().map((_, copyIndex) => (
						images.map((src, i) => (
							<img
								key={`${direction}-${copyIndex}-${i}`}
								src={src}
								alt="Gallery image"
								className="w-80 h-60 object-cover rounded-xl flex-shrink-0"
							/>
						))
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="relative bg-black" ref={sectionRef}>
			{/* Main container with scrolling images */}
			<div
				ref={containerRef}
				className="h-screen flex flex-col justify-center items-center gap-12 overflow-hidden relative"
			>
				{/* Container 1 - Left Direction */}
				{createInfiniteRow(images1, 0.2, 'left')}

				{/* Container 2 - Right Direction */}
				{createInfiniteRow(images2, 0.3, 'right')}

				{/* Container 3 - Left Direction (faster) */}
				{createInfiniteRow(images3, 0.4, 'left')}

				{/* Overlay div - positioned absolutely over the scrolling content */}
				{overlayContent && (
					<div className={`absolute inset-0 flex items-center justify-center z-10 ${overlayClassName}`}>
						{overlayContent}
					</div>
				)}
			</div>
		</div>
	);
}
