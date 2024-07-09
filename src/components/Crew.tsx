import { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Circ, gsap } from "gsap";
import { NavigationCrew } from "./NavigationCrew";
import { pageSize } from "../utils/pageSize";
import uuid from "react-uuid";
import { DataType } from "./History";

type CrewType = {
  data: DataType[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  gridRef: RefObject<HTMLDivElement>;
}

export const Crew: FC<CrewType> = ({
                                                          data,
                                                          activeIndex,
                                                          setActiveIndex,
                                                          gridRef,
                                                        }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(pageSize());
  const [pagHash] = useState(uuid().slice(-6));

  let gridElementHeight = 0;
  if (gridRef.current?.offsetHeight) {
    gridElementHeight = gridRef.current.offsetHeight;
  }

  const handleWindowSizeChange = () => setPageWidth(pageSize());

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const getContainerMarginTop = (pageWidth: number) =>
      pageWidth <= 820 ? 0 : gridElementHeight * 0.4444 - (pageWidth * (53 / 192)) / 2

  const rotatePag = (index: number): [number, number] => {
    const R = (pageWidth * (53 / 192)) / 2
    const activePagSize = 56
    const gridColumnWidth = pageWidth / 24

    const radian =
        index * ((2 * Math.PI) / data.length) -
        Math.acos((R + activePagSize - gridColumnWidth * 3 + activePagSize / 2) / R)

    const x = R * Math.cos(radian) - activePagSize / 2
    const y = R * Math.sin(radian) - activePagSize / 2

    return [x + R, y + R]
  }

  const rotateCircle = (length: number, index: number, pagHash: string) => {
    gsap.to(containerRef.current, {
      duration: 1.5,
      rotation: -(360 / length) * index,
      ease: Circ.easeOut,
    });

    gsap.to(`.pag_${pagHash}`, {
      duration: 1.5,
      rotation: (360 / length) * index,
      ease: Circ.easeOut,
    });
  };

  useEffect(() => {
    rotateCircle(data.length, activeIndex, pagHash);
  }, [activeIndex]);

  const getPaginationText = (dataItem: DataType) =>
      dataItem.paginationText ? dataItem.paginationText : "";

  return (
      <StyledContainer
          ref={containerRef}
          style={{ marginTop: getContainerMarginTop(pageWidth) }}
      >
        <Wrapper>
          {data.map((dataItem, index) => {
            return (
                <NavigationCrew
                    key={index}
                    index={index}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                    rotatePag={rotatePag}
                    paginationText={getPaginationText(dataItem)}
                    pagHash={pagHash}
                />
            );
          })}
        </Wrapper>
      </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: absolute;
  width: calc(100vw * calc(53/192));
  height: calc(100vw * calc(53/192));
  left: 50%;
  border: 1px solid rgba(48, 62, 88, 0.2);
  border-radius: 50%;
  transform: translateX(-50%);

  @media (max-width: 820px) {
    border: none;
  }
  @media (max-width: 675px) {
    display: none
  }
`;

const Wrapper = styled.div`
  position: relative;
`;
