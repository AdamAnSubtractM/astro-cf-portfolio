import type { Component } from 'solid-js';
import styles from './style-modules/PortfolioCard.module.css';
import Button from './Button';

export type PortfolioCardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  link: string;
};

const PortfolioCard: Component<PortfolioCardProps> = (props) => (
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
    </div>
  </article>
);

export default PortfolioCard;
