SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
SELECT current_database();

SELECT * FROM movies;
SELECT * FROM screenings;
select *from public.screenings;
select *from public.customers;
select * from cinemas;

SELECT current_database();


INSERT INTO cinemas (
    id, name, address, city, state, country, phone, email, is_active, created_at, updated_at
) VALUES (
             1,
             'Sunset Movieplex',
             '123 Main Street',
             'Phnom Penh',
             'Phnom Penh',
             'Cambodia',
             '+85512345678',
             'contact@sunsetmovieplex.com',
             true,
             NOW(),
             NOW()
         );

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

INSERT INTO public.theaters (id, name, cinema_id, created_at, updated_at) VALUES
                                                                   (1, 'CADT First Hall', 1,NOW(), NOW()),
                                                                   (2, 'CADT Second Hall', 1,NOW(), NOW()),
                                                                   (3, 'CADT Third Hall', 1,NOW(), NOW()),
                                                                   (4, 'CADT Fourth Hall', 1,NOW(), NOW()),
                                                                   (5, 'CADT Fifth Hall', 1,NOW(), NOW()),
                                                                   (6, 'CADT Sixth Hall', 1,NOW(), NOW()),
                                                                   (7, 'CADT Seventh Hall', 1,NOW(), NOW()),
                                                                   (8, 'CADT Eighth Hall', 1,NOW(), NOW()),
                                                                   (9, 'CADT Ninth Hall', 1,NOW(), NOW()),
                                                                   (10, 'CADT Tenth Hall', 1,NOW(), NOW());


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

-- Additional screenings for July 2025
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Movie 1 (Ballerina) - July 2025
(1, 1, '2025-07-08', '09:00:00', 8.50, NOW(), NOW()),
(1, 2, '2025-07-08', '12:00:00', 8.50, NOW(), NOW()),
(1, 3, '2025-07-08', '15:00:00', 8.50, NOW(), NOW()),
(1, 4, '2025-07-08', '18:00:00', 8.50, NOW(), NOW()),
(1, 5, '2025-07-08', '21:00:00', 8.50, NOW(), NOW()),

(1, 6, '2025-07-09', '09:30:00', 8.50, NOW(), NOW()),
(1, 7, '2025-07-09', '12:30:00', 8.50, NOW(), NOW()),
(1, 8, '2025-07-09', '15:30:00', 8.50, NOW(), NOW()),
(1, 9, '2025-07-09', '18:30:00', 8.50, NOW(), NOW()),
(1, 10, '2025-07-09', '21:30:00', 8.50, NOW(), NOW()),

-- Movie 2 (Guardian, The) - July 2025
(2, 1, '2025-07-10', '10:00:00', 7.00, NOW(), NOW()),
(2, 2, '2025-07-10', '13:00:00', 7.00, NOW(), NOW()),
(2, 3, '2025-07-10', '16:00:00', 7.00, NOW(), NOW()),
(2, 4, '2025-07-10', '19:00:00', 7.00, NOW(), NOW()),
(2, 5, '2025-07-10', '22:00:00', 7.00, NOW(), NOW()),

(2, 6, '2025-07-11', '10:30:00', 7.00, NOW(), NOW()),
(2, 7, '2025-07-11', '13:30:00', 7.00, NOW(), NOW()),
(2, 8, '2025-07-11', '16:30:00', 7.00, NOW(), NOW()),
(2, 9, '2025-07-11', '19:30:00', 7.00, NOW(), NOW()),
(2, 10, '2025-07-11', '22:30:00', 7.00, NOW(), NOW()),

-- Movie 3 (How to Train Your Dragon) - July 2025
(3, 1, '2025-07-12', '09:15:00', 9.00, NOW(), NOW()),
(3, 2, '2025-07-12', '12:15:00', 9.00, NOW(), NOW()),
(3, 3, '2025-07-12', '15:15:00', 9.00, NOW(), NOW()),
(3, 4, '2025-07-12', '18:15:00', 9.00, NOW(), NOW()),
(3, 5, '2025-07-12', '21:15:00', 9.00, NOW(), NOW()),

