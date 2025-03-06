"use client"

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";


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
    const assets = useQuery(api.assets.getAll, { ownerID: id });
    return assets;
}

export function GetLocations() {
    const id = GetID();
    const locations = useQuery(api.locations.getAll, { ownerID: id });
    return locations;
}

export function GetCategories() {
    const id = GetID();
    const categories = useQuery(api.categories.getAll, { ownerID: id });
    return categories;
}

export function GetModels() {
    const id = GetID();
    const models = useQuery(api.models.getAll, { ownerID: id });
    return models;
}

export function GetModelByID(id: Id<"models">) {
    const model = useQuery(api.models.getByID, { id });
    return model;
}