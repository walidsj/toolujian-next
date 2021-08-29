import { destroyCookie } from "nookies";

export default function SignOut(req, res) {
  destroyCookie({ res }, "token", {
    path: "/",
  });

  res.status(200).json({ status: true, message: "Logged out." });
}
