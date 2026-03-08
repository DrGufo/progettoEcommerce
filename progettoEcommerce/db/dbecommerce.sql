CREATE DATABASE IF NOT EXISTS `dbecommerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dbecommerce`;

CREATE TABLE `prodottisede1` (
  `id_Prodotto` varchar(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `prezzo` float NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `prodottisede1` (`id_Prodotto`, `categoria`, `descrizione`, `prezzo`, `quantita`) VALUES
('10S1', 'tecnologia', 'camera', 700, 3),
('1S1', 'tecnologia', 'iphone 14', 1000, 0),
('2S1', 'tecnologia', 'laptop', 1500, 0),
('3S1', 'tecnologia', 'smartwatch', 300, 14),
('4S1', 'tecnologia', 'headphones', 200, 15),
('5S1', 'tecnologia', 'smart TV', 1200, 8),
('6S1', 'tecnologia', 'gaming console', 500, 12),
('7S1', 'tecnologia', 'wireless earbuds', 100, 29),
('8S1', 'tecnologia', 'tablet', 800, 6),
('9S1', 'tecnologia', 'smart speaker', 150, 25);

CREATE TABLE `prodottisede2` (
  `id_Prodotto` varchar(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `descrizione` varchar(255) NOT NULL,
  `prezzo` float NOT NULL,
  `quantita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `prodottisede2` (`id_Prodotto`, `categoria`, `descrizione`, `prezzo`, `quantita`) VALUES
('10S2', 'tecnologia', 'alimentatore', 100, 50),
('1S2', 'tecnologia', 'webcam', 50, 10),
('2S2', 'tecnologia', 'stampante', 200, 16),
('3S2', 'tecnologia', 'tablet', 500, 10),
('4S2', 'tecnologia', 'hard disk', 100, 49),
('5S2', 'tecnologia', 'ssd', 100, 50),
('6S2', 'tecnologia', 'ram', 100, 49),
('7S2', 'tecnologia', 'cpu', 100, 49),
('8S2', 'tecnologia', 'gpu', 100, 49),
('9S2', 'tecnologia', 'case', 100, 49);

ALTER TABLE `prodottisede1`
  ADD PRIMARY KEY (`id_Prodotto`);

ALTER TABLE `prodottisede2`
  ADD PRIMARY KEY (`id_Prodotto`);
