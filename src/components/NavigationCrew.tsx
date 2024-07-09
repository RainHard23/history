import styled from "styled-components";
import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { gsap, Sine } from "gsap";

type NavigationCrewType = {
  index: number;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  rotatePag: (index: number) => [number, number];
  paginationText: string;
  pagHash: string;
}

export const NavigationCrew: FC<NavigationCrewType> = ({
                                            index,
                                            activeIndex,
                                            setActiveIndex,
                                            rotatePag,
                                            paginationText,
                                            pagHash,
                                          }) => {
  const ref = useRef<HTMLSpanElement>(null);

  const animate = (duration: number) => {
    gsap.to(ref.current, {
      delay: 0.1,
      fontSize: 20,
    });
    gsap.to(ref.current, {
      duration: duration,
      opacity: 1,
      ease: Sine.easeInOut,
    });
  };

  const hide = () => {
    gsap.to(ref.current, {
      duration: 0.2,
      opacity: 0,
      ease: Sine.easeInOut,
    });
  };

  useEffect(() => {
    if (activeIndex === index) {
        animate(0.0001);
    }
  }, []);

  useEffect(() => {
    if (activeIndex === index) {
        animate(1);
    } else {
      hide();
    }
  }, [activeIndex, index]);

  return (
      <Container left={rotatePag(index)[0]} top={rotatePag(index)[1]} className={`pag_${pagHash}`}>
        <Crew active={activeIndex === index} onClick={() => setActiveIndex(index)}>
          {index + 1}
        </Crew>
        <PagText ref={ref} className="pag_text">
          {paginationText}
        </PagText>
      </Container>
  );
};

const Container = styled.div<{ left: number, top: number }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
`;

const Crew = styled.span<{ active: boolean }>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 6px;
    height: 6px;
    text-align: center;
    font-size: 0;
    opacity: 1;
    border-radius: 50%;
    border: 1px solid rgba(48, 62, 88, 0);
    background-color: #42567a;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    ${({active}) => active && `
    display: inline-flex;
    width: 56px;
    height: 56px;
    color: var(--black-blue);
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    background: #f4f5f9;
    border: 1px solid rgba(48, 62, 88, 0.5);
    cursor: default;
  `}
    &:hover {
        display: inline-flex;
        width: 56px;
        height: 56px;
        color: #42567a;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        background: #f4f5f9;
        border: 1px solid rgba(48, 62, 88, 0.5);
    }
`;

const PagText = styled.span`
    position: absolute;
    left: 74px;
    font-weight: 700;
    font-size: 0;
    line-height: 30px;
    color: #42567a;
    opacity: 0;
    transition: 0.3s ease-in-out;
`;