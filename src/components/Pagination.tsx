import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import { DataType } from "./History";

type PaginationProps = {
  data: DataType[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({ data, activeIndex, setActiveIndex }) => {
  return (
      <Container>
        {data.map((item, index) => (
            <Dot
                key={index}
                active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
            />
        ))}
      </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: absolute;
`;

const Dot = styled.span<{ active: boolean }>`
    width: 6px;
    height: 6px;
    background-color: #42567a;
    opacity: ${({active}) => (active ? 1 : 0.4)};
    border-radius: 50%;
    transition: opacity 0.15s ease-in-out;
`;
