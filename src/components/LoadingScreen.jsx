import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingOverlay({ children }) {
	const [loading, setLoading] = useState(true);
	const [animationDone, setAnimationDone] = useState(false);

	useEffect(() => {
		// Finish loading after 3 seconds
		const timer = setTimeout(() => {
			setLoading(false);

			// Wait for animation (0.7s duration + 1.6s delay = ~2.3s)
			const animationTimer = setTimeout(() => {
				setAnimationDone(true);
			}, 2200); // match the overlay slide duration

			return () => clearTimeout(animationTimer);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	// Once animation is done, return only children
	if (animationDone) {
		return <>{children}</>;
	}

	return (
		<div className="relative h-screen w-full overflow-hidden">
			<motion.div
				className="absolute inset-0 flex items-center justify-center"
				initial={{ visibility: "visible" }}
				animate={{
					visibility: loading ? "visible" : "hidden",
				}}
				transition={{
					visibility: { delay: 2.3, duration: 0 }
				}}
			>
				{/* Left overlay */}
				<motion.div
					className="absolute h-full w-1/2 left-0 bg-black"
					initial={{ x: 0 }}
					animate={{ x: loading ? 0 : "-100%" }}
					transition={{
						duration: 0.7,
						ease: [0.65, 0, 0.35, 1],
						delay: 1.6,
					}}
				/>

				{/* Right overlay */}
				<motion.div
					className="absolute h-full w-1/2 right-0 bg-black"
					initial={{ x: 0 }}
					animate={{ x: loading ? 0 : "100%" }}
					transition={{
						duration: 0.7,
						ease: [0.65, 0, 0.35, 1],
						delay: 1.6,
					}}
				/>

				{/* Center line */}
				<motion.div
					className="absolute bg-white w-0.5 rounded-full"
					initial={{ height: 0 }}
					animate={{ height: loading ? ["0%", "100%"] : "0%" }}
					transition={{
						duration: 1.5,
						times: [0, 0.6, 1],
						ease: "easeInOut",
					}}
				/>
			</motion.div>
		</div>
	);
}
