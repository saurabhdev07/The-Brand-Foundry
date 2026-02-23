export const Button = ({ id, title, rightIcon, leftIcon, containerClass, hoverColor = 'text-violet-500', onClick = () => { } }) => {
	return (
		<button
			id={id}
			onClick={onClick}
			className={
				`group relative z-10 w-fit overflow-hidden rounded-full px-7 my-3 ${containerClass} `}
		>
			{leftIcon}

			<span className={`relative inline-flex overflow-hidden hover:${hoverColor}`}>
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-200%] group-hover:skew-y-12 text-right">
					{title}
				</div>
				<div className="absolute translate-y-[200%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-right">
					{title}
				</div>
			</span>

			{rightIcon}
		</button>
	);
};

export const ButtonLeft = ({ id, title, rightIcon, leftIcon, containerClass, hoverColor = 'text-violet-500', onClick = () => { } }) => {
	return (
		<button
			id={id}
			onClick={onClick}
			className={
				`group relative z-10 w-fit overflow-hidden rounded-full px-7 ${containerClass} `}
		>
			{leftIcon}

			<span className={`relative inline-flex overflow-hidden hover:${hoverColor}`}>
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-200%] group-hover:skew-y-12 text-left">
					{title}
				</div>
				<div className="absolute translate-y-[200%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-left">
					{title}
				</div>
			</span>

			{rightIcon}
		</button>
	);
};

export const ButtonCenter = ({ id, title, rightIcon, leftIcon, containerClass, hoverColor = 'text-violet-500', onClick = () => { } }) => {
	return (
		<button
			id={id}
			onClick={onClick}
			className={
				`group relative z-10 w-fit overflow-hidden rounded-full px-7 ${containerClass} `}
		>
			{leftIcon}

			<span className={`relative inline-flex overflow-hidden hover:${hoverColor}`}>
				<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-200%] group-hover:skew-y-12 text-center">
					{title}
				</div>
				<div className="absolute translate-y-[200%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 text-center">
					{title}
				</div>
			</span>

			{rightIcon}
		</button>
	);
};
