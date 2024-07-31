import { ZodType, z } from "zod";

export class ConnectionValidation {

    static readonly CREATE : ZodType = z.object({
        source: z.string().min(1).max(100),
        target: z.string().min(1),
        label: z.string().min(1),
    });

    static readonly UPDATE : ZodType = z.object({
        source: z.number().min(1),
        target: z.number().min(1),
        label: z.string().min(1),
    });
}