import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    assets: defineTable({
        assetTag: v.string(),
        category: v.id("categories"),
        currentLocation: v.id("locations"),
        datePurchased: v.optional(v.string()),
        defaultLocation: v.id("locations"),
        hirePriceDay: v.optional(v.string()),
        hirePriceWeek: v.optional(v.string()),
        image: v.optional(v.string()),
        model: v.id("models"),
        name: v.string(),
        notes: v.optional(v.string()),
        patRequired: v.optional(v.string()),
        purchasePrice: v.optional(v.string()),
        serielNumber: v.optional(v.string()),
        status: v.optional(v.string()),
        supplier: v.optional(v.string()),
        warranty: v.optional(v.string()),
        ownerID: v.string(),
    }),
    categories: defineTable({
        name: v.string(),
        notes: v.string(),
        parentCategory: v.string(),
        ownerID: v.string(),
    }),
    locations: defineTable({
        address: v.string(),
        name: v.string(),
        notes: v.string(),
        parentLocation: v.optional(v.id("locations")),
        ownerID: v.string(),
    }),
    models: defineTable({
        category: v.string(),
        hirePriceDay: v.string(),
        hirePriceWeek: v.string(),
        manufacturer: v.string(),
        name: v.string(),
        notes: v.optional(v.string()),
        ownerID: v.string(),
    }),
});