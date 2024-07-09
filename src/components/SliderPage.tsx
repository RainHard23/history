import { FC } from "react";
import styled from "styled-components";

export type TSlide = {
    year: string;
    description: string;
    slideHash: string;
};

export const SliderPage: FC<TSlide> = ({ year, description, slideHash }) => {
    return (
        <Article className={`slide_${slideHash}`}>
            <Title>{year}</Title>
            <Description>{description}</Description>
        </Article>
    );
};

const Article = styled.article`
  
`;

const Title = styled.div`
    margin-bottom: 12px;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 25px;
    line-height: 120%;
    text-transform: uppercase;
    color: #3877ee;

    @media (max-width: 1500px) {
        font-size: 20px;
    }

    @media (max-width: 820px) {
        font-size: 16px;
        margin-bottom: 15px;
    }

`;

const Description = styled.div`
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: #42567a;

    @media (max-width: 1500px) {
        font-size: 16px;
    }

    @media (max-width: 820px) {
        font-size: 14px;
        line-height: 145%;
    }
`;
