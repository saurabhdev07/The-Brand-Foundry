import Link from "next/link";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavColor } from "@/contexts/NavColorProvider";
import Image from "next/image";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { color } = useNavColor();

	return (
		<section className="w-full flex items-center justify-between p-4 lg:text-3xl md:text-2xl text-base text-transparent">
			<button onClick={() => setIsOpen(true)}>
				Menu
			</button>
			<Link href={'/'} className="font-vogue">
				<Image
					src={color === 'bg-background' ? '/main/foreground.png' : '/main/foreground.png'}
					height={0}
					width={0}
					alt="Logo"
				/>
			</Link>
			<h1>Lets talk</h1>
			<Navbar onClose={() => setIsOpen(false)} isOpen={isOpen} />
		</section>
	)
};
