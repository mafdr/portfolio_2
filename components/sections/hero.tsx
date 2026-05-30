'use client';

import { SpinningCursor } from '@/components/spinning-cursor';
import { MorphingTitle } from '@/components/morphing-title';

export function Hero() {
  return (
    <section className="hero-radd" id="top" data-nav-theme="lime">
      <div className="hero-radd__stage">
        <MorphingTitle />

        <div className="hero-radd__image" data-cursor="hide">
          <img
            src="/hero_image_1.jpg"
            alt="Manuel Reis"
            className="hero-radd__img hero-radd__img--base"
          />
          <img
            src="/hero_image_2.jpg"
            alt="Manuel Reis"
            className="hero-radd__img hero-radd__img--hover"
          />
          <SpinningCursor text="MANUEL REIS · " repeat={2} />
        </div>
      </div>
    </section>
  );
}
