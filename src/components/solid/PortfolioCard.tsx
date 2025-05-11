import type { Component } from 'solid-js';
import styles from './style-modules/PortfolioCard.module.css';

export type PortfolioCardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  link: string;
};

const PortfolioCard: Component<PortfolioCardProps> = (props) => (
  <a href={props.link} class={styles.portfolioCard}>
    <div class={styles.thumbnail}>
      <img src={props.imageUrl} alt={props.title} />
    </div>
    <div class={styles.content}>
      <h3 class={styles.title}>{props.title}</h3>
      {props.description && <p class={styles.description}>{props.description}</p>}
    </div>
  </a>
);

export default PortfolioCard;
