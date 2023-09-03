import { useServicosStore } from "../ServiciosStore";
import { useState } from "react";
import CardServicios from "./Card";

const Servicios = () => {
  const [servicios] = useServicosStore((state) => [state.servicios]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");

  const filteredServicios = servicios.filter((serv) => {
    if (category && serv.category !== category) {
      return false;
    }
    if (input && !serv.name.toLowerCase().includes(input.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="shadow-1 navbar relative -top-4 w-full bg-base-100 bg-transparent backdrop-blur ">
        <div className="navbar-start">
          <div className="dropdown-top dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a onClick={() => setCategory("")}>Todos</a>
              </li>
              <li>
                <a onClick={() => setCategory("Cabello")}>Cabello</a>
              </li>
              <li>
                <a onClick={() => setCategory("Cejas")}>Cejas</a>
              </li>
              <li>
                <a onClick={() => setCategory("Rostro")}>Rostro</a>
              </li>
              <li>
                <a onClick={() => setCategory("Manos y Pies")}>Manos y Pies</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <a
            className={`btn btn-secondary ${
              category === "" ? "" : "btn-outline"
            } mr-2`}
            onClick={() => setCategory("")}
          >
            Todos
          </a>

          <a
            className={`btn btn-secondary ${
              category === "Cabello" ? "" : "btn-outline"
            } mr-2`}
            onClick={() => setCategory("Cabello")}
          >
            Cabello
          </a>

          <a
            className={`btn btn-secondary ${
              category === "Cejas" ? "" : "btn-outline"
            } mr-2`}
            onClick={() => setCategory("Cejas")}
          >
            Cejas
          </a>

          <a
            className={`btn btn-secondary ${
              category === "Rostro" ? "" : "btn-outline"
            } mr-2`}
            onClick={() => setCategory("Rostro")}
          >
            Rostro
          </a>

          <a
            className={`btn btn-secondary ${
              category === "Manos y Pies" ? "" : "btn-outline"
            } mr-2`}
            onClick={() => setCategory("Manos y Pies")}
          >
            Manos y Pies
          </a>
        </div>
        <div className="navbar-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Buscar Servicio..."
            className="input input-bordered ml-2 w-24 bg-transparent placeholder-gray-800 md:w-auto"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <div className="mx-auto flex flex-wrap justify-around xl:w-[1280px]">
        {servicios.length &&
          filteredServicios.map((subProd) => (
            <div key={subProd.id}>
              <CardServicios {...subProd} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Servicios;
