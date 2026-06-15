import styled from "styled-components";
import AntBreadCrumbs from "../../uiKits/BreadCrums";
import { media } from "../../theme/breakpoints";

export const StyledBreadCrumbs = styled(AntBreadCrumbs)``;

export const MainHeading = styled.h2`
  color: var(--Text2, #000);
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: min(92vw, 1240px);
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  ${media.downMobile`
    font-size: 24px;
    width: 100%;
  `}
`;
