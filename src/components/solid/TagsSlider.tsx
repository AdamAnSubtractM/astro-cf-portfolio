import { For, type Component } from 'solid-js';
import { Tag } from './Tag';
import styles from './style-modules/TagSlider.module.css';

type Props = {
  slides?: { title: string; slug: { current: string } }[];
};

export const TagsSlider: Component<Props> = ({ slides }) => {
  console.log({ slides });
  if (!slides?.length) return null;
  return (
    <div class={styles.tagSlider}>
      <For each={slides}>{(slide) => <Tag slug={slide.slug.current}>{slide.title}</Tag>}</For>
    </div>
  );
};
