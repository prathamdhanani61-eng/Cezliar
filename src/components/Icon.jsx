// Line icons drawn on a 24px grid. Decorative by default (aria-hidden).
const ICONS = {
  search: [['circle', { cx: 11, cy: 11, r: 7 }], ['path', { d: 'M20 20l-3.5-3.5' }]],
  heart: [['path', { d: 'M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5c-2.2 4.6-9.2 9-9.2 9z' }]],
  'chevron-down': [['path', { d: 'M6 9l6 6 6-6' }]],
  'chevron-left': [['path', { d: 'M15 6l-6 6 6 6' }]],
  'chevron-right': [['path', { d: 'M9 6l6 6-6 6' }]],
  'arrow-right': [['path', { d: 'M5 12h14M13 6l6 6-6 6' }]],
  'arrow-left': [['path', { d: 'M19 12H5M11 6l-6 6 6 6' }]],
  menu: [['path', { d: 'M4 7h16M4 12h16M4 17h16' }]],
  close: [['path', { d: 'M6 6l12 12M18 6L6 18' }]],
  whatsapp: [['path', { d: 'M4 20l1.3-4A8 8 0 1 1 8 18.7z' }]],
  instagram: [['rect', { x: 3, y: 3, width: 18, height: 18, rx: 5 }], ['circle', { cx: 12, cy: 12, r: 4 }], ['circle', { cx: 17.5, cy: 6.5, r: 0.8 }]],
  drop: [['path', { d: 'M12 3c3 3 5 6 5 9a5 5 0 0 1-10 0c0-3 2-6 5-9z' }]],
  clock: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7v5l3 2' }]],
  stick: [['path', { d: 'M12 21V10' }], ['path', { d: 'M12 10c0-3 2-5 0-7-2 2 0 4 0 7z' }], ['path', { d: 'M8 21h8' }]],
  pin: [['path', { d: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z' }], ['circle', { cx: 12, cy: 9.5, r: 2.5 }]],
  shield: [['path', { d: 'M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z' }], ['path', { d: 'M9 12l2 2 4-4' }]],
  check: [['path', { d: 'M5 12l4 4 10-10' }]],
  share: [['circle', { cx: 18, cy: 5, r: 2.5 }], ['circle', { cx: 6, cy: 12, r: 2.5 }], ['circle', { cx: 18, cy: 19, r: 2.5 }], ['path', { d: 'M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4' }]],
  mail: [['rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }], ['path', { d: 'M3 7l9 6 9-6' }]],
  phone: [['path', { d: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2' }]],
  bag: [['path', { d: 'M4 7h16l-1.5 12h-13z' }], ['path', { d: 'M8.5 7a3.5 3.5 0 0 1 7 0' }]],
  star: [['path', { d: 'M12 3l2.4 5.3 5.6.6-4.2 3.8 1.2 5.6L12 15.5l-5 2.8 1.2-5.6L4 8.9l5.6-.6z' }]],
  gift: [['rect', { x: 4, y: 9, width: 16, height: 11, rx: 1 }], ['path', { d: 'M2.5 9h19V6h-19z' }], ['path', { d: 'M12 6v14' }], ['path', { d: 'M12 6c-1.5-3-5-3.7-5-1.5S10.5 6 12 6zM12 6c1.5-3 5-3.7 5-1.5S13.5 6 12 6z' }]],
  filter: [['rect', { x: 7.5, y: 3.5, width: 9, height: 17, rx: 2.5 }], ['path', { d: 'M7.5 8h9M7.5 12h9M7.5 16h9' }]],
  candle: [['path', { d: 'M9 8h6v11a3 3 0 0 1-6 0z' }], ['path', { d: 'M10.5 3.5h3V8h-3z' }]],
  pipe: [['path', { d: 'M3 15h7.5a3 3 0 0 0 3-3V4.5' }], ['path', { d: 'M3 19.5h7.5a7.5 7.5 0 0 0 7.5-7.5V4.5' }]],
  link: [['path', { d: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1' }], ['path', { d: 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1' }]],
  plus: [['path', { d: 'M12 5v14M5 12h14' }]],
  pause: [['path', { d: 'M9 6v12M15 6v12' }]],
  play: [['path', { d: 'M8 5.5v13l10.5-6.5z' }]],
  minus: [['path', { d: 'M5 12h14' }]],
};

export default function Icon({ name, size = 20, strokeWidth = 1.6, className, filled = false }) {
  const shapes = ICONS[name];
  if (!shapes) return null;
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {shapes.map(([Tag, props], i) => <Tag key={i} {...props} />)}
    </svg>
  );
}
