// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `asset-management_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const assets = createTable(
  "assets",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    orgId: varchar("org_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    serialNumber: varchar("serial_number", { length: 256 }),
    modelId: integer("model_id").references(() => models.id),
    location: varchar("location", { length: 256 }),
    category: varchar("category", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const models = createTable(
  "models",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    orgId: varchar("org_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);

export const locations = createTable(
  "locations",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    orgId: varchar("org_id", { length: 256 }),
    name: varchar("name", { length: 256 }),
    parentId: integer("parent_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  }
);