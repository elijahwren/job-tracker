import mongoose from "mongoose";

const statusLogSchema = new mongoose.Schema ({
	from: { type: String, default: null },
	to: { type: String, required: true },
	changedAt: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema ({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	company: { type: String, required: true, trim: true },
	role: { type: String, required: true, trim: true },
	status: {
		type: String,
		enum: ["saved", "applied", "phone_screen", "interview", "offer", "rejected"],
		default: "saved",
	},
	jobUrl: { type: String, default: "" },
	salaryMin: { type: Number, default: null },
	salaryMax: { type: Number, default: null },
	location: { type: String, default: "" },
	notes: { type: String, default: "" },
	statusLog: [statusLogSchema],
},
{ timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
