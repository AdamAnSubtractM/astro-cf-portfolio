import type { JSX } from 'solid-js';

interface IconButtonProps {
  children: JSX.Element;
  title?: string;
  class?: string;
  onClick: () => void;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button type="button" class="icon-button icon-button--interactive" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
