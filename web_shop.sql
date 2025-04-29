-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Apr 2025 um 11:01
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `web_shop`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `address`
--

CREATE TABLE `address` (
  `id` int(10) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `plz` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `address`
--

INSERT INTO `address` (`id`, `street`, `city`, `country`, `plz`) VALUES
(1, 'Höchstädtplatz 23', 'Vienna', 'Austria ', '1070'),
(2, 'Teststreet 33', 'Madrid', 'Spain', '29384');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Kabel & Adapter'),
(2, 'PC-Komponenten'),
(3, 'Netzwerk & Router'),
(4, 'Eingabegeräte');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `coupons`
--

CREATE TABLE `coupons` (
  `id` int(10) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `valid_until` date NOT NULL,
  `benefit_amount` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `invoices`
--

CREATE TABLE `invoices` (
  `id` int(20) NOT NULL,
  `order_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `invoice_number` int(40) NOT NULL,
  `pdf_url` varchar(50) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `item`
--

CREATE TABLE `item` (
  `id` int(30) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `stock` int(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(20) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `item`
--

INSERT INTO `item` (`id`, `name`, `price`, `stock`, `description`, `category_id`, `image_url`) VALUES
(1, 'Logitech G413 Tastatur', '39.99', 30, 'Logitech G413 mechanische Gaming-Tastatur, Taktile Romer-G Switches, Gebürstetes Aluminiumgehäuse, Programmierbare F-Tasten, USB-Durchschleife, Deutsches QWERTZ-Layout - Carbon/Schwarz', 4, '/images/logitech_g413.jpg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `id` int(20) NOT NULL,
  `total_price` varchar(20) NOT NULL,
  `created_at` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `user_id_fk` int(20) NOT NULL,
  `fk_order_items_id` int(20) NOT NULL,
  `fk_coupons` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_items`
--

CREATE TABLE `order_items` (
  `id` int(20) NOT NULL,
  `fk_item_id` int(20) NOT NULL,
  `fk_order_id` int(20) NOT NULL,
  `quantity` int(20) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`) VALUES
(1, 'PayPal'),
(2, 'Kreditkarte');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `title` varchar(10) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `adress_fk` int(20) NOT NULL,
  `payment_fk` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `title`, `phone`, `role`, `adress_fk`, `payment_fk`, `active`) VALUES
(1, 'testuser', 'test@test.com', 'test', 'First', 'User', 'Mr', '0660574837', 'user', 1, 1, 1),
(2, 'test2', 'test2@test.com', 'test2', 'test2', 'user', 'mrs', '05584947372', 'user', 2, 2, 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2n9w8d0dp4bsfra9dcg0046l4` (`category_id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_fk` (`user_id_fk`);

--
-- Indizes für die Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi7x2mj4prb7t0cdqavymirkew` (`adress_fk`),
  ADD KEY `FKspx2jd1jq9g5w1gpcpcfebf0u` (`payment_fk`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `address`
--
ALTER TABLE `address`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `item`
--
ALTER TABLE `item`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FK2n9w8d0dp4bsfra9dcg0046l4` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKi7x2mj4prb7t0cdqavymirkew` FOREIGN KEY (`adress_fk`) REFERENCES `address` (`id`),
  ADD CONSTRAINT `FKspx2jd1jq9g5w1gpcpcfebf0u` FOREIGN KEY (`payment_fk`) REFERENCES `payment_methods` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
