import styled from "styled-components";
import { Breadcrumb } from "antd";

export const AntBreadCrumbs = styled(Breadcrumb)`
  width: 85%;
  margin: 0 auto;
  padding-top: 35px;
  padding-bottom: 10px;
  ol li span a {
    color: #000;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 15.6px;
  }
`;
