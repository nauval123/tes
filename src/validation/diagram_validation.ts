import { ZodType, z } from "zod";

export class DiagramValidation {

    static readonly CreateDiagram : ZodType = z.object({
        name: z.string().min(1),
        type_digram: z.string().min(1),
    });

    static readonly UpdateAttributeConnection : ZodType = z.object({
        id: z.number().min(1),
        name: z.string().min(1),
        type_digram: z.string().min(1),
    });
}