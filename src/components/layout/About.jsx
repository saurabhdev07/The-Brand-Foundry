import { tagLine, heroTitle, heroDescription } from '@/constants/about';
import ScrollingImages from '../animations/section/ScrollingImages';
import { ButtonCenter } from '../ui/Button';
import { useCursorContext } from "@/contexts/CursorProvider";

const images = [
	'/hero/background.jpg', '/hero/background.jpg', '/hero/background.jpg',
	'/hero/background.jpg', '/hero/background.jpg', '/hero/background.jpg',
	'/hero/background.jpg', '/hero/background.jpg', '/hero/background.jpg',
	'/hero/background.jpg', '/hero/background.jpg', '/hero/background.jpg',
];

export default function About() {
	const { setScale } = useCursorContext();
	return (
		<section className="relative min-h-screen w-full">
			<ScrollingImages
				array1={images}
				array2={images}
				array3={images}
	overlayContent={
  <div className="text-white text-center px-6 max-w-5xl mx-auto">

    {/* Small Tagline */}
    <p className="uppercase tracking-widest text-sm md:text-base text-gray-300 mb-4">
      {tagLine}
    </p>

    {/* Main Heading */}
    <h1
      className="lg:text-5xl md:text-4xl text-2xl font-creato-display-bold leading-tight mb-6"
      onMouseEnter={() => setScale(4)}
      onMouseLeave={() => setScale(1)}
    >
      {heroTitle}
    </h1>

    {/* Description */}
    <p className="lg:text-xl md:text-lg text-sm text-gray-300 leading-relaxed md:w-[70%] mx-auto">
      {heroDescription}
    </p>

    {/* Button */}
    <ButtonCenter
      onMouseEnter={() => setScale(3)}
      onMouseLeave={() => setScale(1)}
      containerClass="mt-10 px-10 py-3 bg-transparent border-2 border-white rounded-full font-creato-display-bold uppercase hover:bg-white hover:text-black transition-all duration-300"
      title={'About Us'}
      hoverColor='text-black'
    />
  </div>
}
				overlayClassName="bg-black bg-opacity-70"
			/>
		</section>
	);
}
