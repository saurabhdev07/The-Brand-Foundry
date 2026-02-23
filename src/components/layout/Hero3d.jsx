import Image from "next/image";
import Model3d from "../model/Model3d";

export default function Hero3d() {
	return (
		<section className="min-h-screen w-full grid grid-cols-3 p-4 gap-4">
			<div className="backdrop-blur-xl rounded-xl bg-white/5"></div>
			<div className="backdrop-blur-xl rounded-xl bg-white/5">
				<Model3d />
			</div>
			<div className="backdrop-blur-xl rounded-xl bg-white/5"></div>
		</section>
	)
}

