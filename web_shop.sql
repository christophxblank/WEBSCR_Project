-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Mai 2025 um 15:30
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
(1, 'Höchstädtplatz 23', 'Wien', 'Österreich', '1070'),
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
(3, 'USB-C auf HDMI Adapter', 19.99, 50, 'USB-C zu HDMI Adapter, 4K@30Hz Support', 1, '/images/usbCtoHDMI.jpg', 4.3),
(4, 'Ethernet Kabel Cat6 1m', 4.99, 200, 'Cat6 Netzwerkkabel, 1 Meter', 1, '/images/Ethernet1m.jpg', 4.1),
(5, 'USB-A Verlängerungskabel 2m', 5.49, 150, 'USB 2.0 Verlängerungskabel', 1, '/images/USB-A-2mKabel.jpeg', 4),
(6, 'USB-C Ladekabel 1m', 12.99, 120, 'USB Type-C Schnellladekabel', 1, '/images/USBC-1mKabel.jpg', 4.5),
(11, 'Intel Core i5-10400', 159.99, 25, 'Intel 10th Gen CPU, 6-Core', 2, '/images/I5processor.jpeg', 4.6),
(12, 'AMD Ryzen 5 3600', 199.99, 30, 'AMD Zen 2 Prozessor, 6-Core', 2, '/images/Ryzen5-3600.jpg', 4.7),
(13, 'Asus Prime B460M', 89.99, 15, 'Micro-ATX Motherboard', 2, '/images/AsusB460M.jpg', 4),
(19, 'Netgear Nighthawk R7000', 119.82, 12, 'AC1900 Dual-Band WLAN-Router', 3, '/images/NetgearNighthawkR7000.jpg', 4.4),
(20, 'AVM FRITZ!Box 7590', 249.00, 8, 'DSL-Modem & WLAN-Router', 3, '/images/AVM FRITZBox7590.jpeg', 4.5),
(21, 'Ubiquiti UniFi AP AC Lite', 99.99, 14, 'Indoor Access Point, PoE-fähig', 3, '/images/UbiquitiUniFiAPACLite.jpg', 4.3),
(27, 'Logitech MX Keys', 99.99, 22, 'Kabellose Tastatur', 4, '/images/LogitechMXKeys.jpg', 4.7),
(28, 'Logitech MX Anywhere 2S', 79.99, 30, 'Kabellose Reisemaus', 4, '/images/LogitechMXAnywhere2S.jpeg', 4.6),
(29, 'Razer DeathAdder V2', 49.99, 25, 'Gaming-Maus, 20 000 DPI Sensor', 4, '/images/RazerDeathAdderV2.jpeg', 4.5),
(30, 'HDMI Kabel 2m', 8.99, 100, 'High-Speed HDMI 2.0 Kabel, 2 Meter Länge mit vergoldeten Kontakten und abgeschirmtem Design für minimale Interferenzen', 1, '/images/HDMIKabel2m.jpg', 4.4),
(31, 'DisplayPort auf HDMI Adapter', 14.99, 60, 'DisplayPort-auf-HDMI Adapter, unterstützt 4K@60Hz, vergoldete Kontakte und robuste Aluminiumhülle für stabile Signalübertragung', 1, '/images/DisplayPortToHDMI.jpg', 3.4),
(32, 'VGA auf HDMI Adapter', 17.49, 40, 'VGA-auf-HDMI Adapter wandelt analoges VGA-Signal in digitales HDMI um, unterstützt Auflösungen bis 1080p und Plug-and-Play', 1, '/images/VGAtoHDMI.jpg', 3.8),
(33, 'USB 3.0 Hub 4-Port', 12.49, 80, 'USB 3.0 Hub mit 4 Ports, Datenraten bis zu 5 Gbit/s, kompaktes Design mit integriertem Kabel und LED-Statusanzeige', 1, '/images/USB3Hub4Port.jpg', 3.8),
(34, 'Ethernet Kabel Cat7 2m', 9.99, 150, 'Cat7 geschirmtes Ethernet-Kabel, 2 Meter Länge, unterstützt bis zu 10 Gbit/s, robustes Nylon-Ummantelung für extra Flexibilität', 1, '/images/EthernetCat7-2m.jpg', 4.6),
(35, 'Thunderbolt 3 Dock', 129.99, 20, 'Thunderbolt 3 Dock mit 5 Anschlüssen (USB-C PD, USB-A, HDMI, Ethernet), 40 Gbit/s Bandbreite und Aluminiumgehäuse', 1, '/images/Thunderbolt3Dock.jpg', 4.5),
(36, 'USB-C Ladestation 3 Ports', 29.99, 70, 'USB-C Schnellladestation mit 3 Ports, 65 W Gesamtleistung, intelligente Ladeerkennung und kompaktes Reise-Design', 1, '/images/USBCCharger3Port.jpg', 4.8),
(37, 'Lightning auf USB-C Kabel 1m', 15.99, 90, 'Apple MFi-zertifiziertes Lightning-auf-USB-C Kabel, 1 Meter Länge, unterstützt Schnellladen und stabile Datenübertragung', 1, '/images/LightningToUSBC1m.jpg', 3.5),
(38, 'NVIDIA GeForce RTX 3060', 349.99, 15, 'Grafikkarte mit 12 GB GDDR6, unterstützt Ray-Tracing, DLSS und flüssiges 1440p Gaming', 2, '/images/RTX3060.jpg', 4.1),
(39, 'AMD Radeon RX 6600 XT', 379.99, 12, 'Grafikkarte mit 8 GB GDDR6 und RDNA 2 Architektur für effiziente 1080p Gaming-Performance', 2, '/images/RX6600XT.jpg', 3.4),
(40, 'Corsair Vengeance LPX 16GB', 84.99, 40, 'DDR4 3200 MHz RAM-Kit (2×8 GB), niedriges Profil, ideal für kompakte Systeme und Overclocking', 2, '/images/CorsairVengeance16GBDDR4.jpg', 3.7),
(41, 'G.Skill Ripjaws V 32GB', 159.99, 25, 'DDR4 3600 MHz RAM-Kit (2×16 GB) mit robustem Aluminium-Kühlkörper für stabile Performance', 2, '/images/RipjawsV32GBDDR4.jpg', 4.2),
(42, 'Samsung 970 EVO Plus 1TB', 129.99, 35, 'PCIe NVMe M.2 SSD mit bis zu 3500 MB/s Lesegeschwindigkeit, ideal für schnelle Systemlaufwerke', 2, '/images/Samsung970EVOPlus1TB.jpg', 3.4),
(43, 'WD Blue 1TB SATA SSD', 99.99, 50, '2,5″ SATA SSD mit bis zu 560 MB/s Lesegeschwindigkeit, langlebig und energiesparend', 2, '/images/WDBlue1TBSSD.jpg', 3.7),
(44, 'Seagate BarraCuda 2TB HDD', 59.99, 60, '7200 U/min HDD für Desktop-PCs, 2 TB Kapazität und zuverlässige Leistung', 2, '/images/SeagateBarraCuda2TB.jpg', 4.4),
(45, 'Corsair RM750x 750W', 119.99, 30, '750 W 80+ Gold Netzteil, vollmodular, leiser Betrieb dank Fluid-Dynamic-Lager', 2, '/images/CorsairRM750x.jpg', 4.3),
(46, 'be quiet! Pure Base 500DX', 99.99, 20, 'Mid-Tower Gehäuse mit hoher Airflow, drei ARGB-Lüfter und staubgeschützte Filter', 2, '/images/PureBase500DX.jpg', 3.8),
(47, 'Noctua NH-D15', 89.99, 18, 'Premium CPU-Luftkühler im Dual-Tower-Design, sechs Heatpipes und zwei NF-A15-Lüfter', 2, '/images/NoctuaNHD15.jpg', 4.3),
(48, 'TP-Link TL-SG108', 24.99, 25, 'Unmanaged 8-Port Gigabit Switch im robusten Metallgehäuse, geräuschloser Betrieb', 3, '/images/TL-SG108.jpg', 4.7),
(49, 'Netgear GS305P PoE Switch', 69.99, 10, '5-Port Gigabit PoE+ Switch mit 4 PoE-Ports (je 30 W), Plug-and-Play Installation', 3, '/images/GS305P.jpg', 3.4),
(50, 'Synology DiskStation DS220+', 299.99, 5, '2-Bay NAS mit Dual-Core CPU, 2 GB RAM, RAID 0/1 und 4K-Transkodierung', 3, '/images/DS220+.jpg', 4.7),
(51, 'Devolo dLAN 1200+', 54.99, 30, 'Powerline Adapter Kit bis 1200 Mbit/s, integrierte Steckdose und AES-Verschlüsselung', 3, '/images/DevoloDLAN1200Plus.jpg', 4.5),
(52, 'TP-Link RE650', 59.99, 22, 'AC2600 WLAN-Repeater, Dual-Band, vier externe Antennen und Gigabit-Ethernet-Port', 3, '/images/RE650.jpg', 3.9),
(53, 'Google Nest Wifi Mesh Router', 179.00, 15, 'Mesh-System für bis zu 220 m² Abdeckung, Sprachsteuerung und einfache App-Einrichtung', 3, '/images/NestWifi.jpg', 3.6),
(54, 'Logitech G915 TKL', 199.99, 18, 'Kabellose mechanische Tastatur mit low-profile GL-Switches, RGB-Beleuchtung und Aluminiumgehäuse', 4, '/images/LogitechG915TKL.jpg', 4.9),
(55, 'Razer Huntsman Elite', 179.99, 12, 'Mechanische Gaming-Tastatur mit optischen Switches, Handballenauflage und Multi-Funktionsrad', 4, '/images/RazerHuntsmanElite.jpg', 3.9),
(56, 'Wacom Intuos S', 79.99, 22, 'Grafiktablet mit druckempfindlichem Stift, kompakt und ideal für digitales Zeichnen und Bildbearbeitung', 4, '/images/WacomIntuosS.jpg', 3.5),
(57, 'Logitech Brio 4K Webcam', 149.99, 15, 'Webcam mit 4K Ultra HD, HDR, Autofokus und Windows Hello Unterstützung', 4, '/images/LogitechBrio4K.jpg', 3.6),
(58, 'SteelSeries Arctis 7', 129.99, 20, 'Kabelloses Gaming-Headset mit klarer Klangqualität, DTS Headphone:X v2.0 und langer Akkulaufzeit', 4, '/images/Arctis7.jpg', 4.8),
(59, 'Corsair MM300 Mousepad', 29.99, 50, 'Stabiles Stoff-Mousepad mit rutschfester Gummibasis und großer, nahtloser Oberfläche für präzise Mausbewegungen', 4, '/images/CorsairMM300.jpg', 4.4);

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
(20250004, '2025-05-13', 159.99, 3),
(20250005, '2025-05-18', 179.98, 4),
(20250006, '2025-05-18', 289.98, 4),
(20250007, '2025-05-18', 19.99, 4),
(20250008, '2025-05-18', 359.98, 4),
(20250009, '2025-05-18', 239.64, 4),
(20250010, '2025-05-18', 149.98, 4);

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
(14, 11, 20250004, 1, 159.99),
(15, 28, 20250005, 1, 79.99),
(16, 27, 20250005, 1, 99.99),
(17, 12, 20250006, 1, 199.99),
(18, 13, 20250006, 1, 89.99),
(19, 3, 20250007, 1, 19.99),
(20, 11, 20250008, 1, 159.99),
(21, 12, 20250008, 1, 199.99),
(22, 19, 20250009, 2, 119.82),
(23, 27, 20250010, 1, 99.99),
(24, 29, 20250010, 1, 49.99);

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
(1, 'testuser', 'test@test.com', 'test', 'First', 'User', 'Mr', '0660574837', 'user', 1, 1, 0),
(2, 'test2', 'test2@test.com', 'test2', 'test2', 'user', 'mrs', '05584947372', 'user', 2, 2, 1),
(3, 'rainer1', 'tesete@gmail.mf', '$2a$10$4teXH14iWgjlEj0oDVbzcOTeZ./bhkUJeFU2.DQHr9RL7Dm/DvW3y', 'Rainer', 'Tester', 'Herr', '9329324320924', 'customer', 1, 1, 1),
(4, 'admin1', 'wi23b079@technikum-wien.at', '$2a$10$3SUhgr0IwydY.XuaCOcyd.BRsox2tBGe9FDg63J0k0tBSF3zBs8fK', 'Patrick', 'Schreiner', 'Herr', '000000000000', 'admin', 1, 2, 1);

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
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20250011;

--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
