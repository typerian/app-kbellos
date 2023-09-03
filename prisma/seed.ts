import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.servicio.createMany({
    data: [
      {
        name: "Cortes",
        price: 4,
        category: "Cabello",
        picture: "/images/cortes.jpg",
      },
      {
        name: "Secado",
        price: 3,
        category: "Cabello",
        picture: "/images/secado.jpg",
      },
      {
        name: "Coloración de Cabello",
        price: 10,
        category: "Cabello",
        picture: "/images/coloracion.jpg",
      },
      {
        name: "Mechas",
        price: 15,
        category: "Cabello",
        picture: "/images/mechas.jpg",
      },
      {
        name: "Aplicación de Keratinas",
        price: 10,
        category: "Cabello",
        picture: "/images/keratinas.jpg",
      },
      {
        name: "Cejas",
        price: 1,
        category: "Cejas",
        picture: "/images/cejas.jpg",
      },
      {
        name: "Depilación de cejas",
        price: 1,
        category: "Cejas",
        picture: "/images/depilacioncejas.jpg",
      },
      {
        name: "Limpieza facial",
        price: 12,
        category: "Rostro",
        picture: "/images/limpiezafacial.jpg",
      },
      {
        name: "Manicura",
        price: 4,
        category: "Manos y pies",
        picture: "/images/manicura.jpg",
      },
      {
        name: "Pedicura",
        price: 5,
        category: "Manos y pies",
        picture: "/images/pedicura.jpg",
      },
      {
        name: "Uñas acrílicas",
        price: 8,
        category: "Manos y pies",
        picture: "/images/acrilicas.jpg",
      },
      {
        name: "Uñas",
        price: 5,
        category: "Manos y pies",
        picture: "/images/acrilicas.jpg",
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
