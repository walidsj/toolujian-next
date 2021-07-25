import fs from "fs";
import path from "path";

/**
 * Get directory of data folder.
 * ! `data ` folder position in root level
 */
const dataDir = path.resolve(process.cwd(), "data");

/**
 * Fetch full information of mahasiswa and matkul from multiple JSON file.
 * @param req Get request from client.
 * @param res Send response to client.
 * @returns
 */
export default function getMahasiswaAndMatkulByNpm(req, res) {
  const mahasiswas = JSON.parse(
    fs.readFileSync(path.join(dataDir, "mahasiswa.json"), "utf-8")
  );

  const mahasiswa = mahasiswas.filter((val) => {
    if (val.npm === req.query.npm) return true;
  })[0];

  if (!mahasiswa)
    return res.status(404).json({ message: "Data mahasiswa tidak ditemukan." });

  const mahasiswasClass = mahasiswas
    .filter((val) => {
      if (
        val.semester_id === mahasiswa.semester_id &&
        val.class === mahasiswa.class
      )
        return true;
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

  const number = String(mahasiswasClass.indexOf(mahasiswa) + 1).padStart(
    2,
    "0"
  );

  const semester = getSemesterById(mahasiswa.semester_id);

  const prodi = getProdiById(semester.prodi_id);

  const jurusan = getJurusanById(prodi.jurusan_id);

  const link = getLinkBySemesterIdAndClass({
    semester_id: semester.id,
    class: mahasiswa.class,
  });

  const matkul = getMatkulAndDosenBySemesterIdAndClass({
    semester_id: semester.id,
    class: mahasiswa.class,
  });

  res.status(200).json({
    ...mahasiswa,
    number,
    link,
    semester,
    prodi,
    jurusan,
    matkul,
  });
}

/**
 * Fetch semester data from JSON file by `id` key.
 * @param id
 * @returns
 */
const getSemesterById = (id) => {
  const semesters = JSON.parse(
    fs.readFileSync(path.join(dataDir, "semester.json"), "utf-8")
  );

  return semesters.filter((val) => {
    if (val.id === id) return true;
  })[0];
};

/**
 * Fetch prodi data from JSON file by `id` key.
 * @param id
 * @returns
 */
const getProdiById = (id) => {
  const prodis = JSON.parse(
    fs.readFileSync(path.join(dataDir, "prodi.json"), "utf-8")
  );

  return prodis.filter((val) => {
    if (val.id === id) return true;
  })[0];
};

/**
 * Fetch jurusan data from JSON file by `id` key.
 * @param id
 * @returns
 */
const getJurusanById = (id) => {
  const jurusans = JSON.parse(
    fs.readFileSync(path.join(dataDir, "jurusan.json"), "utf-8")
  );

  return jurusans.filter((val) => {
    if (val.id === id) return true;
  })[0];
};

/**
 * Fetch link data from JSON file by `semester_id` and `class` key.
 * @param data
 * @returns
 */
const getLinkBySemesterIdAndClass = (data) => {
  const links = JSON.parse(
    fs.readFileSync(path.join(dataDir, "link.json"), "utf-8")
  );
  return links.filter((val) => {
    if (val.semester_id === data.semester_id && val.class === data.class)
      return true;
  })[0];
};

/**
 * Fetch and map both of matkul and dosen data from JSON file by `semester_id` and `class` key.
 * @param data
 * @returns
 */
const getMatkulAndDosenBySemesterIdAndClass = (data) => {
  const matkuls = JSON.parse(
    fs.readFileSync(path.join(dataDir, "matkul.json"), "utf-8")
  );

  const dosens = JSON.parse(
    fs.readFileSync(path.join(dataDir, "dosen.json"), "utf-8")
  );

  return matkuls
    .filter((val) => {
      if (val.semester_id === data.semester_id) return true;
    })
    .sort(function (a, b) {
      return a.session.localeCompare(b.session);
    })
    .map((val) => {
      const dosen = dosens.filter((dosen) => {
        if (dosen.class === data.class && dosen.matkul_id == val.id)
          return true;
      })[0];
      return { ...val, dosen };
    });
};
