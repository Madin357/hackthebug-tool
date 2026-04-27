-- AZAL — Azərbaycan Hava Yolları
-- Replace in-scope targets with realistic URL-style assets, and migrate any
-- existing report assets to the same vocabulary so the org dashboard's
-- "Top Targeted Assets" widget and the report-submission asset dropdown
-- (which reads program_scopes.target) line up.
--
-- Real testing of these assets remains UNAUTHORIZED on this platform until
-- AZAL publishes its own officially authorized program. The values below
-- are still illustrative — not a real bounty commitment. The
-- "Pending official authorization" description is preserved on every row.
--
-- Idempotent: safe to re-run.
-- Run in the Supabase SQL Editor.

DO $$
DECLARE
  v_azal_id UUID;
BEGIN
  SELECT id INTO v_azal_id FROM programs WHERE slug = 'azal';
  IF v_azal_id IS NULL THEN
    RAISE EXCEPTION 'No program with slug = ''azal'' found.';
  END IF;

  -- 1. Replace in-scope rows with the five canonical AZAL targets.
  --    Out-of-scope rows are left untouched.
  DELETE FROM program_scopes
   WHERE program_id = v_azal_id
     AND in_scope = TRUE;

  INSERT INTO program_scopes (program_id, in_scope, target, asset_type, description)
  VALUES
    (v_azal_id, TRUE, 'www.azal.az',           'web', 'Pending official authorization'),
    (v_azal_id, TRUE, 'booking.azal.az',       'web', 'Pending official authorization'),
    (v_azal_id, TRUE, 'my.azal.az',            'web', 'Pending official authorization'),
    (v_azal_id, TRUE, 'api.azal.az/v1',        'api', 'Pending official authorization'),
    (v_azal_id, TRUE, 'mobile-api.azal.az/v1', 'api', 'Pending official authorization');

  -- 2. Migrate existing AZAL report assets to one of the five canonical
  --    URLs. Already-migrated rows are preserved (the first WHEN keeps
  --    them as-is so the CASE doesn't reshuffle on subsequent runs).
  UPDATE reports SET asset = CASE
    WHEN asset IN (
      'www.azal.az','booking.azal.az','my.azal.az',
      'api.azal.az/v1','mobile-api.azal.az/v1'
    ) THEN asset
    WHEN asset ILIKE '%mobile%' OR asset ILIKE '%app%'     THEN 'mobile-api.azal.az/v1'
    WHEN asset ILIKE '%api%'                               THEN 'api.azal.az/v1'
    WHEN asset ILIKE '%booking%' OR asset ILIKE '%ticket%' THEN 'booking.azal.az'
    WHEN asset ILIKE '%loyalty%' OR asset ILIKE '%miles%'
      OR asset ILIKE '%my.%' OR asset ILIKE '%account%'    THEN 'my.azal.az'
    ELSE 'www.azal.az'
  END
  WHERE program_id = v_azal_id;
END $$;

-- Verification: confirm the new in-scope list and the migrated report assets.
SELECT 'in_scope' AS kind, target, asset_type, description
  FROM program_scopes
 WHERE program_id = (SELECT id FROM programs WHERE slug = 'azal')
   AND in_scope = TRUE
 ORDER BY target;

SELECT 'report' AS kind, id, title, severity, status, asset
  FROM reports
 WHERE program_id = (SELECT id FROM programs WHERE slug = 'azal')
 ORDER BY created_at;
