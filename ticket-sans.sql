-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2021 at 09:10 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket-sans`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `booking_ticket` int(11) NOT NULL,
  `booking_total_price` int(11) NOT NULL,
  `booking_payment_method` varchar(150) NOT NULL,
  `booking_status` enum('successful','failed') DEFAULT NULL,
  `booking_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `booking_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `premiere_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `booking_created_at`, `booking_updated_at`) VALUES
(1, 1, 1, 30, 'Gopay', 'successful', '2020-12-31 23:38:03', NULL),
(2, 2, 2, 40, 'Ovo', 'failed', '2021-02-08 23:38:03', NULL),
(3, 1, 1, 30, 'Gopay', 'successful', '2021-02-16 23:38:09', NULL),
(4, 2, 2, 40, 'Ovo', 'failed', '2021-04-13 23:38:09', NULL),
(5, 10, 4, 30, 'Paypal', 'successful', '2021-04-28 11:41:22', NULL),
(6, 10, 4, 30, 'Paypal', 'successful', '2021-05-05 11:41:28', NULL),
(7, 10, 4, 30, 'Paypal', 'successful', '2021-03-10 11:48:30', NULL),
(8, 10, 4, 30, 'Paypal', 'failed', '2021-03-16 11:53:31', NULL),
(9, 10, 4, 30, 'Paypal', 'successful', '2021-01-06 11:56:05', NULL),
(10, 10, 4, 30, 'Paypal', 'successful', '2021-04-29 15:26:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `booking_seat_location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(1, 1, 'A1'),
(2, 1, 'A1'),
(3, 2, 'C4'),
(4, 2, 'D3'),
(5, 3, 'F8'),
(6, 4, 'A2'),
(7, 1, 'A1'),
(8, 2, 'C4'),
(9, 2, 'D3'),
(10, 3, 'F8'),
(11, 4, 'A2'),
(12, 13, 'F8'),
(13, 10, 'C1');

-- --------------------------------------------------------

--
-- Table structure for table `e-mail`
--

CREATE TABLE `e-mail` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_first_name` int(11) NOT NULL,
  `profile_last_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_city` varchar(250) NOT NULL,
  `location_address` text NOT NULL,
  `location_price` int(11) NOT NULL,
  `location_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_city`, `location_address`, `location_price`, `location_created_at`, `location_updated_at`) VALUES
(1, 'Depok', 'Cinangka', 100, '2021-01-06 16:18:16', '2021-04-12 16:18:16'),
(2, 'Tangerang Selatan', 'Pamulang', 400, '2021-02-19 15:56:09', NULL),
(4, 'Tangerang Selatan', 'Bintaro', 350, '2021-03-17 10:39:14', NULL),
(5, 'Tangerang Selatan', 'Ciputat', 700, '2021-01-07 10:40:51', '2021-04-13 10:40:51'),
(6, 'Jakarta Selatan', 'Blok M', 1200, '2021-04-15 10:39:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) NOT NULL,
  `movie_category` varchar(150) NOT NULL,
  `movie_release_date` date NOT NULL,
  `directed` varchar(100) NOT NULL,
  `duration_hour` int(2) NOT NULL,
  `duration_minute` int(2) NOT NULL,
  `casts` varchar(100) NOT NULL,
  `synopsis` varchar(1000) NOT NULL,
  `movie_image` varchar(100) NOT NULL,
  `movie_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `movie_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `directed`, `duration_hour`, `duration_minute`, `casts`, `synopsis`, `movie_image`, `movie_created_at`, `movie_updated_at`) VALUES
(28, 'Spider-Man: No Way Home', 'Action', '2021-04-26', 'zxc', 2, 34, 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'zxczxc', '2021-05-07T16-20-37.889Zcard-movie1.png', '2021-05-07 16:20:37', '2021-05-07 16:20:37'),
(29, 'Jumanji: Welcome to the Jungle', 'Adventure, Action', '2021-10-19', 'Jake Kasdan', 1, 59, 'Dwayne Johnson, Kevin Hart, Jack Black, Karen Gillan, Nick Jonas, Bobby Cannavale', 'Four high school teens in detention discover the magical board game Jumanji, now a video game, and after being sucked into it they become the avatars they’ve chosen. Crude but amusing sequel to the 1995 original, with Black having a ball as he gets in touch with his inner prom queen.', '', '2021-05-07 14:54:25', '2021-05-07 14:54:25'),
(31, 'THE ENDLESS', 'SCI-FI', '2021-10-21', ' Justin Benson, Aaron Moorhead', 1, 24, 'Aaron Moorhead, Justin Benson, Tate Ellington, Callie Hernandez', 'The Endless benefits from its grounded approach to an increasingly bizarre story, elevated by believable performances by filmmakers Justin Benson and Aaron Moorhead.', '', '2021-04-25 09:54:50', NULL),
(32, 'Godzilla vs. Kong', 'Action', '2021-05-08', ' Adam Wingard', 2, 23, ' Michael Dougherty, Edgar Wallace, Merian C. Cooper, Terry Rossio', 'An epic battle in the Monsterverse cinematic between Godzilla and Kong. Godzilla vs. Kong made mankind have to survive in various ways. One of them is to destroy the two giants. Who will win?', '', '2021-04-25 09:56:44', NULL),
(33, 'Mortal Kombat', 'Action', '2021-06-09', ' Simon McQuoid', 1, 50, ' Greg Russo, Sean Catherine Derek, David Callaham, Drew McWeeny, Scott Swan', 'MMA fighter Cole Young, accustomed to taking blows for money, is unaware of his legacy - or why Outer World Emperor Shang Tsung has sent his best warrior, Sub-Zero, an otherworldly Cryomancer, to hunt down Cole. Worried for his family\'s safety, Cole goes in search of Sonya Blade towards Jax, a Special Forces Major who has the same strange dragon mark as Cole at birth.', '', '2021-04-25 09:58:09', NULL),
(35, 'Batman', 'Action', '2021-04-22', 'Jon Watss', 2, 23, 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'as', '', '2021-04-26 01:27:17', '2021-04-26 01:27:17'),
(46, 'Spongebob', 'Action', '2021-04-09', 'asdasd', 2, 32, 'asd', 'asdasd', '', '2021-05-03 04:30:15', NULL),
(47, 'Spongebob', 'Action', '2021-04-08', 'asdasd', 2, 32, 'asd', 'asdasd', '2021-05-09T16-07-41.725Zblackwidow.png', '2021-05-09 16:07:41', '2021-05-09 16:07:41'),
(48, 'Superman', 'Action', '2021-05-07', 'Jon Watss', 2, 3, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'asdasd', '2021-05-07T13-11-40.013Zblackwidow.png', '2021-05-07 13:11:40', NULL),
(49, 'Avengers', 'Action', '2021-05-06', 'Jon Watss', 4, 12, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'asd', '2021-05-09T16-07-24.182Zcard-movie3.png', '2021-05-09 16:07:24', '2021-05-09 16:07:24'),
(50, 'Black Widow', 'Action', '2021-12-23', 'Jon Watss', 1, 40, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'asdasdasdsadasdsazc', '2021-05-09T16-07-10.142Zblackwidow.png', '2021-05-09 16:07:10', '2021-05-09 16:07:10'),
(51, 'Spider-Man: No Way Home', 'Action', '2021-05-20', 'Jon Watss', 1, 23, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'zxczxc', '2021-05-07T14-01-00.318Zcard-movie1.png', '2021-05-07 14:01:00', NULL),
(52, 'The Lion King', 'Animation', '1899-11-26', 'Jake Kasdan', 2, 34, 'Dwayne Johnson, Kevin Hart, Jack Black, Karen Gillan, Nick Jonas, Bobby Cannavale', 'asdasdasd', '2021-07-21T19-40-00.381Zcard-movie2.png', '2021-07-21 19:40:00', '2021-07-21 19:40:00'),
(53, 'John Wick 3', 'Action', '2021-07-13', 'Jon Watss', 2, 21, 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', 'asdasdasd', '2021-07-21T19-40-33.284Zcard-movie3.png', '2021-07-21 19:40:33', '2021-07-21 19:40:33'),
(54, 'Superman', 'Action', '2021-07-07', 'Jon Watss', 2, 12, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'asdasd', '2021-05-09T16-04-04.871Zblackwidow.png', '2021-05-09 16:04:05', '2021-05-09 16:04:05'),
(60, 'Superman', 'Action', '2021-05-19', 'Jon Watss', 2, 45, 'Tom Holland, Michael Keaton, Robert Downey Jr., ...', '', '2021-05-09T16-04-19.054Zcard-movie3.png', '2021-05-09 16:04:19', '2021-05-09 16:04:19'),
(62, 'Thor', 'Adventure, Action', '2021-12-28', 'Jake Kasdan', 2, 23, 'Tom Holland, Zendaya, Jacob Batalon, Marisa Tomei, Jamie Foxx, Benedict Cumberbatch, Alfred Molina', 'asdasd', '2021-05-09T15-17-35.027Zcard-movie2.png', '2021-05-09 15:17:35', '2021-05-09 15:17:35'),
(68, 'test', 'Action', '2021-04-08', 'asdasd', 2, 32, 'asd', 'asdasd', '2021-07-21T16-29-05.164Zcard-movie3.png', '2021-07-21 16:29:05', '2021-07-21 16:29:05');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `order_movie_name` varchar(100) NOT NULL,
  `order_date` varchar(100) NOT NULL,
  `order_time` time NOT NULL,
  `order_count` int(100) NOT NULL,
  `order_seats` varchar(100) NOT NULL,
  `order_price` int(100) NOT NULL,
  `order_premiere_image` varchar(100) NOT NULL,
  `order_premiere_name` varchar(100) NOT NULL,
  `order_location` varchar(100) NOT NULL,
  `order_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_movie_name`, `order_date`, `order_time`, `order_count`, `order_seats`, `order_price`, `order_premiere_image`, `order_premiere_name`, `order_location`, `order_created_at`) VALUES
(1, '', 'Spiderman', '19 July', '22:40:00', 3, 'A1,F4,F2', 20, '', 'hiflix', 'Cinangka', '2021-07-19 15:45:19'),
(2, '', 'Spiderman', '19 July', '22:40:00', 3, 'A1,F4,F2', 20, '', 'hiflix', 'Pamulang', '2021-07-19 15:46:14'),
(3, '', 'Spiderman', '19 July', '22:40:00', 3, 'A1,F4,F2', 20, '23', 'ebu.id', 'Bintaro', '2021-07-19 16:27:39'),
(4, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'hiflix', 'Ciputat', '2021-07-19 16:52:14'),
(5, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'cinemaOne21', 'Blok M', '2021-07-19 16:54:30'),
(6, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'cinemaOne21', 'Blok M', '2021-07-19 16:55:09'),
(7, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'hiflix', 'Bintaro', '2021-07-19 16:55:11'),
(8, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'hiflix', 'Ciputat', '2021-02-09 16:55:22'),
(9, '', 'Superman', 'Monday, 19 Juli 2021', '09:00:00', 3, 'C9,D12,E12', 10, '2021-07-18T14-54-18.514Zhiflix.png', 'ebu.id', 'Ciputat', '2021-07-19 16:55:45'),
(10, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 2, 'F11,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'ebu.id', 'Ciputat', '2021-04-13 17:20:33'),
(11, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 2, 'F11,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'hiflix', 'Ciputat', '2021-07-19 17:23:10'),
(12, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 2, 'F11,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'cinemaOne21', 'Ciputat', '2021-07-19 17:23:48'),
(13, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 2, 'F11,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'cinemaOne21', 'Ciputat', '2020-10-05 17:25:03'),
(14, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 2, 'F11,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'ebu.id', 'Ciputat', '2021-07-19 17:28:10'),
(15, '57', 'Superman', 'Tuesday, 20 Juli 2021', '13:00:00', 3, 'E11,D12,E13', 30, '2021-07-18T14-53-26.501Zebu.id.png', 'ebu.id', 'Ciputat', '2021-07-19 17:31:39'),
(16, '57', 'Superman', 'Wednesday , 21 Juli 2021', '13:00:00', 2, 'D9,D10', 30, '2021-07-18T14-53-26.501Zebu.id.png', '', '', '2021-07-21 03:03:22'),
(17, '57', 'test', 'Thursday, 22 Juli 2021', '13:00:00', 1, 'E11', 30, '2021-07-18T14-53-26.501Zebu.id.png', '', '', '2021-07-21 19:23:55');

-- --------------------------------------------------------

--
-- Table structure for table `premiere`
--

CREATE TABLE `premiere` (
  `premiere_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `premiere_name` varchar(250) NOT NULL,
  `premiere_price` int(11) NOT NULL,
  `premiere_image` varchar(100) NOT NULL,
  `premiere_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `premiere_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premiere`
--

INSERT INTO `premiere` (`premiere_id`, `movie_id`, `location_id`, `premiere_name`, `premiere_price`, `premiere_image`, `premiere_created_at`, `premiere_updated_at`) VALUES
(1, 1, 1, 'Ebu.id', 30, '2021-07-18T14-53-26.501Zebu.id.png', '2021-07-18 14:53:26', '2021-07-18 14:53:26'),
(2, 2, 2, 'Hiflix', 10, '2021-07-18T14-54-18.514Zhiflix.png', '2021-07-18 14:54:18', '2021-07-18 14:54:18'),
(5, 2, 2, 'Hiflix', 10, '2021-07-18T14-56-17.527Zcineone21.png', '2021-07-18 14:56:17', '2021-07-18 14:56:17'),
(7, 7, 6, 'Hiflix', 16, '2021-07-18T14-58-21.848Zhiflix.png', '2021-07-18 14:58:21', '2021-07-18 14:58:21'),
(8, 8, 6, 'cinemaOne21', 50, '', '2021-04-15 03:04:39', NULL),
(9, 9, 10, 'cinemaOne21', 20, '', '2021-05-01 03:04:45', NULL),
(10, 2, 2, 'Cinema One 21', 30, '2021-07-18T14-46-14.356Zcineone21.png', '2021-07-18 14:46:14', '2021-07-18 14:46:14'),
(11, 11, 12, 'cinemaOne21', 20, '', '2021-02-10 03:04:50', NULL),
(12, 12, 12, 'cinemaOne21', 20, '', '2021-03-11 07:22:04', NULL),
(14, 14, 12, 'cinemaOne21', 20, '2021-04-29T07-43-57.611Zcineone21.png', '2021-03-03 03:04:53', NULL),
(15, 15, 12, 'ebu.id', 20, '2021-04-29T09-52-11.589Zebu.id.png', '2021-03-10 03:05:01', NULL),
(16, 12, 12, 'ebu.id', 20, '', '2021-05-03 04:20:59', NULL),
(17, 1, 1, 'hiflix', 20, '', '2021-05-03 04:22:47', NULL),
(18, 2, 3, 'hiflix', 3500, '2021-07-18T08-00-44.206Zhiflix.png', '2021-07-18 08:00:44', NULL),
(19, 2, 3, 'ebu', 3500, '2021-07-18T08-18-13.216Zhiflix.png', '2021-07-18 08:18:13', NULL),
(20, 2, 3, 'ebu', 3500, '', '2021-07-18 12:32:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `show_time`
--

CREATE TABLE `show_time` (
  `show_time_id` int(11) NOT NULL,
  `premiere_id` int(11) NOT NULL,
  `show_time_date` date NOT NULL,
  `show_time_clock` time NOT NULL,
  `show_time_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `show_time_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `show_time`
--

INSERT INTO `show_time` (`show_time_id`, `premiere_id`, `show_time_date`, `show_time_clock`, `show_time_created_at`, `show_time_updated_at`) VALUES
(1, 1, '2021-04-13', '16:00:00', '2021-04-12 22:23:57', NULL),
(2, 2, '2021-04-13', '19:30:00', '2021-04-12 22:24:11', NULL),
(3, 3, '2021-01-07', '17:30:00', '2021-05-02 14:43:59', NULL),
(4, 4, '2021-01-06', '14:30:00', '2021-05-02 14:44:09', NULL),
(5, 5, '2021-02-25', '20:00:00', '2021-05-02 14:44:13', NULL),
(7, 6, '2021-02-12', '21:00:00', '2021-05-09 13:33:53', NULL),
(8, 7, '2021-03-10', '21:00:00', '2021-05-02 14:44:21', NULL),
(9, 8, '2021-03-18', '20:00:00', '2021-05-09 13:33:56', NULL),
(16, 4, '2021-07-18', '15:12:00', '2021-07-18 08:42:53', NULL),
(17, 4, '2021-07-21', '15:12:00', '2021-07-18 08:42:53', NULL),
(18, 4, '2021-04-02', '15:12:00', '2021-07-18 08:42:53', NULL),
(19, 1, '2021-07-18', '09:00:00', '2021-07-18 12:33:44', NULL),
(20, 1, '2021-07-21', '11:00:00', '2021-07-18 12:33:44', NULL),
(21, 1, '2021-04-02', '13:00:00', '2021-07-18 12:33:44', NULL),
(22, 2, '2021-07-18', '09:00:00', '2021-07-18 12:34:59', NULL),
(23, 2, '2021-07-21', '11:00:00', '2021-07-18 12:34:59', NULL),
(24, 2, '2021-04-02', '13:00:00', '2021-07-18 12:34:59', NULL),
(25, 1, '2021-07-18', '14:00:00', '2021-07-18 13:18:28', NULL),
(26, 1, '2021-07-21', '19:00:00', '2021-07-18 13:18:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` int(10) NOT NULL DEFAULT 0,
  `user_status` int(100) NOT NULL DEFAULT 99,
  `user_name` varchar(150) NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_last_name` varchar(100) NOT NULL,
  `user_phone_number` varchar(15) NOT NULL,
  `user_image` varchar(100) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_status`, `user_name`, `user_email`, `user_password`, `user_last_name`, `user_phone_number`, `user_image`, `user_created_at`, `user_updated_at`) VALUES
