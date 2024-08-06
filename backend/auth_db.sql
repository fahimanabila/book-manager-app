-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2024 at 03:58 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `book_category`
--

CREATE TABLE `book_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_category`
--

INSERT INTO `book_category` (`id`, `category_name`) VALUES
(9, 'Comedy'),
(7, 'Education'),
(1, 'Fantasy'),
(2, 'History'),
(3, 'Kids'),
(5, 'Philosophy'),
(8, 'Science Fiction'),
(4, 'Slice of Life');

-- --------------------------------------------------------

--
-- Table structure for table `book_list`
--

CREATE TABLE `book_list` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publication_date` date NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `number_of_pages` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_list`
--

INSERT INTO `book_list` (`id`, `title`, `author`, `publication_date`, `publisher`, `number_of_pages`, `image`, `category`, `url`) VALUES
(1, 'Mathematics By Angela', 'Angela Swan', '2009-08-08', 'ABC', 98, '22e6ae9ae95312b53324c1de4ecb1c44.jpg', 9, 'http://localhost:5000/images/22e6ae9ae95312b53324c1de4ecb1c44.jpg'),
(2, 'International Relations', 'Pavneet Singh', '2010-12-08', 'McGrew Hill', 130, 'c7648acc1b920f0178db898ed51be508.jpeg', 2, 'http://localhost:5000/images/c7648acc1b920f0178db898ed51be508.jpeg'),
(3, 'Living Fullest', 'Jane Stone', '2024-02-01', 'Gramedia', 77, '02b72233b3dcc94b7cc819139e7857f9.jpg', 1, 'http://localhost:5000/images/02b72233b3dcc94b7cc819139e7857f9.jpg'),
(4, 'How Moving Castle', 'Diana Wyne Jones', '2018-08-06', 'Neil Gaiman', 108, 'ba846389850a5e792d2d82a2e9603945.png', 8, 'http://localhost:5000/images/ba846389850a5e792d2d82a2e9603945.png');

-- --------------------------------------------------------

-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$jHW1hTxouhpdpyvrKKukAuLLMy0fEj5NUSvX8ine3fuF9gEIPLH.6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzIyOTA4OTY1LCJleHAiOjE3MjI5OTUzNjV9.Efk4SCGdD4Ymsn1zBPkLBhMlIbXjNUppUmpPiqjK4-M', '2024-08-05 03:43:41', '2024-08-06 01:49:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book_category`
--
ALTER TABLE `book_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `book_list`
--
ALTER TABLE `book_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book_category`
--
ALTER TABLE `book_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `book_list`
--
ALTER TABLE `book_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book_list`
--
ALTER TABLE `book_list`
  ADD CONSTRAINT `book_list_ibfk_1` FOREIGN KEY (`category`) REFERENCES `book_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
