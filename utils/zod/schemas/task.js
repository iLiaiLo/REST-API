import * as z from "zod";

export const taskIdSchema = {
  id: z.uuidv7(),
};

export const querySchema = {
  id: z.uuidv7().optional(),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  limit: z.string().regex(/^[1-9]\d*$/),
};

export const deletedQuerySchema = {
  id: z.uuidv7().optional(),
  deleted_at: z.iso.datetime({ offset: true }).optional(),
  limit: z.string().regex(/^[1-9]\d*$/),
};

export const statusSchema = {
  id: z.uuidv7().optional(),
  status: z.enum(["todo", "in progress", "done"]),
  updated_at: z.iso.datetime({ offset: true }).optional(),
  limit: z.string().regex(/^[1-9]\d*$/),
};

export const taskSchema = {
  text: z.string().trim().nonempty(),
  header: z.string().trim().nonempty(),
};

export const updateTaskSchema = {
  id: z.uuidv7(),
  text: z.string().nonempty().trim(),
  header: z.string().nonempty(),
  status: z.enum(["todo", "in progress", "done"]),
};
