import path from "path";
import fs from "fs";

export default function getMahasiswa(req, res) {
  const dataDir = path.resolve(process.cwd(), "data");
  const data = fs.readFileSync(path.join(dataDir, "mahasiswa.json"), "utf-8");
  const mahasiswas = JSON.parse(data);

  res.status(200).json(mahasiswas);
}