(3, 6, '2025-07-13', '09:45:00', 9.00, NOW(), NOW()),
(3, 7, '2025-07-13', '12:45:00', 9.00, NOW(), NOW()),
(3, 8, '2025-07-13', '15:45:00', 9.00, NOW(), NOW()),
(3, 9, '2025-07-13', '18:45:00', 9.00, NOW(), NOW()),
(3, 10, '2025-07-13', '21:45:00', 9.00, NOW(), NOW()),

-- Movie 4 (In Love With My Bestfriend) - July 2025
(4, 1, '2025-07-14', '10:15:00', 7.80, NOW(), NOW()),
(4, 2, '2025-07-14', '13:15:00', 7.80, NOW(), NOW()),
(4, 3, '2025-07-14', '16:15:00', 7.80, NOW(), NOW()),
(4, 4, '2025-07-14', '19:15:00', 7.80, NOW(), NOW()),
(4, 5, '2025-07-14', '22:15:00', 7.80, NOW(), NOW()),

(4, 6, '2025-07-15', '10:45:00', 7.80, NOW(), NOW()),
(4, 7, '2025-07-15', '13:45:00', 7.80, NOW(), NOW()),
(4, 8, '2025-07-15', '16:45:00', 7.80, NOW(), NOW()),
(4, 9, '2025-07-15', '19:45:00', 7.80, NOW(), NOW()),
(4, 10, '2025-07-15', '22:45:00', 7.80, NOW(), NOW()),

-- Movie 5 (It Feeds) - July 2025
(5, 1, '2025-07-16', '09:30:00', 7.60, NOW(), NOW()),
(5, 2, '2025-07-16', '12:30:00', 7.60, NOW(), NOW()),
(5, 3, '2025-07-16', '15:30:00', 7.60, NOW(), NOW()),
(5, 4, '2025-07-16', '18:30:00', 7.60, NOW(), NOW()),
(5, 5, '2025-07-16', '21:30:00', 7.60, NOW(), NOW()),

(5, 6, '2025-07-17', '09:00:00', 7.60, NOW(), NOW()),
(5, 7, '2025-07-17', '12:00:00', 7.60, NOW(), NOW()),
(5, 8, '2025-07-17', '15:00:00', 7.60, NOW(), NOW()),
(5, 9, '2025-07-17', '18:00:00', 7.60, NOW(), NOW()),
(5, 10, '2025-07-17', '21:00:00', 7.60, NOW(), NOW()),

-- Movie 6 (Hi-Five) - July 2025
(6, 1, '2025-07-18', '10:30:00', 8.20, NOW(), NOW()),
(6, 2, '2025-07-18', '13:30:00', 8.20, NOW(), NOW()),
(6, 3, '2025-07-18', '16:30:00', 8.20, NOW(), NOW()),
(6, 4, '2025-07-18', '19:30:00', 8.20, NOW(), NOW()),
(6, 5, '2025-07-18', '22:30:00', 8.20, NOW(), NOW()),

(6, 6, '2025-07-19', '10:00:00', 8.20, NOW(), NOW()),
(6, 7, '2025-07-19', '13:00:00', 8.20, NOW(), NOW()),
(6, 8, '2025-07-19', '16:00:00', 8.20, NOW(), NOW()),
(6, 9, '2025-07-19', '19:00:00', 8.20, NOW(), NOW()),
(6, 10, '2025-07-19', '22:00:00', 8.20, NOW(), NOW()),

-- Movie 7 (Setan Botak Di Jembatan Ancol) - July 2025
(7, 1, '2025-07-20', '09:15:00', 7.40, NOW(), NOW()),
(7, 2, '2025-07-20', '12:15:00', 7.40, NOW(), NOW()),
(7, 3, '2025-07-20', '15:15:00', 7.40, NOW(), NOW()),
(7, 4, '2025-07-20', '18:15:00', 7.40, NOW(), NOW()),
(7, 5, '2025-07-20', '21:15:00', 7.40, NOW(), NOW()),

(7, 6, '2025-07-21', '09:45:00', 7.40, NOW(), NOW()),
(7, 7, '2025-07-21', '12:45:00', 7.40, NOW(), NOW()),
(7, 8, '2025-07-21', '15:45:00', 7.40, NOW(), NOW()),
(7, 9, '2025-07-21', '18:45:00', 7.40, NOW(), NOW()),
(7, 10, '2025-07-21', '21:45:00', 7.40, NOW(), NOW()),

