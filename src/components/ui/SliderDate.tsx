import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap, Circ } from "gsap";

type TypeProps = {
  firstYear: string;
  secondYear: string;
  prevFirstYear?: string;
  prevSecondYear?: string;
}

const YearContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const YearSpan = styled.span<{ isFirst?: boolean }>`
    font-weight: 700;
    font-size: 200px;
    line-height: 80%;
    letter-spacing: -0.02em;
    color: #3877ee;
    margin-right: ${({isFirst}) => (isFirst ? '96px' : '0')};

    &:last-child {
        color: #ef5da8;
    }

    @media (max-width: 1700px) {
        font-size: 150px;
        margin-right: ${({isFirst}) => (isFirst ? '72px' : '0')};
    }

    @media (max-width: 1400px) {
        font-size: 120px;
        margin-right: ${({isFirst}) => (isFirst ? '72px' : '0')};
    }

    @media (max-width: 1060px) {
        font-size: 85px;
        margin-right: ${({isFirst}) => (isFirst ? '41px' : '0')};
    }

    @media (max-width: 820px) {
        font-size: 56px;
        margin-right: ${({isFirst}) => (isFirst ? '26px' : '0')};
    }
    @media (max-width: 675px) {

    }
`;

export const SliderDate: FC<TypeProps> = ({
                                   firstYear,
                                   secondYear,
                                   prevFirstYear,
                                   prevSecondYear,
                                 }) => {
  const [firstYearRef, setFirstYearRef] = useState<HTMLSpanElement>();
  const [secondYearRef, setSecondYearRef] = useState<HTMLSpanElement>();
  const ref1 = useRef<HTMLSpanElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref1.current) {
      setFirstYearRef(ref1.current);
    }
    if (ref2.current) {
      setSecondYearRef(ref2.current);
    }
  }, [ref1, ref2]);

  const changeYear = (
      yearRef: HTMLSpanElement | undefined,
      prevYear: string | undefined
  ) => {
    if (yearRef && prevYear) {
      gsap.from(yearRef, {
        textContent: prevYear,
        duration: 1.5,
        ease: Circ.easeOut,
        snap: { textContent: 1 },
      });
    }
  };

  useEffect(() => {
    changeYear(firstYearRef, prevFirstYear);
    changeYear(secondYearRef, prevSecondYear);
  }, [firstYear, secondYear]);

  return (
      <YearContainer>
        <YearSpan ref={ref1} isFirst className="year">
          {firstYear}
        </YearSpan>
        <YearSpan ref={ref2} className="year">
          {secondYear}
        </YearSpan>
      </YearContainer>
  );
};

