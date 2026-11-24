/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable(
    'chemical_safety_reference',
    {
      id: { type: 'bigserial', primaryKey: true },
      chemical_name: { type: 'varchar(100)', notNull: true },
      chemical_class: {
        type: 'varchar(50)',
        notNull: true,
        // Clipped in image: 'oxidative', 'alkaline', 'red...' -> confirm full list
        check: "chemical_class IN ('oxidative', 'alkaline')",
      },
      damage_level: {
        type: 'varchar(10)',
        notNull: true,
        // Clipped in image: 'none', 'mild', 'moderate', ... -> confirm full list
        check: "damage_level IN ('none', 'mild', 'moderate')",
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
      safety_tier: {
        type: 'varchar(20)',
        notNull: true,
        // Clipped in image: 'safe_to_proceed', 'proceed_...' -> confirm full list
        check: "safety_tier IN ('safe_to_proceed')",
      },
    },
    {
      constraints: {
        // Clipped in image: UNIQUE (chemical_name, damage_level, porosity_le...)
        unique: ['chemical_name', 'damage_level', 'porosity_level'],
      },
    }
  );
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const down = (pgm) => {
  pgm.dropTable('chemical_safety_reference');
};