import { createSignal, onMount, For } from 'solid-js';
import createEmblaCarousel from 'embla-carousel-solid';
import type { Component } from 'solid-js';
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';

import styles from './style-modules/Carousel.module.css';
import PortfolioCard from './PortfolioCard';
import IconButton from './IconButton';
import ArrowSVG from './ArrowSVG';

export type EmblaCarouselProps = {
  slides: { title: string; description: string; imageUrl: string; link: string }[];
  options?: EmblaOptionsType;
};

const Carousel: Component<EmblaCarouselProps> = (props) => {
  const [emblaRef, emblaApi] = createEmblaCarousel(() => ({ loop: false, align: 'start', ...(props.options ?? {}) }));

  // signals to track whether we can scroll
  const [canPrev, setCanPrev] = createSignal(false);
  const [canNext, setCanNext] = createSignal(false);

  // helper to update arrow state
  const updateButtons = (api: EmblaCarouselType) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  };

  onMount(() => {
    const api = emblaApi();
    if (!api) return;
    updateButtons(api);
    api.on('select', () => updateButtons(api));
  });

  return (
    <div class={styles.carousel}>
      <div ref={emblaRef} class={styles.viewport}>
        <div class={styles.container}>
          <For each={props.slides}>
            {(slide) => (
              <div class={styles.slide}>
                <PortfolioCard {...slide} />
              </div>
            )}
          </For>
        </div>
      </div>
      <IconButton
        class={styles.prev}
        onClick={() => emblaApi()?.scrollPrev()}
        disabled={!canPrev()}
        aria-label="Scroll to previous slide."
      >
        <ArrowSVG />
      </IconButton>
      <IconButton
        class={styles.next}
        onClick={() => emblaApi()?.scrollNext()}
        disabled={!canNext()}
        aria-label="Scroll to next slide."
      >
        <ArrowSVG />
      </IconButton>
    </div>
  );
};

export default Carousel;
