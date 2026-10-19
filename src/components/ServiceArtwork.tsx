import type { Project } from '../types';

/** Ilustrações vetoriais originais, sem logótipos ou fotografias de terceiros. */
export function ServiceArtwork({ project }: { project: Project }) {
  if (project === 'coca-cola') return <svg className="service-artwork service-fridge" viewBox="0 0 180 190" aria-hidden="true" focusable="false">
    <defs><linearGradient id="ccMetal" x1="0" x2="1"><stop stopColor="#ffeff1" stopOpacity=".93"/><stop offset=".55" stopColor="#b90a29"/><stop offset="1" stopColor="#520e28"/></linearGradient>
      <linearGradient id="ccGlass" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#401227"/><stop offset="1" stopColor="#130b1b"/></linearGradient></defs>
    <ellipse cx="97" cy="171" rx="65" ry="10" fill="#280718" opacity=".24"/>
    <path d="M50 20 L122 8 Q127 8 130 14 L138 160 Q138 168 129 169 L53 177 Q44 175 44 166 L44 31 Q44 24 50 20Z" fill="url(#ccMetal)" stroke="#fff" strokeOpacity=".67" strokeWidth="3"/>
    <path d="M60 38 L118 30 L122 137 L59 144Z" fill="url(#ccGlass)" stroke="#ffe7eb" strokeOpacity=".65" strokeWidth="2"/>
    <g fill="none" stroke="#9cd4ff" strokeOpacity=".66" strokeWidth="1.4"><path d="M62 71L119 65M61 103L120 97"/></g>
    <g fill="#e72e48" stroke="#ffe4e6" strokeWidth="1.1">
      <rect x="71" y="47" width="12" height="19" rx="3"/><rect x="90" y="45" width="12" height="19" rx="3"/>
      <rect x="70" y="78" width="12" height="19" rx="3"/><rect x="89" y="77" width="12" height="19" rx="3"/>
      <rect x="70" y="109" width="12" height="20" rx="3"/><rect x="90" y="108" width="12" height="20" rx="3"/>
    </g>
    <path d="M125 71V107" stroke="#ffdce6" strokeWidth="4" strokeLinecap="round"/>
    <path d="M53 149L125 143" stroke="#ffe5ea" strokeOpacity=".7" strokeWidth="2"/>
    <path d="M61 158h51" stroke="#fff" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="110" cy="24" r="3" fill="#fff"/>
    <path d="M41 38L43 22" stroke="#fff" strokeOpacity=".8" strokeWidth="3"/>
  </svg>;
  return <svg className="service-artwork service-burger" viewBox="0 0 180 190" aria-hidden="true" focusable="false">
    <defs><linearGradient id="bunTop" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ffe69b"/><stop offset=".65" stopColor="#edb55f"/><stop offset="1" stopColor="#c9742b"/></linearGradient>
      <linearGradient id="bunBottom" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#efbf75"/><stop offset="1" stopColor="#a85c2a"/></linearGradient></defs>
    <ellipse cx="97" cy="162" rx="74" ry="12" fill="#4f250f" opacity=".22"/>
    <path d="M28 88 C34 29 148 24 158 87 Q159 98 148 99 L41 100 Q27 99 28 88Z" fill="url(#bunTop)" stroke="#fff1cc" strokeOpacity=".6" strokeWidth="3"/>
    <g fill="#fff2d2"><ellipse cx="59" cy="64" rx="5" ry="2" transform="rotate(-22 59 64)"/><ellipse cx="79" cy="50" rx="5" ry="2" transform="rotate(12 79 50)"/><ellipse cx="104" cy="64" rx="5" ry="2" transform="rotate(-25 104 64)"/><ellipse cx="127" cy="57" rx="4" ry="2" transform="rotate(15 127 57)"/><ellipse cx="137" cy="78" rx="5" ry="2"/></g>
    <path d="M30 101C48 94 61 109 82 100C104 90 133 107 157 101L149 119C122 128 56 129 38 118Z" fill="#75bd35"/>
    <path d="M29 115C54 126 74 105 91 121C113 140 134 112 160 120L147 134C110 132 54 145 36 129Z" fill="#f6c943"/>
    <path d="M33 126Q93 136 155 126Q168 139 150 150Q93 161 39 149Q21 139 33 126Z" fill="#642c21" stroke="#b86438" strokeWidth="3"/>
    <path d="M34 149Q93 158 151 147Q160 155 146 164Q100 174 44 162Q31 159 34 149Z" fill="url(#bunBottom)"/>
    <path d="M50 119Q59 125 68 118M110 121Q125 128 144 116" stroke="#9ed84c" strokeWidth="6" strokeLinecap="round" opacity=".8"/>
  </svg>;
}
