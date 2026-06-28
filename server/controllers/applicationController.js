import Application from "../models/Application.js";

//GET /api/applications
export const getApplications = async (req, res) => {
	try {
		const applications = await Application.find({ userId: req.userId });
		return res.json(applications);
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};

//POST /api/applications
export const createApplication = async (req, res) => {
	try {
		const { company, role, status, jobUrl, salaryMin, salaryMax, location, notes } = req.body;

		if (!company || !role) {
			return res.status(400).json({ message: "Company and role are required" });
		}
		
		const application = await Application.create({
			userId: req.userId,
			company, 
			role, 
			status: status || "saved",
			jobUrl,
			salaryMin,
			salaryMax,
			location,
			notes,
			statusLog: [{ from: null, to: status || "saved" }],
		});
		return res.status(201).json(application);
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};

//PUT /api/applications/:id
export const updateApplication = async (req, res) => {
	try {
		const application = await Application.findOne({ _id: req.params.id, userId: req.userId });
		if (!application) {
			return res.status(404).json({ message: "Application not found" });
		}

		const { status, ...rest } = req.body;
			
		if (status && status !== application.status) {
			application.statusLog.push({ from: application.status, to: status });
			application.status = status;
		}	

		Object.assign(application, rest);
		await application.save();
		return res.json(application);
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};

//DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
	try {
		const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });
		if (!application) {
			return res.status(404).json({ message: "Application not found" });
		}
		return res.json({ message: "Application deleted" });
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};
