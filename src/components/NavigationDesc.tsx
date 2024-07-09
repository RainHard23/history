import styled from "styled-components";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { pageSize } from "../utils/pageSize";
import { SliderBtn } from "./ui/SliderBtn";

type NavigationType = {
  activeIndex: number;
  dataLength: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

enum ButtonDestination {
  PREV = -1,
  NEXT = 1,
}

const Counter = styled.span`
    display: inline-block;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #42567a;

    @media (max-width: 1060px) {
        margin-bottom: 10px;
    }
`;

const NavButtonsContainer = styled.div`
  display: flex;
  gap: 21px;

  @media (max-width: 1440px) {
    gap: 14px;
  }

  @media (max-width: 1060px) {
    gap: 8px;
  }
`;

const Btn = styled.button<{ disabled: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(66, 86, 122, 0.5);
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  transition: 0.15s ease-out;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'rgba(0,0,0,0)' : 'white')};
  }

  @media (max-width: 1440px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 1060px) {
    width: 25px;
    height: 25px;
  }

  &.disabled {
    border: 1px solid rgba(66, 86, 122, 0.2);
  }
`;

export const NavigationDesc: FC<NavigationType> = ({
                                                    dataLength,
                                                    activeIndex,
                                                    setActiveIndex,
                                                  }) => {
  const isMaxIndex = activeIndex === dataLength - 1;
  const isMinIndex = activeIndex === 0;
  const [isDisabled, setIsDisabled] = useState(false);

  const onButtonClick = (
      condition: boolean,
      buttonDestination: ButtonDestination
  ) => {
    setActiveIndex(condition ? activeIndex : activeIndex + buttonDestination);
    if (pageSize() >= 821) {
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 800);
    }
  };

  return (
      <>
        <Counter>
          {`${(activeIndex + 1).toString().padStart(2, "0")}/${dataLength
              .toString()
              .padStart(2, "0")}`}
        </Counter>
        <NavButtonsContainer>
          <Btn
              className={isMinIndex ? 'disabled' : ''}
              onClick={() => onButtonClick(isMinIndex, ButtonDestination.PREV)}
              disabled={isDisabled}
          >
            <SliderBtn isActive={isMinIndex} direction="left" />
          </Btn>
          <Btn
              className={isMaxIndex ? 'disabled' : ''}
              onClick={() => onButtonClick(isMaxIndex, ButtonDestination.NEXT)}
              disabled={isDisabled}
          >
            <SliderBtn isActive={isMaxIndex} direction="right" />
          </Btn>
        </NavButtonsContainer>
      </>
  );
};
