import { z } from "zod";
import { GrundformSchema, WortartSchema, NomenSchema, GenusSchema, RegelmaessigkeitSchema, TrennbarkeitSchema} from "./schemas";

export type Grundform = z.infer<typeof GrundformSchema>;
export type Nomen = z.infer<typeof NomenSchema>;
export type Wortart = z.infer<typeof WortartSchema>;
export const Wortart = WortartSchema.Enum;

export type Genus = z.infer<typeof GenusSchema>;
export const Genus = GenusSchema.Enum;

export type Regelmaessigkeit = z.infer<typeof RegelmaessigkeitSchema>;
export const Regelmaessigkeit = RegelmaessigkeitSchema.Enum;

export type Trennbarkeit = z.infer<typeof TrennbarkeitSchema>;
export const Trennbarkeit = TrennbarkeitSchema.Enum;
