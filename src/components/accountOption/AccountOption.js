import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import ServerResponse from "../serverResponse/ServerResponse";

const AccountOption = () => {
	const [state, setState] = useState({
		type: "deposit",
		users: [],
		from: "",
		to: "",
		amount: 0,
		response: null,
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
					users: data.map((account) => account._id),
				});
			})();
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitClick = async () => {
		try {
			let url = `https://bank-server-sergey-aronov.herokuapp.com/api/bank/trasnactions/${state.type}/${state.from}`;
			if (state.type === "transfer") url += `/${state.to}`;
			const { data } = await axios.put(url, { amount: state.amount });
			setState({
				...state,
				response: data,
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
							From
						</InputLabel>
						<Select
							native
							value={state.from}
							onChange={handleChange}
							label="From"
							inputProps={{
								name: "from",
								id: "from",
							}}
						>
							<option aria-label="None" value="" />
							{state.users.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="account_option__input">
					<FormControl
						variant="outlined"
						disabled={state.type === "transfer" ? false : true}
					>
						<InputLabel htmlFor="outlined-age-native-simple">
							To
						</InputLabel>
						<Select
							native
							value={state.to}
							onChange={handleChange}
							label="To"
							inputProps={{
								name: "to",
								id: "to",
							}}
						>
							<option aria-label="None" value="" />
							{state.users.map((id) => (
								<option key={id} value={id}>
									{id}
								</option>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="account_option__input">
					<FormControl variant="outlined">
						<InputLabel htmlFor="outlined-age-native-simple">
							Amount
						</InputLabel>
						<Select
							native
							value={state.amount}
							onChange={handleChange}
							label="Amount"
							inputProps={{
								name: "amount",
								id: "amount",
							}}
						>
							<option value={0}>0</option>
							<option value={100}>100</option>
							<option value={200}>200</option>
							<option value={300}>300</option>
							<option value={400}>400</option>
							<option value={500}>500</option>
							<option value={600}>600</option>
							<option value={700}>700</option>
							<option value={800}>800</option>
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
			{state.response && <ServerResponse response={state.response} />}
		</div>
	);
};

export default AccountOption;
