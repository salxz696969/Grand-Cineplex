SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
SELECT current_database();

SELECT * FROM movies;
SELECT * FROM screenings;
select *from public.screenings;
select *from public.customers;

SELECT current_database();





-- Insert data to test
INSERT INTO movies (
    title, description, duration, genre, rating, poster_url, trailer_url, release_date, created_at, updated_at
) VALUES
      ('Ballerina', 'An assassin trained in the traditions of the Ruska Roma organization sets out to seek revenge after her father''s death.', 124, 'Action', 8.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001917', 'https://youtu.be/0FSwsrFpkbw', '2025-06-12', NOW(), NOW()),

      ('Guardian, The', NULL, 75, 'Horror', 7.5, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001902', 'https://www.imdb.com/video/vi3401877657', '2025-06-12', NOW(), NOW()),

      ('How to Train Your Dragon', 'As an ancient threat endangers both Vikings and dragons alike on the isle of Berk, the friendship between Hiccup and Toothless becomes the key to forging a new future together.', 125, 'Adventure', 9.0, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001923', 'https://youtu.be/22w7z_lT6YM?si=PWVz5o2zD_wLKu8k', '2025-06-12', NOW(), NOW()),

      ('In Love With My Bestfriend', 'A remake of Thailand''s ''Friendzone'', focusing on the ironic love story between two best friends of the opposite sex who always miss the chance to be together.', 105, 'Romance', 7.8, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001939', 'https://www.youtube.com/watch?v=Z0j8rSivxqc', '2025-06-11', NOW(), NOW()),

      ('It Feeds', 'After a young girl bursts into their home psychiatry practice claiming an entity is feeding on her, Jordan and her clairvoyant mother must stop the force before the girl is taken completely.', 102, 'Horror', 7.6, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001921', 'https://youtu.be/rjbsDhUMb5Q?si=x0o-C4EOpWs3K6TW', '2025-06-09', NOW(), NOW()),

      ('Hi-Five', 'Five ordinary people who gained superpowers through organ transplants from a superpowered being must fight a psychic villain who covets their powers.', 120, 'Action', 8.2, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001938', 'https://youtu.be/k4StWpKytLI?si=rKVirhYTNYY9FPxi', '2025-06-06', NOW(), NOW()),

      ('Setan Botak Di Jembatan Ancol', 'After her adopted sister''s death, Nirmala is haunted by a figure in red. Meanwhile, the Bald Devil returns for revenge and dark secrets unravel in a terrifying battle for survival.', 79, 'Horror', 7.4, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001970', 'https://youtu.be/LTDcuN3tCsM?si=Tg20QE0fxYr5huL-', '2025-06-06', NOW(), NOW()),

      ('Karate Kid: Legends', 'After moving to New York, kung fu prodigy Li Fong must combine his past and new teachings to compete in a karate tournament and help a friend in need.', 94, 'Action', 7.9, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001632', 'https://youtu.be/LhRXf-yEQqA?si=_d5krmcwTvEr411v', '2025-06-05', NOW(), NOW()),

      ('Mae Neath', NULL, 105, 'Horror', 7.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001901', 'https://youtu.be/TPdijQ4XdsE', '2025-06-05', NOW(), NOW()),

      ('Lilo & Stitch', 'Live-action remake of Disney''s animated classic ''Lilo and Stitch''.', 108, 'Action', 8.5, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001853', 'https://youtu.be/CY0DvPi82vU', '2025-05-23', NOW(), NOW()),

      ('Mission: Impossible - The Final Reckoning', 'Our lives are the sum of our choices. Tom Cruise returns as Ethan Hunt in the final chapter of the Mission: Impossible saga.', 169, 'Action', 9.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001897', 'https://youtu.be/kxyUBQpJDJc', '2025-05-22', NOW(), NOW()),

      ('Holy Night: Demon Hunters', 'An occult action film in which a team of demon hunters fights against evil spirits to protect humanity from dark forces.', 92, 'Action', 7.7, 'https://tickets.legend.com.kh/CDN/media/entity/get/Movies/HO00001851', 'https://youtu.be/J1zD4DcVTDg?si=-DGbkT-T0wG6SjA_', '2025-05-15', NOW(), NOW()),

      ('Witch Returns, The', NULL, 90, 'Horror', 8.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001903', 'https://youtu.be/axp-isinmcg', '2025-06-18', NOW(), NOW()),

      ('Elio', 'Elio, a space fanatic with an active imagination, finds himself on a cosmic misadventure where he must form new bonds with alien lifeforms, navigate a crisis of intergalactic proportions and somehow discover who he is truly meant to be.', 98, 'Animation', 7.5, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001854', 'https://youtu.be/F56LTUz41tY', '2025-06-19', NOW(), NOW()),

      ('28 Years Later', 'A group of survivors of the rage virus lives on a small island...', 115, 'Horror', 9.0, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001855', 'https://youtu.be/VFwODMg2B_Q', '2025-06-19', NOW(), NOW()),

      ('Pernikahan Arwah', 'A couple, Salim and Tasya, who are preparing for their wedding...', 101, 'Horror', 7.8, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001959', 'https://youtu.be/QR7F9AD1dSQ?si=o0Lev-7sUIY0zqvx', '2025-06-20', NOW(), NOW()),

      ('Dendam Malam Kelam', 'Jefri and Sarah, a couple who are having an affair...', 104, 'Horror', 7.6, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001940', 'https://youtu.be/5I7IG3HWv20', '2025-06-23', NOW(), NOW()),

      ('Lovesick', 'In order to avoid being expelled from school, Ye Zi Jie lied and pretended to be sick...', 111, 'Romance', 8.2, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001971', 'https://youtu.be/N-fYDAlKt7w', '2025-06-25', NOW(), NOW()),

      ('Hand, The', NULL, 93, 'Horror', 7.4, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001957', 'https://youtu.be/BTPl_GwH5Ww', '2025-06-26', NOW(), NOW()),

      ('F1', 'Follows a Formula One driver who comes out of retirement to mentor and team with a younger driver.', 155, 'Drama', 7.9, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001856', 'https://youtu.be/ZkHat0tWqTA', '2025-06-26', NOW(), NOW()),

      ('Pembantaian Dukun Santet', 'A community conflict occurred...', 92, 'Horror', 7.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001976', 'https://youtu.be/W8FUcJbD270?si=XhufqAPpS4zk6BPP', '2025-06-27', NOW(), NOW()),

      ('M3GAN 2.0', 'Two years after M3GAN''s rampage...', 120, 'Horror', 8.5, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001941', 'https://youtu.be/IYLHdEzsk1s?si=0Vvv4VSMoE3AhvLF', '2025-06-27', NOW(), NOW()),

      ('Ritual, The', 'Two priests, one in crisis with his faith...', 107, 'Horror', 9.3, 'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001922', 'https://youtu.be/Vfugwq2uoa0', '2025-06-30', NOW(), NOW());





INSERT INTO public.movies (
    title, description, duration, genre, rating, poster_url, trailer_url, release_date, created_at, updated_at
) VALUES
(
    'Omniscient Reader',
    'Dokja''s favorite novel comes ominously true; using his intricate knowledge of the impending apocalyptic story, the office worker changes destiny.',
    116, 'Fantasy', 8.4,
    'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001993',
    'https://youtu.be/_2sMvutNyNE?si=H6piWTIx5P8-yXWv',
    '2025-08-05', NOW(), NOW()
),
(
    'Superman',
    'The Prophet: Omniscient Reader" follows the story of an ordinary man who becomes immersed in a mysterious web novel. As the plot of the novel begins to unfold in real life, he gains knowledge of the future events, making him a key figure in preventing disasters and saving the world. With the help of powerful allies, including characters portrayed by Lee Minho, Jisoo, Ahn Hyoseop, and Chae Soobin, he navigates the complexities of fate, destiny, and the hidden forces shaping the world.',
    129, 'Action', 9.0,
    'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001837',
    'https://youtu.be/nHacmAAtBCQ',
    '2025-10-10', NOW(), NOW()
),
(
    'Long Walk, The',
    NULL,
    140, 'Horror', 7.7,
    'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001973',
    'https://youtu.be/vAtUHeMQ1F8?si=U78k5jQ4HUujrbsw',
    '2025-09-11', NOW(), NOW()
),
(
    'Now You See Me: Now You Don''t',
    'A diamond heist reunites retired Horsemen illusionists with new performers Greenblatt, Smith and Sessa as they target dangerous criminals.',
    120, 'Action', 8.8,
    'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001953',
    'https://youtu.be/-E3lMRx7HRQ?si=1f-r-8_Z8DOQe_VV',
    '2025-11-13', NOW(), NOW()
);


INSERT INTO public.movies (
    title,
    description,
    duration,
    genre,
    rating,
    poster_url,
    trailer_url,
    release_date,
    created_at,
    updated_at
) VALUES
      (
          'Midnight Sun',
          'Sheltered since childhood, a 17-year-old girl lives with a life-threatening sensitivity to sunlight. Her world opens up after dark when she ventures out to play her guitar for random travelers. One night, the girl encounters a young man whom she''s secretly admired for years. As fate leads to a budding romance, she desperately tries to hide her condition from her unsuspecting new beau.',
          103,
          'Romance',
          7.9,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001934',
          'https://youtu.be/VzgJu-JX1v0',
          '2025-07-09',
          NOW(),
          NOW()
      ),
      (
          'Eva: the Last Climb',
          'Eva is a girl who is trying to recover from deep sadness after losing her mother.',
          99,
          'Horror',
          7.4,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001979',
          'https://youtu.be/oyg7Ney77Y8?si=jxhgEc-HArq_npgK',
          '2025-07-14',
          NOW(),
          NOW()
      ),
      (
          'I Know What You Did Last Summer',
          'A group of friends is terrorized by a stalker who knows about a gruesome incident from their past.',
          100,
          'Horror',
          7.2,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001894',
          'https://youtu.be/VlhcJscnh_Q',
          '2025-07-18',
          NOW(),
          NOW()
      ),
      (
          'Ghost Train',
          'Ghost Train is a horror movie in which Da Gyeong, a YouTuber with the lowest number of views, meets the station master of a mysterious subway station to find the source of a true horror story and encounters several strange stories.',
          95,
          'Horror',
          7.5,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001977',
          'https://youtu.be/9mguUE-Fj2E?si=od6mWQBzfvn0WnGv',
          '2025-07-28',
          NOW(),
          NOW()
      ),
      (
          'Weapons',
          'When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.',
          128,
          'Horror',
          7.8,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001944',
          'https://youtu.be/QKHySfXqN0I?si=Tpvf4I1Nc1C_dQpc',
          '2025-08-07',
          NOW(),
          NOW()
      ),
      (
          'Demon Slayer - Kimetsu no Yaiba: Infinity Castle',
          'The Demon Slayer Corps plunge into Infinity Castle to defeat Muzan. However, the remaining Hashiras and the Demon Slayers who survived Tanjiro''s Final Selection are pitted against the remaining members of the Twelve Kizuki first.',
          140,
          'Animation',
          9.1,
          'https://tickets.legend.com.kh/CDN/media/entity/get/FilmPosterGraphic/HO00001868',
          'https://youtu.be/x7uLutVRBfI?si=aSf_WIOOX8VrPZju',
          '2025-08-15',
          NOW(),
          NOW()
      );

INSERT INTO public.theaters (id, name, created_at, updated_at) VALUES
                                                                   (1, 'CADT First Hall', NOW(), NOW()),
                                                                   (2, 'CADT Second Hall', NOW(), NOW()),
                                                                   (3, 'CADT Third Hall', NOW(), NOW()),
                                                                   (4, 'CADT Fourth Hall', NOW(), NOW()),
                                                                   (5, 'CADT Fifth Hall', NOW(), NOW()),
                                                                   (6, 'CADT Sixth Hall', NOW(), NOW()),
                                                                   (7, 'CADT Seventh Hall', NOW(), NOW()),
                                                                   (8, 'CADT Eighth Hall', NOW(), NOW()),
                                                                   (9, 'CADT Ninth Hall', NOW(), NOW()),
                                                                   (10, 'CADT Tenth Hall', NOW(), NOW());


select * from movies;
select * from customers;
select * from screenings;


INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- 2025-06-18
(15, 3, '2025-06-18', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-18', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-18', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-19
(15, 5, '2025-06-19', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-19', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-19', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-20
(15, 6, '2025-06-20', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-20', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-20', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-21
(15, 3, '2025-06-21', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-21', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-21', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-22
(15, 5, '2025-06-22', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-22', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-22', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-23
(15, 6, '2025-06-23', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-23', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-23', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-24
(15, 3, '2025-06-24', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-24', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-24', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-25
(15, 5, '2025-06-25', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-25', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-25', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-26
(15, 6, '2025-06-26', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-26', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-26', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-27
(15, 3, '2025-06-27', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-27', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-27', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-28
(15, 5, '2025-06-28', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-28', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-28', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-29
(15, 6, '2025-06-29', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-06-29', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-29', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-30
(15, 3, '2025-06-30', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-06-30', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-06-30', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-01
(15, 5, '2025-07-01', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-07-01', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-07-01', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-02
(15, 6, '2025-07-02', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-07-02', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-07-02', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-03
(15, 3, '2025-07-03', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-07-03', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-07-03', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-04
(15, 5, '2025-07-04', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-07-04', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-07-04', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-05
(15, 6, '2025-07-05', '10:30:00', 5, NOW(), NOW()),
(15, 3, '2025-07-05', '13:30:00', 5, NOW(), NOW()),
(15, 5, '2025-07-05', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-06
(15, 3, '2025-07-06', '10:30:00', 5, NOW(), NOW()),
(15, 5, '2025-07-06', '13:30:00', 5, NOW(), NOW()),
(15, 6, '2025-07-06', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-07
(15, 5, '2025-07-07', '10:30:00', 5, NOW(), NOW()),
(15, 6, '2025-07-07', '13:30:00', 5, NOW(), NOW()),
(15, 3, '2025-07-07', '16:30:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- 2025-06-19
(16,  7, '2025-06-19', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-19', '14:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-19', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-20
(16,  8, '2025-06-20', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-20', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-20', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-21
(16,  7, '2025-06-21', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-21', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-21', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-22
(16,  7, '2025-06-22', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-22', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-22', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-23
(16,  7, '2025-06-23', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-23', '14:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-23', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-24
(16,  8, '2025-06-24', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-24', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-24', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-25
(16,  7, '2025-06-25', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-25', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-25', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-26
(16,  7, '2025-06-26', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-26', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-26', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-27
(16,  7, '2025-06-27', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-27', '14:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-27', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-28
(16,  8, '2025-06-28', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-28', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-28', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-29
(16,  7, '2025-06-29', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-06-29', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-29', '17:00:00', 5, NOW(), NOW()),

-- 2025-06-30
(16,  7, '2025-06-30', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-06-30', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-06-30', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-01
(16,  7, '2025-07-01', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-07-01', '14:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-01', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-02
(16,  8, '2025-07-02', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-02', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-02', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-03
(16,  7, '2025-07-03', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-03', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-03', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-04
(16,  7, '2025-07-04', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-07-04', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-04', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-05
(16,  7, '2025-07-05', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-07-05', '14:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-05', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-06
(16,  8, '2025-07-06', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-06', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-06', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-07
(16,  7, '2025-07-07', '11:00:00', 5, NOW(), NOW()),
(16,  9, '2025-07-07', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-07', '17:00:00', 5, NOW(), NOW()),

-- 2025-07-08
(16,  7, '2025-07-08', '11:00:00', 5, NOW(), NOW()),
(16,  8, '2025-07-08', '14:00:00', 5, NOW(), NOW()),
(16, 10, '2025-07-08', '17:00:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (17,  1, '2025-06-19', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  3, '2025-06-19', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-06-19', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  2, '2025-06-20', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  4, '2025-06-20', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  7, '2025-06-20', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  6, '2025-06-21', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-06-21', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17, 10, '2025-06-21', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  1, '2025-06-22', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-06-22', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  4, '2025-06-22', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-06-23', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-06-23', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  7, '2025-06-23', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  6, '2025-06-24', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-06-24', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  9, '2025-06-24', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17, 10, '2025-06-25', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  1, '2025-06-25', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-06-25', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-06-26', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-06-26', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  6, '2025-06-26', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  7, '2025-06-27', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-06-27', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  9, '2025-06-27', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17, 10, '2025-06-28', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  1, '2025-06-28', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-06-28', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-06-29', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-06-29', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  6, '2025-06-29', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  7, '2025-06-30', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-06-30', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  9, '2025-06-30', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17, 10, '2025-07-01', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  1, '2025-07-01', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-07-01', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-07-02', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-07-02', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  6, '2025-07-02', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  7, '2025-07-03', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-07-03', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  9, '2025-07-03', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17, 10, '2025-07-04', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  1, '2025-07-04', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-07-04', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-07-05', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-07-05', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  6, '2025-07-05', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  7, '2025-07-06', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  8, '2025-07-06', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  9, '2025-07-06', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17, 10, '2025-07-07', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  1, '2025-07-07', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  2, '2025-07-07', '16:00:00', 5, NOW(), NOW()),

                                                                                                                 (17,  3, '2025-07-08', '10:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  5, '2025-07-08', '13:00:00', 5, NOW(), NOW()),
                                                                                                                 (17,  6, '2025-07-08', '16:00:00', 5, NOW(), NOW());


INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- 2025-06-20
(18, 2, '2025-06-20', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-20', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-20', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-21
(18, 4, '2025-06-21', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-21', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-21', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-22
(18, 7, '2025-06-22', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-22', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-22', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-23
(18, 2, '2025-06-23', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-23', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-23', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-24
(18, 4, '2025-06-24', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-24', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-24', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-25
(18, 7, '2025-06-25', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-25', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-25', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-26
(18, 2, '2025-06-26', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-26', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-26', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-27
(18, 4, '2025-06-27', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-27', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-27', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-28
(18, 7, '2025-06-28', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-28', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-28', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-29
(18, 2, '2025-06-29', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-06-29', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-29', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-30
(18, 4, '2025-06-30', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-06-30', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-06-30', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-01
(18, 7, '2025-07-01', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-01', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-01', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-02
(18, 2, '2025-07-02', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-02', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-02', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-03
(18, 4, '2025-07-03', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-03', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-03', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-04
(18, 7, '2025-07-04', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-04', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-04', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-05
(18, 2, '2025-07-05', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-05', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-05', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-06
(18, 4, '2025-07-06', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-06', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-06', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-07
(18, 7, '2025-07-07', '10:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-07', '13:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-07', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-08
(18, 2, '2025-07-08', '10:00:00', 5, NOW(), NOW()),
(18, 4, '2025-07-08', '13:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-08', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-09
(18, 4, '2025-07-09', '10:00:00', 5, NOW(), NOW()),
(18, 7, '2025-07-09', '13:00:00', 5, NOW(), NOW()),
(18, 2, '2025-07-09', '16:00:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- 2025-06-23 (movie 17 uses 3,5,7 theaters)
(19,  1, '2025-06-23', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-23', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-06-23', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-24 (movie 17 uses 6,8,9 theaters)
(19,  1, '2025-06-24', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-24', '13:30:00', 5, NOW(), NOW()),
(19,  3, '2025-06-24', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-25 (movie 17 uses 10,1,2 theaters)
(19,  3, '2025-06-25', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-06-25', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-06-25', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-26 (movie 17 uses 3,5,6 theaters)
(19,  1, '2025-06-26', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-26', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-06-26', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-27 (movie 17 uses 7,8,9 theaters)
(19,  1, '2025-06-27', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-27', '13:30:00', 5, NOW(), NOW()),
(19,  3, '2025-06-27', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-28 (movie 17 uses 10,1,2 theaters)
(19,  3, '2025-06-28', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-06-28', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-06-28', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-29 (movie 17 uses 3,5,6 theaters)
(19,  1, '2025-06-29', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-29', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-06-29', '16:30:00', 5, NOW(), NOW()),

-- 2025-06-30 (movie 17 uses 7,8,9 theaters)
(19,  1, '2025-06-30', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-06-30', '13:30:00', 5, NOW(), NOW()),
(19,  3, '2025-06-30', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-01 (movie 17 uses 10,1,2 theaters)
(19,  3, '2025-07-01', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-01', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-07-01', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-02 (movie 17 uses 3,5,6 theaters)
(19,  1, '2025-07-02', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-07-02', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-02', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-03 (movie 17 uses 7,8,9 theaters)
(19,  1, '2025-07-03', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-07-03', '13:30:00', 5, NOW(), NOW()),
(19,  3, '2025-07-03', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-04 (movie 17 uses 10,1,2 theaters)
(19,  3, '2025-07-04', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-04', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-07-04', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-05 (movie 17 uses 3,5,6 theaters)
(19,  1, '2025-07-05', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-07-05', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-05', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-06 (movie 17 uses 7,8,9 theaters)
(19,  1, '2025-07-06', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-07-06', '13:30:00', 5, NOW(), NOW()),
(19,  3, '2025-07-06', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-07 (movie 17 uses 10,1,2 theaters)
(19,  3, '2025-07-07', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-07', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-07-07', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-08 (movie 17 uses 3,5,6 theaters)
(19,  1, '2025-07-08', '10:30:00', 5, NOW(), NOW()),
(19,  2, '2025-07-08', '13:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-08', '16:30:00', 5, NOW(), NOW()),

-- continue for days 2025-07-09 to 2025-07-12 (movie 17 does not conflict on these days)
-- so we can re-use theaters 1,3,5,7,9 etc.

-- 2025-07-09
(19,  1, '2025-07-09', '10:30:00', 5, NOW(), NOW()),
(19,  3, '2025-07-09', '13:30:00', 5, NOW(), NOW()),
(19,  5, '2025-07-09', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-10
(19,  2, '2025-07-10', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-10', '13:30:00', 5, NOW(), NOW()),
(19,  6, '2025-07-10', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-11
(19,  3, '2025-07-11', '10:30:00', 5, NOW(), NOW()),
(19,  5, '2025-07-11', '13:30:00', 5, NOW(), NOW()),
(19,  7, '2025-07-11', '16:30:00', 5, NOW(), NOW()),

-- 2025-07-12
(19,  1, '2025-07-12', '10:30:00', 5, NOW(), NOW()),
(19,  4, '2025-07-12', '13:30:00', 5, NOW(), NOW()),
(19,  6, '2025-07-12', '16:30:00', 5, NOW(), NOW());


INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- 2025-06-26
(21, 1, '2025-06-26', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-06-26', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-06-26', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-27
(21, 3, '2025-06-27', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-06-27', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-06-27', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-28
(21, 1, '2025-06-28', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-06-28', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-06-28', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-29
(21, 1, '2025-06-29', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-06-29', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-06-29', '16:00:00', 5, NOW(), NOW()),

-- 2025-06-30
(21, 1, '2025-06-30', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-06-30', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-06-30', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-01
(21, 3, '2025-07-01', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-01', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-01', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-02
(21, 1, '2025-07-02', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-02', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-02', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-03
(21, 1, '2025-07-03', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-03', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-03', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-04
(21, 3, '2025-07-04', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-04', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-04', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-05
(21, 1, '2025-07-05', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-05', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-05', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-06
(21, 1, '2025-07-06', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-06', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-06', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-07
(21, 1, '2025-07-07', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-07', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-07', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-08
(21, 3, '2025-07-08', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-08', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-08', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-09
(21, 1, '2025-07-09', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-09', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-09', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-10
(21, 1, '2025-07-10', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-10', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-10', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-11
(21, 1, '2025-07-11', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-11', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-11', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-12
(21, 3, '2025-07-12', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-12', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-12', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-13
(21, 1, '2025-07-13', '10:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-13', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-13', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-14
(21, 1, '2025-07-14', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-14', '13:00:00', 5, NOW(), NOW()),
(21, 5, '2025-07-14', '16:00:00', 5, NOW(), NOW()),

-- 2025-07-15
(21, 1, '2025-07-15', '10:00:00', 5, NOW(), NOW()),
(21, 3, '2025-07-15', '13:00:00', 5, NOW(), NOW()),
(21, 6, '2025-07-15', '16:00:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (30, 1, '2025-07-09', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-09', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-09', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-10', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-10', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-10', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-11', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-11', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-11', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-12', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-12', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-12', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-13', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-13', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-13', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-14', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-14', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-14', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-15', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-15', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-15', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-16', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-16', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-16', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-17', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-17', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-17', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-18', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-18', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-18', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-19', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-19', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-19', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-20', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-20', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-20', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-21', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-21', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-21', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-22', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-22', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-22', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-23', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-23', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-23', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-24', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-24', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-24', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-25', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-25', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-25', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-26', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-26', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-26', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-27', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-27', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-27', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-28', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-28', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-07-28', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-07-29', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-07-29', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-07-29', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-07-30', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-07-30', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-07-30', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-07-31', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-07-31', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-07-31', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-08-01', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-08-01', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-08-01', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-08-02', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-08-02', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-08-02', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-08-03', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-08-03', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-08-03', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-08-04', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-08-04', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 1, '2025-08-04', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 2, '2025-08-05', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 3, '2025-08-05', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 4, '2025-08-05', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 5, '2025-08-06', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 6, '2025-08-06', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 7, '2025-08-06', '16:00', 5, NOW(), NOW()),
                                                                                                                 (30, 8, '2025-08-07', '10:00', 5, NOW(), NOW()),
                                                                                                                 (30, 9, '2025-08-07', '13:00', 5, NOW(), NOW()),
                                                                                                                 (30, 10, '2025-08-07', '16:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (31, 2, '2025-07-14', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-14', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 7, '2025-07-14', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 3, '2025-07-15', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-15', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 9, '2025-07-15', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 1, '2025-07-16', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 8, '2025-07-16', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 10, '2025-07-16', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 4, '2025-07-17', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 7, '2025-07-17', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-17', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 2, '2025-07-18', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-18', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 8, '2025-07-18', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 9, '2025-07-19', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 3, '2025-07-19', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 10, '2025-07-19', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 1, '2025-07-20', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 4, '2025-07-20', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-20', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 2, '2025-07-21', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-21', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 7, '2025-07-21', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 8, '2025-07-22', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 3, '2025-07-22', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 10, '2025-07-22', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 1, '2025-07-23', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-23', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 9, '2025-07-23', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 4, '2025-07-24', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 7, '2025-07-24', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 2, '2025-07-24', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-25', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 10, '2025-07-25', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 8, '2025-07-25', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 3, '2025-07-26', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-26', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 1, '2025-07-26', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 9, '2025-07-27', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 4, '2025-07-27', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 2, '2025-07-27', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-28', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 3, '2025-07-28', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 7, '2025-07-28', '16:30', 5.00, NOW(), NOW()),
                                                                                                                 (31, 10, '2025-07-29', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 5, '2025-07-29', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 8, '2025-07-29', '14:15', 5.00, NOW(), NOW()),
                                                                                                                 (31, 1, '2025-07-30', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 4, '2025-07-30', '12:00', 5.00, NOW(), NOW()),
                                                                                                                 (31, 6, '2025-07-30', '14:15', 5.00, NOW(), NOW());




INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-07-28
(33, 1, '2025-07-28', '10:00', 5.00, NOW(), NOW()),
(33, 3, '2025-07-28', '13:00', 5.00, NOW(), NOW()),
(33, 7, '2025-07-28', '16:00', 5.00, NOW(), NOW()),

-- Day 2: 2025-07-29
(33, 2, '2025-07-29', '10:00', 5.00, NOW(), NOW()),
(33, 5, '2025-07-29', '13:00', 5.00, NOW(), NOW()),
(33, 8, '2025-07-29', '15:45', 5.00, NOW(), NOW()),

-- Day 3: 2025-07-30
(33, 4, '2025-07-30', '11:00', 5.00, NOW(), NOW()),
(33, 6, '2025-07-30', '13:15', 5.00, NOW(), NOW()),
(33, 9, '2025-07-30', '16:00', 5.00, NOW(), NOW()),

-- Day 4: 2025-07-31
(33, 10, '2025-07-31', '10:00', 5.00, NOW(), NOW()),
(33, 3, '2025-07-31', '12:30', 5.00, NOW(), NOW()),
(33, 7, '2025-07-31', '15:30', 5.00, NOW(), NOW()),

-- Day 5: 2025-08-01
(33, 1, '2025-08-01', '11:00', 5.00, NOW(), NOW()),
(33, 6, '2025-08-01', '13:15', 5.00, NOW(), NOW()),
(33, 8, '2025-08-01', '16:15', 5.00, NOW(), NOW()),

-- Day 6: 2025-08-02
(33, 2, '2025-08-02', '10:00', 5.00, NOW(), NOW()),
(33, 5, '2025-08-02', '13:00', 5.00, NOW(), NOW()),
(33, 10, '2025-08-02', '15:30', 5.00, NOW(), NOW()),

-- Day 7: 2025-08-03
(33, 4, '2025-08-03', '11:00', 5.00, NOW(), NOW()),
(33, 9, '2025-08-03', '13:00', 5.00, NOW(), NOW()),
(33, 7, '2025-08-03', '15:15', 5.00, NOW(), NOW()),

-- Day 8: 2025-08-04
(33, 1, '2025-08-04', '10:00', 5.00, NOW(), NOW()),
(33, 6, '2025-08-04', '12:15', 5.00, NOW(), NOW()),
(33, 3, '2025-08-04', '15:30', 5.00, NOW(), NOW()),

-- Day 9: 2025-08-05
(33, 2, '2025-08-05', '11:00', 5.00, NOW(), NOW()),
(33, 5, '2025-08-05', '13:00', 5.00, NOW(), NOW()),
(33, 8, '2025-08-05', '16:00', 5.00, NOW(), NOW()),

-- Day 10: 2025-08-06
(33, 4, '2025-08-06', '10:00', 5.00, NOW(), NOW()),
(33, 9, '2025-08-06', '12:30', 5.00, NOW(), NOW()),
(33, 10, '2025-08-06', '15:30', 5.00, NOW(), NOW()),

-- Day 11: 2025-08-07
(33, 3, '2025-08-07', '10:00', 5.00, NOW(), NOW()),
(33, 7, '2025-08-07', '12:30', 5.00, NOW(), NOW()),
(33, 6, '2025-08-07', '15:15', 5.00, NOW(), NOW()),

-- Day 12: 2025-08-08
(33, 1, '2025-08-08', '11:00', 5.00, NOW(), NOW()),
(33, 5, '2025-08-08', '13:30', 5.00, NOW(), NOW()),
(33, 10, '2025-08-08', '16:30', 5.00, NOW(), NOW()),

-- Day 13: 2025-08-09
(33, 2, '2025-08-09', '10:30', 5.00, NOW(), NOW()),
(33, 8, '2025-08-09', '13:00', 5.00, NOW(), NOW()),
(33, 4, '2025-08-09', '15:45', 5.00, NOW(), NOW()),

-- Day 14: 2025-08-10
(33, 6, '2025-08-10', '10:00', 5.00, NOW(), NOW()),
(33, 9, '2025-08-10', '12:00', 5.00, NOW(), NOW()),
(33, 7, '2025-08-10', '14:45', 5.00, NOW(), NOW()),

-- Day 15: 2025-08-11
(33, 3, '2025-08-11', '10:30', 5.00, NOW(), NOW()),
(33, 1, '2025-08-11', '13:00', 5.00, NOW(), NOW()),
(33, 8, '2025-08-11', '15:45', 5.00, NOW(), NOW()),

-- Day 16: 2025-08-12
(33, 2, '2025-08-12', '11:00', 5.00, NOW(), NOW()),
(33, 5, '2025-08-12', '13:30', 5.00, NOW(), NOW()),
(33, 6, '2025-08-12', '16:00', 5.00, NOW(), NOW()),

-- Day 17: 2025-08-13
(33, 4, '2025-08-13', '10:15', 5.00, NOW(), NOW()),
(33, 9, '2025-08-13', '12:45', 5.00, NOW(), NOW()),
(33, 7, '2025-08-13', '15:30', 5.00, NOW(), NOW()),

-- Day 18: 2025-08-14
(33, 10, '2025-08-14', '11:00', 5.00, NOW(), NOW()),
(33, 3, '2025-08-14', '13:15', 5.00, NOW(), NOW()),
(33, 1, '2025-08-14', '15:45', 5.00, NOW(), NOW()),

-- Day 19: 2025-08-15
(33, 5, '2025-08-15', '10:00', 5.00, NOW(), NOW()),
(33, 2, '2025-08-15', '12:15', 5.00, NOW(), NOW()),
(33, 6, '2025-08-15', '15:15', 5.00, NOW(), NOW()),

-- Day 20: 2025-08-16
(33, 8, '2025-08-16', '10:30', 5.00, NOW(), NOW()),
(33, 4, '2025-08-16', '13:00', 5.00, NOW(), NOW()),
(33, 7, '2025-08-16', '15:30', 5.00, NOW(), NOW());


-- SCREENINGS for Movie ID 35: "Demon Slayer - Infinity Castle"
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (35, 1, '2025-08-15', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 4, '2025-08-15', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 7, '2025-08-15', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 2, '2025-08-16', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 5, '2025-08-16', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 8, '2025-08-16', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 3, '2025-08-17', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 6, '2025-08-17', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 9, '2025-08-17', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 4, '2025-08-18', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 7, '2025-08-18', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 10, '2025-08-18', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 5, '2025-08-19', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 1, '2025-08-19', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 6, '2025-08-19', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 2, '2025-08-20', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 7, '2025-08-20', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 9, '2025-08-20', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 3, '2025-08-21', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 8, '2025-08-21', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 10, '2025-08-21', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 4, '2025-08-22', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 5, '2025-08-22', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 6, '2025-08-22', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 7, '2025-08-23', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 1, '2025-08-23', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 2, '2025-08-23', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 3, '2025-08-24', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 4, '2025-08-24', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 5, '2025-08-24', '16:00', 5.00, NOW(), NOW());



-- SCREENINGS for Movie ID 35 (cont’d)
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (35, 6, '2025-08-25', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 7, '2025-08-25', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 8, '2025-08-25', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 9, '2025-08-26', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 10, '2025-08-26', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 1, '2025-08-26', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 2, '2025-08-27', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 3, '2025-08-27', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 4, '2025-08-27', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 5, '2025-08-28', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 6, '2025-08-28', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 7, '2025-08-28', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 8, '2025-08-29', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 9, '2025-08-29', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 10, '2025-08-29', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 1, '2025-08-30', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 2, '2025-08-30', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 3, '2025-08-30', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 4, '2025-08-31', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 5, '2025-08-31', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 6, '2025-08-31', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 7, '2025-09-01', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 8, '2025-09-01', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 9, '2025-09-01', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 10, '2025-09-02', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 1, '2025-09-02', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 2, '2025-09-02', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (35, 3, '2025-09-03', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 4, '2025-09-03', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (35, 5, '2025-09-03', '16:00', 5.00, NOW(), NOW());


-- SCREENINGS for Movie ID 32: "I Know What You Did Last Summer"
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
                                                                                                                 (32, 10, '2025-07-18', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 9, '2025-07-18', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 8, '2025-07-18', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 7, '2025-07-19', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 6, '2025-07-19', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 5, '2025-07-19', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 4, '2025-07-20', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 3, '2025-07-20', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 2, '2025-07-20', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 1, '2025-07-21', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 10, '2025-07-21', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 9, '2025-07-21', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 8, '2025-07-22', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 7, '2025-07-22', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 6, '2025-07-22', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 5, '2025-07-23', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 4, '2025-07-23', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 3, '2025-07-23', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 2, '2025-07-24', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 1, '2025-07-24', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 10, '2025-07-24', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 9, '2025-07-25', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 8, '2025-07-25', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 7, '2025-07-25', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 6, '2025-07-26', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 5, '2025-07-26', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 4, '2025-07-26', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 3, '2025-07-27', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 2, '2025-07-27', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 1, '2025-07-27', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 10, '2025-07-28', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 9, '2025-07-28', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 8, '2025-07-28', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 7, '2025-07-29', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 6, '2025-07-29', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 5, '2025-07-29', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 4, '2025-07-30', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 3, '2025-07-30', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 2, '2025-07-30', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 1, '2025-07-31', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 10, '2025-07-31', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 9, '2025-07-31', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 8, '2025-08-01', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 7, '2025-08-01', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 6, '2025-08-01', '16:00', 5.00, NOW(), NOW()),

                                                                                                                 (32, 5, '2025-08-02', '10:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 4, '2025-08-02', '13:00', 5.00, NOW(), NOW()),
                                                                                                                 (32, 3, '2025-08-02', '16:00', 5.00, NOW(), NOW());


INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-08-07
(34, 4, '2025-08-07', '12:00:00', 5, NOW(), NOW()),
(34, 1, '2025-08-07', '15:30:00', 5, NOW(), NOW()),
(34, 8, '2025-08-07', '19:00:00', 5, NOW(), NOW()),

-- Day 2: 2025-08-08
(34, 6, '2025-08-08', '12:00:00', 5, NOW(), NOW()),
(34, 10, '2025-08-08', '15:30:00', 5, NOW(), NOW()),
(34, 3, '2025-08-08', '19:00:00', 5, NOW(), NOW()),

-- Day 3: 2025-08-09
(34, 2, '2025-08-09', '12:00:00', 5, NOW(), NOW()),
(34, 7, '2025-08-09', '15:30:00', 5, NOW(), NOW()),
(34, 5, '2025-08-09', '19:00:00', 5, NOW(), NOW()),

-- Day 4: 2025-08-10
(34, 9, '2025-08-10', '12:00:00', 5, NOW(), NOW()),
(34, 1, '2025-08-10', '15:30:00', 5, NOW(), NOW()),
(34, 4, '2025-08-10', '19:00:00', 5, NOW(), NOW()),

-- Day 5: 2025-08-11
(34, 8, '2025-08-11', '12:00:00', 5, NOW(), NOW()),
(34, 3, '2025-08-11', '15:30:00', 5, NOW(), NOW()),
(34, 6, '2025-08-11', '19:00:00', 5, NOW(), NOW()),

-- Day 6: 2025-08-12
(34, 7, '2025-08-12', '12:00:00', 5, NOW(), NOW()),
(34, 2, '2025-08-12', '15:30:00', 5, NOW(), NOW()),
(34, 10, '2025-08-12', '19:00:00', 5, NOW(), NOW()),

-- Day 7: 2025-08-13
(34, 5, '2025-08-13', '12:00:00', 5, NOW(), NOW()),
(34, 9, '2025-08-13', '15:30:00', 5, NOW(), NOW()),
(34, 1, '2025-08-13', '19:00:00', 5, NOW(), NOW()),

-- Day 8: 2025-08-14
(34, 4, '2025-08-14', '12:00:00', 5, NOW(), NOW()),
(34, 8, '2025-08-14', '15:30:00', 5, NOW(), NOW()),
(34, 3, '2025-08-14', '19:00:00', 5, NOW(), NOW()),

-- Day 9: 2025-08-15
(34, 6, '2025-08-15', '12:00:00', 5, NOW(), NOW()),
(34, 7, '2025-08-15', '15:30:00', 5, NOW(), NOW()),
(34, 2, '2025-08-15', '19:00:00', 5, NOW(), NOW()),

-- Day 10: 2025-08-16
(34, 10, '2025-08-16', '12:00:00', 5, NOW(), NOW()),
(34, 5, '2025-08-16', '15:30:00', 5, NOW(), NOW()),
(34, 9, '2025-08-16', '19:00:00', 5, NOW(), NOW()),

-- Day 11: 2025-08-17
(34, 1, '2025-08-17', '12:00:00', 5, NOW(), NOW()),
(34, 4, '2025-08-17', '15:30:00', 5, NOW(), NOW()),
(34, 8, '2025-08-17', '19:00:00', 5, NOW(), NOW()),

-- Day 12: 2025-08-18
(34, 3, '2025-08-18', '12:00:00', 5, NOW(), NOW()),
(34, 6, '2025-08-18', '15:30:00', 5, NOW(), NOW()),
(34, 7, '2025-08-18', '19:00:00', 5, NOW(), NOW()),

-- Day 13: 2025-08-19
(34, 2, '2025-08-19', '12:00:00', 5, NOW(), NOW()),
(34, 10, '2025-08-19', '15:30:00', 5, NOW(), NOW()),
(34, 5, '2025-08-19', '19:00:00', 5, NOW(), NOW()),

-- Day 14: 2025-08-20
(34, 9, '2025-08-20', '12:00:00', 5, NOW(), NOW()),
(34, 1, '2025-08-20', '15:30:00', 5, NOW(), NOW()),
(34, 4, '2025-08-20', '19:00:00', 5, NOW(), NOW()),

-- Day 15: 2025-08-21
(34, 8, '2025-08-21', '12:00:00', 5, NOW(), NOW()),
(34, 3, '2025-08-21', '15:30:00', 5, NOW(), NOW()),
(34, 6, '2025-08-21', '19:00:00', 5, NOW(), NOW()),

-- Day 16: 2025-08-22
(34, 7, '2025-08-22', '12:00:00', 5, NOW(), NOW()),
(34, 2, '2025-08-22', '15:30:00', 5, NOW(), NOW()),
(34, 10, '2025-08-22', '19:00:00', 5, NOW(), NOW()),

-- Day 17: 2025-08-23
(34, 5, '2025-08-23', '12:00:00', 5, NOW(), NOW()),
(34, 9, '2025-08-23', '15:30:00', 5, NOW(), NOW()),
(34, 1, '2025-08-23', '19:00:00', 5, NOW(), NOW()),

-- Day 18: 2025-08-24
(34, 4, '2025-08-24', '12:00:00', 5, NOW(), NOW()),
(34, 8, '2025-08-24', '15:30:00', 5, NOW(), NOW()),
(34, 3, '2025-08-24', '19:00:00', 5, NOW(), NOW()),

-- Day 19: 2025-08-25
(34, 6, '2025-08-25', '12:00:00', 5, NOW(), NOW()),
(34, 7, '2025-08-25', '15:30:00', 5, NOW(), NOW()),
(34, 2, '2025-08-25', '19:00:00', 5, NOW(), NOW()),

-- Day 20: 2025-08-26
(34, 10, '2025-08-26', '12:00:00', 5, NOW(), NOW()),
(34, 5, '2025-08-26', '15:30:00', 5, NOW(), NOW()),
(34, 9, '2025-08-26', '19:00:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-08-05
(26, 3, '2025-08-05', '12:00:00', 5, NOW(), NOW()),
(26, 7, '2025-08-05', '15:30:00', 5, NOW(), NOW()),
(26, 1, '2025-08-05', '19:00:00', 5, NOW(), NOW()),

-- Day 2: 2025-08-06
(26, 5, '2025-08-06', '12:00:00', 5, NOW(), NOW()),
(26, 10, '2025-08-06', '15:30:00', 5, NOW(), NOW()),
(26, 2, '2025-08-06', '19:00:00', 5, NOW(), NOW()),

-- Day 3: 2025-08-07
(26, 8, '2025-08-07', '12:00:00', 5, NOW(), NOW()),
(26, 4, '2025-08-07', '15:30:00', 5, NOW(), NOW()),
(26, 6, '2025-08-07', '19:00:00', 5, NOW(), NOW()),

-- Day 4: 2025-08-08
(26, 9, '2025-08-08', '12:00:00', 5, NOW(), NOW()),
(26, 1, '2025-08-08', '15:30:00', 5, NOW(), NOW()),
(26, 3, '2025-08-08', '19:00:00', 5, NOW(), NOW()),

-- Day 5: 2025-08-09
(26, 7, '2025-08-09', '12:00:00', 5, NOW(), NOW()),
(26, 5, '2025-08-09', '15:30:00', 5, NOW(), NOW()),
(26, 10, '2025-08-09', '19:00:00', 5, NOW(), NOW()),

-- Day 6: 2025-08-10
(26, 2, '2025-08-10', '12:00:00', 5, NOW(), NOW()),
(26, 8, '2025-08-10', '15:30:00', 5, NOW(), NOW()),
(26, 4, '2025-08-10', '19:00:00', 5, NOW(), NOW()),

-- Day 7: 2025-08-11
(26, 6, '2025-08-11', '12:00:00', 5, NOW(), NOW()),
(26, 9, '2025-08-11', '15:30:00', 5, NOW(), NOW()),
(26, 1, '2025-08-11', '19:00:00', 5, NOW(), NOW()),

-- Day 8: 2025-08-12
(26, 3, '2025-08-12', '12:00:00', 5, NOW(), NOW()),
(26, 7, '2025-08-12', '15:30:00', 5, NOW(), NOW()),
(26, 5, '2025-08-12', '19:00:00', 5, NOW(), NOW()),

-- Day 9: 2025-08-13
(26, 10, '2025-08-13', '12:00:00', 5, NOW(), NOW()),
(26, 2, '2025-08-13', '15:30:00', 5, NOW(), NOW()),
(26, 8, '2025-08-13', '19:00:00', 5, NOW(), NOW()),

-- Day 10: 2025-08-14
(26, 4, '2025-08-14', '12:00:00', 5, NOW(), NOW()),
(26, 6, '2025-08-14', '15:30:00', 5, NOW(), NOW()),
(26, 9, '2025-08-14', '19:00:00', 5, NOW(), NOW()),

-- Day 11: 2025-08-15
(26, 1, '2025-08-15', '12:00:00', 5, NOW(), NOW()),
(26, 3, '2025-08-15', '15:30:00', 5, NOW(), NOW()),
(26, 7, '2025-08-15', '19:00:00', 5, NOW(), NOW()),

-- Day 12: 2025-08-16
(26, 5, '2025-08-16', '12:00:00', 5, NOW(), NOW()),
(26, 10, '2025-08-16', '15:30:00', 5, NOW(), NOW()),
(26, 2, '2025-08-16', '19:00:00', 5, NOW(), NOW()),

-- Day 13: 2025-08-17
(26, 8, '2025-08-17', '12:00:00', 5, NOW(), NOW()),
(26, 4, '2025-08-17', '15:30:00', 5, NOW(), NOW()),
(26, 6, '2025-08-17', '19:00:00', 5, NOW(), NOW()),

-- Day 14: 2025-08-18
(26, 9, '2025-08-18', '12:00:00', 5, NOW(), NOW()),
(26, 1, '2025-08-18', '15:30:00', 5, NOW(), NOW()),
(26, 3, '2025-08-18', '19:00:00', 5, NOW(), NOW()),

-- Day 15: 2025-08-19
(26, 7, '2025-08-19', '12:00:00', 5, NOW(), NOW()),
(26, 5, '2025-08-19', '15:30:00', 5, NOW(), NOW()),
(26, 10, '2025-08-19', '19:00:00', 5, NOW(), NOW()),

-- Day 16: 2025-08-20
(26, 2, '2025-08-20', '12:00:00', 5, NOW(), NOW()),
(26, 8, '2025-08-20', '15:30:00', 5, NOW(), NOW()),
(26, 4, '2025-08-20', '19:00:00', 5, NOW(), NOW()),

-- Day 17: 2025-08-21
(26, 6, '2025-08-21', '12:00:00', 5, NOW(), NOW()),
(26, 9, '2025-08-21', '15:30:00', 5, NOW(), NOW()),
(26, 1, '2025-08-21', '19:00:00', 5, NOW(), NOW()),

-- Day 18: 2025-08-22
(26, 3, '2025-08-22', '12:00:00', 5, NOW(), NOW()),
(26, 7, '2025-08-22', '15:30:00', 5, NOW(), NOW()),
(26, 5, '2025-08-22', '19:00:00', 5, NOW(), NOW()),

-- Day 19: 2025-08-23
(26, 10, '2025-08-23', '12:00:00', 5, NOW(), NOW()),
(26, 2, '2025-08-23', '15:30:00', 5, NOW(), NOW()),
(26, 8, '2025-08-23', '19:00:00', 5, NOW(), NOW()),

-- Day 20: 2025-08-24
(26, 4, '2025-08-24', '12:00:00', 5, NOW(), NOW()),
(26, 6, '2025-08-24', '15:30:00', 5, NOW(), NOW()),
(26, 9, '2025-08-24', '19:00:00', 5, NOW(), NOW());



INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-09-11
(28, 10, '2025-09-11', '12:00:00', 5, NOW(), NOW()),
(28, 7, '2025-09-11', '15:30:00', 5, NOW(), NOW()),
(28, 2, '2025-09-11', '19:00:00', 5, NOW(), NOW()),

-- Day 2: 2025-09-12
(28, 6, '2025-09-12', '12:00:00', 5, NOW(), NOW()),
(28, 1, '2025-09-12', '15:30:00', 5, NOW(), NOW()),
(28, 4, '2025-09-12', '19:00:00', 5, NOW(), NOW()),

-- Day 3: 2025-09-13
(28, 8, '2025-09-13', '12:00:00', 5, NOW(), NOW()),
(28, 9, '2025-09-13', '15:30:00', 5, NOW(), NOW()),
(28, 3, '2025-09-13', '19:00:00', 5, NOW(), NOW()),

-- Day 4: 2025-09-14
(28, 5, '2025-09-14', '12:00:00', 5, NOW(), NOW()),
(28, 10, '2025-09-14', '15:30:00', 5, NOW(), NOW()),
(28, 7, '2025-09-14', '19:00:00', 5, NOW(), NOW()),

-- Day 5: 2025-09-15
(28, 2, '2025-09-15', '12:00:00', 5, NOW(), NOW()),
(28, 6, '2025-09-15', '15:30:00', 5, NOW(), NOW()),
(28, 1, '2025-09-15', '19:00:00', 5, NOW(), NOW()),

-- Day 6: 2025-09-16
(28, 4, '2025-09-16', '12:00:00', 5, NOW(), NOW()),
(28, 8, '2025-09-16', '15:30:00', 5, NOW(), NOW()),
(28, 9, '2025-09-16', '19:00:00', 5, NOW(), NOW()),

-- Day 7: 2025-09-17
(28, 3, '2025-09-17', '12:00:00', 5, NOW(), NOW()),
(28, 5, '2025-09-17', '15:30:00', 5, NOW(), NOW()),
(28, 10, '2025-09-17', '19:00:00', 5, NOW(), NOW()),

-- Day 8: 2025-09-18
(28, 7, '2025-09-18', '12:00:00', 5, NOW(), NOW()),
(28, 2, '2025-09-18', '15:30:00', 5, NOW(), NOW()),
(28, 6, '2025-09-18', '19:00:00', 5, NOW(), NOW()),

-- Day 9: 2025-09-19
(28, 1, '2025-09-19', '12:00:00', 5, NOW(), NOW()),
(28, 4, '2025-09-19', '15:30:00', 5, NOW(), NOW()),
(28, 8, '2025-09-19', '19:00:00', 5, NOW(), NOW()),

-- Day 10: 2025-09-20
(28, 9, '2025-09-20', '12:00:00', 5, NOW(), NOW()),
(28, 3, '2025-09-20', '15:30:00', 5, NOW(), NOW()),
(28, 5, '2025-09-20', '19:00:00', 5, NOW(), NOW()),

-- Day 11: 2025-09-21
(28, 10, '2025-09-21', '12:00:00', 5, NOW(), NOW()),
(28, 7, '2025-09-21', '15:30:00', 5, NOW(), NOW()),
(28, 2, '2025-09-21', '19:00:00', 5, NOW(), NOW()),

-- Day 12: 2025-09-22
(28, 6, '2025-09-22', '12:00:00', 5, NOW(), NOW()),
(28, 1, '2025-09-22', '15:30:00', 5, NOW(), NOW()),
(28, 4, '2025-09-22', '19:00:00', 5, NOW(), NOW()),

-- Day 13: 2025-09-23
(28, 8, '2025-09-23', '12:00:00', 5, NOW(), NOW()),
(28, 9, '2025-09-23', '15:30:00', 5, NOW(), NOW()),
(28, 3, '2025-09-23', '19:00:00', 5, NOW(), NOW()),

-- Day 14: 2025-09-24
(28, 5, '2025-09-24', '12:00:00', 5, NOW(), NOW()),
(28, 10, '2025-09-24', '15:30:00', 5, NOW(), NOW()),
(28, 7, '2025-09-24', '19:00:00', 5, NOW(), NOW()),

-- Day 15: 2025-09-25
(28, 2, '2025-09-25', '12:00:00', 5, NOW(), NOW()),
(28, 6, '2025-09-25', '15:30:00', 5, NOW(), NOW()),
(28, 1, '2025-09-25', '19:00:00', 5, NOW(), NOW()),

-- Day 16: 2025-09-26
(28, 4, '2025-09-26', '12:00:00', 5, NOW(), NOW()),
(28, 8, '2025-09-26', '15:30:00', 5, NOW(), NOW()),
(28, 9, '2025-09-26', '19:00:00', 5, NOW(), NOW()),

-- Day 17: 2025-09-27
(28, 3, '2025-09-27', '12:00:00', 5, NOW(), NOW()),
(28, 5, '2025-09-27', '15:30:00', 5, NOW(), NOW()),
(28, 10, '2025-09-27', '19:00:00', 5, NOW(), NOW()),

-- Day 18: 2025-09-28
(28, 7, '2025-09-28', '12:00:00', 5, NOW(), NOW()),
(28, 2, '2025-09-28', '15:30:00', 5, NOW(), NOW()),
(28, 6, '2025-09-28', '19:00:00', 5, NOW(), NOW()),

-- Day 19: 2025-09-29
(28, 1, '2025-09-29', '12:00:00', 5, NOW(), NOW()),
(28, 4, '2025-09-29', '15:30:00', 5, NOW(), NOW()),
(28, 8, '2025-09-29', '19:00:00', 5, NOW(), NOW()),

-- Day 20: 2025-09-30
(28, 9, '2025-09-30', '12:00:00', 5, NOW(), NOW()),
(28, 3, '2025-09-30', '15:30:00', 5, NOW(), NOW()),
(28, 5, '2025-09-30', '19:00:00', 5, NOW(), NOW());


INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-10-10
(27, 3, '2025-10-10', '12:00:00', 5, NOW(), NOW()),
(27, 7, '2025-10-10', '15:30:00', 5, NOW(), NOW()),
(27, 10, '2025-10-10', '19:00:00', 5, NOW(), NOW()),

-- Day 2: 2025-10-11
(27, 2, '2025-10-11', '12:00:00', 5, NOW(), NOW()),
(27, 6, '2025-10-11', '15:30:00', 5, NOW(), NOW()),
(27, 1, '2025-10-11', '19:00:00', 5, NOW(), NOW()),

-- Day 3: 2025-10-12
(27, 4, '2025-10-12', '12:00:00', 5, NOW(), NOW()),
(27, 9, '2025-10-12', '15:30:00', 5, NOW(), NOW()),
(27, 5, '2025-10-12', '19:00:00', 5, NOW(), NOW()),

-- Day 4: 2025-10-13
(27, 8, '2025-10-13', '12:00:00', 5, NOW(), NOW()),
(27, 3, '2025-10-13', '15:30:00', 5, NOW(), NOW()),
(27, 7, '2025-10-13', '19:00:00', 5, NOW(), NOW()),

-- Day 5: 2025-10-14
(27, 10, '2025-10-14', '12:00:00', 5, NOW(), NOW()),
(27, 2, '2025-10-14', '15:30:00', 5, NOW(), NOW()),
(27, 6, '2025-10-14', '19:00:00', 5, NOW(), NOW()),

-- Day 6: 2025-10-15
(27, 1, '2025-10-15', '12:00:00', 5, NOW(), NOW()),
(27, 4, '2025-10-15', '15:30:00', 5, NOW(), NOW()),
(27, 9, '2025-10-15', '19:00:00', 5, NOW(), NOW()),

-- Day 7: 2025-10-16
(27, 5, '2025-10-16', '12:00:00', 5, NOW(), NOW()),
(27, 8, '2025-10-16', '15:30:00', 5, NOW(), NOW()),
(27, 3, '2025-10-16', '19:00:00', 5, NOW(), NOW()),

-- Day 8: 2025-10-17
(27, 7, '2025-10-17', '12:00:00', 5, NOW(), NOW()),
(27, 10, '2025-10-17', '15:30:00', 5, NOW(), NOW()),
(27, 2, '2025-10-17', '19:00:00', 5, NOW(), NOW()),

-- Day 9: 2025-10-18
(27, 6, '2025-10-18', '12:00:00', 5, NOW(), NOW()),
(27, 1, '2025-10-18', '15:30:00', 5, NOW(), NOW()),
(27, 4, '2025-10-18', '19:00:00', 5, NOW(), NOW()),

-- Day 10: 2025-10-19
(27, 9, '2025-10-19', '12:00:00', 5, NOW(), NOW()),
(27, 5, '2025-10-19', '15:30:00', 5, NOW(), NOW()),
(27, 8, '2025-10-19', '19:00:00', 5, NOW(), NOW()),

-- Day 11: 2025-10-20
(27, 3, '2025-10-20', '12:00:00', 5, NOW(), NOW()),
(27, 7, '2025-10-20', '15:30:00', 5, NOW(), NOW()),
(27, 10, '2025-10-20', '19:00:00', 5, NOW(), NOW()),

-- Day 12: 2025-10-21
(27, 2, '2025-10-21', '12:00:00', 5, NOW(), NOW()),
(27, 6, '2025-10-21', '15:30:00', 5, NOW(), NOW()),
(27, 1, '2025-10-21', '19:00:00', 5, NOW(), NOW()),

-- Day 13: 2025-10-22
(27, 4, '2025-10-22', '12:00:00', 5, NOW(), NOW()),
(27, 9, '2025-10-22', '15:30:00', 5, NOW(), NOW()),
(27, 5, '2025-10-22', '19:00:00', 5, NOW(), NOW()),

-- Day 14: 2025-10-23
(27, 8, '2025-10-23', '12:00:00', 5, NOW(), NOW()),
(27, 3, '2025-10-23', '15:30:00', 5, NOW(), NOW()),
(27, 7, '2025-10-23', '19:00:00', 5, NOW(), NOW()),

-- Day 15: 2025-10-24
(27, 10, '2025-10-24', '12:00:00', 5, NOW(), NOW()),
(27, 2, '2025-10-24', '15:30:00', 5, NOW(), NOW()),
(27, 6, '2025-10-24', '19:00:00', 5, NOW(), NOW()),

-- Day 16: 2025-10-25
(27, 1, '2025-10-25', '12:00:00', 5, NOW(), NOW()),
(27, 4, '2025-10-25', '15:30:00', 5, NOW(), NOW()),
(27, 9, '2025-10-25', '19:00:00', 5, NOW(), NOW()),

-- Day 17: 2025-10-26
(27, 5, '2025-10-26', '12:00:00', 5, NOW(), NOW()),
(27, 8, '2025-10-26', '15:30:00', 5, NOW(), NOW()),
(27, 3, '2025-10-26', '19:00:00', 5, NOW(), NOW()),

-- Day 18: 2025-10-27
(27, 7, '2025-10-27', '12:00:00', 5, NOW(), NOW()),
(27, 10, '2025-10-27', '15:30:00', 5, NOW(), NOW()),
(27, 2, '2025-10-27', '19:00:00', 5, NOW(), NOW()),

-- Day 19: 2025-10-28
(27, 6, '2025-10-28', '12:00:00', 5, NOW(), NOW()),
(27, 1, '2025-10-28', '15:30:00', 5, NOW(), NOW()),
(27, 4, '2025-10-28', '19:00:00', 5, NOW(), NOW()),

-- Day 20: 2025-10-29
(27, 9, '2025-10-29', '12:00:00', 5, NOW(), NOW()),
(27, 5, '2025-10-29', '15:30:00', 5, NOW(), NOW()),
(27, 8, '2025-10-29', '19:00:00', 5, NOW(), NOW());




INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Day 1: 2025-11-13
(29, 7, '2025-11-13', '12:00:00', 5, NOW(), NOW()),
(29, 2, '2025-11-13', '15:30:00', 5, NOW(), NOW()),
(29, 9, '2025-11-13', '19:00:00', 5, NOW(), NOW()),

-- Day 2: 2025-11-14
(29, 1, '2025-11-14', '12:00:00', 5, NOW(), NOW()),
(29, 5, '2025-11-14', '15:30:00', 5, NOW(), NOW()),
(29, 6, '2025-11-14', '19:00:00', 5, NOW(), NOW()),

-- Day 3: 2025-11-15
(29, 10, '2025-11-15', '12:00:00', 5, NOW(), NOW()),
(29, 3, '2025-11-15', '15:30:00', 5, NOW(), NOW()),
(29, 8, '2025-11-15', '19:00:00', 5, NOW(), NOW()),

-- Day 4: 2025-11-16
(29, 2, '2025-11-16', '12:00:00', 5, NOW(), NOW()),
(29, 9, '2025-11-16', '15:30:00', 5, NOW(), NOW()),
(29, 1, '2025-11-16', '19:00:00', 5, NOW(), NOW()),

-- Day 5: 2025-11-17
(29, 6, '2025-11-17', '12:00:00', 5, NOW(), NOW()),
(29, 7, '2025-11-17', '15:30:00', 5, NOW(), NOW()),
(29, 5, '2025-11-17', '19:00:00', 5, NOW(), NOW()),

-- Day 6: 2025-11-18
(29, 8, '2025-11-18', '12:00:00', 5, NOW(), NOW()),
(29, 3, '2025-11-18', '15:30:00', 5, NOW(), NOW()),
(29, 10, '2025-11-18', '19:00:00', 5, NOW(), NOW()),

-- Day 7: 2025-11-19
(29, 1, '2025-11-19', '12:00:00', 5, NOW(), NOW()),
(29, 5, '2025-11-19', '15:30:00', 5, NOW(), NOW()),
(29, 6, '2025-11-19', '19:00:00', 5, NOW(), NOW()),

-- Day 8: 2025-11-20
(29, 7, '2025-11-20', '12:00:00', 5, NOW(), NOW()),
(29, 9, '2025-11-20', '15:30:00', 5, NOW(), NOW()),
(29, 2, '2025-11-20', '19:00:00', 5, NOW(), NOW()),

-- Day 9: 2025-11-21
(29, 3, '2025-11-21', '12:00:00', 5, NOW(), NOW()),
(29, 10, '2025-11-21', '15:30:00', 5, NOW(), NOW()),
(29, 8, '2025-11-21', '19:00:00', 5, NOW(), NOW()),

-- Day 10: 2025-11-22
(29, 5, '2025-11-22', '12:00:00', 5, NOW(), NOW()),
(29, 6, '2025-11-22', '15:30:00', 5, NOW(), NOW()),
(29, 1, '2025-11-22', '19:00:00', 5, NOW(), NOW()),

-- Day 11: 2025-11-23
(29, 7, '2025-11-23', '12:00:00', 5, NOW(), NOW()),
(29, 2, '2025-11-23', '15:30:00', 5, NOW(), NOW()),
(29, 9, '2025-11-23', '19:00:00', 5, NOW(), NOW()),

-- Day 12: 2025-11-24
(29, 10, '2025-11-24', '12:00:00', 5, NOW(), NOW()),
(29, 3, '2025-11-24', '15:30:00', 5, NOW(), NOW()),
(29, 8, '2025-11-24', '19:00:00', 5, NOW(), NOW()),

-- Day 13: 2025-11-25
(29, 1, '2025-11-25', '12:00:00', 5, NOW(), NOW()),
(29, 5, '2025-11-25', '15:30:00', 5, NOW(), NOW()),
(29, 6, '2025-11-25', '19:00:00', 5, NOW(), NOW()),

-- Day 14: 2025-11-26
(29, 7, '2025-11-26', '12:00:00', 5, NOW(), NOW()),
(29, 9, '2025-11-26', '15:30:00', 5, NOW(), NOW()),
(29, 2, '2025-11-26', '19:00:00', 5, NOW(), NOW()),

-- Day 15: 2025-11-27
(29, 3, '2025-11-27', '12:00:00', 5, NOW(), NOW()),
(29, 10, '2025-11-27', '15:30:00', 5, NOW(), NOW()),
(29, 8, '2025-11-27', '19:00:00', 5, NOW(), NOW()),

-- Day 16: 2025-11-28
(29, 5, '2025-11-28', '12:00:00', 5, NOW(), NOW()),
(29, 6, '2025-11-28', '15:30:00', 5, NOW(), NOW()),
(29, 1, '2025-11-28', '19:00:00', 5, NOW(), NOW()),

-- Day 17: 2025-11-29
(29, 7, '2025-11-29', '12:00:00', 5, NOW(), NOW()),
(29, 2, '2025-11-29', '15:30:00', 5, NOW(), NOW()),
(29, 9, '2025-11-29', '19:00:00', 5, NOW(), NOW()),

-- Day 18: 2025-11-30
(29, 10, '2025-11-30', '12:00:00', 5, NOW(), NOW()),
(29, 3, '2025-11-30', '15:30:00', 5, NOW(), NOW()),
(29, 8, '2025-11-30', '19:00:00', 5, NOW(), NOW()),

-- Day 19: 2025-12-01
(29, 1, '2025-12-01', '12:00:00', 5, NOW(), NOW()),
(29, 5, '2025-12-01', '15:30:00', 5, NOW(), NOW()),
(29, 6, '2025-12-01', '19:00:00', 5, NOW(), NOW()),

-- Day 20: 2025-12-02
(29, 7, '2025-12-02', '12:00:00', 5, NOW(), NOW()),
(29, 9, '2025-12-02', '15:30:00', 5, NOW(), NOW()),
(29, 2, '2025-12-02', '19:00:00', 5, NOW(), NOW());





select *from screenings where movie_id=15;

SELECT unnest(enum_range(NULL::seat_type));

select *from seats;

SELECT * FROM screenings;




select *from screenings;



INSERT INTO seats (theater_id, row_number, seat_number, seat_type, created_at, updated_at) VALUES
                                                                                                      (1, 'A', 1, 'regular',  NOW(), NOW()),
                                                                                                      (1, 'A', 2, 'regular',  NOW(), NOW()),
                                                                                                      (1, 'A', 3, 'regular',  NOW(), NOW()),
                                                                                                      (1, 'A', 4, 'regular',  NOW(), NOW()),
                                                                                                      (1, 'A', 5, 'regular',  NOW(), NOW()),
                                                                                                      (1, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (1, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (1, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (1, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (1, 'D', 1, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 2, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 3, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 4, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 5, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 6, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 7, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 8, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 9, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 10, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 11, 'premium', NOW(), NOW()),
                                                                                                      (1, 'D', 12, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 1, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 2, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 3, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 4, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 5, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 6, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 7, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 8, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 9, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 10, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 11, 'premium', NOW(), NOW()),
                                                                                                      (1, 'E', 12, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 1, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 2, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 3, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 4, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 5, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 6, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 7, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 8, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 9, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 10, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 11, 'premium', NOW(), NOW()),
                                                                                                      (1, 'F', 12, 'premium', NOW(), NOW()),
                                                                                                      (1, 'G', 1, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 2, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 3, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 4, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 5, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 6, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 7, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 8, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 9, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 10, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 11, 'vip', NOW(), NOW()),
                                                                                                      (1, 'G', 12, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 1, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 2, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 3, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 4, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 5, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 6, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 7, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 8, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 9, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 10, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 11, 'vip', NOW(), NOW()),
                                                                                                      (1, 'H', 12, 'vip', NOW(), NOW()),
                                                                                                      (2, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (2, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (2, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (2, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (2, 'D', 1, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 2, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 3, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 4, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 5, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 6, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 7, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 8, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 9, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 10, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 11, 'premium', NOW(), NOW()),
                                                                                                      (2, 'D', 12, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 1, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 2, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 3, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 4, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 5, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 6, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 7, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 8, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 9, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 10, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 11, 'premium', NOW(), NOW()),
                                                                                                      (2, 'E', 12, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 1, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 2, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 3, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 4, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 5, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 6, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 7, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 8, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 9, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 10, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 11, 'premium', NOW(), NOW()),
                                                                                                      (2, 'F', 12, 'premium', NOW(), NOW()),
                                                                                                      (2, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (2, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (3, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (3, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (3, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (3, 'D', 1, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 2, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 3, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 4, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 5, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 6, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 7, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 8, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 9, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 10, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 11, 'premium', NOW(), NOW()),
                                                                                                      (3, 'D', 12, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 1, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 2, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 3, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 4, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 5, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 6, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 7, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 8, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 9, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 10, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 11, 'premium', NOW(), NOW()),
                                                                                                      (3, 'E', 12, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 1, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 2, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 3, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 4, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 5, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 6, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 7, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 8, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 9, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 10, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 11, 'premium', NOW(), NOW()),
                                                                                                      (3, 'F', 12, 'premium', NOW(), NOW()),
                                                                                                      (3, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (3, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (4, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (4, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (4, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (4, 'D', 1, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 2, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 3, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 4, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 5, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 6, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 7, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 8, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 9, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 10, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 11, 'premium', NOW(), NOW()),
                                                                                                      (4, 'D', 12, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 1, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 2, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 3, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 4, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 5, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 6, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 7, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 8, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 9, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 10, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 11, 'premium', NOW(), NOW()),
                                                                                                      (4, 'E', 12, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 1, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 2, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 3, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 4, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 5, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 6, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 7, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 8, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 9, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 10, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 11, 'premium', NOW(), NOW()),
                                                                                                      (4, 'F', 12, 'premium', NOW(), NOW()),
                                                                                                      (4, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (4, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (5, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (5, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (5, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (5, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (5, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (5, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (6, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (6, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (6, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (6, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (6, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (6, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (7, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (7, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (7, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (7, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (7, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (7, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (8, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (8, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (8, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (8, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (8, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (8, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (9, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (9, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (9, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (9, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (9, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (9, 'H', 12, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'A', 1, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 2, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 3, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 4, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 5, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 6, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 7, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 8, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 9, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 10, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 11, 'regular', NOW(), NOW()),
                                                                                                      (10, 'A', 12, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 1, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 2, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 3, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 4, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 5, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 6, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 7, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 8, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 9, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 10, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 11, 'regular', NOW(), NOW()),
                                                                                                      (10, 'B', 12, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 1, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 2, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 3, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 4, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 5, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 6, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 7, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 8, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 9, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 10, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 11, 'regular', NOW(), NOW()),
                                                                                                      (10, 'C', 12, 'regular', NOW(), NOW()),
                                                                                                      (10, 'D', 1, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 2, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 3, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 4, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 5, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 6, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 7, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 8, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 9, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 10, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 11, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'D', 12, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 1, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 2, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 3, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 4, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 5, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 6, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 7, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 8, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 9, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 10, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 11, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'E', 12, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 1, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 2, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 3, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 4, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 5, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 6, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 7, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 8, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 9, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 10, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 11, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'F', 12, 'premium',  NOW(), NOW()),
                                                                                                      (10, 'G', 1, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 2, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 3, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 4, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 5, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 6, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 7, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 8, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 9, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 10, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 11, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'G', 12, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 1, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 2, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 3, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 4, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 5, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 6, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 7, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 8, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 9, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 10, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 11, 'vip',  NOW(), NOW()),
                                                                                                      (10, 'H', 12, 'vip',  NOW(), NOW());


