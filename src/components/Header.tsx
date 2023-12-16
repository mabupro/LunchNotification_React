import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../.firebase/firebase';

function NavList() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleGoogleLogin = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLogin(true);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      await auth.signOut();
      setIsLogin(false);
    } catch (error) {
      console.error('Google logout error:', error);
    }
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {isLogin ? (
        <>
          <Typography
            as="li"
            key="add"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            placeholder={undefined}
          >
            <a href="/Add-Lunch"
              className="flex items-center hover:text-orange-500 transition-colors"
            >
              add
            </a>
          </Typography>
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
          <Typography
            as="li"
            key="login"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            placeholder={undefined}
          >
            <a
              href="/Admin"
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

export const Header = () => {
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
          <NavList />
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
        <NavList />
      </Collapse>
    </Navbar>
  );
}