import { useState, useEffect } from "react";
import { applicationApi } from "../api/applications.js";

export default function DashboardPage() {
	//store all apps from backend
	const [applications, setApplications] = useState([]);
	//see if data is still being fetched
	const [loading, setLoading] = useState(true);
	
	//fetch all applications
	useEffect(() => {
		applicationApi.getAll()
		.then(({ data }) => setApplications(data))
		.catch(console.error)
		//turn off loading
		.finally(() => setLoading(false));
	}, []);
	//compute stats from apps array
	const total = applications.length;
	const applied = applications.filter((a) => a.status !== "saved").length;
	//applied is anything past saved 
	const interviews = applications.filter((a) => a.status === "interview").length;
	const offers = applications.filter((a) => a.status === "offer").length;
	
	//show loading state when waiting for API response
	if (loading) {
		return (
			<div className="flex items-center justify-center h-full text-slate-400">
				Loading...
			</div>
		);
	}
	
	return (
		<div className="p-6 space-y-6">
			{/* page header */}
			<div>
				<h1 className="text-xl font-semibold text-white">Dashboard</h1>
				<p className="text-slate-400 text-sm mt-1">Your job search at a glance</p>
			</div>

			{/* stat cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard label="Total tracked" value={total} />
				<StatCard label="Applied" value={applied} color="text-blue-400" />
				<StatCard label="Interviews" value={interviews} color="text-amber-400" />
				<StatCard label="Offers" value={offers} color="text-emerald-400" />
			</div>
			
			{/* recent applications */}
			<div>
				<h2 className="text-sm font-medium text-slate-300 mb-3">Recent applications</h2>
				{applications.length === 0 ? (
					<div className="bg-slate-800 rounded-xl p-8 text-center text-slate-500 text-sm">
						No applications yet - add your first one
					</div>
				) : (
					<div className="space-y-2">
						{/* shows 5 most recent apps */}
						{applications.slice(0,5).map((app) => (
							<div key={app._id} className="bg-slate-800 rounded-xl px-4 py-3 flex items-center justify-between">
								<div>
									<p className="text-white text-sm font-medium">{app.company}</p>
									<p className="text-slate-400 text-xs">{app.role}</p>
								</div>
								{/* status */}
								<span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
									{app.status}
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

//stat card component
function StatCard({ label, value, color = "text-white" }) {
	return (
		<div className="bg-slate-800 rounded-xl p-4">
			<p className="text-xs text-slate-400 mb-1">{label}</p>
			<p className={`text-3xl font-semibold ${color}`}>{value}</p>
		</div>
	);
}
