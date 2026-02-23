export default function Text({ title, containerClass, hoverColor = 'text-foreground', onMouseEnter, onMouseLeave }) {
	return (
		<h1
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 my-3 ${containerClass} `}
		>
			<span className={`relative inline-flex overflow-hidden hover:${hoverColor}`}>
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-300%] group-hover:skew-y-12">
					{title}
				</div>
				<div className="absolute translate-y-[300%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
					{title}
				</div>
			</span>
		</h1>
	)
}

