import Layout from "./Layouts";
import { useState } from "react";
import { api } from "@/utils/api";
import { SpinnerPage } from "./Spinner";
import { useUser } from "@clerk/nextjs";

const TablaUsers = () => {
  const { user } = useUser();
  const fechaActual = new Date();
  const defaultValue = {
    year: fechaActual.getFullYear(),
    month: fechaActual.getMonth() + 1,
    day: fechaActual.getDate(),
  };
  const [idToDelete, setIdToDelete] = useState<bigint>();

  if (!user) {
    return null;
  }

  const { day, month, year } = defaultValue;
  const finalDate =
    day.toString() + "-" + month.toString() + "-" + year.toString();
  const { data, isLoading } =
    api.reservacionRouter.getReservacionesByUser.useQuery(user.id, {
      enabled: !!defaultValue,
    });

  const { mutate } = api.reservacionRouter.deleteReserv.useMutation();

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="my-5 text-2xl font-thin text-black">
          Reservasiones programadas para:{" "}
          <span className="btn btn-primary text-xl normal-case">
            {finalDate}
          </span>
        </h1>
        <div className="h-72 overflow-y-auto scrollbar-hide md:overflow-x-auto">
          <div className="divider"></div>
          {isLoading && <SpinnerPage />}
          {!isLoading && data?.length ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-base font-bold uppercase text-black">
                    <th>Servicios</th>
                    <th>Fecha:</th>
                    <th>Hora:</th>
                    <th>Precio Total $:</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((reserv, index) => (
                    <tr key={index}>
                      <td>
                        <ul>
                          {reserv.servicios.map((serv, i) => (
                            <li key={i}>{serv.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <div>{finalDate}</div>
                      </td>
                      <td>
                        <div>{reserv.hora}</div>
                      </td>
                      <td>
                        <div>{reserv.price}</div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setIdToDelete(reserv.id);
                            window.my_modal_1.showModal();
                          }}
                          className="btn btn-error btn-outline"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                  <h3 className="text-lg font-bold">Cuidado!</h3>
                  <p className="py-4">Deseas eliminar esta reservación?</p>
                  <div className="modal-action">
                    <button className="btn">Volver</button>
                    <button
                      onClick={() => {
                        if (idToDelete) {
                          mutate(idToDelete, {
                            onError(error) {
                              console.log(error);
                            },
                            onSuccess() {
                              alert("Reserva eliminada!");
                              window.location.reload();
                            },
                          });
                        }
                      }}
                      className="btn btn-error"
                    >
                      Continuar
                    </button>
                  </div>
                </form>
              </dialog>
            </div>
          ) : (
            <div>No tienes reservaciones para hoy</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TablaUsers;
