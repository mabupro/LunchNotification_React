import React from 'react';
import { LunchCard } from './Card/LunchCard';

export const Menu: React.FC = () => {
    return (
        <>
            <LunchCard name="Menu Item 1" price={10} isSoldOut={false} />
            <LunchCard name="Menu Item 2" price={15} isSoldOut={true} />
            <LunchCard name="Menu Item 3" price={12} isSoldOut={false} />
        </>
    );
};