// Identidades confirmadas por Sergi el 10-10-2026 por posición en LC-043.
// No se han inferido ni cotejado identidades en las otras fotografías.
// Roles y textos de las fichas: mensaje explícito de Sergi el 10-10-2026.
// La presentación es un expediente policial ficticio, con humor entre amigos.
export const members = [
  {
    id: "kili",
    name: "KILI",
    alias: "IL MAFIAS",
    fileNumber: "01",
    role: "EL MAFIOSO DEL GRUPO",
    records: [
      { label: "ESPECIALIDAD", text: "Máximo exponente en contratación de sicarios." },
    ],
    groom: true,
    position: "izquierda del todo",
    crop: [92, 60, 293, 331],
  },
  {
    id: "coco",
    name: "COCO",
    alias: "",
    fileNumber: "02",
    role: "EL INFORMÁTICO",
    records: [
      { label: "ANTECEDENTE", text: "Pasó toda su graduación jugando al Hearthstone." },
      { label: "RESULTADO", text: "Acabó en leyenda." },
    ],
    groom: false,
    position: "segundo por la izquierda",
    crop: [295, 34, 477, 288],
  },
  {
    id: "jowi",
    name: "JOWI",
    alias: "",
    fileNumber: "03",
    role: "EL POPIPOIEADOR MÁXIMO",
    records: [
      { label: "ESPECIALIDAD", text: "Matamoros a sueldo. Líder en la planificación de asaltos." },
      { label: "INCIDENTE REGISTRADO", text: "Una vez le preguntó a una china si comía cerdo." },
    ],
    groom: false,
    position: "tercero por la izquierda",
    crop: [458, 92, 638, 348],
  },
  {
    id: "luizao",
    name: "LUIZAO",
    alias: "GITANO",
    fileNumber: "04",
    role: "EL LADRÓN PROFESIONAL",
    records: [
      { label: "HABILIDAD ESPECIAL", text: "Abrir cerraduras." },
      { label: "ESPECIALIDAD", text: "Especialmente las de los coches." },
    ],
    groom: false,
    position: "derecha del todo",
    crop: [609, 101, 780, 351],
  },
] as const;

export type Member = (typeof members)[number];

export const identitySource = {
  mediaId: "LC-043",
  original: "Captura de pantalla 2026-10-10 a las 9.59.43.png",
  confirmedBy: "Sergi",
  confirmedOn: "2026-10-10",
};
