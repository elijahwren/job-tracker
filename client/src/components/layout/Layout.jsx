import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Layout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	
	return (
		<div className="flex h-screen bg-black">
			{/* sidebar */}
			<aside className="w-56 bg-black border-r border-slate-700 flex flex-col">
				{/* logo */}
				<div className="px-5 py-5 border-b border-slate-700">
					<span className="font-bold text-white text-lg">jobtrack</span>
				</div>
			
				{/* nav links */}
				<nav className="flex-1 px-3 py-4 space-y-1">
					<NavLink
						to="/dashboard"
						className={({ isActive }) => 
							`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
								isActive
									? "bg-blue-600 text-white"
									: "text-slate-400 hover:text-white hover:bg-slate-700"
							}`
						}
					>

						Dashboard
					</NavLink>
					<NavLink
						to="/applications"
						className={({ isActive }) =>
							`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${

 isActive
                                                                        ? "bg-blue-600 text-white"
                                                                        : "text-slate-400 hover:text-white hover:bg-slate-700"
                                                        }`     
                                                }
                                        >
					
						Applications
					</NavLink>
				</nav>
				
				{/* user = logout */}
				<div className="px-3 py-4 border-t border-slate-700">
					<p className="text-xs text-slate-400 px-3 mb-2">{user?.name}</p>
					<button
						onClick={handleLogout}
						className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
					>
			
						Sign out
					</button>
				</div>
			</aside>
			
			{/* main content */}
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
