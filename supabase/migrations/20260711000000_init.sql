-- Baseline migration: enable pgcrypto for password hashing in seed.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