-- Movie 8 (Karate Kid: Legends) - July 2025
(8, 1, '2025-07-22', '10:15:00', 7.90, NOW(), NOW()),
(8, 2, '2025-07-22', '13:15:00', 7.90, NOW(), NOW()),
(8, 3, '2025-07-22', '16:15:00', 7.90, NOW(), NOW()),
(8, 4, '2025-07-22', '19:15:00', 7.90, NOW(), NOW()),
(8, 5, '2025-07-22', '22:15:00', 7.90, NOW(), NOW()),

(8, 6, '2025-07-23', '10:45:00', 7.90, NOW(), NOW()),
(8, 7, '2025-07-23', '13:45:00', 7.90, NOW(), NOW()),
(8, 8, '2025-07-23', '16:45:00', 7.90, NOW(), NOW()),
(8, 9, '2025-07-23', '19:45:00', 7.90, NOW(), NOW()),
(8, 10, '2025-07-23', '22:45:00', 7.90, NOW(), NOW()),

-- Movie 9 (Mae Neath) - July 2025
(9, 1, '2025-07-24', '09:30:00', 7.30, NOW(), NOW()),
(9, 2, '2025-07-24', '12:30:00', 7.30, NOW(), NOW()),
(9, 3, '2025-07-24', '15:30:00', 7.30, NOW(), NOW()),
(9, 4, '2025-07-24', '18:30:00', 7.30, NOW(), NOW()),
(9, 5, '2025-07-24', '21:30:00', 7.30, NOW(), NOW()),

(9, 6, '2025-07-25', '09:00:00', 7.30, NOW(), NOW()),
(9, 7, '2025-07-25', '12:00:00', 7.30, NOW(), NOW()),
(9, 8, '2025-07-25', '15:00:00', 7.30, NOW(), NOW()),
(9, 9, '2025-07-25', '18:00:00', 7.30, NOW(), NOW()),
(9, 10, '2025-07-25', '21:00:00', 7.30, NOW(), NOW()),

-- Movie 10 (Lilo & Stitch) - July 2025
(10, 1, '2025-07-26', '10:30:00', 8.50, NOW(), NOW()),
(10, 2, '2025-07-26', '13:30:00', 8.50, NOW(), NOW()),
(10, 3, '2025-07-26', '16:30:00', 8.50, NOW(), NOW()),
(10, 4, '2025-07-26', '19:30:00', 8.50, NOW(), NOW()),
(10, 5, '2025-07-26', '22:30:00', 8.50, NOW(), NOW()),

(10, 6, '2025-07-27', '10:00:00', 8.50, NOW(), NOW()),
(10, 7, '2025-07-27', '13:00:00', 8.50, NOW(), NOW()),
(10, 8, '2025-07-27', '16:00:00', 8.50, NOW(), NOW()),
(10, 9, '2025-07-27', '19:00:00', 8.50, NOW(), NOW()),
(10, 10, '2025-07-27', '22:00:00', 8.50, NOW(), NOW()),

-- Movie 11 (Mission: Impossible - The Final Reckoning) - July 2025
(11, 1, '2025-07-28', '09:15:00', 9.30, NOW(), NOW()),
(11, 2, '2025-07-28', '12:15:00', 9.30, NOW(), NOW()),
(11, 3, '2025-07-28', '15:15:00', 9.30, NOW(), NOW()),
(11, 4, '2025-07-28', '18:15:00', 9.30, NOW(), NOW()),
(11, 5, '2025-07-28', '21:15:00', 9.30, NOW(), NOW()),

(11, 6, '2025-07-29', '09:45:00', 9.30, NOW(), NOW()),
(11, 7, '2025-07-29', '12:45:00', 9.30, NOW(), NOW()),
(11, 8, '2025-07-29', '15:45:00', 9.30, NOW(), NOW()),
(11, 9, '2025-07-29', '18:45:00', 9.30, NOW(), NOW()),
(11, 10, '2025-07-29', '21:45:00', 9.30, NOW(), NOW()),

