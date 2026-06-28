import jwt from "jsonwebtoken";
//function that protects routes from unauthenticated request
const protect = (req, res, next) => {
	//authorizatiion header from request
	const authHeader= req.headers.authorization;
	
	//if no header or don't start with bear reject
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}
	
	//split to grab just token
	const token = authHeader.split(" ")[1];

	try {
		//verify token with jwt secret
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		//attach userId from payload to request object
		req.userId = decoded.userId;
		next();
	} 
	catch {
		//reject if failed
		res.status(401).json({ message: "Token is not valid or has expired" });
	}
};

export default protect;
