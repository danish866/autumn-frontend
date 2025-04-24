const Authentication = ({pageType = PageType.Login}) => {
	return (
		<>
			{(pageType === PageType.Login) ? 
				<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
				<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
					<h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to your account</h2>
					<form className="space-y-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
							<input
								type="email"
								placeholder="you@example.com"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
							<input
								type="password"
								placeholder="••••••••"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div>
							<button
								type="button"
								className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
							>
								Login
							</button>
						</div>
					</form>
					<p className="text-sm text-center text-gray-500 mt-6">
						Don’t have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a>
					</p>
				</div>
			</div>
				: 
				<h1>Register</h1>
			}
		</>
	)
}

const PageType = Object.freeze({
	Login: "login",
	Register: "register"
});

export {Authentication, PageType};