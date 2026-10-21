import type { CallStep, Procedure } from '../types';
import { getClosingGuidance, type ClosingStatus } from '../lib/callOutcomes';

interface Props {
  procedure: Procedure;
  step: CallStep;
  status: ClosingStatus;
  onChange: (value: ClosingStatus) => void;
}

/** A seleção adapta apenas a frase de estudo; não consulta sistemas operacionais. */
export function ClosingStatusPicker({ procedure, step, status, onChange }: Props) {
  const guidance = getClosingGuidance(procedure, step);
  if (!guidance) return null;
  return <div className="closing-status-picker">
    <label>
      <strong>Antes de encerrar: qual é o estado confirmado no sistema?</strong>
      <select aria-label="Estado do registo no sistema" value={status} onChange={event => onChange(event.target.value as ClosingStatus)}>
        <option value="neutro">Ainda não selecionei um estado: frase neutra</option>
        <option value="confirmado">{guidance.confirmedLabel}</option>
        <option value="pendente">{guidance.pendingLabel}</option>
      </select>
    </label>
    <p>Seleciona apenas o que verificaste na ferramenta oficial. O Call Center Pro não consulta, confirma nem guarda registos.</p>
  </div>;
}
