/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('recommendations', {
    id: { type: 'bigserial', primaryKey: true },
    hair_analysis_id: {
      type: 'bigint',
      notNull: true,
      references: 'hair_analysis(id)',
      onDelete: 'CASCADE', // Clipped in image: ON DELETE C... (confirm CASCADE vs RESTRICT)
    },
    safety_reference_id: {
      type: 'bigint',
      notNull: true,
      references: 'chemical_safety_reference(id)',
    },
    recommendation_category: {
      type: 'varchar(20)',
      notNull: true,
      // Clipped in image: 'safe_to_proceed', 'proceed_with_caution', ...
      check:
        "recommendation_category IN ('safe_to_proceed', 'proceed_with_caution')",
    },
    created_at: {
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
  pgm.dropTable('recommendations');
};