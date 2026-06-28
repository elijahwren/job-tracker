import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
	//pull register from authcontext
        const { register } = useAuth();
        //redirect
	const navigate = useNavigate();
        //stores values of all three form fields
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	//store error message from API
        const [error, setError] = useState("");
	//checks if form is submitting
        const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		//prevent browser from reloading page of form submit
                e.preventDefault();
		//clear any previous error before trying again
                setError("");
		setLoading(true);
		try {
			//call register function from authcontext
                        //and saves token and user to localstorage
                        await register(form.name, form.email, form.password);
			navigate("/dashboard");
		} 
                catch (err) {
                        //show error message from API, or fallback message
			setError(err.response?.data?.message || "Registration failed");
		} 
                finally {
			//turn off
                        setLoading(false);
		}
	};

	return (
                <div className="min-h-screen bg-black flex items-center justify-center px-4">
                        <div className="w-full max-w-sm">
                                <h1 className="text-2xl font-bold text-white text-center mb-6">
                                        Create your account
                                </h1>

                                <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-6 space-y-4">
                                        {/* only if error happens */}
                                        {error && (
                                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg">
                                                        {error}
                                                </div>
                                        )}

                                        
					<div>
                                                <label className="block text-sm text-slate-400 mb-1">Name</label>
                                                <input
                                                        type="text"
                                                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Your name"
                                                        value={form.name}
                                                        //spread form values and only update name field
                                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                        required
                                                />
                                        </div>

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
                                                        placeholder="At least 6 characters"
                                                        value={form.password}
                                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                        required
                                                />
                                        </div>
                                        
                                        {/* disabled while request is processed */}
                                        <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                                {loading ? "Creating account..." : "Create account"}
                                        </button>
                                </form>
                                        
                                {/* if already have an account */}
                                <p className="text-center text-sm text-slate-500 mt-4">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-blue-400 hover:underline">
                                                Sign in
                                        </Link>
                                </p>
                        </div>
                </div>
        );
}
	
