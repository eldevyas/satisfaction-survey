USE survey;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) ZEROFILL NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL ,
  `full_name` varchar(255) NOT NULL GENERATED ALWAYS AS (CONCAT(first_name, ' ', last_name)),
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(255) NOT NULL,
  CONSTRAINT `email` UNIQUE (`email`),
  CONSTRAINT `username` UNIQUE (`username`),
  CONSTRAINT `id` PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

