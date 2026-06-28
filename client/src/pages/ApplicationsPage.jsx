import { useState, useEffect } from "react";
import { applicationApi } from "../api/applications.js";
import ApplicationModal from "../components/applications/ApplicationModal.jsx";

//maps status values from db
const STATUS_LABELS = {
	saved: "Saved",
	applied: "Applied",
	phone_screen: "Phone Screen",
	interview: "Interview",
	offer: "Offer",
	rejected: "Rejected",
};
//map status values to tailwind for color badges
const STATUS_STYLES = {
	saved: "bg-slate-700 text-slate-300",
	applied: "bg-blue-500/10 text-blue-400",
	phone_screen: "bg-purple-500/10 text-purple-400",
	interview: "bg-amber-500/10 text-amber-400",
	offer: "bg-emerald-500/10 text-emerald-400",
	rejected: "bg-red-500/10 text-red-400",
};

export default function ApplicationsPage() {
	//store list of applications form backend
	const [applications, setApplications] = useState([]);
	//if initial data fetch in progress
	const [loading, setLoading] = useState(true);
	//whether add/edit is visible
	const [modalOpen, setModalOpen] = useState(false);
	//holds application being edited
	const [editingApp, setEditingApp] = useState(null);

	//fetches all applications for user
	const fetchApps = async () => {
		try {
			const { data } = await applicationApi.getAll();
			setApplications(data);
		} 
		catch (err) {
			console.error(err);
		} 
		finally {
			setLoading(false);
		}
	};

	//runs fetchApps once 
	useEffect(() => { fetchApps(); }, []);
	
	//handles creating and updating
	const handleSave = async (formData) => {
		if (editingApp) {
			//if editingApp set, updating existing application
			const { data } = await applicationApi.update(editingApp._id, formData);
			//replace old application with new
			setApplications((prev) => prev.map((a) => (a._id === data._id ? data : a)));
		} 
		else {
			//anything else is new application
			const { data } = await applicationApi.create(formData);
			//add new to top of list
			setApplications((prev) => [data, ...prev]);
		}
		//close and clear
		setModalOpen(false);
		setEditingApp(null);
	};

	//handles deleting 
	const handleDelete = async (id) => {
		if (!confirm("Delete this application?")) return;
		await applicationApi.remove(id);
		//remove deleted application
		setApplications((prev) => prev.filter((a) => a._id !== id));
	};

	return (
		<div className="p-6 space-y-5">
			{/* page header*/}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold text-white">Applications</h1>
					<p className="text-slate-400 text-sm">{applications.length} total</p>
				</div>
				{/* opens in add mode */}
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
					onClick={() => { setEditingApp(null); setModalOpen(true); }}
				>
					
					+ Add job
				</button>
			</div>
		
		{/* rendering shows loading, empty state, or table */}
		{loading ? (
			<div className="text-slate-400 text-sm">Loading...</div>
		) : applications.length === 0 ? (
			//empty state when user has no applications 
			<div className="bg-slate-800 rounded-xl p-10 text-center">
				<p className="text-slate-400 text-sm">No applications yet.</p>
				<button
					className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
					onClick={() => setModalOpen(true)}
				>
			
					Add your first job
				</button>
			</div>
		) : (

			//applications table
			<div className="bg-slate-800 rounded-xl overflow-hidden">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b border-slate-700">
							{/* column headers */}
							{["Company", "Role", "Status", "Location", "Added", ""].map((h) => (
								<th key={h} className="text-left text-xs text-slate-500 uppercase px-4 py-3 font-medium">
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{/* render one row per application */}
						{applications.map((app) => (
							<tr key={app._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
								<td className="px-4 py-3 text-white font-medium">{app.company}</td>
								<td className="px-4 py-3 text-slate-300">{app.role}</td>
								<td className="px-4 py-3">
									<span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[app.status]}`}>
										{/* status styles */}
										{STATUS_LABELS[app.status]}
									</span>
								</td>
								<td className="px-4 py-3 text-slate-400">{app.location || "-"}</td>
								{/* format iso date string into readable local date */}
								<td className="px-4 py-3 text-slate-400 text-xs">
									{new Date(app.createdAt).toLocaleDateString()}
								</td>
								<td className="px-4 py-3">
									<div className="flex gap-3 justify-end">
										{/* edit button - opens in edit mode */}
										<button
											onClick={() => { setEditingApp(app); setModalOpen(true); }} 
											className="text-slate-400 hover:text-white text-xs transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(app._id)}
											className="text-slate-400 hover:text-red-400 text-xs transition-colors"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)}

		{/* only render when modalOpen true */}
		{modalOpen && (
			<ApplicationModal
				app={editingApp}
				onSave={handleSave}
				onClose={() => { setModalOpen(false); setEditingApp(null); }}
			/>
		)}
	</div>
);
}
