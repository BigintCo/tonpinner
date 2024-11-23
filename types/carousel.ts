import {ReactNode} from "react";

export type ICarousel = {
    id: string;
    title: string;
    media: string;
    description: string;
    item: (one: ICarousel) => ReactNode;
}
