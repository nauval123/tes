import {z, ZodType} from "zod";

export class ElementValidation {

    static readonly CREATE : ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1),
        type: z.enum(['node','group']),
        position_x: z.number().min(1),
        position_y: z.number().min(1),        
        width: z.number().min(1),
        height: z.number().min(1),
        diagram_id: z.number().min(1),
        elementlib_id : z.number().min(1),
        uuid : z.number().min(1),
    });

    static readonly UPDATE : ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1),
        type: z.enum(['node','group']),
        position_x: z.number().min(1),
        position_y: z.number().min(1),
        width: z.number().min(1),
        height: z.number().min(1),
        diagram_id: z.number().min(1),
        elementlib_id : z.number().min(1),
        uuid : z.number().min(1),
    });
}