-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 21 Δεκ 2023 στις 20:40:09
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `user_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `fav_movies`
--

CREATE TABLE `fav_movies` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `fav_movies`
--

INSERT INTO `fav_movies` (`id`, `user_id`, `movie_id`) VALUES
(193, 35, 466420),
(194, 35, 787699),
(195, 35, 897087),
(207, 36, 385687),
(212, 36, 572802),
(210, 36, 726209),
(215, 38, 466420),
(214, 38, 572802);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `fav_series`
--

CREATE TABLE `fav_series` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `serie_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `fav_series`
--

INSERT INTO `fav_series` (`id`, `user_id`, `serie_id`) VALUES
(75, 35, 1622),
(76, 35, 1433),
(77, 35, 549),
(82, 36, 63770),
(86, 38, 219109);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `reset_token_hash` varchar(64) DEFAULT NULL,
  `reset_token_expiration` datetime DEFAULT NULL,
  `subscription_start_date` date DEFAULT NULL,
  `subscription_end_date` date DEFAULT NULL,
  `selected_plan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `reset_token_hash`, `reset_token_expiration`, `subscription_start_date`, `subscription_end_date`, `selected_plan`) VALUES
(1, 'helenz1', 'helenz1@windowslive.com', '$2y$10$g0iTBgk9xvh999Wr1aZWa.a8b93L4EiMYla.hUxom/tERRicxJ1ai', '932617086f60a441d4d65b5dac41f54f3186523e282056163f7a7479d506f4e1', '2023-12-10 11:19:08', NULL, NULL, 0),
(2, 'fds235', 'koulap@windowslive.com', '$2y$10$ggAeBfQ829dGnwIWQrT2n.as0Yu2yBeT.z07PulcHVDIyWxDiSykG', NULL, NULL, NULL, NULL, 0),
(3, '20046de', 'helen.zina@yahoo.com', '$2y$10$wy6OFFvGSiAw9N6G7PkkMOdan65uxqGsGDIoDVAFYNVxl88.SthnC', NULL, NULL, NULL, NULL, 0),
(4, 'sdgf1243', '4234ca@yahoo.com', '$2y$10$8UgneTJMoJoHb5W5TTGaPuXabbFJo5XCFsKpT5BfmD03wBmFLaNbq', NULL, NULL, NULL, NULL, 0),
(5, 'helsdfsfenz1', 'hdsfelenz1@windowslive.com', '$2y$10$l/itYO.4RUMv396chvtmP.FqQK8.4t3yhmplHFxy6eR1pMzFQWre.', NULL, NULL, '2023-12-21', '2024-06-21', 6),
(6, 'test123', 'helenz122@windowslive.com', '$2y$10$dtMgxstnYtCKyqkHUBmPF.jbX7gwq1d4lgeZwhlM80NifibmCW3CC', NULL, NULL, NULL, NULL, 0),
(7, 'test20046', 'helenz20046@gmail.com', '$2y$10$O.vrxLgo3IwnlTsRr7vy2e9lTgIU4rrLAmYIAZWYijY4AOiDMgPeO', NULL, NULL, NULL, NULL, 0),
(8, 'helen20046', 'helenz100@gmail.com', '$2y$10$RKcIoEPvWJj8eXbWAix7YOIoCxIQb/Xcu34YKev7cuS.Vx6d5vfGe', NULL, NULL, NULL, NULL, 0),
(10, '20046dedg', 'helenz10@gmail.com', '$2y$10$S5yedsDwQkPgsLAUu54Eu.KvhLKcfE1pALxIagWBTK73iCCbpsPQK', NULL, NULL, '2023-12-12', '2024-03-12', 3),
(11, '20046d', 'helenz1@gmail.com', '$2y$10$oexemRwNWw.oDaZcnuotWeQyeeqjReAeHAK5jKPJ07NaE8q26jlay', NULL, NULL, NULL, NULL, 0),
(25, 'games12382', 'helenzsfdsfs1@windowslive.com', '$2y$10$mPLG4f3DAJjxqxHC0XzcQ.YkOVm6Tw8Cgh1gae7oiOporG0iGq8/2', NULL, NULL, '2023-12-12', '2024-03-12', 3),
(31, 'testpay1', 'test@pay.com', '$2y$10$tHazmagWN8FjfajoCHpUKuYYSCY8WUHAKauQohhb0/lE/.6lb/Hyq', NULL, NULL, '2023-12-11', '2024-06-11', 6),
(32, 'testpay2', 'test2@pay.com', '$2y$10$6selaXH77DKwKIhKL8mye.mzlxnozOjAkIsDpQPfSpdFYuQBM0PES', NULL, NULL, '2023-12-11', '2024-12-11', 12),
(35, 'check1fix', 'check1@fix.com', '$2y$10$ylwykog2orJJEIMkb1dhR.RA0tL/jWkCJx9SUjAr9nHlkF9XO6t7.', NULL, NULL, '2023-12-12', '2024-06-12', 6),
(36, 'checkfix2', 'check2@fix.com', '$2y$10$K.Fqhk5sOq4blzvJcKrNnu3tFXsl6y4zj/bM.u/n075Vfln1WU8XW', NULL, NULL, '2023-12-12', '2024-03-12', 3),
(37, 'checkfix12', 'checkfix12@again.com', '$2y$10$enib6uAuWOZIDvhQEw41ZerayrJxtKPzCIB6Ng/wZtoU6GVs1LlR2', NULL, NULL, '2023-12-12', '2024-06-12', 6),
(38, 'lasttest3', 'last@test.com', '$2y$10$MThIMGR8SgrSDXXCtIuAy.sX5dl6z78XBn9awd/Ip1ppcHA04vyty', NULL, NULL, '2023-12-21', '2024-03-21', 3),
(39, 'lasttttest2', 'lasttttest2@gmail.com', '$2y$10$1Wr9g5QGjvzmtTCGmZrdHeX8f98F.haxLPg9CGFcwcMlJeR8a3Yuu', NULL, NULL, '2023-12-21', '2024-12-21', 12);

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `fav_movies`
--
ALTER TABLE `fav_movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`movie_id`);

--
-- Ευρετήρια για πίνακα `fav_series`
--
ALTER TABLE `fav_series`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `reset_token_hash` (`reset_token_hash`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `fav_movies`
--
ALTER TABLE `fav_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT για πίνακα `fav_series`
--
ALTER TABLE `fav_series`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `fav_movies`
--
ALTER TABLE `fav_movies`
  ADD CONSTRAINT `fav_movies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Περιορισμοί για πίνακα `fav_series`
--
ALTER TABLE `fav_series`
  ADD CONSTRAINT `fav_series_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
