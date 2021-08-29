import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function Signin(req, res) {
  switch (req.method) {
    case "POST": {
      const { npm, remember } = req.body;

      if (!npm)
        return res
          .status(422)
          .json({ status: false, message: "Npm field required." });

      const dataDir = path.resolve(process.cwd(), "data");

      const dataMahasiswa = fs.readFileSync(
        path.join(dataDir, "mahasiswa.json"),
        "utf-8"
      );
      const mahasiswas = JSON.parse(dataMahasiswa);

      const mahasiswa = mahasiswas.filter((val) => {
        if (val.npm === npm) return true;
      })[0];

      if (!mahasiswa)
        return res.status(400).json({
          status: false,
          message: "Mahasiswa not found.",
        });

      const token = jwt.sign(mahasiswa, process.env.JWT_KEY, {
        expiresIn: remember ? "30d" : "7d",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * (remember ? 30 : 7),
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({
        status: true,
        message: "Mahasiswa found.",
        data: mahasiswa,
        token: token,
      });
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
