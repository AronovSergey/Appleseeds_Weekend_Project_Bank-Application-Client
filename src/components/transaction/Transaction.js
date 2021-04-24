import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const Transaction = () => {
	const [state, setState] = useState({
		type: "deposit",
		users: [],
		email: "",
		response: [],
	});

	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};

	useEffect(() => {
		try {
			(async () => {
				const { data } = await axios.get(
					"https://bank-server-sergey-aronov.herokuapp.com/api/bank/account/"
				);
				setState({
					...state,
					users: data.map((account) => account.user.email),
				});
			})();
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitClick = async () => {
		try {
			const url = `https://bank-server-sergey-aronov.herokuapp.com/api/bank/trasnactions/${state.email}/${state.type}`;
			const { data } = await axios.get(url);
			setState({
				...state,
				response: data.logs,
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="account_option flex">
				<div className="account_option__input">
					<FormControl variant="outlined">
						<InputLabel htmlFor="outlined-age-native-simple">
							Operation Type
						</InputLabel>
						<Select
							native
							value={state.type}
							onChange={handleChange}
							label="Operation Type"
							inputProps={{
								name: "type",
								id: "operation_type",
							}}
						>
							<option value={"deposit"}>Deposit</option>
							<option value={"update-credit"}>
								Update Credit
							</option>
							<option value={"withdraw"}>Withdraw</option>
							<option value={"transfer"}>Transfer</option>
						</Select>
					</FormControl>
				</div>
				<div className="account_option__input">
					<FormControl variant="outlined">
						<InputLabel htmlFor="outlined-age-native-simple">
							Email
						</InputLabel>
						<Select
							native
							value={state.email}
							onChange={handleChange}
							label="Email"
							inputProps={{
								name: "email",
								id: "email",
							}}
						>
							<option aria-label="None" value="" />
							{state.users.map((email) => (
								<option key={email} value={email}>
									{email}
								</option>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="account_option__input">
					<Button
						size="large"
						variant="outlined"
						color="primary"
						onClick={onSubmitClick}
					>
						Submit
					</Button>
				</div>
			</div>
			{state.response && (
				<ul>
					{state.response.map((log) => (
						<li>
							{`${log.to} ~~ ${log.operation_type} ~~ Amount: ${log.amount}`}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Transaction;
