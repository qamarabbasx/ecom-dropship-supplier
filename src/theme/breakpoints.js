import { css } from "styled-components";

export const BP = {
  mobileMax: 480,
  tabletMax: 1024,
  desktopMin: 1025,
};

export const NAV_BREAKPOINT = 768;

export const PAGE_GUTTER = {
  mobile: 16,
  tablet: 24,
  desktop: 40,
};

export const CONTENT_WIDTH = {
  pct: "min(92vw, 1280px)",
};

export const media = {
  downMobile: (...args) => css`
    @media (max-width: ${BP.mobileMax}px) {
      ${css(...args)}
    }
  `,
  downTablet: (...args) => css`
    @media (max-width: ${BP.tabletMax}px) {
      ${css(...args)}
    }
  `,
  upDesktop: (...args) => css`
    @media (min-width: ${BP.desktopMin}px) {
      ${css(...args)}
    }
  `,
  downNav: (...args) => css`
    @media (max-width: ${NAV_BREAKPOINT}px) {
      ${css(...args)}
    }
  `,
  upNav: (...args) => css`
    @media (min-width: ${NAV_BREAKPOINT + 1}px) {
      ${css(...args)}
    }
  `,
};
