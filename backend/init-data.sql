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

-- 投稿データ

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 1, 1, '2026-08-31', '釧路市街から阿寒へ向かう途中に牧草地にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 1
      AND area_id = 1
      AND observed_date = '2026-08-31'
      AND comment = '釧路市街から阿寒へ向かう途中に牧草地にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 1, 2, '2026-08-17', '道路を渡ってた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 1
      AND area_id = 2
      AND observed_date = '2026-08-17'
      AND comment = '道路を渡ってた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 1, 2, '2026-06-11', '鶴居にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 1
      AND area_id = 2
      AND observed_date = '2026-06-11'
      AND comment = '鶴居にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 2, 1, '2026-08-31', '運動公園にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 2
      AND area_id = 1
      AND observed_date = '2026-08-31'
      AND comment = '運動公園にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 2, 1, '2026-08-26', '美原の遊歩道横の林にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 2
      AND area_id = 1
      AND observed_date = '2026-08-26'
      AND comment = '美原の遊歩道横の林にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 2, 2, '2026-08-28', '阿寒にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 2
      AND area_id = 2
      AND observed_date = '2026-08-28'
      AND comment = '阿寒にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 2, 3, '2026-08-07', '風連湖横の林にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 2
      AND area_id = 3
      AND observed_date = '2026-08-07'
      AND comment = '風連湖横の林にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 3, 4, '2026-08-30', '別寒辺牛湿原で道路脇の林に止まっていた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 3
      AND area_id = 4
      AND observed_date = '2026-08-30'
      AND comment = '別寒辺牛湿原で道路脇の林に止まっていた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 3, 3, '2026-07-31', '春国岱の木に止まってた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 3
      AND area_id = 3
      AND observed_date = '2026-07-31'
      AND comment = '春国岱の木に止まってた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 3, 4, '2026-08-16', '別寒辺牛湿原で上空に飛んでいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 3
      AND area_id = 4
      AND observed_date = '2026-08-16'
      AND comment = '別寒辺牛湿原で上空に飛んでいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 4, 3, '2026-08-31', '海にいた'
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 4
      AND area_id = 3
      AND observed_date = '2026-08-31'
      AND comment = '海にいた'
);

INSERT INTO posts (bird_id, area_id, observed_date, comment)
SELECT 4, 3, '2026-08-30', ''
    WHERE NOT EXISTS (
    SELECT 1 FROM posts
    WHERE bird_id = 4
      AND area_id = 3
      AND observed_date = '2026-08-30'
      AND comment = ''
);
