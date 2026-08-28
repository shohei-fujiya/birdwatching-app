USE birdwatching;

UPDATE areas
SET name = '釧路'
WHERE id = 1;

INSERT INTO areas (name)
SELECT '鶴居・阿寒'
    WHERE NOT EXISTS (
    SELECT 1 FROM areas WHERE name = '鶴居・阿寒'
);

INSERT INTO areas (name)
SELECT '根室'
    WHERE NOT EXISTS (
    SELECT 1 FROM areas WHERE name = '根室'
);

INSERT INTO areas (name)
SELECT '厚岸・霧多布'
    WHERE NOT EXISTS (
    SELECT 1 FROM areas WHERE name = '厚岸・霧多布'
);

UPDATE birds
SET
    name_ja = 'タンチョウ',
    name_en = 'Red-crowned Crane',
    image_url = NULL
WHERE id = 1;

INSERT INTO birds (name_ja, name_en, image_url)
SELECT 'シマエナガ', 'Long-tailed Tit', NULL
    WHERE NOT EXISTS (
    SELECT 1 FROM birds WHERE name_ja = 'シマエナガ'
);

INSERT INTO birds (name_ja, name_en, image_url)
SELECT 'オオワシ', 'Steller''s Sea Eagle', NULL
    WHERE NOT EXISTS (
    SELECT 1 FROM birds WHERE name_ja = 'オオワシ'
);

INSERT INTO birds (name_ja, name_en, image_url)
SELECT 'エトピリカ', 'Tufted Puffin', NULL
    WHERE NOT EXISTS (
    SELECT 1 FROM birds WHERE name_ja = 'エトピリカ'
);