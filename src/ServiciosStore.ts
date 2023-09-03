import { create } from "zustand";

type ServiceType = {
  id: number;
  name: string;
  price: number;
  category: string;
  picture: string;
};

type StateServices = {
  isOpen: boolean;
  setIsOpen: () => void;
  servicios: ServiceType[];
  selectedServicios: ServiceType[];
  setSelectedServicios: (servicio: ServiceType) => void;
  deleteSelectedServicios: (name: string) => void;
};

export const useServicosStore = create<StateServices>((set, get) => ({
  servicios: [
    {
      id: 1,
      name: "Cortes",
      price: 3,
      category: "Cabello",
      picture: "/images/cortes.jpg",
    },
    {
      id: 2,
      name: "Secado",
      price: 3,
      category: "Cabello",
      picture: "/images/secado.jpg",
    },
    {
      id: 3,
      name: "Coloración de Cabello",
      price: 10,
      category: "Cabello",
      picture: "/images/coloracion.jpg",
    },
    {
      id: 4,
      name: "Mechas",
      price: 15,
      category: "Cabello",
      picture: "/images/mechas.jpg",
    },
    {
      id: 5,
      name: "Aplicación de keratinas",
      price: 10,
      category: "Cabello",
      picture: "/images/keratinas.jpg",
    },
    {
      id: 6,
      name: "Cejas",
      price: 1,
      category: "Cejas",
      picture: "/images/cejas.jpg",
    },
    {
      id: 7,
      name: "Depilación de cejas",
      price: 1.5,
      category: "Cejas",
      picture: "/images/depilacioncejas.jpg",
    },
    {
      id: 8,
      name: "Limpieza facial",
      price: 12,
      category: "Rostro",
      picture: "/images/limpiezafacial.jpg",
    },
    {
      id: 9,
      name: "Manicura",
      price: 4,
      category: "Manos y Pies",
      picture: "/images/manicura.jpg",
    },
    {
      id: 10,
      name: "Pedicura",
      price: 5,
      category: "Manos y Pies",
      picture: "/images/pedicura.jpg",
    },
    {
      id: 11,
      name: "Uñas acrílicas",
      price: 8,
      category: "Manos y Pies",
      picture: "/images/acrilicas.jpg",
    },
    {
      id: 12,
      name: "Uñas",
      price: 5,
      category: "Manos y Pies",
      picture: "/images/uñas.jpg",
    },
  ],
  isOpen: false,
  setIsOpen: () => {
    set((state) => ({
      isOpen: !state.isOpen,
    }));
  },
  selectedServicios: [],
  setSelectedServicios: (servicio) => {
    const idBuscado = servicio.id;
    if (!get().selectedServicios.some((item) => item.id === idBuscado)) {
      set((state) => ({
        selectedServicios: [...state.selectedServicios, servicio],
      }));
    }
  },
  deleteSelectedServicios: (name) => {
    if (get().selectedServicios.length === 1) {
      set((state) => ({
        selectedServicios: state.selectedServicios.filter(
          (serv) => serv.name !== name
        ),
      }));
      window.location.reload();
    }
    set((state) => ({
      selectedServicios: state.selectedServicios.filter(
        (serv) => serv.name !== name
      ),
    }));
  },
}));
