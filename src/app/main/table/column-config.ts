// No "use client" directive here - this is server code
import type { assets } from "@/server/db/schema"

// Create a type for the model mapping
export type ModelMapping = Record<number, string>;

// This function runs on the server to prepare column configurations
export function prepareColumnConfig(modelMapping: ModelMapping = {}) {
  return {
    modelMapping,
    // Add any other column configuration data here
  }
} 