import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

export default function RippleEffect({ src, alt, width = 400, height = 300, className = '' }) {
	const bottomControls = useAnimation();
	const topControls = useAnimation();

	const handleMouseEnter = () => {
		bottomControls.start({
			rotate: 0,
			scale: 1.2,
			filter: 'brightness(100%) saturate(100%)',
			transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
		});

		topControls.start({
			clipPath: 'circle(0% at 100% 0%)',
			transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
		});
	};

	const handleMouseLeave = () => {
		bottomControls.start({
			scale: 1,
			filter: 'brightness(0%) saturate(200%)',
			transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
		});

		topControls.start({
			clipPath: 'circle(141.2% at 100% 0%)',
			transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
		});
	};

	return (
		<div
			className={`double cursor-pointer ${className}`}
			style={{ width, height, position: 'relative', overflow: 'hidden' }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div
				className="double__img"
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					transformOrigin: '50% 100%',
					rotate: 3,
					filter: 'brightness(0%) saturate(600%)',
				}}
				animate={bottomControls}
				initial={{
					rotate: 3,
					filter: 'brightness(0%) saturate(600%)',
				}}
			>
				<Image src={src} alt={alt} layout="fill" objectFit="cover" />
			</motion.div>
			<motion.div
				className="double__img"
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					clipPath: 'circle(141.2% at 100% 0%)',
				}}
				animate={topControls}
				initial={{
					clipPath: 'circle(141.2% at 100% 0%)',
				}}
			>
				<Image src={src} alt={alt} layout="fill" objectFit="cover" />
			</motion.div>
		</div>
	);
}

