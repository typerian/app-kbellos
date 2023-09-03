import { useState } from "react";
import Drawer from "react-modern-drawer";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import "react-modern-drawer/dist/index.css";
import CalendarPicker from "./Calendario";
import SelectedServicios from "./SelectedServicios";
import { useServicosStore } from "../ServiciosStore";
import Image from "next/image";

const NavBar = () => {
  const [selectedServicios] = useServicosStore((state) => [
    state.selectedServicios,
  ]);

  const { isSignedIn } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-fuchsia-300 to-cyan-200">
        <div className="flex-1">
          <a
            href="https://kbellosystyles.vercel.app/"
            className="btn btn-ghost text-xl normal-case"
          >
            <Image width={50} height={50} alt="" src="/k_S.svg" />
          </a>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              onClick={toggleDrawer}
              className="shadow-1 btn btn-circle btn-ghost fixed bottom-6 left-8 z-50 bg-transparent text-fuchsia-600 shadow-sm backdrop-blur hover:scale-125 hover:text-fuchsia-200"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <span className="badge indicator-item badge-sm">
                  {selectedServicios.length}
                </span>
              </div>
            </label>
          </div>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="btn btn-primary">Iniciar Sesión</button>
            </SignInButton>
          )}
          {isSignedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
                  <Image
                    width={500}
                    height={500}
                    alt=""
                    src="/images/profile.jpg"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a
                    href="https://kbellosystyles.vercel.app/reservaciones"
                    className="justify-between"
                  >
                    Reservaciones
                  </a>
                </li>
                <li>
                  <SignOutButton>
                    <a>Cerrar Sesión</a>
                  </SignOutButton>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Drawer
        className="flex flex-col overflow-y-auto scrollbar-hide"
        size={300}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
      >
        {!isSignedIn && (
          <section className="relative z-10 h-screen bg-orange-600 py-[120px]">
            <div className="container">
              <div className="-mx-4 flex">
                <div className="w-full px-4">
                  <div className="mx-auto max-w-[400px] text-center">
                    <h2 className="mb-2 text-[50px] font-bold text-white sm:text-[80px] md:text-[100px]">
                      🔐
                    </h2>
                    <h4 className="mx-3 mb-3 text-[22px] font-semibold text-white">
                      Inicia Sesión
                    </h4>
                    <SignInButton mode="modal">
                      <button className="btn btn-primary">Click aqui</button>
                    </SignInButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
              <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
              <div className="flex h-full w-1/3">
                <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
              </div>
              <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            </div>
          </section>
        )}
        {isSignedIn && selectedServicios.length > 0 && (
          <div className="flex flex-col">
            <div className="divider text-purple-500">Servicios Elegidos</div>
            <SelectedServicios />
            <CalendarPicker />
          </div>
        )}
        {isSignedIn && selectedServicios.length === 0 && (
          <section className="relative z-10 h-screen bg-fuchsia-300 py-[120px]">
            <div className="container">
              <div className="-mx-4 flex">
                <div className="w-full px-4">
                  <div className="mx-auto max-w-[400px] text-center">
                    <h2 className="mb-2 text-[50px] font-bold text-white sm:text-[80px] md:text-[100px]">
                      🤷🏼‍♀️
                    </h2>
                    <h4 className="mx-3 mb-3 text-[22px] font-semibold text-white">
                      Aún no has agregado ningún servicio
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
              <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
              <div className="flex h-full w-1/3">
                <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
                <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
              </div>
              <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            </div>
          </section>
        )}
      </Drawer>
    </div>
  );
};

export default NavBar;
