import styled from "styled-components";
import { Steps } from "antd";

export const AntSteps = styled(Steps)`
  margin: 0 auto;
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #ed6928;
    border-color: #ed6928;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #ffff;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #ed6928;
    height: 0.28rem;
    border-radius: 2.5rem;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #ed6928;
    border-color: #ed6928;
  }
`;
