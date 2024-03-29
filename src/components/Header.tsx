import React from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../.firebase/firebase';
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type NavListProps = {
  isLogin: boolean;
};

function NavList({ isLogin }: NavListProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath == "/add") isLogin = true;

  const handleGoogleLogin = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Firestoreコレクションが「admin」であると仮定します
      const adminCollectionRef = collection(db, 'admin');
      const adminQuerySnapshot = await getDocs(adminCollectionRef);

      // ユーザーのUIDが「admin」ドキュメントのいずれかに存在するか確認します
      const isAdmin = adminQuerySnapshot.docs.some(doc => doc.data().gmail === user.email);

      if (isAdmin) {
        // ユーザーは管理者の場合、Adminページに移動します
        navigate('/admin');
      } else {
        // ユーザーが管理者でない場合、適切に処理します（例：エラーメッセージを表示）
        console.error('ユーザーは管理者ではありません。');
        // ユーザーをログアウトします
        await auth.signOut();
      }
    } catch (error) {
      console.error('Googleログインエラー：', error);
    }
  };

  const handleGoogleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Google logout error:', error);
    }
  };

  const handleHome = () => {
    navigate("/");
  }

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLogin ? (
        <>
          {currentPath === "/add" ?
            <Typography
              as="li"
              key="login"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
              placeholder={undefined}
            >
              <a
                href="/admin"
                className="flex items-center hover:text-orange-500 transition-colors"
                onClick={handleHome}
              >
                Home
              </a>
            </Typography>
            :
            <Typography
              as="li"
              key="add"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
              placeholder={undefined}
            >
              <a href="/add"
                className="flex items-center hover:text-orange-500 transition-colors"
              >
                add
              </a>
            </Typography>}

          <Typography
            as="li"
            key="logout"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            placeholder={undefined}
          >
            <a href="/"
              className="flex items-center hover:text-orange-500 transition-colors"
              onClick={handleGoogleLogout}>
              Logout
            </a>
          </Typography>
        </>
      ) : (
        <>
          {currentPath === "/add" ?
            <Typography
              as="li"
              key="login"
              variant="small"
              color="blue-gray"
              className="p-1 font-medium"
              placeholder={undefined}
            >
              <a
                href="/admin"
                className="flex items-center hover:text-orange-500 transition-colors"
                onClick={handleHome}
              >
                Home
              </a>
            </Typography>
            : null}

          <Typography
            as="li"
            key="login"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            placeholder={undefined}
          >
            <a
              href="/admin"
              className="flex items-center hover:text-orange-500 transition-colors"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </a>
          </Typography>
        </>
      )}
    </ul>
  );
}

type HeaderProps = {
  isLogin: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isLogin }) => {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3" placeholder={undefined}>
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5" placeholder={undefined}        >
          Lunch Notification
        </Typography>
        <div className="hidden lg:block">
          <NavList isLogin={isLogin} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)} placeholder={undefined}        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList isLogin={isLogin} />
      </Collapse>
    </Navbar>
  );
}