import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import "./app.css";
import Navbar from "../navbar/Navbar";
import AccountOption from "../accountOption/AccountOption";
import Transaction from "../transaction/Transaction";

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Navbar />

				<Switch>
					<Redirect from="/" exact to="/accounts" />
					<Route path="/accounts" exact component={AccountOption} />
					<Route path="/transaction" exact component={Transaction} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
