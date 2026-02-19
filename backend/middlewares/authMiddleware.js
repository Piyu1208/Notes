import jwt from "jsonwebtoken";
import {
  findRefreshTokenService,
  deleteTokenService,
  storeTokenInDbService,
} from "../services/authService.js";
import { getUserByIdService } from "../services/userService.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../utils/jwt.js";
import {
  accessCookieOptions,
  refreshCookieOptions,
} from "../utils/cookieOptions.js";


export const protect = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return handleRefresh(req, res, next);
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_JWT_SECRET
    );

    const currentUser = await getUserByIdService(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = currentUser;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return handleRefresh(req, res, next);
    }

    return res.status(401).json({
      message: "Invalid access token",
    });
  }
};



const handleRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET
    );

    const tokenExists = await findRefreshTokenService(
      decoded.id,
      refreshToken
    );

    if (!tokenExists) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    await deleteTokenService(decoded.id);

    const newAccessToken = signAccessToken(decoded.id);
    const newRefreshToken = signRefreshToken(decoded.id);

    await storeTokenInDbService(
      decoded.id,
      newRefreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    );

    res
      .cookie("accessToken", newAccessToken, accessCookieOptions)
      .cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    const currentUser = await getUserByIdService(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission'
            });
        }
        next();
    }
};