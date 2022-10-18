-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 17, 2022 at 04:37 PM
-- Server version: 8.0.19
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klika`
--

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`) VALUES
(1, 'hip-hop'),
(2, 'jazz'),
(3, 'blues'),
(4, 'r&b'),
(5, 'pop'),
(6, 'rap'),
(7, 'k-pop'),
(8, 'rock');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `id` int NOT NULL,
  `singer_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `genre_id` int NOT NULL,
  `year` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`id`, `singer_id`, `name`, `genre_id`, `year`) VALUES
(1, 1, 'Yeah Right', 4, 2018),
(2, 2, 'What A Wonderful World', 2, 1968),
(3, 3, 'We will rock you', 8, 1977),
(4, 4, 'Detox', 1, 2022),
(5, 5, 'Want To', 5, 2017),
(6, 6, 'Fly Me to the Moon', 2, 1954),
(7, 7, 'Hold on', 5, 1990),
(8, 8, 'Rock With You', 3, 1979),
(9, 9, 'What Do You Mean', 5, 2015),
(10, 10, 'Ozin gana', 5, 2016),
(11, 11, 'How You Remind Me', 8, 2001),
(12, 12, ' Boogie Chillen', 3, 2013),
(13, 13, 'Gangsta Paradise', 4, 1995),
(14, 14, 'Ring Ding Dong', 7, 2014),
(15, 15, 'Under The Influence', 4, 2019),
(16, 1, 'My Heart Will Go On', 5, 1997),
(17, 2, 'In da Club', 1, 2003),
(18, 3, 'Like a Virgin', 5, 1984),
(19, 9, 'Baby', 5, 2010),
(20, 5, 'Perfect', 5, 2017),
(21, 6, 'Love You like a Love Song', 5, 2011),
(22, 7, 'Shame', 3, 1977),
(23, 8, 'Since U Been Gone', 4, 2004),
(24, 9, 'Wicked Game', 8, 1984),
(25, 10, 'So What', 2, 1959);

-- --------------------------------------------------------

--
-- Table structure for table `singers`
--

CREATE TABLE `singers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `singers`
--

INSERT INTO `singers` (`id`, `name`) VALUES
(1, 'JOJI'),
(2, 'Louis Armstrong'),
(3, 'Queen'),
(4, 'Lil Baby'),
(5, 'Dua Lipa'),
(6, 'Frank Sinatra'),
(7, 'Wilson Phillips'),
(8, 'Michael Jackson'),
(9, 'Justin Bieber'),
(10, 'Moldanazar'),
(11, 'Nickelback'),
(12, 'John Lee Hooker'),
(13, 'Coolio'),
(14, 'Shinee'),
(15, 'Chris Brown');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `music_ibfk_1` (`singer_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `singers`
--
ALTER TABLE `singers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `singers`
--
ALTER TABLE `singers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_ibfk_1` FOREIGN KEY (`singer_id`) REFERENCES `singers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `music_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
