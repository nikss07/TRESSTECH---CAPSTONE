/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('treatment_records', {
    id: { type: 'bigserial', primaryKey: true },
    client_id: {
      type: 'bigint',
      notNull: true,
      references: 'clients(id)',
    },
    hair_analysis_id: {
      type: 'bigint',
      references: 'hair_analysis(id)',
    },
    treatment_type: { type: 'varchar(50)', notNull: true },
    treatment_date: { type: 'date', notNull: true },
    notes: { type: 'text' },
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
  pgm.dropTable('treatment_records');
};