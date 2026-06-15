import styled from "styled-components";
import { CONTENT_WIDTH, PAGE_GUTTER, media } from "./breakpoints";

export const PageContainer = styled.div`
  width: ${CONTENT_WIDTH.pct};
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding-left: ${PAGE_GUTTER.desktop}px;
  padding-right: ${PAGE_GUTTER.desktop}px;

  ${media.downTablet`
    padding-left: ${PAGE_GUTTER.tablet}px;
    padding-right: ${PAGE_GUTTER.tablet}px;
  `}

  ${media.downMobile`
    padding-left: ${PAGE_GUTTER.mobile}px;
    padding-right: ${PAGE_GUTTER.mobile}px;
  `}
`;
