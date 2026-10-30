// The green arch backdrop with a product cut-out standing on its pedestal.
// The backdrop is a square photo pinned to the bottom of the box, so sizes are
// measured against its rendered size (the larger of the box's width and height).
const BACKDROP = '/images/site/arch.webp';
const PEDESTAL_TOP = 0.185; // pedestal surface, as a share of the backdrop height from the bottom

// `baseline` is where the product touches the ground, as a share of the cut-out's
// height from its top (1 = the very bottom edge; less when a shadow sits below).
export default function ArchScene({ cutout, alt = '', scale = 0.32, baseline = 1, priority = false }) {
  const size = 'max(100cqw, 100cqh)';
  return (
    <div className="absolute inset-0 [container-type:size]">
      <img
        src={BACKDROP}
        srcSet={`${BACKDROP.replace('.webp', '-600.webp')} 600w, ${BACKDROP} 1000w`}
        sizes="(min-width: 1024px) 40vw, 100vw"
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <img
        src={cutout}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="absolute left-1/2 w-auto max-w-none -translate-x-1/2"
        style={{
          height: `calc(${size} * ${scale})`,
          bottom: `calc(${size} * ${PEDESTAL_TOP - scale * (1 - baseline)})`,
        }}
      />
    </div>
  );
}
