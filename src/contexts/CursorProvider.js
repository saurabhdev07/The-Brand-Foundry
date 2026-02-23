"use client";

import { useRef, createContext, useContext, useState, useEffect } from "react";
import gsap from "gsap";

const CursorContext = createContext();

export const CursorContextProvider = ({ children }) => {
	const cursorRef = useRef(null);
	const [color, setColor] = useState('#FFF');
	const [scale, setScale] = useState(1);

	useEffect(() => {
		const cursor = cursorRef.current;
		if (!cursor) return;

		gsap.set(cursor, { xPercent: -50, yPercent: -50 });
		gsap.to(cursorRef.current, {
			scale,
			duration: 0.3,
			ease: "power3.out",
		});


		const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
		const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

		const handleMouseMove = (e) => {
			xTo(e.clientX);
			yTo(e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [scale]);

	return (
		<CursorContext.Provider
			value={{ color, setColor, scale, setScale }}
		>
			<div
				ref={cursorRef}
				className={`custom-cursor`}
				style={{
					position: "fixed",
					top: "0",
					left: "0",
					width: "40px",
					height: "40px",
					pointerEvents: "none",
					zIndex: 9999,
					mixBlendMode: "difference",
					transition: "opacity 0.3s ease",
				}}
			>
				<svg height="100" width="70" xmlns="http://www.w3.org/2000/svg">
					<circle r="25" cx="30" cy="30" fill={color} />
				</svg>
			</div>
			{children}
		</CursorContext.Provider>
	);
};

export const useCursorContext = () => useContext(CursorContext);

//"use client";
//
// import { useRef, createContext, useContext, useState, useEffect } from "react";
// import gsap from "gsap";
//
// const CursorContext = createContext();
//
// export const CursorContextProvider = ({ children }) => {
// 	const [size, setSize] = useState(1); // scale factor, not pixel size
// 	const [color, setColor] = useState("#fff");
// 	const cursorRef = useRef(null);
// 	const [isVisible, setIsVisible] = useState(false);
// 	const [isHovering, setIsHovering] = useState(false);
//
// 	useEffect(() => {
// 		const cursor = cursorRef.current;
// 		if (!cursor) return;
//
// 		gsap.set(cursor, { xPercent: -50, yPercent: -50 });
//
// 		const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
// 		const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });
//
// 		const handleMouseMove = (e) => {
// 			xTo(e.clientX);
// 			yTo(e.clientY);
// 			if (!isVisible) setIsVisible(true);
// 		};
//
// 		const handleMouseLeave = () => {
// 			setIsVisible(false);
// 		};
//
// 		const handleMouseEnter = () => {
// 			setIsVisible(true);
// 		};
//
// 		// Track hover state on elements with .zoom-hover class
// 		const handleElementHover = () => {
// 			setIsHovering(true);
// 		};
//
// 		const handleElementLeave = () => {
// 			setIsHovering(false);
// 		};
//
// 		document.addEventListener("mousemove", handleMouseMove);
// 		document.addEventListener("mouseleave", handleMouseLeave);
// 		document.addEventListener("mouseenter", handleMouseEnter);
//
// 		const hoverElements = document.querySelectorAll(".zoom-hover");
// 		hoverElements.forEach((element) => {
// 			element.addEventListener("mouseenter", handleElementHover);
// 			element.addEventListener("mouseleave", handleElementLeave);
// 		});
//
// 		return () => {
// 			document.removeEventListener("mousemove", handleMouseMove);
// 			document.removeEventListener("mouseleave", handleMouseLeave);
// 			document.removeEventListener("mouseenter", handleMouseEnter);
//
// 			hoverElements.forEach((element) => {
// 				element.removeEventListener("mouseenter", handleElementHover);
// 				element.removeEventListener("mouseleave", handleElementLeave);
// 			});
// 		};
// 	}, [isVisible]);
//
// 	useEffect(() => {
// 		if (cursorRef.current) {
// 			const scale = isHovering ? size : 1;
// 			gsap.to(cursorRef.current, {
// 				scale,
// 				duration: 0.3,
// 				ease: "power3.out",
// 			});
// 		}
// 	}, [isHovering, size]);
//
// 	return (
// 		<CursorContext.Provider
// 			value={{ size, setSize, color, setColor, isHovering, setIsHovering }}
// 		>
// 			<div
// 				ref={cursorRef}
// 				className={`custom-cursor ${isVisible ? "opacity-100" : "opacity-0"}`}
// 				style={{
// 					position: "fixed",
// 					top: "0",
// 					left: "0",
// 					width: "40px",
// 					height: "40px",
// 					pointerEvents: "none",
// 					zIndex: 9999,
// 					mixBlendMode: "difference",
// 					transition: "opacity 0.3s ease",
// 				}}
// 			>
// 				<svg
// 					width="40"
// 					height="40"
// 					viewBox="0 0 40 40"
// 					fill="none"
// 					xmlns="http://www.w3.org/2000/svg"
// 				>
// 					<circle cx="20" cy="20" r="10" fill={color} />
// 				</svg>
// 			</div>
// 			{children}
// 		</CursorContext.Provider>
// 	);
// };
//
// export const useCursorContext = () => useContext(CursorContext);
