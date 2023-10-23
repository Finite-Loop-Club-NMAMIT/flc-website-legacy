import { z } from "zod";
import { addEventInput, editEventInput, getEventsInput,deleteEventImageInput } from "../../../types";

import { createTRPCRouter, publicProcedure ,adminProcedure} from "../trpc";
import { deleteImage } from "../../../utils/cloudinary";

export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure
    .input(getEventsInput)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.findMany({
          where: {
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.event.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),

  addEvent: adminProcedure
    .input(addEventInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.create({
          data: {
            name: input.name,
            date: input.date,
            attended: input.attended,
            type: input.type,
            images: input?.images,
            organizer: input.organizer,
            description: input.description,
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  editEvent: adminProcedure
    .input(editEventInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const existingEvent = await ctx.prisma.event.findUnique({
          where: { id: input.id },
        });
        if (!existingEvent)
          throw new Error("Event not found");
        if (existingEvent.images != input.images) 
          input.images = (existingEvent.images as string[]).concat(input.images);
        
        return await ctx.prisma.event.update({
          where: { id: input.id },
          data: {
            name: input.name,
            date: input.date,
            attended: input.attended,
            type: input.type,
            images: input?.images,
            organizer: input.organizer,
            description: input.description,
            filter:input.filter,
          }
        });
      } catch (error) {
        console.log("error: ",error)
      }
    }),
    
  deleteEventImage: adminProcedure
    .input(deleteEventImageInput)
    .mutation(async({ ctx, input }) => {
      try {
        const existingEvent = await ctx.prisma.event.findUnique({
          where: { id: input.id },
        });
        if (!existingEvent)
          throw new Error("Event not found");
        
        await deleteImage(input.source).catch((err) => { console.log(err) });
        const updatedImages = (existingEvent.images as string[]).filter(image => image !== input.source);
        console.log("deleted: "+input.source)
        return await ctx.prisma.event.update({
          where: { id: input.id },
          data: {
            images : updatedImages,
          }
        })
      }catch (error) {
        console.log("error: ",error)
      }
    }),
  
  deleteEvent: adminProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const event = await ctx.prisma.event.findFirst({ where: { id: input.id } })
        event && await deleteImage(event.image).catch((err) => { console.log(err) })
        
        return await ctx.prisma.event.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
