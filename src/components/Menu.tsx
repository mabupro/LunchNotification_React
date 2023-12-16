import React, { useEffect } from 'react';
import { LunchCard } from './Card/LunchCard';
import { db } from '../main';
import { collection, getDocs } from "firebase/firestore";

export const Menu: React.FC = () => {

    const fetchMenuList = async () => {

        const querySnapshot = await getDocs(collection(db, "menu"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }

    useEffect(() => {
        fetchMenuList();
    }, [])

    return (
        <>
            <LunchCard name="Menu Item 1" fileName='' price={10} isSoldOut={false} />
            <LunchCard name="Menu Item 2" fileName='' price={15} isSoldOut={true} />
            <LunchCard name="Menu Item 3" fileName='' price={12} isSoldOut={false} />
        </>
    );
};