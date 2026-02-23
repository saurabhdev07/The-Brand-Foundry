'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';
import { useCursorContext } from "@/contexts/CursorProvider";

const images = [
	"1.jpg",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.png",
	"6.png",
	"7.jpg",
	"8.jpg",
	"9.jpg",
	"10.jpg",
	"11.jpg",
	"12.jpg",
]

export default function Works() {
	const { setScale } = useCursorContext();
	const gallery = useRef(null);
	const [dimension, setDimension] = useState({ width: 0, height: 0 });

	const { scrollYProgress } = useScroll({
		target: gallery,
		offset: ['start end', 'end start']
	})
	const { height } = dimension;
	const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
	const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
	const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
	const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

	useEffect(() => {
		const lenis = new Lenis()

		const raf = (time) => {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		const resize = () => {
			setDimension({ width: window.innerWidth, height: window.innerHeight })
		}

		window.addEventListener("resize", resize)
		requestAnimationFrame(raf);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		}
	}, [])

	return (
		<section className="min-h-screen w-full">
			<div className='h-screen w-full flex items-center justify-center'>
				<h1
					onMouseEnter={() => setScale(5)}
					onMouseLeave={() => setScale(1)}
					className="py-20 px-10 font-bebas-neue text-9xl text-center"
				>
					Our Works
				</h1>
			</div>
			<div className="h-[10dvh]"></div>
			<div ref={gallery} className="h-[175vh] bg-neutral-800 relative flex gap-8 p-8 box-border overflow-hidden">
				<Column images={[images[0], images[1], images[2]]} y={y} />
				<Column images={[images[3], images[4], images[5]]} y={y2} />
				<Column images={[images[6], images[7], images[8]]} y={y3} />
				<Column images={[images[9], images[10], images[11]]} y={y4} />
			</div>
		</section>
	)
}

const Column = ({ images, y }) => {
	const { setScale } = useCursorContext();
	return (
		<motion.div
			className="relative h-full w-1/4 md:min-w-[250px] min-w-[160px] flex flex-col gap-8"
			style={{
				y,
				top: images[0] === "1.jpg" ? "-45%" :
					images[0] === "4.jpg" ? "-95%" :
						images[0] === "7.jpg" ? "-45%" : "-75%"
			}}
		>
			{
				images.map((src, i) => {
					return (
						<div
							key={i}
							className="h-full w-full relative rounded-lg overflow-hidden"
							onMouseEnter={() => setScale(3)}
							onMouseLeave={() => setScale(1)}
						>
							<Image
								src={`/works/sample/${src}`}
								alt='image'
								fill
								className="object-cover"
							/>
						</div>
					)
				})
			}
		</motion.div>
	)
}
