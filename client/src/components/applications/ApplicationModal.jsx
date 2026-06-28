import { useState, useEffect } from "react";

//all status options for dropdown
const STATUSES = [
	{ value: "saved", label: "Saved" },
	{ value: "applied", label: "Applied" },
	{ value: "phone_screen", label: "Phone Screen" },
	{ value: "interview", label: "Interview" },
	{ value: "offer", label: "Offer" },
	{ value: "rejected", label: "Rejected" },
];

//default form state used when adding new app
const EMPTY_FORM = { 
	company: "", role: "", status: "saved",
	jobUrl: "", salaryMin: "", salaryMax: "", location: "", notes: "",
};

//app-application being edited
//onsave-callback function handles actual API call
//onclose-callback function that closes modal
export default function ApplicationModal({ app, onSave, onClose }) {
	const [form, setForm] = useState(EMPTY_FORM);
	//checks if form is submitting
	const [saving, setSaving] = useState(false);

	//when modal opens populate form with existing data
	//if editing or reset empty if adding new
	useEffect(() => {
		if (app) {
			setForm({
				company: app.company || "",
				role: app.role || "",
				status: app.status || "saved",
				jobUrl: app.jobUrl || "",
				salaryMin: app.salaryMin ?? "",
				salaryMax: app.salaryMax ?? "",
				location: app.location || "",
				notes: app.notes || "",
			});
		} else {
			setForm(EMPTY_FORM);
		}
	}, [app]);
	
	//return change handler for specific form field
	const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
	
	const handleSubmit = async (e) => {
		//prevent browser from reloading on submit
		e.preventDefault();
		setSaving(true);
		await onSave({
			...form,
			//convert salary to strings
			salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
			salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
		});
		setSaving(false);
	};
	
	return (
		<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
			<div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg">
				{/* header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
					<h2 className="text-base font-semibold text-white">
						{app ? "Edit application" : "Add application"}
					</h2>
				<button onClick={onClose} className="text-slate-400 hover:text-white text-xl">
					
					x
				</button>
			</div>
		
			{/* form */}
			<form onSubmit={handleSubmit} className="p-6 space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-xs text-slate-400 mb-1">Company *</label>
						<input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.company} onChange={set("company")} required placeholder="Acme Corp" />
					</div>
					<div>
                                                <label className="block text-xs text-slate-400 mb-1">Role *</label>
                                                <input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.role} onChange={set("role")} required placeholder="Software Engineer" />
                                        </div>
									</div>

				<div className="grid grid-cols-2 gap-4">
                                        <div>
                                                <label className="block text-xs text-slate-400 mb-1">Status</label>
                                                <select className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.status} onChange={set("status")}>
                                        		{STATUSES.map((s) => (
								<option key={s.value} value={s.value}>{s.label}</option>
							))}
						</select>
					</div>
					<div>
                                                <label className="block text-xs text-slate-400 mb-1">Location</label>
                                                <input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.location} onChange={set("location")} required placeholder="Remote / NYC" />
					</div>
				</div>

				<div>
                                    <label className="block text-xs text-slate-400 mb-1">Job URL</label>
                                	<input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="url" value={form.jobUrl} onChange={set("jobUrl")} required placeholder="https://..." />
                                </div>
				
				{/* status dropdown */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-xs text-slate-400 mb-1">Salary min ($)</label>
                                        	<input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value={form.salaryMin} onChange={set("salaryMin")} required placeholder="80000" />
                                	</div>
					<div>
                                                <label className="block text-xs text-slate-400 mb-1">Salary max ($)</label>
                                                <input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value={form.salaryMax} onChange={set("salaryMax")} required placeholder="120000" />
                                        </div>
				</div>
		
				<div>
                                	<label className="block text-xs text-slate-400 mb-1">Notes</label>
                                	<input className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows={3} value={form.notes} onChange={set("notes")} required placeholder="Recruiter name, referral, deadline..." />
				</div>
				
				{/* cancel/submit buttons */}
				<div className="flex gap-3 pt-2">
					<button type="button" onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate600 text-white font-medium py-2 rounded-lg transition-colors">
						Cancel
					</button>
					<button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50">
						{saving ? "Saving..." : app ? "Save changes" : "Add application"}
					</button>
				</div>
			</form>
		</div>
	</div>
);
}
