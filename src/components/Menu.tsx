import React, { useEffect, useState } from 'react';
import { LunchCard } from './Card/LunchCard';
import { db } from '../../.firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface MenuData {
    name: string;
    filename: string;
    price: number;
    is_soldout: boolean;
}

export const Menu: React.FC = () => {
    const [menuData, setMenuData] = useState<MenuData[]>([]);

    const fetchMenuList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'menu'));
            const menuList: MenuData[] = [];

            querySnapshot.forEach((doc) => {
                menuList.push(doc.data() as MenuData);
            });

            setMenuData(menuList);
        } catch (error) {
            console.error('Error fetching menu list:', error);
        }
    };

    useEffect(() => {
        fetchMenuList();
    }, []);

    return (
        <>
            {menuData.map((menuItem) => (
                <LunchCard
                    key={menuItem.filename}
                    name={menuItem.name}
                    // fileName={menuItem.filename}
                    price={menuItem.price}
                    isSoldOut={menuItem.is_soldout}
                />
            ))}
        </>
    );
};
