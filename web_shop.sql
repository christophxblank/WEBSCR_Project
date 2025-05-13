-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 13. Mai 2025 um 11:08
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
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `valid_until` date NOT NULL,
  `benefit_amount` decimal(38,2) DEFAULT NULL
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
  `price` decimal(38,2) DEFAULT NULL,
  `stock` int(30) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category_id` int(20) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `item`
--

INSERT INTO `item` (`id`, `name`, `price`, `stock`, `description`, `category_id`, `image_url`, `rating`) VALUES
(1, 'Logitech G413 Tastatur', 44.00, 30, 'Logitech G413 mechanische Gaming-Tastatur, Taktile Romer-G Switches, Gebürstetes Aluminiumgehäuse, Programmierbare F-Tasten, USB-Durchschleife, Deutsches QWERTZ-Layout - Carbon/Schwarz', 4, '/images/logitech_g413.jpg', NULL),
(3, 'USB-C auf HDMI Adapter', 19.99, 50, 'USB-C zu HDMI Adapter, 4K@30Hz Support', 1, '/images/usbCtoHDMI.jpg', 4.3),
(4, 'Ethernet Kabel Cat6 1m', 4.99, 200, 'Cat6 Netzwerkkabel, 1 Meter', 1, '/images/Ethernet1m.jpg', 4.1),
(5, 'USB-A Verlängerungskabel 2m', 5.49, 150, 'USB 2.0 Verlängerungskabel', 1, '/images/USB-A-2mKabel.jpeg', 4),
(6, 'USB-C Ladekabel 1m', 12.99, 120, 'USB Type-C Schnellladekabel', 1, '/images/USBC-1mKabel.jpg', 4.5),
(11, 'Intel Core i5-10400', 159.99, 25, 'Intel 10th Gen CPU, 6-Core', 2, '/images/I5processor.jpeg', 4.6),
(12, 'AMD Ryzen 5 3600', 199.99, 30, 'AMD Zen 2 Prozessor, 6-Core', 2, '/images/Ryzen5-3600.jpg', 4.7),
(13, 'Asus Prime B460M', 89.99, 15, 'Micro-ATX Motherboard', 2, '/images/AsusB460M.jpg', 4),
(19, 'Netgear Nighthawk R7000', 119.99, 12, 'AC1900 Dual-Band WLAN-Router', 3, '/images/NetgearNighthawkR7000.jpg', 4.4),
(20, 'AVM FRITZ!Box 7590', 249.00, 8, 'DSL-Modem & WLAN-Router', 3, '/images/AVM FRITZBox7590.jpeg', 4.5),
(21, 'Ubiquiti UniFi AP AC Lite', 99.99, 14, 'Indoor Access Point, PoE-fähig', 3, '/images/UbiquitiUniFiAPACLite.jpg', 4.3),
(27, 'Logitech MX Keys', 99.99, 22, 'Kabellose Tastatur', 4, '/images/LogitechMXKeys.jpg', 4.7),
(28, 'Logitech MX Anywhere 2S', 79.99, 30, 'Kabellose Reisemaus', 4, '/images/LogitechMXAnywhere2S.jpeg', 4.6),
(29, 'Razer DeathAdder V2', 49.99, 25, 'Gaming-Maus, 20 000 DPI Sensor', 4, '/images/RazerDeathAdderV2.jpeg', 4.5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `total_price` decimal(38,2) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `total_price`, `user_id`) VALUES
(1, '2025-05-13', 279.97, 3),
(20250000, '2025-05-13', 269.97, 3),
(20250001, '2025-05-13', 204.97, 3),
(20250002, '2025-05-13', 289.98, 3),
(20250003, '2025-05-13', 937.96, 3),
(20250004, '2025-05-13', 159.99, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `order_items`
--

CREATE TABLE `order_items` (
  `id` int(20) NOT NULL,
  `fk_item_id` int(20) NOT NULL,
  `fk_order_id` int(20) NOT NULL,
  `quantity` int(20) NOT NULL,
  `price` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `order_items`
--

INSERT INTO `order_items` (`id`, `fk_item_id`, `fk_order_id`, `quantity`, `price`) VALUES
(1, 27, 1, 2, 99.99),
(2, 28, 1, 1, 79.99),
(3, 29, 20250000, 1, 49.99),
(4, 19, 20250000, 1, 119.99),
(5, 21, 20250000, 1, 99.99),
(6, 27, 20250001, 1, 99.99),
(7, 4, 20250001, 1, 4.99),
(8, 21, 20250001, 1, 99.99),
(9, 12, 20250002, 1, 199.99),
(10, 13, 20250002, 1, 89.99),
(11, 19, 20250003, 2, 119.99),
(12, 20, 20250003, 2, 249.00),
(13, 21, 20250003, 2, 99.99),
(14, 11, 20250004, 1, 159.99);

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
  `title` varchar(255) DEFAULT NULL,
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
(2, 'test2', 'test2@test.com', 'test2', 'test2', 'user', 'mrs', '05584947372', 'user', 2, 2, 1),
(3, 'rainer1', 'tesete@gmail.mf', '$2a$10$4teXH14iWgjlEj0oDVbzcOTeZ./bhkUJeFU2.DQHr9RL7Dm/DvW3y', 'Rainer', 'Tester', 'Herr', '9329324320924', 'customer', 1, 1, 1),
(4, 'admin1', 'wi23b079@technikum-wien.at', '$2a$10$3SUhgr0IwydY.XuaCOcyd.BRsox2tBGe9FDg63J0k0tBSF3zBs8fK', 'Patrick', 'Schreiner', 'Herr', '000000000000', 'admin', 1, 1, 1);

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
  ADD KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`);

--
-- Indizes für die Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1x4ai99o5q92884os8kbtv87j` (`fk_item_id`),
  ADD KEY `FKpe4knliqkwc40irv961icagmk` (`fk_order_id`);

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
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20250005;

--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT für Tabelle `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FK2n9w8d0dp4bsfra9dcg0046l4` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints der Tabelle `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FK1x4ai99o5q92884os8kbtv87j` FOREIGN KEY (`fk_item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `FKpe4knliqkwc40irv961icagmk` FOREIGN KEY (`fk_order_id`) REFERENCES `orders` (`id`);

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
