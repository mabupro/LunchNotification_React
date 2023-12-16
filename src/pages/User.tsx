import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

export const User = () => {
    const isLogin = false; 

    return (
        <div>
            <Header isLogin={isLogin}/>
            <Menu isLogin={isLogin} />
        </div>
    );
};
