// NavColorContext.js
import { createContext, useContext, useState } from "react";

const NavColorContext = createContext();

export const NavColorProvider = ({ children }) => {
	const [color, setColor] = useState("text-foreground");
	return (
		<NavColorContext.Provider value={{ color, setColor }}>
			{children}
		</NavColorContext.Provider>
	);
};

export const useNavColor = () => useContext(NavColorContext);
