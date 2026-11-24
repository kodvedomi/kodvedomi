import Threads from '../rb/Threads.jsx';
import Particles from '../rb/Particles.jsx';
import { m } from '../content.js';

/** Živé pozadí celého webu: Soniin mramor (pomalu dýchá a pluje),
 *  světelné vlny na okrajích a stoupající zlaté jiskry. */
// Na mobilech a slabších zařízeních méně jisker, ať web běží plynule.
const LIGHT = typeof window !== 'undefined' && (window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4);

export default function LiveBackground({ calm = false }) {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__img" style={{ backgroundImage: `url(${m('bg-marble.webp')})` }} />
      <div className="bg__glow bg__glow--a" />
      <div className="bg__glow bg__glow--b" />
      <div className="bg__veil" />
      <div className="bg__threads bg__threads--l">
        <Threads color={[1, 0.96, 0.9]} accentColor={[0.95, 0.85, 1]} amplitude={1.5} distance={0.25} lineCount={20} thickness={0.6} speed={0.22} brightness={1.4} angle={80} />
      </div>
      <div className="bg__threads bg__threads--r">
        <Threads color={[1, 0.96, 0.9]} accentColor={[1, 0.88, 0.96]} amplitude={1.5} distance={0.25} lineCount={20} thickness={0.6} speed={0.2} brightness={1.4} angle={-80} />
      </div>
      {!calm && (
        <div className="bg__sparks">
          <Particles pixelRatio={1.25} particleCount={LIGHT ? 50 : 120} particleSpread={12} speed={0.05} particleColors={['#ffffff', '#fff1cf', '#e9d9ff', '#ffd9f1']}
            particleBaseSize={70} sizeRandomness={1.2} shape="sparkle" glow={0.8} twinkle={0.7} drift="up" driftSpeed={0.35}
            moveParticlesOnHover hoverEffect="parallax" particleHoverFactor={0.6} clickBurst={false} alphaParticles disableRotation={false} />
        </div>
      )}
    </div>
  );
}
