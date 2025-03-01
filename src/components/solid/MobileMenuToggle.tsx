import IconButton from './IconButton';
import CloseSVG from './CloseSVG';
import MenuSVG from './MenuSVG';
import { createSignal, createEffect, Show, onCleanup } from 'solid-js';
import type { Component, JSX } from 'solid-js';

const MobileMenuToggle: Component<{ children?: JSX.Element }> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  createEffect(() => {
    if (isMenuOpen()) {
      document.body.classList.add('freeze');
    } else {
      document.body.classList.remove('freeze');
    }
  });

  return (
    <IconButton onClick={() => console.log('menu')} aria-label="Toggle Menu">
      <Show when={isMenuOpen()} fallback={props?.children || <MenuSVG />}>
        <CloseSVG />
      </Show>
    </IconButton>
  );
};

export default MobileMenuToggle;
