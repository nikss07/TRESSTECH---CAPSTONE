/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('hair_analysis', {
    id: { type: 'bigserial', primaryKey: true },
    client_id: {
      type: 'bigint',
      notNull: true,
      references: 'clients(id)',
    },
    stylist_id: {
      type: 'bigint',
      notNull: true,
      references: 'users(id)',
    },
    image_path: { type: 'varchar(255)', notNull: true },
    hair_condition: {
      type: 'varchar(20)',
      notNull: true,
      check: "hair_condition IN ('frizzy', 'dry', 'oily', 'normal')",
    },
    porosity_level: {
      type: 'varchar(10)',
      notNull: true,
      check: "porosity_level IN ('low', 'normal', 'high')",
    },
    treatment_history: {
      type: 'varchar(20)',
      notNull: true,
      // Clipped in image: 'virgin', 'bleached', 'rel...' -> confirm full list
      check: "treatment_history IN ('virgin', 'bleached')",
    },
    damage_level: {
      type: 'varchar(10)',
      notNull: true,
      // Clipped in image: 'none', 'mild', 'moderate', ... -> confirm full list
      check: "damage_level IN ('none', 'mild', 'moderate')",
    },
    analyzed_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropTable('hair_analysis');
};