(57, 1, 100, 'Rifqi', 'rifqiimtinan@gmail.com', '$2b$10$/unqIllkzfVSu4sICDecxO73bKaCsOmOGyNKSxjvcS70pJjLTnG46', '', '', '', '2021-05-10 03:49:48', '0000-00-00 00:00:00'),
(76, 0, 100, 'Rifqi', 'yegocix260@eyeremind.com', '$2b$10$MZmlq4XAy6AcoSToHvSnH.FReQuAKS6i7ZcNxDk9EkY5TbhCENROq', '', '', '', '2021-07-17 16:41:24', '0000-00-00 00:00:00'),
(77, 0, 99, 'Rifqi', 'cocavow855@nhmty.com', '$2b$10$efLsfoSwIt2RxOZIADklI.rKHUqqnE6fwQ0ataxn6cwamDkFruCU.', '', '', '', '2021-07-21 03:22:24', '0000-00-00 00:00:00'),
(78, 0, 100, 'Rifqi', 'cajawah534@dmsdmg.com', '$2b$10$IDauMDTS/XLnW8B58h5RjOmXsd3Jzo9j9qXAmxbxIUAn9hMW4EpI.', '', '', '', '2021-07-21 03:23:21', '0000-00-00 00:00:00'),
(79, 0, 99, 'test', 'admin@admin.com', '$2b$10$/Lyn7YDIm6LXp6VT6ZIi2Ow18KACzFPBq930hSynuKfcA.YNbBei6', '', '', '', '2021-07-22 06:47:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `premiere`
--
ALTER TABLE `premiere`
  ADD PRIMARY KEY (`premiere_id`);

--
-- Indexes for table `show_time`
--
ALTER TABLE `show_time`
  ADD PRIMARY KEY (`show_time_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `premiere`
--
ALTER TABLE `premiere`
  MODIFY `premiere_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `show_time`
--
ALTER TABLE `show_time`
  MODIFY `show_time_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
