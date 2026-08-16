const isProd = process.env.NODE_ENV === "production";

const accessTokenCookie = {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
    path: "/"
}
const refreshTokenCookie = {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/auth/refresh"
}

module.exports= { accessTokenCookie, refreshTokenCookie}