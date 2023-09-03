import {
  Calendar,
  utils,
  type Day,
  type DayValue,
} from "react-modern-calendar-datepicker";
import Layout from "./Layouts";
import { useState } from "react";
import { api } from "@/utils/api";
import { SpinnerPage } from "./Spinner";

const TablaAdmin = () => {
  const fechaActual = new Date();
  const defaultValue = {
    year: fechaActual.getFullYear(),
    month: fechaActual.getMonth() + 1,
    day: fechaActual.getDate(),
  };
  const [selectedDay, setSelectedDay] = useState<DayValue>(defaultValue);
  const myCustomLocale = {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Deciembre",
    ],

    weekDays: [
      {
        name: "Domingo", // used for accessibility
        short: "Dom", // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: "Lunes",
        short: "Lun",
      },
      {
        name: "Martes",
        short: "Mar",
      },
      {
        name: "Miercoles",
        short: "Mie",
      },
      {
        name: "Jueves",
        short: "Jue",
      },
      {
        name: "Viernes",
        short: "Vie",
      },
      {
        name: "Sabado",
        short: "Sab",
        isWeekend: true,
      },
    ],
    weekStartingIndex: 0,

    getToday(gregorainTodayObject: Day) {
      return gregorainTodayObject;
    },

    toNativeDate(date: Day) {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date: Day): number {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit: number | string) {
      return digit;
    },
    nextMonth: "Siguiente Mes",
    previousMonth: "Mes Anterior",
    openMonthSelector: "Abrir Selector de Meses",
    openYearSelector: "Abrir Selector de Años",
    closeMonthSelector: "Cerrar Selector de Meses",
    closeYearSelector: "Cerrar Selector de Años",
    defaultPlaceholder: "Seleccionar...",
    from: "De",
    to: "hasta",
    digitSeparator: ",",
    yearLetterSkip: 0,
    isRtl: false,
  };

  if (!selectedDay) return null;
  const { day, month, year } = selectedDay;
  const buscar = day.toString() + month.toString() + year.toString();
  const finalDate =
    day.toString() + "/" + month.toString() + "/" + year.toString();
  const { data, isLoading } =
    api.reservacionRouter.getAllReservaciones.useQuery(buscar, {
      enabled: !!selectedDay,
    });

  console.log(data);
  return (
    <Layout>
      <div>
        <h1 className="my-5 text-2xl font-thin text-black">
          Reservasiones programadas para:{" "}
          <span className="btn btn-primary text-xl normal-case">
            {finalDate}
          </span>
        </h1>
        <div className="flex flex-col justify-around md:flex-row">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            minimumDate={utils("en").getToday()}
            locale={myCustomLocale}
            colorPrimary="#9c88ff" // added this
            calendarClassName="custom-calendar" // and this
            calendarTodayClassName="custom-today-day" // also this
            shouldHighlightWeekends
          />
          <div className="h-72 overflow-y-auto scrollbar-hide md:overflow-x-auto">
            <div className="divider"></div>
            {isLoading && <SpinnerPage />}
            {!isLoading && data?.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-base font-bold uppercase text-black">
                      <th>Cliente</th>
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
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold text-blue-900">
                                {reserv.firstName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <ul>
                            {reserv.servicios.map((serv, index) => (
                              <li key={index}>{serv.name}</li>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No tienes reservaciones para la fecha</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TablaAdmin;
