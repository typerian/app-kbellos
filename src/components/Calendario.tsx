import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Calendar,
  utils,
  type Day,
  type DayValue,
} from "react-modern-calendar-datepicker";
import { useState } from "react";
import { api } from "@/utils/api";
import { SpinnerPage } from "./Spinner";
import { useServicosStore } from "@/ServiciosStore";
import { useUser } from "@clerk/nextjs";

type ServiceType = {
  id: number;
  name: string;
  price: number;
  category: string;
  picture: string;
};

const CalendarPicker = () => {
  const { user } = useUser();
  const tupleHorasLab = [
    { hora: "8:00 - 9:00 AM", ocupado: false },
    { hora: "9:00 - 10:00 AM", ocupado: false },
    { hora: "10:00 - 11:00 AM", ocupado: false },
    { hora: "11:00 - 12:00 PM", ocupado: false },
    { hora: "12:00 - 1:00 PM", ocupado: false },
    { hora: "1:00 - 2:00 PM", ocupado: false },
    { hora: "2:00 - 3:00 PM", ocupado: false },
    { hora: "3:00 - 4:00 PM", ocupado: false },
    { hora: "4:00 - 5:00 PM", ocupado: false },
    { hora: "5:00 - 6:00 PM", ocupado: false },
    { hora: "6:00 - 7:00 PM", ocupado: false },
    { hora: "7:00 - 8:00 PM", ocupado: false },
  ];
  const [bloqueHora, setBloqueHora] = useState("");
  const handleButtonClick = (hora: string) => {
    setBloqueHora(hora);
  };

  function calcularPrecioTotal(servicios: ServiceType[], swap = true) {
    let precioTotal = 0;

    for (const servicio of servicios) {
      if (Object.prototype.hasOwnProperty.call(servicio, "price")) {
        precioTotal += servicio.price;
      }
    }

    if (swap) {
      return precioTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    } else {
      return `${precioTotal}`;
    }
  }

  const [selectedServicios] = useServicosStore((state) => [
    state.selectedServicios,
  ]);

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
  const { data: blocksFromDB, isLoading } =
    api.reservacionRouter.getAllHours.useQuery(buscar, {
      enabled: !!selectedDay,
    });
  const listHours = blocksFromDB?.map((bHour) => bHour.hora);
  console.log(blocksFromDB);
  if (!user) {
    return null;
  }

  const data = {
    hora: bloqueHora,
    fecha: buscar,
    userId: user.id,
    firstName: user.firstName!,
    price: calcularPrecioTotal(selectedServicios, false),
    servicios: selectedServicios,
  };

  const { mutate } = api.reservacionRouter.createReserv.useMutation();

  const handleSumit = () => {
    mutate(data, {
      onError(error) {
        console.log(error);
      },
      onSuccess() {
        alert("Reserva realizada con exito!");
        window.location.reload();
      },
    });
  };

  const now = new Date();
  const currentHour = now.getHours();

  const disabledCalc = (hora: string): boolean => {
    const toComparacion = format12to24(hora);

    if (currentHour > toComparacion! || listHours?.includes(hora)) {
      return true;
    }
    return false;
  };

  let hoursFinal: number;

  function format12to24(time12h: string) {
    const [start, end] = time12h.split(" - ");
    if (start && end) {
      const [, modifier] = end.split(" ");

      const [hours] = start.split(":");

      if (modifier === "PM") {
        if (hours !== "11") {
          hoursFinal = parseInt(hours!) + 12;
        } else {
          hoursFinal = parseInt(hours);
        }
      }

      if (modifier === "AM") {
        hoursFinal = parseInt(hours!);
      }

      if (hours === "12") {
        hoursFinal = 12;
      }

      return hoursFinal;
    }
  }

  return (
    <>
      <div className="divider text-purple-500">Elige la Fecha</div>
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        minimumDate={utils("en").getToday()}
        locale={myCustomLocale}
        colorPrimary="#9c88ff" // added this
        calendarClassName="responsive-calendar" // and this
        shouldHighlightWeekends
      />

      <div className="divider text-purple-500">Elige la Disponibilidad</div>
      {isLoading && <SpinnerPage />}
      {bloqueHora && (
        <div className="btn btn-info mx-2">Eligio: {bloqueHora}</div>
      )}
      {!isLoading && day === now.getDate() && (
        <div className="flex flex-wrap justify-around">
          {tupleHorasLab.map((block, index) => (
            <button
              disabled={disabledCalc(block.hora)}
              key={index}
              onClick={() => handleButtonClick(block.hora)}
              className={`${
                disabledCalc(block.hora) ? "" : " btn-success"
              } btn my-2`}
            >
              {block.hora}
            </button>
          ))}
        </div>
      )}
      {!isLoading && day !== now.getDate() && (
        <div className="flex flex-wrap justify-around">
          {tupleHorasLab.map((block, index) => (
            <button
              disabled={listHours?.includes(block.hora)}
              key={index}
              onClick={() => handleButtonClick(block.hora)}
              className={`${
                listHours?.includes(block.hora) ? "" : "btn-success"
              } btn my-2`}
            >
              {block.hora}
            </button>
          ))}
        </div>
      )}
      <div className="divider text-purple-500">Finaliza su Reservación</div>
      {bloqueHora && finalDate && (
        <div className="max-w-full overflow-x-auto">
          <div className="rounded bg-white p-8 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-fuchsia-950">
              Resumen de Reservación
            </h2>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold text-gray-900">Servicios</span>
              <span className="text-gray-600">
                <ul>
                  {selectedServicios.map((serv) => (
                    <li key={serv.id}>{serv.name}</li>
                  ))}
                </ul>
              </span>
            </div>
            <div className="divider"></div>

            <div className="mb-4 flex justify-between">
              <span className="font-semibold text-gray-900">Coste total</span>
              <span className="text-gray-600">
                {calcularPrecioTotal(selectedServicios)}
              </span>
            </div>
            <div className="divider"></div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold text-gray-900">Fecha</span>
              <span className="text-gray-600">{finalDate}</span>
            </div>
            <div className="divider"></div>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold text-gray-900">Hora</span>
              <span className="text-gray-600">{bloqueHora}</span>
            </div>
            <div className="divider"></div>

            <button
              onClick={() => handleSumit()}
              className="rounded bg-purple-500 px-4 py-2 font-semibold text-white hover:bg-purple-600"
            >
              Reservar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default CalendarPicker;
