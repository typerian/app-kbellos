import Image from "next/image";
import { useServicosStore } from "../ServiciosStore";

type ServiceType = {
  id: number;
  name: string;
  price: number;
  category: string;
  picture: string;
};

const CardServicios = ({ id, name, price, category, picture }: ServiceType) => {
  const [setSelectedServicios] = useServicosStore((state) => [
    state.setSelectedServicios,
    state.servicios,
  ]);

  type LocaleUSD = {
    currency: string;
    value: number;
  };

  function currencyFormatter({ currency, value }: LocaleUSD) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  return (
    <>
      <div className="group card z-0 mb-3 w-72 transform cursor-pointer bg-base-100 bg-gradient-to-r from-violet-200 to-pink-200 shadow-xl duration-500 hover:-translate-y-1">
        <figure>
          <Image width={500} height={500} src={picture} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <div className="badge badge-secondary font-semibold">
            {currencyFormatter({
              currency: "USD",
              value: price,
            })}
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary text-right"
              onClick={() => {
                setSelectedServicios({
                  id,
                  name,
                  price,
                  category,
                  picture,
                });
              }}
            >
              + Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardServicios;
