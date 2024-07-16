import {z, ZodType} from "zod";

export class ElementValidation {

    static readonly CREATE : ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1),
        type: z.enum(['node','group']),
        position_x: z.number().min(1),
        position_y: z.number().min(1),
    });

    static readonly UPDATE : ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1),
        type: z.enum(['node','group']),
        position_x: z.number().min(1),
        position_y: z.number().min(1),
    });
}