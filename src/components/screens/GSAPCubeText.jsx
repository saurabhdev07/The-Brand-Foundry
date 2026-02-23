import { useEffect, useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';

export default function GsapCube() {
	const cubeRef = useRef(null);
	const wrapperRef = useRef(null);

	useEffect(() => {
		if (!cubeRef.current) return;

		// Create timeline for continuous animation
		const tl = gsap.timeline({
			repeat: -1, // Infinite repeat
			onComplete: () => tl.restart(true), // Ensure smooth restart
		});

		// Rotate around Y-axis first
		tl.to(cubeRef.current, {
			rotationX: 360,
			duration: 5,
			ease: "linear",
		});

		return () => {
			tl.kill(); // Clean up the animation when component unmounts
		};
	}, []);

	// Consistent size for all faces
	const faceClass = 'absolute w-[250px] h-[150px] flex justify-center items-center text-base font-bold bg-foreground text-background border-2 border-opacity-10';

	return (
		<div className={'p-2 flex flex-col justify-center items-center h-full bg-black text-white'}>
			<Head>
				<title>3D Rotating Cube with GSAP</title>
				<meta name="description" content="3D Rotating Cube with GSAP" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={'flex-1 flex flex-col justify-center items-center'}>
				<h1 className={'text-2xl flex items-center justify-center gap-[20px]'}>
					As simple as
					<div
						ref={wrapperRef}
						className={'relative w-[150px] h-[150px] flex justify-center items-center ml-[20px]'}
					>
						<div
							ref={cubeRef}
							className={'w-[150px] h-[150px] relative'}
							style={{
								transformStyle: "preserve-3d",
							}}
						>
							{/* Front face */}
							<div
								className={`${faceClass}`}
								style={{
									transform: 'translateZ(75px)'
								}}
							>
								REPEAT
							</div>

							{/* Back face */}
							<div
								className={`${faceClass}`}
								style={{
									transform: 'rotateY(180deg) translateZ(75px)'
								}}
							>
								LEARN
							</div>

							{/* Top face */}
							<div
								className={`${faceClass}`}
								style={{
									transform: 'rotateX(90deg) translateZ(75px)'
								}}
							>
								REPEAT
							</div>

							{/* Bottom face - fixed transform */}
							<div
								className={`${faceClass}`}
								style={{
									transform: 'rotateX(-90deg) translateZ(75px)'
								}}
							>
								LEARN
							</div>
						</div>
					</div>
				</h1>
			</main>
		</div>
	);
}
