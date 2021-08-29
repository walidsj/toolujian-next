import cookie from "cookie";

export default function SignOut(req, res) {
  // destroyCookie({ res }, "token", {
  //   path: "/",
  // });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ status: true, message: "Logged out." });
}
