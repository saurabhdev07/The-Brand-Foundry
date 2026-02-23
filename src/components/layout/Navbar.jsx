import { CompanyName } from '@/constants/common';
import Link from 'next/link';
import { useEffect } from 'react';
import RippleEffect from '../animations/images/RippleEffect';
import { mainLinks, navLinks } from '@/constants/navLinks';
import { ButtonLeft, Button, ButtonCenter } from '../ui/Button';
import { useCursorContext } from "@/contexts/CursorProvider";

export default function Navbar({ onClose, isOpen }) {
	const { setScale } = useCursorContext();
	useEffect(() => {
		if (!isOpen) {
			const timer = setTimeout(() => onClose(), 500); // Match the slide-up duration
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-background text-foreground transform transition-transform duration-700 ease-in-out z-40 ${isOpen ? 'translate-y-0' : 'translate-y-full'
				}`}
		>
			<div className='flex items-center justify-between p-4'>
				<button
					onClick={onClose}
					className="md:text-3xl text-base"
					onMouseEnter={() => setScale(4)}
					onMouseLeave={() => setScale(1)}
				>
					Close
				</button>
				<h1 className='font-vogue md:text-3xl text-base'>{CompanyName}</h1>
				<div />
			</div>

			{/* --- Bigger Screens --- */}
			<div className='w-full h-[95%] md:flex hidden gap-1'>
				{/* Left Side Container */}
				<div className='h-full w-full flex flex-col justify-between gap-10 p-10 '>
					<RippleEffect
						src={'/navbar/1.png'}
						alt='Navbar'
						width={'80%'}
						height={'50%'}
						className={'mt-[10%]'}
					/>
					<div
						className="flex flex-col"
						onMouseEnter={() => setScale(4)}
						onMouseLeave={() => setScale(1)}
					>
						{
							mainLinks.map((item, index) => (
								<Link
									className='font-bebas-neue md:text-4xl text-xl text-left'
									href={item.href}
									key={index}
								>
									<ButtonLeft id={item.id} title={item.title} />
								</Link>
							))
						}
						<div className="flex gap-4 items-center p-4">
							<Link href={'/'} className='text-lg'>Instagram</Link>
							<Link href={'/'} className='text-lg'>LinkedIn</Link>
						</div>
					</div>
				</div>
				<div
					className='h-full w-full flex flex-col justify-center pr-10'
					onMouseEnter={() => setScale(4)}
					onMouseLeave={() => setScale(1)}
				>
					{
						navLinks.map((item, index) => (
							<Link
								className='font-bebas-neue xl:text-7xl lg:text-6xl text-4xl text-right'
								href={item.href}
								key={index}
							>
								<Button id={item.id} title={item.title} />
							</Link>
						))
					}
				</div>
			</div>

			{/* --- Tablet or smaller screens --- */}
			<div className='w-full h-[95%] flex md:hidden flex-col justify-between items-center'>
				{/* Upside Container */}
				<div className='w-full flex flex-col gap-4 items-center justify-center py-8'>
					{navLinks.map((item, index) => (
						<Link
							className='font-bebas-neue text-3xl'
							href={item.href}
							key={index}
						>
							<ButtonCenter id={item.id} title={item.title} />
						</Link>
					))}
				</div>

				{/* Downside Container */}
				<div className='w-full flex flex-col items-center justify-center pb-10'>
					{
						mainLinks.map((item, index) => (
							<Link
								className='font-bebas-neue text-2xl text-left'
								href={item.href}
								key={index}
							>
								<ButtonCenter id={item.id} title={item.title} />
							</Link>
						))
					}
					<div className="w-full flex items-center justify-between p-6">
						<Link href={'/'} className='text-lg'>Instagram</Link>
						<Link href={'/'} className='text-lg'>LinkedIn</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
