-- ============================================================
-- repair-sequences.sql — Reparación de secuencias PostgreSQL
-- ============================================================
-- CUÁNDO ejecutar este script:
--   ✔ Después de restaurar un backup/dump (pg_restore, psql < dump.sql)
--   ✔ Después de inserts manuales con id explícito (e.g. INSERT INTO users (id,...) VALUES (5,...))
--   ✔ Si Prisma lanza P2002 "Unique constraint failed on the fields: (id)"
--
-- CUÁNDO NO es necesario:
--   ✗ Después de ejecutar seed.ts — Prisma ORM nunca inserta ids explícitos
--   ✗ Después de ejecutar seed.sql — los INSERT tampoco especifican id
--   ✗ En CI — prisma db push parte de una base limpia con secuencias correctas
--
-- CÓMO ejecutar:
--   npx prisma db execute --file prisma/repair-sequences.sql --schema prisma/schema.prisma
-- ============================================================

-- setval(seq, value, is_called):
--   is_called = true  → value ya fue usado; nextval() devolverá value+1  (tabla con filas)
--   is_called = false → value aún no fue usado; nextval() devolverá value  (tabla vacía)
-- MAX(id) IS NOT NULL → true si hay filas, false si la tabla está vacía.

SELECT setval(pg_get_serial_sequence('users',          'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM users;
SELECT setval(pg_get_serial_sequence('user_skills',    'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM user_skills;
SELECT setval(pg_get_serial_sequence('user_platforms', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM user_platforms;
SELECT setval(pg_get_serial_sequence('user_projects',  'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM user_projects;
SELECT setval(pg_get_serial_sequence('attendances',    'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM attendances;
SELECT setval(pg_get_serial_sequence('roles',          'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM roles;
SELECT setval(pg_get_serial_sequence('skills',         'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM skills;
SELECT setval(pg_get_serial_sequence('platforms',      'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM platforms;
SELECT setval(pg_get_serial_sequence('programs',       'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM programs;
SELECT setval(pg_get_serial_sequence('projects',       'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM projects;
SELECT setval(pg_get_serial_sequence('updates',        'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM updates;
