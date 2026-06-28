import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login(form.email, form.password);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};
	
	return (
		<div className="min-h-screen bg-black flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<h1 className="text-2xl font-bold text-white text-center mb-6">
					Sign in to jobtrack
				</h1>
				
				<form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-6 space-y-4">
					{error && (
						<div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
							{error}
						</div>
					)}

					<div>
						<label className="block text-sm text-slate-400 mb-1">Email</label>
						<input
							type="email"
							className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="you@something.com"
							value={form.email}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
							required
						/>
					</div>
					
					<div>
						<label className="block text-sm text-slate-400 mb-1">Password</label>
						<input
							type="password"
							className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="--------"
							value={form.password}
							onChange={(e) => setForm({ ...form, password: e.target.value })}
							required
						/>
					</div>
					
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
				</form>
				
				<p className="text-center text-sm text-slate-500 mt-4">
					No account?{" "}
					<Link to="/register" className="text-blue-400 hover:underline">
						Create one
					</Link>
				</p>
			</div>
		</div>
	);
}
