import {z, ZodType} from "zod";

export class ElementLibValidation {

    static readonly CREATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        type: z.enum(['node','group']),
        icon: z.string().min(1),
        default_width: z.number().min(0),
        default_height: z.number().min(0),
        unique_key : z.number().min(0).max(1000000),
    });

    static readonly UPDATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        type: z.enum(['node','group']),
        icon: z.string().min(1),
        default_width: z.number().min(0),
        default_height: z.number().min(0),
        unique_key : z.number().min(0).max(10000),
    });
}