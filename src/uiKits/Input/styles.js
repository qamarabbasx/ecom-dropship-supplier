import { Input } from 'antd'
import styled from 'styled-components'

export const AntInput = styled(Input)`
  border: 1px solid #bdbdbd;
  background: var(--light-grey-input-fields-forms, #f6f6f6);
  &:hover {
    border: 1px solid #bdbdbd;
  }
  &:focus {
    border: 2px solid #ed6928;
  }
`
