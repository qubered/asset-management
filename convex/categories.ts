import { v } from "convex/values";
import { query } from "./_generated/server";

export const getAll = query({
    args: { ownerID: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query("categories").filter((q) => q.eq(q.field("ownerID"), args.ownerID)).collect();
    },
});

export const getByID = query({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});