-- Movie 12 (Holy Night: Demon Hunters) - July 2025
(12, 1, '2025-07-30', '10:15:00', 7.70, NOW(), NOW()),
(12, 2, '2025-07-30', '13:15:00', 7.70, NOW(), NOW()),
(12, 3, '2025-07-30', '16:15:00', 7.70, NOW(), NOW()),
(12, 4, '2025-07-30', '19:15:00', 7.70, NOW(), NOW()),
(12, 5, '2025-07-30', '22:15:00', 7.70, NOW(), NOW()),

(12, 6, '2025-07-31', '10:45:00', 7.70, NOW(), NOW()),
(12, 7, '2025-07-31', '13:45:00', 7.70, NOW(), NOW()),
(12, 8, '2025-07-31', '16:45:00', 7.70, NOW(), NOW()),
(12, 9, '2025-07-31', '19:45:00', 7.70, NOW(), NOW()),
(12, 10, '2025-07-31', '22:45:00', 7.70, NOW(), NOW());

-- Additional screenings for August 2025
INSERT INTO screenings (movie_id, theater_id, screening_date, screening_time, price, created_at, updated_at) VALUES
-- Movie 13 (Witch Returns, The) - August 2025
(13, 1, '2025-08-01', '09:00:00', 8.30, NOW(), NOW()),
(13, 2, '2025-08-01', '12:00:00', 8.30, NOW(), NOW()),
(13, 3, '2025-08-01', '15:00:00', 8.30, NOW(), NOW()),
(13, 4, '2025-08-01', '18:00:00', 8.30, NOW(), NOW()),
(13, 5, '2025-08-01', '21:00:00', 8.30, NOW(), NOW()),

(13, 6, '2025-08-02', '09:30:00', 8.30, NOW(), NOW()),
(13, 7, '2025-08-02', '12:30:00', 8.30, NOW(), NOW()),
(13, 8, '2025-08-02', '15:30:00', 8.30, NOW(), NOW()),
(13, 9, '2025-08-02', '18:30:00', 8.30, NOW(), NOW()),
(13, 10, '2025-08-02', '21:30:00', 8.30, NOW(), NOW()),

-- Movie 14 (Elio) - August 2025
(14, 1, '2025-08-03', '10:00:00', 7.50, NOW(), NOW()),
(14, 2, '2025-08-03', '13:00:00', 7.50, NOW(), NOW()),
(14, 3, '2025-08-03', '16:00:00', 7.50, NOW(), NOW()),
(14, 4, '2025-08-03', '19:00:00', 7.50, NOW(), NOW()),
(14, 5, '2025-08-03', '22:00:00', 7.50, NOW(), NOW()),

(14, 6, '2025-08-04', '10:30:00', 7.50, NOW(), NOW()),
(14, 7, '2025-08-04', '13:30:00', 7.50, NOW(), NOW()),
(14, 8, '2025-08-04', '16:30:00', 7.50, NOW(), NOW()),
(14, 9, '2025-08-04', '19:30:00', 7.50, NOW(), NOW()),
(14, 10, '2025-08-04', '22:30:00', 7.50, NOW(), NOW()),

-- Movie 15 (28 Years Later) - August 2025
(15, 1, '2025-08-05', '09:15:00', 9.00, NOW(), NOW()),
(15, 2, '2025-08-05', '12:15:00', 9.00, NOW(), NOW()),
(15, 3, '2025-08-05', '15:15:00', 9.00, NOW(), NOW()),
(15, 4, '2025-08-05', '18:15:00', 9.00, NOW(), NOW()),
(15, 5, '2025-08-05', '21:15:00', 9.00, NOW(), NOW()),

(15, 6, '2025-08-06', '09:45:00', 9.00, NOW(), NOW()),
(15, 7, '2025-08-06', '12:45:00', 9.00, NOW(), NOW()),
(15, 8, '2025-08-06', '15:45:00', 9.00, NOW(), NOW()),
(15, 9, '2025-08-06', '18:45:00', 9.00, NOW(), NOW()),
(15, 10, '2025-08-06', '21:45:00', 9.00, NOW(), NOW()),

