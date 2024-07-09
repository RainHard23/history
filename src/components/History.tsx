import styled from 'styled-components';
import { FC, useEffect, useRef, useState } from "react";
import { Swiper as SwiperClass, SwiperOptions } from "swiper/types";
import { pageSize } from "../utils/pageSize";
import { Circ, gsap } from "gsap";
import { Crew } from "./Crew";
import { Pagination } from "./Pagination";
import { SliderDate } from "./ui/SliderDate";
import { NavigationDesc } from "./NavigationDesc";
import { Navigation } from "swiper";
import { SliderPage, TSlide } from "./SliderPage";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import uuid from "react-uuid";

export type DataType = {
    startDate: string;
    LastDate: string;
    history: Pick<TSlide, "year" | "description">[];
    paginationText?: string;
}

type PrevStateType = {
    firstYear: string;
    secondYear: string;
}

type SwiperType = {
    isBeginning: boolean;
    isEnd: boolean;
}

type HistoryType = {
    data: DataType[];
}

const swiperBreakpoints: { [p: number]: SwiperOptions; [p: string]: SwiperOptions } = {
    1200: {
        slidesPerView: 3,
        spaceBetween: 80,
    },
    820: {
        slidesPerView: 2,
        spaceBetween: 80,
    },
    650: {
        slidesPerView: 3,
        spaceBetween: 50,
    },
    512: {
        slidesPerView: 2,
        spaceBetween: 50,
    },
}


export const History: FC<HistoryType> = ({ data }) => {
    const [state] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevYears, setPrevYears] = useState<PrevStateType>();

    const ref = useRef<SwiperRef>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [swiper, setSwiper] = useState<SwiperClass>();
    const [swiperState, setSwiperState] = useState<SwiperType>({ isBeginning: true, isEnd: false });
    const [pageWidth] = useState(pageSize());
    const [slideHash] = useState(uuid().slice(-6));

    const changeInfo = (slideHash: string) => {
        gsap
            .timeline()
            .to(`.slide_${slideHash}`, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: Circ.easeInOut,
            })
            .to(`.slide_${slideHash}`, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                ease: Circ.easeOut,
            });
    };

    useEffect(() => {
        if (ref?.current?.swiper) {
            setSwiper(ref?.current?.swiper);
        }
    }, [ref, swiper]);

    useEffect(() => {
        setPrevYears({
            firstYear: state[activeIndex].startDate,
            secondYear: state[activeIndex].LastDate,
        });
        changeInfo(slideHash);
    }, [activeIndex]);

    return (
        <Container>
            <StyledGrid ref={gridRef}>
                {pageWidth > 820 ? (
                    <Crew
                        data={data}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        gridRef={gridRef}
                    />
                ) : (
                    <StyledPaginationContainer>
                        <Pagination data={data} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    </StyledPaginationContainer>
                )}
                <StyledContent>
                    <StyledTitle>Lorem ipsum</StyledTitle>
                    <SliderDate
                        firstYear={state[activeIndex].startDate}
                        secondYear={state[activeIndex].LastDate}
                        prevFirstYear={typeof prevYears?.firstYear === "string" ? prevYears.firstYear : "0"}
                        prevSecondYear={typeof prevYears?.secondYear === "string" ? prevYears.secondYear : "0"}
                    />
                </StyledContent>
                <StyledLine />
                <StyledNavigation>
                    <NavigationDesc
                        activeIndex={activeIndex}
                        dataLength={data.length}
                        setActiveIndex={setActiveIndex}
                    />
                </StyledNavigation>
                <StyledSwiper>
                    <button
                        className={`swiper-button-prev ${swiperState.isBeginning ? "disable" : ""}`}
                        onClick={() => {
                            if (swiper) {
                                swiper.slidePrev();
                            }
                        }}
                    ></button>
                    <Swiper
                        ref={ref}
                        slidesPerView={1.4}
                        spaceBetween={25}
                        modules={[Navigation]}
                        navigation={true}
                        className="my_swiper"
                        onSlideChange={() => {
                            swiper?.update();
                            if (swiper) {
                                setSwiperState({ isEnd: swiper?.isEnd, isBeginning: swiper?.isBeginning });
                            }
                        }}
                        breakpoints={swiperBreakpoints}
                    >
                        <>
                            {data[activeIndex].history.map((dataItem, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <SliderPage
                                            year={dataItem.year}
                                            description={dataItem.description}
                                            slideHash={slideHash}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </>
                    </Swiper>
                    <button
                        className={`swiper-button-next ${swiperState.isEnd ? "disable" : ""}`}
                        onClick={() => {
                            if (swiper) {
                                swiper.slideNext();
                            }
                        }}
                    ></button>
                </StyledSwiper>
            </StyledGrid>
        </Container>
    );
}

const Container = styled.div`
    background-color: #f4f5f9;
    height: 100vh;
`;

const StyledGrid = styled.div`
    position: relative;
    display: grid;
    margin: 0 calc(100% / 13.4) 0 calc(100% / 6);
    grid-template-rows: max-content;
    grid-template-columns: repeat(18, 1fr);
    border: solid rgba(42, 56, 112, 0.1);
    border-width: 0 1px;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        top: 44.44%;
        background: rgba(42, 56, 112, 0.1);
    }

    &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 1px;
        left: 50%;
        background: rgba(42, 56, 112, 0.1);
    }

    @media (max-width: 820px) {
        display: flex;
        flex-direction: column;
        margin: 0 20px 0 20px;
        border: none;

        &::after {
            display: none;
        }

        &::before {
            display: none;
            background: #c7cdd9;
            top: 51.5%;
        }
    }
`;

const StyledPaginationContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 30px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
`;

const StyledContent = styled.div`
    grid-column: 1/19;
    max-height: 390px;
    margin: clamp(90px, 15%, 166px) 0 147px;

    @media (max-width: 820px) {
        margin: 59px 0 71px;
    }
`;

const StyledTitle = styled.h1`
    display: inline-block;
    max-width: 433px;
    padding-left: 82px;
    margin-bottom: 87px;
    position: relative;
    font-weight: 700;
    font-size: 56px;
    line-height: 120%;
    color: #42567a;

    &::before {
        content: "";
        display: inline-block;
        position: absolute;
        left: 0;
        top: 7%;
        height: 90%;
        width: 5px;
        background: linear-gradient(180deg, #3877EE, #EF5DA8);
    }

    @media (max-width: 1400px) {
        max-width: 315px;
        padding-left: 58px;
        font-size: 40px;
    }

    @media (max-width: 820px) {
        font-size: 25px;
        padding: 0;

        &::before {
            display: none;
        }
    }

    @media (max-width: 512px) {
        max-width: 123px;
        font-size: 20px;
        margin-bottom: 67px;
    }
`;

const StyledLine = styled.span`
    margin-bottom: 20px;
    height: 1px;
    width: 100%;
    background-color: #c7cdd9;

    @media (min-width: 821px) {
        display: none;
    }
`;

const StyledNavigation = styled.div`
    grid-column: 2 / 4;
    max-height: 88px;
    margin-left: 3px;
    margin-bottom: 60px;

    @media (max-width: 820px) {
        position: absolute;
        bottom: 0;
        margin-left: 0;
        margin-bottom: 13px;
    }
`;

const StyledSwiper = styled.div`
    grid-column: 2 / 17;
    position: relative;
    margin-left: 2px;
    margin-bottom: 74px;

    @media (max-width: 820px) {
        margin-left: 0;
        margin-bottom: 120px;
    }
`;

