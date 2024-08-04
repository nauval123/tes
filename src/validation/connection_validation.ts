import { ZodType, z } from "zod";

export class ConnectionValidation {

    static readonly CreateConnection : ZodType = z.object({
        diagram_id : z.number().min(1),
        source: z.string().min(1),
        target: z.string().min(1),
        label: z.string().min(1),
        source_handle: z.string().min(1),
        target_handle: z.string().min(1),
        uuid: z.string().min(1),   
        type: z.string().min(1)
    });

    static readonly UpdateAttributeConnection : ZodType = z.object({
        // source: z.number().min(1),
        diagram_id: z.number().min(1),
        // target: z.number().min(1),
        label: z.string().min(1),
    });
}