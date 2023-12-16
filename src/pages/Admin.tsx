import React from 'react';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

export const Admin = () => {
    const isLogin = true;

    return (
        <div>
            <Header isLogin={isLogin} />
            <Menu isLogin={isLogin} />
        </div>
    );
};
