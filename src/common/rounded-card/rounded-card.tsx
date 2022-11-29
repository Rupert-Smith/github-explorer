import styled from "styled-components";
import { ReactNode } from "react";

type RoundedCardTypes = {
  children: ReactNode;
  propsClassName: string;
};

function RoundedCard({ children, propsClassName }: RoundedCardTypes) {
  const RoundedCard = styled.div`
    display: flex;
    padding: 0.7em 4em;
    border-radius: 0.2em;
  `;

  return <RoundedCard className={propsClassName}>{children}</RoundedCard>;
}

export { RoundedCard };
