CREATE DATABASE `virtual_classroom`;

USE `virtual_classroom`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL DEFAULT 'student',
  PRIMARY KEY (`id`)
);

CREATE TABLE `assignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(256) NOT NULL,
  `publishedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deadline` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`createdBy`),
  CONSTRAINT `created_by` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`)
);

CREATE TABLE `submissions` (
  `userId` int NOT NULL,
  `assignmentId` int NOT NULL,
  `remark` varchar(256) DEFAULT NULL,
  KEY `id_idx` (`userId`),
  KEY `id_idx1` (`assignmentId`),
  CONSTRAINT `assignmentId` FOREIGN KEY (`assignmentId`) REFERENCES `assignment` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);