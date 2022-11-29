import styled from "styled-components";
import { ReactNode } from "react";

type RoundedCardTypes = {
  children: ReactNode;
  propsClassName: string;
};
const RoundedCardStyled = styled.div`
  display: flex;
  padding: 0.5em 4em;
  border-radius: 0.2em;
`;

function RoundedCard({ children, propsClassName }: RoundedCardTypes) {
  return (
    <RoundedCardStyled className={propsClassName}>{children}</RoundedCardStyled>
  );
}

export { RoundedCard };
