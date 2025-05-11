INSERT INTO `item`
(`id`,`name`,`price`,`stock`,`description`,`category_id`,`image_url`,`rating`)
VALUES
    -- Kategorie 1: Kabel & Adapter
    ( 3, 'USB-C auf HDMI Adapter',      19.99, 50, 'USB-C zu HDMI Adapter, 4K@30Hz Support',        1, '/images/usbCtoHDMI.jpg', 4.3),
    ( 4, 'Ethernet Kabel Cat6 1m',       4.99,200, 'Cat6 Netzwerkkabel, 1 Meter',                     1, '/images/Ethernet1m.jpg', 4.1),
    ( 5, 'USB-A Verlängerungskabel 2m',   5.49,150, 'USB 2.0 Verlängerungskabel',                     1, '/images/USB-A-2mKabel.jpeg', 4.0),
    ( 6, 'USB-C Ladekabel 1m',           12.99,120, 'USB Type-C Schnellladekabel',                      1, '/images/USBC-1mKabel.jpg', 4.5),

    -- Kategorie 2: PC-Komponenten
    (11, 'Intel Core i5-10400',         159.99, 25, 'Intel 10th Gen CPU, 6-Core',                       2, '/images/I5processor.jpeg', 4.6),
    (12, 'AMD Ryzen 5 3600',            199.99, 30, 'AMD Zen 2 Prozessor, 6-Core',                     2, '/images/Ryzen5-3600.jpg', 4.7),
    (13, 'Asus Prime B460M',             89.99, 15, 'Micro-ATX Motherboard',                            2, '/images/AsusB460M.jpg', 4.0),

    -- Kategorie 3: Netzwerk & Router
    (19, 'Netgear Nighthawk R7000',     119.99, 12, 'AC1900 Dual-Band WLAN-Router',                    3, '/images/NetgearNighthawkR7000.jpg', 4.4),
    (20, 'AVM FRITZ!Box 7590',          249.00,  8, 'DSL-Modem & WLAN-Router',                          3, '/images/AVM FRITZBox7590.jpeg', 4.5),
    (21, 'Ubiquiti UniFi AP AC Lite',     99.99, 14, 'Indoor Access Point, PoE-fähig',                   3, '/images/UbiquitiUniFiAPACLite.jpg', 4.3),

    -- Kategorie 4: Eingabegeräte
    (27, 'Logitech MX Keys',             99.99, 22, 'Kabellose Tastatur',                               4, '/images/LogitechMXKeys.jpg', 4.7),
    (28, 'Logitech MX Anywhere 2S',      79.99, 30, 'Kabellose Reisemaus',                              4, '/images/LogitechMXAnywhere2S.jpeg', 4.6),
    (29, 'Razer DeathAdder V2',          49.99, 25, 'Gaming-Maus, 20 000 DPI Sensor',                   4, '/images/RazerDeathAdderV2.jpeg', 4.5)
