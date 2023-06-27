import styled from "@emotion/styled";

const StyledBox = styled.div`
  background-color: #e1e7eb;
  border-radius: 5px;
  padding: 2px 3px 5px 3px;
  display: inline-block;
  line-height: 0;
`;

export const Codeblock = ({ children }: { children: JSX.Element }) => (
  <StyledBox>{children}</StyledBox>
);