-- Movie 16 (Pernikahan Arwah) - August 2025
(16, 1, '2025-08-07', '10:15:00', 7.80, NOW(), NOW()),
(16, 2, '2025-08-07', '13:15:00', 7.80, NOW(), NOW()),
(16, 3, '2025-08-07', '16:15:00', 7.80, NOW(), NOW()),
(16, 4, '2025-08-07', '19:15:00', 7.80, NOW(), NOW()),
(16, 5, '2025-08-07', '22:15:00', 7.80, NOW(), NOW()),

(16, 6, '2025-08-08', '10:45:00', 7.80, NOW(), NOW()),
(16, 7, '2025-08-08', '13:45:00', 7.80, NOW(), NOW()),
(16, 8, '2025-08-08', '16:45:00', 7.80, NOW(), NOW()),
(16, 9, '2025-08-08', '19:45:00', 7.80, NOW(), NOW()),
(16, 10, '2025-08-08', '22:45:00', 7.80, NOW(), NOW()),

-- Movie 17 (Dendam Malam Kelam) - August 2025
(17, 1, '2025-08-09', '09:30:00', 7.60, NOW(), NOW()),
(17, 2, '2025-08-09', '12:30:00', 7.60, NOW(), NOW()),
(17, 3, '2025-08-09', '15:30:00', 7.60, NOW(), NOW()),
(17, 4, '2025-08-09', '18:30:00', 7.60, NOW(), NOW()),
(17, 5, '2025-08-09', '21:30:00', 7.60, NOW(), NOW()),

(17, 6, '2025-08-10', '09:00:00', 7.60, NOW(), NOW()),
(17, 7, '2025-08-10', '12:00:00', 7.60, NOW(), NOW()),
(17, 8, '2025-08-10', '15:00:00', 7.60, NOW(), NOW()),
(17, 9, '2025-08-10', '18:00:00', 7.60, NOW(), NOW()),
(17, 10, '2025-08-10', '21:00:00', 7.60, NOW(), NOW()),

-- Movie 18 (Lovesick) - August 2025
(18, 1, '2025-08-11', '10:30:00', 8.20, NOW(), NOW()),
(18, 2, '2025-08-11', '13:30:00', 8.20, NOW(), NOW()),
(18, 3, '2025-08-11', '16:30:00', 8.20, NOW(), NOW()),
(18, 4, '2025-08-11', '19:30:00', 8.20, NOW(), NOW()),
(18, 5, '2025-08-11', '22:30:00', 8.20, NOW(), NOW()),

(18, 6, '2025-08-12', '10:00:00', 8.20, NOW(), NOW()),
(18, 7, '2025-08-12', '13:00:00', 8.20, NOW(), NOW()),
(18, 8, '2025-08-12', '16:00:00', 8.20, NOW(), NOW()),
(18, 9, '2025-08-12', '19:00:00', 8.20, NOW(), NOW()),
(18, 10, '2025-08-12', '22:00:00', 8.20, NOW(), NOW()),

-- Movie 19 (Hand, The) - August 2025
(19, 1, '2025-08-13', '09:15:00', 7.40, NOW(), NOW()),
(19, 2, '2025-08-13', '12:15:00', 7.40, NOW(), NOW()),
(19, 3, '2025-08-13', '15:15:00', 7.40, NOW(), NOW()),
(19, 4, '2025-08-13', '18:15:00', 7.40, NOW(), NOW()),
(19, 5, '2025-08-13', '21:15:00', 7.40, NOW(), NOW()),

(19, 6, '2025-08-14', '09:45:00', 7.40, NOW(), NOW()),
(19, 7, '2025-08-14', '12:45:00', 7.40, NOW(), NOW()),
(19, 8, '2025-08-14', '15:45:00', 7.40, NOW(), NOW()),
(19, 9, '2025-08-14', '18:45:00', 7.40, NOW(), NOW()),
(19, 10, '2025-08-14', '21:45:00', 7.40, NOW(), NOW()),

