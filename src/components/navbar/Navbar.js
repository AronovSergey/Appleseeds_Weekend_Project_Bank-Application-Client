import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	const { pathname } = useLocation();

	const [route, setRoute] = useState("/accounts");

	useEffect(() => {
		setRoute(pathname);
	}, [pathname]);

	return (
		<div className="navbar">
			<Link
				to="/accounts"
				className={`navbar__link ${
					route === "/accounts" ? "navbar__active" : ""
				}`}
			>
				Account Option
			</Link>
			<Link
				to="/transaction"
				className={`navbar__link ${
					route === "/transaction" ? "navbar__active" : ""
				}`}
			>
				Transaction
			</Link>
			<Link
				to="/new"
				className={`navbar__link ${
					route === "/new" ? "navbar__active" : ""
				}`}
			>
				Create a new account
			</Link>
		</div>
	);
};

export default Navbar;
