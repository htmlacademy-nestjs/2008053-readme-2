import { configModuleConfig } from "@readme/core";
import envSchema from "../env/env.schema";
import envValidation from "../env/env.validation";
import envConfig from "./env.config";

export const blogConfigModuleConfig = {
  ...configModuleConfig,
  load: [envConfig],
  validate: envValidation,
  validationSchema: envSchema
}