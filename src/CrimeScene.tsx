import { useId } from "react";

export function BloodSplatter({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`blood-splatter ${className}`}
      viewBox="0 0 360 320"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <path d="M171 92c14-5 20-31 30-26 11 5-2 24 9 32 9 7 47-10 47 0 0 8-29 12-26 25 2 10 52 26 41 36-9 9-34-6-41 4-5 9 26 42 18 46-9 5-28-25-39-19-12 7 1 44-10 45-9 1-9-32-21-31-10 0-12 52-24 45-8-4 9-42-4-51-10-7-41 23-45 15-4-10 31-24 25-36-8-13-70-6-66-19 3-12 53-4 57-15 4-13-43-45-31-52 10-5 30 28 42 24 14-4-9-59 2-61 13-3 12 39 26 33Z" />
        <path d="m151 113-47-76 7 23 27 61ZM214 140l116-29-37 17-66 22ZM157 183l-89 71 24-30 47-50ZM177 190l-9 92 9-39 8-44ZM220 178l62 61-13-25-43-43Z" />
        <path d="M115 121c-35-21-56-8-60-18-3-8 13-5 25 0l37 10Zm33 65c-17 18-24 41-21 57 2 8-7 12-10 2-3-18 14-55 25-66Zm63-30c16 3 40 20 55 18 8-1 12 8 2 9-22 2-47-24-57-20Z" />
        <ellipse cx="42" cy="89" rx="9" ry="5" transform="rotate(24 42 89)" />
        <ellipse cx="80" cy="46" rx="4" ry="9" transform="rotate(-34 80 46)" />
        <ellipse cx="121" cy="23" rx="4" ry="7" />
        <ellipse
          cx="257"
          cy="68"
          rx="8"
          ry="4"
          transform="rotate(-28 257 68)"
        />
        <ellipse cx="303" cy="168" rx="5" ry="3" />
        <ellipse
          cx="293"
          cy="251"
          rx="6"
          ry="10"
          transform="rotate(-45 293 251)"
        />
        <ellipse
          cx="109"
          cy="282"
          rx="5"
          ry="9"
          transform="rotate(24 109 282)"
        />
        <circle cx="55" cy="224" r="4" />
        <circle cx="42" cy="242" r="2" />
        <circle cx="75" cy="169" r="5" />
        <circle cx="310" cy="94" r="4" />
        <circle cx="228" cy="271" r="5" />
        <circle cx="251" cy="291" r="3" />
        <circle cx="321" cy="216" r="3" />
        <circle cx="212" cy="39" r="3" />
      </g>
      <path
        d="M158 129c17-10 39-10 48 7"
        fill="none"
        stroke="#f33830"
        strokeWidth="4"
        opacity=".3"
      />
    </svg>
  );
}

function BulletImpact({ className }: { className: string }) {
  return (
    <svg
      className={`bullet-impact ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <g stroke="#aaa494" strokeWidth="1" fill="none" opacity=".65">
        <path d="m48 44-8-19-13-7M46 50l-26-5-13 6M51 43l8-22-1-15M56 48l22-12 14 2M59 54l23 9 8 17M51 57l5 25-5 12M43 57 25 77l-14 2" />
        <path d="m40 26 6-9m-24 29-7-10m60 2 2-9m-7 31 10-3M55 76l10 5m-37-8-2-11" />
      </g>
      <path
        d="m47 34 9 7 12 1-3 10 5 10-13 1-8 9-5-9-13-5 7-10-2-8Z"
        fill="#716f62"
      />
      <path d="m49 41 9 5 3 9-7 8-11-5-2-9Z" fill="#030303" />
      <path
        d="m41 46 7-4 9 4"
        stroke="#d9d4c4"
        strokeWidth="2"
        fill="none"
        opacity=".65"
      />
    </svg>
  );
}

function Cartridge({ className }: { className: string }) {
  const id = useId();
  return (
    <svg
      className={`cartridge ${className}`}
      viewBox="0 0 120 32"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#43301b" />
          <stop offset=".25" stopColor="#d2b66c" />
          <stop offset=".48" stopColor="#f1d990" />
          <stop offset=".65" stopColor="#9b7336" />
          <stop offset="1" stopColor="#3b2816" />
        </linearGradient>
      </defs>
      <path
        d="M13 5h81c7 0 17 4 17 11s-10 11-17 11H13Z"
        fill={`url(#${id})`}
        stroke="#3e2d18"
      />
      <rect
        x="8"
        y="3"
        width="7"
        height="26"
        rx="2"
        fill={`url(#${id})`}
        stroke="#806138"
      />
      <path d="M19 6v20M26 6v20M82 6v20" stroke="#513a20" opacity=".6" />
      <path d="M29 9h51" stroke="#ffe8a4" opacity=".55" />
      <ellipse cx="107" cy="16" rx="4" ry="8" fill="#45301d" />
    </svg>
  );
}

export function PoliceTape({ className = "" }: { className?: string }) {
  return (
    <div className={`police-tape ${className}`} aria-hidden="true">
      <span>POLICE LINE · DO NOT CROSS</span>
      <b>✳</b>
      <span>ESCENA DEL CERDA · NO CRUZAR</span>
      <b>✳</b>
      <span>POLICE LINE · DO NOT CROSS</span>
      <b>✳</b>
      <span>ESCENA DEL CERDA · NO CRUZAR</span>
      <b>✳</b>
      <span>POLICE LINE · DO NOT CROSS</span>
      <b>✳</b>
      <span>ESCENA DEL CERDA · NO CRUZAR</span>
    </div>
  );
}

export function SceneProps({ variant }: { variant: "gate" | "archive" }) {
  return (
    <div className={`scene-props scene-${variant}`} aria-hidden="true">
      <BloodSplatter className="blood-one" />
      <BloodSplatter className="blood-two" />
      <BulletImpact className="impact-one" />
      <BulletImpact className="impact-two" />
      <BulletImpact className="impact-three" />
      <Cartridge className="cartridge-one" />
      <Cartridge className="cartridge-two" />
      <Cartridge className="cartridge-three" />
    </div>
  );
}

export function WantedLevel() {
  return (
    <div className="wanted-level" aria-hidden="true">
      <span className="mono">NIVEL CERDA</span>
      <div>
        {[0, 1, 2, 3, 4].map((n) => (
          <svg key={n} viewBox="0 0 24 24">
            <path d="m12 2 3 6.7 7.3.8-5.4 5 1.5 7.2-6.4-3.6-6.4 3.6 1.5-7.2-5.4-5 7.3-.8Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
