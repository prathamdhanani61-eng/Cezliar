// The green arch backdrop with a product cut-out standing on its pedestal.
// The backdrop is a square photo pinned to the bottom of the box, so sizes are
// measured against its rendered size (the larger of the box's width and height).
const BACKDROP = '/images/site/arch.webp';
const PEDESTAL_TOP = 0.185; // pedestal surface, as a share of the backdrop height from the bottom

export default function ArchScene({ cutout, alt = '', scale = 0.32 }) {
  const size = 'max(100cqw, 100cqh)';
  return (
    <div className="absolute inset-0 [container-type:size]">
      <img src={BACKDROP} alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
      <img
        src={cutout}
        alt={alt}
        className="absolute left-1/2 w-auto max-w-none -translate-x-1/2"
        style={{ height: `calc(${size} * ${scale})`, bottom: `calc(${size} * ${PEDESTAL_TOP})` }}
      />
    </div>
  );
}
