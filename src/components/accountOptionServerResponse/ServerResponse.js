import React from "react";

const ServerResponse = ({ response }) => {
	if (!response.trasnaction)
		return <h1>Error: Something went wrong. Try Again</h1>;
	return (
		<div className="flex">
			{response.trasnaction && (
				<Trasnaction data={response.trasnaction} />
			)}
			<div className="account">
				{response.account && (
					<Account data={response.account} title="Account Info:" />
				)}
				{response.trasnaction.operation_type === "Transfer" && (
					<div className="flex">
						<Account data={response.from} title="From" />
						<Account data={response.to} title="To" />
					</div>
				)}
			</div>
		</div>
	);
};

const Account = ({ data, title }) => {
	return (
		<div className="center">
			<h1>{title}</h1>
			<h2>{data.user.name}</h2>
			<h3>{`ID: ${data.user.id}`}</h3>
			<h4>{`Email: ${data.user.email}`}</h4>
			<h5>{`Cash: ${data.cash}`}</h5>
			<h5>{`Credit: ${data.credit}`}</h5>
		</div>
	);
};

const Trasnaction = ({ data }) => {
	return (
		<div className="center trasnaction">
			<h1>Operation Type</h1>
			<h2>{data.operation_type}</h2>
			<h3>{`Amount: ${data.amount}`}</h3>
		</div>
	);
};

export default ServerResponse;
