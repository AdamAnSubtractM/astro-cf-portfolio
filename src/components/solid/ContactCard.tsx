import { Toaster, toast } from 'solid-toast';
import Button from './Button';
import { mergeProps, type Component } from 'solid-js';

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
    </>
  );
};

export default ContactCard;
