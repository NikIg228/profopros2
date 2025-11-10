import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapParallax(ref: React.RefObject<HTMLElement | null>, amount = 10) {
  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: amount },
        {
          yPercent: -amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, amount]);
}


