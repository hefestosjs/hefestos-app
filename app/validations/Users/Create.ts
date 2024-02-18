import * as z from "zod";

async function CreateValidation(data: any) {
  try {
    const schema = z
      .object({
        name: z.string().min(1).max(255),
        email: z.string().email().min(1).max(255),
        password: z.string().min(8).max(255),
      })
      .required({ name: true, email: true, password: true });

    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
  }
}

export default CreateValidation;
