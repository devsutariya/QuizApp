-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 07, 2025 at 04:01 PM
-- Server version: 8.0.42
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinequizdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) DEFAULT NULL,
  `optiona` varchar(255) DEFAULT NULL,
  `optionb` varchar(255) DEFAULT NULL,
  `optionc` varchar(255) DEFAULT NULL,
  `optiond` varchar(255) DEFAULT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `test_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8hejcpbbiq1qje11346akp3uj` (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `answer`, `optiona`, `optionb`, `optionc`, `optiond`, `question_text`, `test_id`) VALUES
(1, 'Mumbai', 'New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'What is the capital of India?', 1),
(3, 'int num;', 'int num;', 'integer num;', 'Int num;', 'num int;', 'Which of the following is the correct way to declare an integer variable in Java?', 1),
(5, 'real', 'int', 'float', 'real', 'char', 'Which of the following is not a valid data type in C?', 1),
(6, '===', '==', '!=', '===', '=', 'In JavaScript, which symbol is used for strict equality comparison?', 1),
(7, 'false', 'true', 'false', 'hello', 'Compile-time error', 'What will the following Java code print?\n\nString s1 = new String(\"hello\");\nString s2 = \"hello\";\nSystem.out.println(s1 == s2);\n', 1);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `time` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `description`, `time`, `title`) VALUES
(1, 'This test evaluates your understanding of basic programming concepts', 60, 'Fundamentals of Programming');

-- --------------------------------------------------------

--
-- Table structure for table `test_result`
--

DROP TABLE IF EXISTS `test_result`;
CREATE TABLE IF NOT EXISTS `test_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `correct_answers` int NOT NULL,
  `percentage` double NOT NULL,
  `total_questions` int NOT NULL,
  `test_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKef3e8k7fgvkj4mox0lxrkf8hh` (`test_id`),
  KEY `FKmu7x4i4r6swolpxwqx0n21lnn` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `test_result`
--

INSERT INTO `test_result` (`id`, `correct_answers`, `percentage`, `total_questions`, `test_id`, `user_id`) VALUES
(1, 4, 100, 4, 1, 3),
(2, 2, 50, 4, 1, 2),
(3, 3, 75, 4, 1, 2),
(4, 3, 75, 4, 1, 2),
(5, 0, 0, 4, 1, 3),
(6, 0, 0, 4, 1, 3),
(7, 4, 100, 4, 1, 3),
(8, 1, 25, 4, 1, 3),
(9, 2, 50, 4, 1, 3),
(10, 3, 75, 4, 1, 3),
(11, 3, 75, 4, 1, 3),
(12, 0, 0, 4, 1, 3),
(13, 4, 100, 4, 1, 3),
(14, 0, 0, 4, 1, 1),
(15, 4, 80, 5, 1, 3),
(16, 4, 80, 5, 1, 3),
(17, 4, 80, 5, 1, 1),
(18, 3, 60, 5, 1, 4),
(19, 0, 0, 5, 1, 1),
(20, 0, 0, 5, 1, 4),
(21, 4, 80, 5, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `role`) VALUES
(1, 'admin@gmail.com', 'admin', 'admin', 0),
(2, 'devpatel0508@gmail.com', 'dev', '123', 1),
(3, 'root@gmail.com', 'root', '123', 1),
(4, 'dhruv@gmail.com', 'dhruv', '123', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK8hejcpbbiq1qje11346akp3uj` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`);

--
-- Constraints for table `test_result`
--
ALTER TABLE `test_result`
  ADD CONSTRAINT `FKef3e8k7fgvkj4mox0lxrkf8hh` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  ADD CONSTRAINT `FKmu7x4i4r6swolpxwqx0n21lnn` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
