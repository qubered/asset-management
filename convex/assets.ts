import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getAll = query({
    args: { ownerID: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("assets").filter((q) => q.eq(q.field("ownerID"), args.ownerID)).collect();
    },
});

export const getByID = query({
    args: { id: v.id("assets") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        assetTag: v.string(),
        name: v.string(),
        serielNumber: v.string(),
        model: v.id("models"),
        category: v.id("categories"),
        currentLocation: v.id("locations"),
        defaultLocation: v.id("locations"),
        ownerID: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("assets", {
            assetTag: args.assetTag,
            name: args.name,
            serielNumber: args.serielNumber,
            model: args.model,
            category: args.category,
            currentLocation: args.currentLocation,
            defaultLocation: args.defaultLocation,
            ownerID: args.ownerID,
        });
    },
});