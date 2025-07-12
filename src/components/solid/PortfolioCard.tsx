import type { Component } from 'solid-js';
import Button from './Button';
import { TagsSlider } from './TagsSlider';
import styles from './style-modules/PortfolioCard.module.css';

export type PortfolioCardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  link: string;
  tags?: { title: string; slug: { _type: 'slug'; current: string } }[];
};

const PortfolioCard: Component<PortfolioCardProps> = (props) => {
  const slides = props?.tags?.map((tag) => ({
    title: tag.title,
    slug: { current: tag.slug.current.toLowerCase().replace(/\s+/g, '-') }
  }));
  return (
    <article class={styles.portfolioCard}>
      <div class={styles.thumbnail}>
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div class={styles.content}>
        <h3 class={styles.title}>{props.title}</h3>
        {props.description && <p class={styles.description}>{props.description}</p>}
        <Button variant="secondary" href={props.link}>
          Read More
        </Button>
        <TagsSlider slides={slides} />
      </div>
    </article>
  );
};

export default PortfolioCard;
