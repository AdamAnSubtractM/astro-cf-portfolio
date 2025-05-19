import { Toaster, toast } from 'solid-toast';
import Button from './Button';
import { mergeProps, type Component } from 'solid-js';
import GithubSVG from './GithubSVG';
import LinkedInSVG from './LinkedInSVG';

import styles from './style-modules/ContactCard.module.css';

const ContactCard: Component<{ email?: string }> = (props) => {
  const merged = mergeProps({ email: 'adam.l.knee@gmail.com' }, props);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(merged.email);
    toast.success('Email copied to clipboard', { duration: 2000 });
  };

  return (
    <>
      <Toaster position="top-right" />
      <h2 class={styles.heading}>Let's get in touch!</h2>
      <fieldset>
        <input type="email" value={merged.email} readOnly />
        <Button onClick={copyEmail}>Copy Email</Button>
      </fieldset>
      <section class={styles.social}>
        <a
          class="icon-button icon-button--large"
          href="https://github.com/AdamAnSubtractM"
          target="_blank"
          title="View Adam's GitHub profile"
        >
          <GithubSVG />
        </a>
        <a href="https://github.com/AdamAnSubtractM" target="_blank" title="View Adam's GitHub profile">
          Follow me on Github
        </a>
      </section>
      <section class={styles.social}>
        <a
          class="icon-button icon-button--large"
          href="https://www.linkedin.com/in/adam-knee-web-dev/"
          target="_blank"
          title="View Adam's LinkedIn profile"
        >
          <LinkedInSVG />
        </a>
        <a href="https://www.linkedin.com/in/adam-knee-web-dev/" target="_blank" title="View Adam's LinkedIn profile">
          Connect with me on LinkedIn
        </a>
      </section>
    </>
  );
};

export default ContactCard;
