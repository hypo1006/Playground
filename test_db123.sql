CREATE DATABASE javastudy;
USE javastudy;

CREATE TABLE `study` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `age` int(20)  NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `author` VALUES (1,'LSH',28);
INSERT INTO `author` VALUES (2,'LYC',25);
INSERT INTO `author` VALUES (3,'JJH',38);
INSERT INTO `author` VALUES (4,'KYA',31);
INSERT INTO `author` VALUES (5,'LEH',33);