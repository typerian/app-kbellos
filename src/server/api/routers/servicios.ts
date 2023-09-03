import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "@/server/api/trpc";
import type { Reservaciones } from "@prisma/client";

const filterHours = (hours: Reservaciones[]) => {
  return hours.map((hour) => ({ hora: hour.hora }));
};

export const reservRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.servicio.findMany();
  }),
  createReserv: privateProcedure
    .input(
      z.object({
        hora: z.string().min(14).max(16),
        fecha: z.string().min(6).max(8),
        userId: z.string().regex(/user_[a-zA-Z0-9]{26}/),
        firstName: z.string(),
        price: z.string().min(1).max(3),
        servicios: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            category: z.string(),
            picture: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newReserv = await ctx.prisma.reservaciones.create({
        data: {
          hora: input.hora,
          fecha: input.fecha,
          useId: input.userId,
          firstName: input.firstName,
          price: input.price,
          servicios: {
            connect: input.servicios.map((s) => ({ id: s.id })),
          },
        },
        include: {
          servicios: true,
        },
      });
      return newReserv;
    }),
  getAllHours: privateProcedure
    .input(z.string().min(6).max(8))
    .query(async ({ ctx, input }) => {
      const hours = await ctx.prisma.reservaciones.findMany({
        where: { fecha: input },
      });
      return filterHours(hours);
    }),
  getReservacionesByUser: privateProcedure
    .input(z.string().regex(/user_[a-zA-Z0-9]{26}/))
    .query(async ({ ctx, input }) => {
      const reservaciones = await ctx.prisma.reservaciones.findMany({
        where: { useId: input },
        include: {
          servicios: true,
        },
        take: -5,
      });
      return reservaciones;
    }),
  getAllReservaciones: privateProcedure
    .input(z.string().min(6).max(8))
    .query(async ({ ctx, input }) => {
      const reservaciones = await ctx.prisma.reservaciones.findMany({
        where: { fecha: input },
        include: {
          servicios: true,
        },
      });
      return reservaciones;
    }),
  deleteReserv: privateProcedure
    .input(z.bigint())
    .mutation(async ({ ctx, input }) => {
      const delRes = await ctx.prisma.reservaciones.delete({
        where: {
          id: input,
        },
      });
      return delRes;
    }),
});
