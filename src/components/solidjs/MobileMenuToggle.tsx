import IconButton from './IconButton';
import CloseSVG from './CloseSVG';
import MenuSVG from './MenuSVG';
import { createSignal, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

const MobileMenuToggle: Component<{ children?: JSX.Element }> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const MENU = 'responsive-menu';
  const MENU_OPEN = `${MENU}--open`;

  const toggleMobileMenu = function () {
    const mobileMenu = document.querySelector(`.${MENU}`);
    if (mobileMenu) {
      mobileMenu.classList.toggle(MENU_OPEN);
      setIsMenuOpen((prev) => Boolean(!prev));
    }
  };

  return (
    <IconButton onClick={toggleMobileMenu}>
      <Show when={isMenuOpen()} fallback={<>{props?.children || <MenuSVG />}</>}>
        <CloseSVG />
      </Show>
    </IconButton>
  );
};

export default MobileMenuToggle;
