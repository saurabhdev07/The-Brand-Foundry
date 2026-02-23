import Link from "next/link";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavColor } from "@/contexts/NavColorProvider";
import Image from "next/image";
import { useCursorContext } from "@/contexts/CursorProvider";

export default function RootSkeleton() {
	const [isOpen, setIsOpen] = useState(false);
	const { color } = useNavColor();
	const { setScale } = useCursorContext();

	return (
		<section className="fixed w-full top-0 z-[150]">
			<section className={`w-full flex items-center justify-between p-4 lg:text-3xl md:text-2xl text-base ${color} `}>
				<button
					onMouseEnter={() => setScale(4)}
					onMouseLeave={() => setScale(1)}
					onClick={() => setIsOpen(true)} className="transition-colors duration-500"
				>
					Menu
				</button>
				<Link
					href={'/'}
					className="font-vogue"
					onMouseEnter={() => setScale(4)}
					onMouseLeave={() => setScale(1)}
				>
					<Image
						src={color === 'text-foreground' ? '/main/foreground.png' : '/main/background.png'}
						height={100}
						width={100}
						alt="Logo"
						className="leading-none transition-all duration-500"
					/>
				</Link>
				<h1
					className="transition-colors duration-500"
					onMouseEnter={() => setScale(4)}
					onMouseLeave={() => setScale(1)}
				>Lets talk</h1>
				<Navbar onClose={() => setIsOpen(false)} isOpen={isOpen} />
			</section>
		</section>
	)
}

