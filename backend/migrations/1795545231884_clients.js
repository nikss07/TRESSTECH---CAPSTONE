/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
export const up = (pgm) => {
  pgm.createTable('clients', {
    id: { type: 'bigserial', primaryKey: true },
    stylist_id: {
      type: 'bigint',
      notNull: true,
      references: 'users(id)',
      // TODO: confirm ON DELETE / ON UPDATE behavior if needed
    },
    full_name: { type: 'varchar(150)', notNull: true },
    contact_number: { type: 'varchar(30)' },
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
  pgm.dropTable('clients');
};