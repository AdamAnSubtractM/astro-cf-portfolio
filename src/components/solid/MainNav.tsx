import Logo from './Logo';
import IconButton from './IconButton';
import MenuSVG from './MenuSVG';
import CloseSVG from './CloseSVG';
import GithubSVG from './GithubSVG';
import SunSVG from './SunSVG';
import MoonStarSVG from './MoonStarSVG';
import MonitorSVG from './MonitorSVG';
import { createEffect, createSignal, Match, onCleanup, onMount, Show, Switch } from 'solid-js';
import type { Accessor, Component, Setter } from 'solid-js';

import styles from './style-modules/ManNav.module.css';

const MainNavLinks: Component<{ isMenuOpen: Accessor<boolean> }> = (props) => {
  return (
    <section class={props.isMenuOpen() ? `${styles.links} ${styles.visible}` : styles.links}>
      <ul>
        <li>
          <a href="/portfolio">Portfolio</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/resume">Resume</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </section>
  );
};

const MainNavControls: Component<{ isMenuOpen: Accessor<boolean>; setIsMenuOpen: Setter<boolean> }> = (props) => {
  // Initialize with a default theme
  const [theme, setTheme] = createSignal<'dark' | 'light' | 'system'>('dark');

  // On client mount, read from localStorage if available
  onMount(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      setTheme(stored);
    }
  });

  // Toggle through: dark → light → system → dark → …
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : prev === 'light' ? 'system' : 'dark';
      localStorage.setItem('theme', newTheme); // Store the new theme
      return newTheme;
    });
  };

  // Update document attribute when theme changes
  createEffect(() => {
    document.documentElement.setAttribute('data-theme', theme());
  });

  return (
    <section class={styles.controls}>
      <a
        class="icon-button"
        href="https://github.com/AdamAnSubtractM"
        target="_blank"
        title="View Adam's GitHub profile"
      >
        <GithubSVG />
      </a>
      <IconButton onClick={toggleTheme} aria-label="Toggle Theme">
        <Switch>
          <Match when={theme() === 'dark'}>
            <SunSVG />
          </Match>
          <Match when={theme() === 'light'}>
            <MonitorSVG />
          </Match>
          <Match when={theme() === 'system'}>
            <MoonStarSVG />
          </Match>
        </Switch>
      </IconButton>
      <IconButton
        class={styles['menu-toggle']}
        onClick={() => props.setIsMenuOpen((prevValue) => !prevValue)}
        aria-label="Toggle Menu"
      >
        <Show when={props.isMenuOpen()} fallback={<MenuSVG />}>
          <CloseSVG />
        </Show>
      </IconButton>
    </section>
  );
};

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  let navRef: HTMLElement | undefined;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  createEffect(() => {
    if (isMenuOpen()) {
      document.body.classList.add('freeze');

      // Query focusable elements inside the nav
      const focusableElements = navRef?.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      focusableElements[1]?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMobileMenu();
        } else if (e.key === 'Tab') {
          if (!focusableElements || focusableElements.length === 0) return;
          const focusable = Array.from(focusableElements);
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          // When tabbing forward from the last element, cycle back to the first
          if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }

          // When tabbing backwards from the first element, cycle to the last
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        }
      };

      navRef?.addEventListener('keydown', handleKeyDown);
      onCleanup(() => {
        navRef?.removeEventListener('keydown', handleKeyDown);
      });
    } else {
      document.body.classList.remove('freeze');
    }
  });

  return (
    <nav ref={navRef} class={styles.nav}>
      <Logo styles={styles} />
      <MainNavLinks isMenuOpen={isMenuOpen} />
      <MainNavControls isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </nav>
  );
};

export default MainNav;
