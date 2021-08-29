import cookie from "cookie";

export default function SignOut(req, res) {
  switch (req.method) {
    case "POST": {
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
      break;
    }

    default: {
      return res.status(422).json({
        status: false,
        message: "Your method request is invalid. Expected: POST",
      });
    }
  }
}
