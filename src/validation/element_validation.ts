import {z, ZodType} from "zod";

export class ElementValidation {

    static readonly CREATEFROMLIST : ZodType = z.object({
        title: z.string().min(0).max(100),
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
        title: z.string().min(1,"title required").max(100),
        description: z.string().min(1,'description required'),
        type: z.enum(['node','group','circle','pool','lane','gateway']),
        position_x: z.number().min(1,'position x requiered'),
        position_y: z.number().min(1,'position y required'),
        width: z.number().min(1,"width required"),
        height: z.number().min(1,"height required"),
        diagram_id: z.number().min(1,'diagram id required'),
        elementlib_id : z.number().min(1,"elementlib_id required"),
        uuid : z.string().min(1,"uuid required"),
        icon : z.string().min(1,'icon required')
    });

    static readonly UPDATETEST : ZodType = z.object({
        title: z.string().min(1,"title required").max(100),
        description: z.string().min(1,'description required'),
        type: z.enum(['node','group','circle','pool','lane','gateway']),
        position_x: z.number().min(1,'position x requiered'),
        position_y: z.number().min(1,'position y required'),
        width: z.number().min(1,"width required"),
        height: z.number().min(1,"height required"),
        diagram_id: z.number().min(1,'diagram id required'),
        elementlib_id : z.number().min(1,"elementlib_id required"),
        uuid : z.string().min(1,"uuid required"),
        icon : z.string().min(1,'icon required')
    });
}