-- Movie 20 (F1) - August 2025
(20, 1, '2025-08-15', '10:15:00', 7.90, NOW(), NOW()),
(20, 2, '2025-08-15', '13:15:00', 7.90, NOW(), NOW()),
(20, 3, '2025-08-15', '16:15:00', 7.90, NOW(), NOW()),
(20, 4, '2025-08-15', '19:15:00', 7.90, NOW(), NOW()),
(20, 5, '2025-08-15', '22:15:00', 7.90, NOW(), NOW()),

(20, 6, '2025-08-16', '10:45:00', 7.90, NOW(), NOW()),
(20, 7, '2025-08-16', '13:45:00', 7.90, NOW(), NOW()),
(20, 8, '2025-08-16', '16:45:00', 7.90, NOW(), NOW()),
(20, 9, '2025-08-16', '19:45:00', 7.90, NOW(), NOW()),
(20, 10, '2025-08-16', '22:45:00', 7.90, NOW(), NOW()),

-- Movie 21 (Pembantaian Dukun Santet) - August 2025
(21, 1, '2025-08-17', '09:30:00', 7.30, NOW(), NOW()),
(21, 2, '2025-08-17', '12:30:00', 7.30, NOW(), NOW()),
(21, 3, '2025-08-17', '15:30:00', 7.30, NOW(), NOW()),
(21, 4, '2025-08-17', '18:30:00', 7.30, NOW(), NOW()),
(21, 5, '2025-08-17', '21:30:00', 7.30, NOW(), NOW()),

(21, 6, '2025-08-18', '09:00:00', 7.30, NOW(), NOW()),
(21, 7, '2025-08-18', '12:00:00', 7.30, NOW(), NOW()),
(21, 8, '2025-08-18', '15:00:00', 7.30, NOW(), NOW()),
(21, 9, '2025-08-18', '18:00:00', 7.30, NOW(), NOW()),
(21, 10, '2025-08-18', '21:00:00', 7.30, NOW(), NOW()),

-- Movie 22 (M3GAN 2.0) - August 2025
(22, 1, '2025-08-19', '10:30:00', 8.50, NOW(), NOW()),
(22, 2, '2025-08-19', '13:30:00', 8.50, NOW(), NOW()),
(22, 3, '2025-08-19', '16:30:00', 8.50, NOW(), NOW()),
(22, 4, '2025-08-19', '19:30:00', 8.50, NOW(), NOW()),
(22, 5, '2025-08-19', '22:30:00', 8.50, NOW(), NOW()),

(22, 6, '2025-08-20', '10:00:00', 8.50, NOW(), NOW()),
(22, 7, '2025-08-20', '13:00:00', 8.50, NOW(), NOW()),
(22, 8, '2025-08-20', '16:00:00', 8.50, NOW(), NOW()),
(22, 9, '2025-08-20', '19:00:00', 8.50, NOW(), NOW()),
(22, 10, '2025-08-20', '22:00:00', 8.50, NOW(), NOW()),

-- Movie 23 (Ritual, The) - August 2025
(23, 1, '2025-08-21', '09:15:00', 9.30, NOW(), NOW()),
(23, 2, '2025-08-21', '12:15:00', 9.30, NOW(), NOW()),
(23, 3, '2025-08-21', '15:15:00', 9.30, NOW(), NOW()),
(23, 4, '2025-08-21', '18:15:00', 9.30, NOW(), NOW()),
(23, 5, '2025-08-21', '21:15:00', 9.30, NOW(), NOW()),

(23, 6, '2025-08-22', '09:45:00', 9.30, NOW(), NOW()),
(23, 7, '2025-08-22', '12:45:00', 9.30, NOW(), NOW()),
(23, 8, '2025-08-22', '15:45:00', 9.30, NOW(), NOW()),
(23, 9, '2025-08-22', '18:45:00', 9.30, NOW(), NOW()),
(23, 10, '2025-08-22', '21:45:00', 9.30, NOW(), NOW()),

-- Movie 24 (Omniscient Reader) - August 2025
(24, 1, '2025-08-23', '10:15:00', 8.40, NOW(), NOW()),
(24, 2, '2025-08-23', '13:15:00', 8.40, NOW(), NOW()),
(24, 3, '2025-08-23', '16:15:00', 8.40, NOW(), NOW()),
(24, 4, '2025-08-23', '19:15:00', 8.40, NOW(), NOW()),
(24, 5, '2025-08-23', '22:15:00', 8.40, NOW(), NOW()),

