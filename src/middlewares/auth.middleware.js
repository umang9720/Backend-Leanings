const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access",
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        console.error(err);

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({
                message: "Invalid Credentials",
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        console.error(err);

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = { authArtist, authUser };
