import { members, type Member } from "./data/members";
import { BloodSplatter } from "./CrimeScene";

export function SuspectList({ onSelect }: { onSelect: (member: Member) => void }) {
  return (
    <div className="suspect-list">
      <p className="eyebrow">01 / UNIDAD DE ASUNTOS CERDAS</p>
      <h2>CUATRO FICHAS.<br /><span className="red-text">CERO COARTADAS.</span></h2>
      <p className="suspect-list-intro">Abre un expediente. Elige a tu sospechoso.</p>
      <div className="suspect-list-grid">
        {members.map((member) => (
          <button type="button" key={member.id} onClick={() => onSelect(member)} aria-label={`Abrir ficha de ${member.name}`}>
            <span className="mono">FICHA / {member.fileNumber}</span>
            <img src={`./media/portrait-${member.id}.jpg`} alt={`Retrato de ${member.name}`} />
            <strong>{member.alias || member.name}</strong>
            <span className="suspect-list-role">{member.role}</span>
            <span className="mono">ABRIR EXPEDIENTE ↗</span>
          </button>
        ))}
      </div>
      <p className="suspect-fiction mono">EXPEDIENTES FICTICIOS / HUMOR ENTRE COLEGAS</p>
    </div>
  );
}

export function SuspectFile({ member }: { member: Member }) {
  return (
    <article className="suspect-file">
      <header className="dossier-header mono">
        <span>UNIDAD DE ASUNTOS CERDAS</span>
        <span>EXPEDIENTE / {member.fileNumber}</span>
      </header>
      <div className="dossier-body">
        <div className="dossier-photo-wrap">
          <div className="dossier-photo">
            <span className="mono">REGISTRO / {member.fileNumber}</span>
            <img src={`./media/portrait-${member.id}.jpg`} alt={`Retrato de ${member.name}`} />
            <span className="dossier-photo-label mono">{member.name} / LOS CERDAS</span>
          </div>
          <span className="stamp dossier-stamp">{member.groom ? "SE CASA" : "FICHADO"}</span>
          <BloodSplatter className="dossier-blood" />
        </div>
        <div className="dossier-details">
          <p className="eyebrow">01 / FICHA DEL SOSPECHOSO</p>
          <h2>{member.alias || member.name}</h2>
          {member.alias && <p className="dossier-name mono">IDENTIDAD: {member.name}</p>}
          <p className="dossier-role">{member.role}</p>
          <dl className="dossier-records">
            {member.records.map((record) => (
              <div key={record.label}>
                <dt className="mono">{record.label}</dt>
                <dd>{record.text}</dd>
              </div>
            ))}
          </dl>
          {member.groom && <p className="dossier-groom mono">ESTADO ACTUAL / COMPROMETIDO</p>}
        </div>
      </div>
      <footer className="dossier-footer mono">
        <span>ARCHIVO PERSONAL / LOS CERDAS</span>
        <span>EXPEDIENTE FICTICIO · HUMOR ENTRE COLEGAS</span>
      </footer>
    </article>
  );
}
