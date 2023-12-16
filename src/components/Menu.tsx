import React, { useEffect, useState } from 'react';
import { LunchCard } from './Card/LunchCard';
import { db } from '../../.firebase/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface MenuData {
    name: string;
    price: number;
    is_soldout: boolean;
    download_url: string;
    documentId: string;
}

export const Menu: React.FC = () => {
    const [menuData, setMenuData] = useState<MenuData[]>([]);

    const fetchMenuList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'menu'));
            const menuList: MenuData[] = [];

            querySnapshot.forEach((doc) => {
                menuList.push({ ...doc.data(), documentId: doc.id } as MenuData);
            });

            setMenuData(menuList);
        } catch (error) {
            console.error('Error fetching menu list:', error);
        }
    };

    const handleUpdateSoldOut = async (documentId: string, isSoldOut: boolean) => {
        try {
            const menuRef = doc(db, 'menu', documentId);
            await updateDoc(menuRef, { is_soldout: isSoldOut });
            fetchMenuList();
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    useEffect(() => {
        fetchMenuList();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 mx-5 w-full">
                    {menuData.map((menuItem) => (
                        <LunchCard
                            key={menuItem.name}
                            name={menuItem.name}
                            downloadUrl={menuItem.download_url}
                            price={menuItem.price}
                            documentId={menuItem.documentId}
                            isSoldOut={menuItem.is_soldout}
                            onUpdateSoldOut={handleUpdateSoldOut} // Pass the function
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
