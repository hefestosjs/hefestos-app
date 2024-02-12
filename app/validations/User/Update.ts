import * as z from "zod";

async function UpdateValidation(data: any) {
  try {
    const schema = z
      .object({
        name: z.string().min(1).max(255),
        email: z.string().email().min(1).max(255),
      })
      .partial({ name: true, email: true });

    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
  }
}

export default UpdateValidation;