(24, 6, '2025-08-24', '10:45:00', 8.40, NOW(), NOW()),
(24, 7, '2025-08-24', '13:45:00', 8.40, NOW(), NOW()),
(24, 8, '2025-08-24', '16:45:00', 8.40, NOW(), NOW()),
(24, 9, '2025-08-24', '19:45:00', 8.40, NOW(), NOW()),
(24, 10, '2025-08-24', '22:45:00', 8.40, NOW(), NOW()),

-- Movie 25 (Superman) - August 2025
(25, 1, '2025-08-25', '09:30:00', 9.00, NOW(), NOW()),
(25, 2, '2025-08-25', '12:30:00', 9.00, NOW(), NOW()),
(25, 3, '2025-08-25', '15:30:00', 9.00, NOW(), NOW()),
(25, 4, '2025-08-25', '18:30:00', 9.00, NOW(), NOW()),
(25, 5, '2025-08-25', '21:30:00', 9.00, NOW(), NOW()),

(25, 6, '2025-08-26', '09:00:00', 9.00, NOW(), NOW()),
(25, 7, '2025-08-26', '12:00:00', 9.00, NOW(), NOW()),
(25, 8, '2025-08-26', '15:00:00', 9.00, NOW(), NOW()),
(25, 9, '2025-08-26', '18:00:00', 9.00, NOW(), NOW()),
(25, 10, '2025-08-26', '21:00:00', 9.00, NOW(), NOW()),

-- Movie 26 (Long Walk, The) - August 2025
(26, 1, '2025-08-27', '10:30:00', 7.70, NOW(), NOW()),
(26, 2, '2025-08-27', '13:30:00', 7.70, NOW(), NOW()),
(26, 3, '2025-08-27', '16:30:00', 7.70, NOW(), NOW()),
(26, 4, '2025-08-27', '19:30:00', 7.70, NOW(), NOW()),
(26, 5, '2025-08-27', '22:30:00', 7.70, NOW(), NOW()),

(26, 6, '2025-08-28', '10:00:00', 7.70, NOW(), NOW()),
(26, 7, '2025-08-28', '13:00:00', 7.70, NOW(), NOW()),
(26, 8, '2025-08-28', '16:00:00', 7.70, NOW(), NOW()),
(26, 9, '2025-08-28', '19:00:00', 7.70, NOW(), NOW()),
(26, 10, '2025-08-28', '22:00:00', 7.70, NOW(), NOW()),

-- Movie 27 (Now You See Me: Now You Don't) - August 2025
(27, 1, '2025-08-29', '09:15:00', 8.80, NOW(), NOW()),
(27, 2, '2025-08-29', '12:15:00', 8.80, NOW(), NOW()),
(27, 3, '2025-08-29', '15:15:00', 8.80, NOW(), NOW()),
(27, 4, '2025-08-29', '18:15:00', 8.80, NOW(), NOW()),
(27, 5, '2025-08-29', '21:15:00', 8.80, NOW(), NOW()),

(27, 6, '2025-08-30', '09:45:00', 8.80, NOW(), NOW()),
(27, 7, '2025-08-30', '12:45:00', 8.80, NOW(), NOW()),
(27, 8, '2025-08-30', '15:45:00', 8.80, NOW(), NOW()),
(27, 9, '2025-08-30', '18:45:00', 8.80, NOW(), NOW()),
(27, 10, '2025-08-30', '21:45:00', 8.80, NOW(), NOW()),

-- Movie 28 (Midnight Sun) - August 2025
(28, 1, '2025-08-31', '10:15:00', 7.90, NOW(), NOW()),
(28, 2, '2025-08-31', '13:15:00', 7.90, NOW(), NOW()),
(28, 3, '2025-08-31', '16:15:00', 7.90, NOW(), NOW()),
(28, 4, '2025-08-31', '19:15:00', 7.90, NOW(), NOW()),
(28, 5, '2025-08-31', '22:15:00', 7.90, NOW(), NOW());


