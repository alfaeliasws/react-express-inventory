-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 23, 2024 at 10:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store_inventory`
--
CREATE DATABASE IF NOT EXISTS `store_inventory` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `store_inventory`;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `stock`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Apple MacBook Pro 14\"  inch', 1338, '2024-08-23 12:35:34', '2024-08-23 15:01:17', NULL),
(2, 'Dell XPS 13', 30, '2024-08-23 12:35:34', NULL, NULL),
(3, 'Microsoft Surface Laptop 5', 20, '2024-08-23 12:35:34', NULL, NULL),
(4, 'HP Spectre x360', 40, '2024-08-23 12:35:34', NULL, NULL),
(5, 'Lenovo ThinkPad X1 Carbon', 25, '2024-08-23 12:35:34', NULL, NULL),
(6, 'ASUS ROG Zephyrus G14', 35, '2024-08-23 12:35:34', NULL, NULL),
(7, 'Acer Predator Helios 300', 15, '2024-08-23 12:35:34', NULL, NULL),
(8, 'Samsung Galaxy Tab S8', 45, '2024-08-23 12:35:34', NULL, NULL),
(9, 'Apple iPad Pro 11\"', 55, '2024-08-23 12:35:34', NULL, NULL),
(10, 'Google Pixel 7 Pro', 60, '2024-08-23 12:35:34', NULL, NULL),
(11, 'Sony WH-1000XM5 Headphones', 80, '2024-08-23 12:35:34', NULL, NULL),
(12, 'Jabra Elite 85t Earbuds', 70, '2024-08-23 12:35:34', NULL, NULL),
(13, 'Amazon Kindle Paperwhite', 90, '2024-08-23 12:35:34', NULL, NULL),
(14, 'Bose SoundLink Revolve+', 40, '2024-08-23 12:35:34', NULL, NULL),
(15, 'Nvidia Shield TV Pro', 25, '2024-08-23 12:35:34', NULL, NULL),
(16, 'Apple Watch Series 8a', 68, '2024-08-23 12:35:34', '2024-08-23 15:01:20', NULL),
(17, 'Fitbit Charge 5', 75, '2024-08-23 12:35:34', NULL, NULL),
(18, 'Samsung Galaxy Watch 5', 55, '2024-08-23 12:35:34', NULL, NULL),
(19, 'Logitech MX Master 3', 100, '2024-08-23 12:35:34', NULL, NULL),
(20, 'Razer DeathAdder V2 Mouse', 95, '2024-08-23 12:35:34', '2024-08-23 14:19:22', NULL),
(30, 'Lenovo Ideapad 300', 21, '2024-08-23 14:18:37', '2024-08-23 14:18:47', NULL),
(32, 'Apple Clutch', 52, '2024-08-23 14:22:17', '2024-08-23 14:28:52', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
