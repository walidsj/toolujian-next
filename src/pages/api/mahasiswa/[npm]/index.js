import fs from "fs";
import path from "path";

export default function getMahasiswaByNpm(req, res) {
  const dataDir = path.resolve(process.cwd(), "data");

  const dataMahasiswa = fs.readFileSync(
    path.join(dataDir, "mahasiswa.json"),
    "utf-8"
  );
  const mahasiswas = JSON.parse(dataMahasiswa);

  const mahasiswa = mahasiswas.filter((val) => {
    if (val.npm === req.query.npm) return true;
  })[0];

  res.status(200).json(mahasiswa);
}
