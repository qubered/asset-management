"use client"

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import type { FunctionReturnType } from "convex/server";


export type Asset = NonNullable<FunctionReturnType<typeof api.assets.getAll>>[number]
export type Location = NonNullable<FunctionReturnType<typeof api.locations.getAll>>[number]
export type Category = NonNullable<FunctionReturnType<typeof api.categories.getAll>>[number]
export type Model = NonNullable<FunctionReturnType<typeof api.models.getAll>>[number]

export type NewAssetInput = {
    assetTag: string;
    name: string;
    serielNumber: string;
    model: Id<"models">;
    category: Id<"categories">;
    currentLocation: Id<"locations">;
    defaultLocation: Id<"locations">;
    ownerID: string;
}

export function GetID() {
    const { organization } = useOrganization();
    const { user } = useUser();
    if (organization) {
        return organization.id;
    }
    return user?.id;
};

export function GetAssets() {
    const id = GetID();
    const assets = useQuery(api.assets.getAll, { ownerID: id ?? "" });
    return assets;
}

export function GetLocations() {
    const id = GetID();
    const locations = useQuery(api.locations.getAll, { ownerID: id ?? "" });
    return locations;
}

export function GetCategories() {
    const id = GetID();
    const categories = useQuery(api.categories.getAll, { ownerID: id ?? "" });
    return categories;
}

export function GetModels() {
    const id = GetID();
    const models = useQuery(api.models.getAll, { ownerID: id ?? "" });
    return models;
}

export function GetModelByID(id: Id<"models">) {
    const model = useQuery(api.models.getByID, { id });
    return model;
}

export function NewAsset(asset: NewAssetInput) {
    const createAsset = useMutation(api.assets.create);
    return createAsset(asset);
}

export function GetLastAsset() {
    const id = GetID();
    const assets = useQuery(api.assets.getAll, { ownerID: id ?? "" });
    return assets?.[assets.length - 1];
}