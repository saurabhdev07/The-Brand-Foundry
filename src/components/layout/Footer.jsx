import { ArrowUpRight, Telescope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCursorContext } from "@/contexts/CursorProvider";

export default function Footer() {
	const { setScale } = useCursorContext();
	return (
		<div
			className='relative h-screen'
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className='fixed bottom-0 h-screen w-full'>
				<div className='bg-gray-800/50 py-8 md:px-12 px-4 h-full w-full flex flex-col justify-end'>
					<div className="mt-10 flex md:flex-row flex-col gap-10 items-center justify-between">
						<div
							className="flex flex-col"
							onMouseEnter={() => setScale(4)}
							onMouseLeave={() => setScale(1)}
						>
							<h2
								className="flex items-center gap-4 text-sm"
							>
								<Telescope className="text-violet-500 w-4 h-4" />
								<span className="bg-gradient-to-b from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">Contact Us</span>
							</h2>
							<p className="text-3xl">
								<span className="font-creato-display-bold">Interested in working together or have any questions?</span><br />
								Feel free to reach out — We’d love to hear from you!
							</p>
						</div>
						<div
							className="flex flex-col"
							onMouseEnter={() => setScale(4)}
							onMouseLeave={() => setScale(1)}
						>
							<p className="text-gray-400 text-sm">Contact The Brand Foundry at:</p>
							<Link href={'/'} className="text-lg font-creato-display-bold flex gap-2 items-center">admin@saurabhyadav.in <ArrowUpRight /> </Link>
						</div>
					</div>
					<div
						className="mb-4 flex items-center justify-center mt-44"
						onMouseEnter={() => setScale(6)}
						onMouseLeave={() => setScale(1)}
					>
						<Image src={'/main/foreground.png'} width={5000} height={5000} className="w-[60%] h-auto" alt=" Logo" />
					</div>
					<div className="flex md:flex-row flex-col items-center justify-between text-sm">
						<p className="md:pl-0 pl-2">&copy; {new Date().getFullYear()} The Brand Foundry. All rights reserved.</p>
						<div className="flex items-center gap-4">
							<h1>LinkedIn</h1>
							<h1>Facebook</h1>
							<h1>Instagram</h1>
							<h1>Twitter</h1>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}

