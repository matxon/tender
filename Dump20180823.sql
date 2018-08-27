-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: pipe
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autoequipments`
--

DROP TABLE IF EXISTS `autoequipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `autoequipments` (
  `id_auto` int(11) NOT NULL AUTO_INCREMENT,
  `gosnumber` varchar(45) NOT NULL,
  PRIMARY KEY (`id_auto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoequipments`
--

LOCK TABLES `autoequipments` WRITE;
/*!40000 ALTER TABLE `autoequipments` DISABLE KEYS */;
INSERT INTO `autoequipments` VALUES (1,'KZ 304 AE 06'),(2,'KZ 305 AE 06'),(3,'KZ 791 AD 06'),(4,'KZ 871 AO 06');
/*!40000 ALTER TABLE `autoequipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `id_employee` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  PRIMARY KEY (`id_employee`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Болаткали С','Начальник партии'),(2,'Уразбаев Б','Начальник партии'),(3,'Ералиев Арман','Начальник партии'),(4,'Бисалиев Рустем','Начальник партии');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oilfields`
--

DROP TABLE IF EXISTS `oilfields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oilfields` (
  `id_oilfield` int(11) NOT NULL AUTO_INCREMENT,
  `oilfieldname` varchar(45) NOT NULL,
  PRIMARY KEY (`id_oilfield`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oilfields`
--

LOCK TABLES `oilfields` WRITE;
/*!40000 ALTER TABLE `oilfields` DISABLE KEYS */;
/*!40000 ALTER TABLE `oilfields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pipes`
--

DROP TABLE IF EXISTS `pipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pipes` (
  `id_pipe` int(11) NOT NULL AUTO_INCREMENT,
  `pipe` varchar(45) NOT NULL,
  `diameter` int(11) NOT NULL,
  `length` float NOT NULL,
  PRIMARY KEY (`id_pipe`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pipes`
--

LOCK TABLES `pipes` WRITE;
/*!40000 ALTER TABLE `pipes` DISABLE KEYS */;
INSERT INTO `pipes` VALUES (1,'Труба АГК',114,2),(2,'Труба SHLUMBERGER',102,3),(3,'Труба Шымкент',73,5),(4,'Труба АГК',114,3),(5,'Труба Шымкент',102,3),(6,'Труба АГК',89,2),(7,'Труба SHLUMBERGER',102,3),(8,'Труба Шымкент',102,5),(9,'Труба АГК',89,3),(10,'Труба Шымкент',73,3),(11,'Труба АГК',73,2),(12,'Труба SHLUMBERGER',114,1),(13,'Труба Шымкент',89,5),(14,'Труба АГК',114,3),(15,'Труба Шымкент',102,3),(16,'Труба АГК',102,2),(17,'Труба SHLUMBERGER',102,3),(18,'Труба Шымкент',114,5),(19,'Труба АГК',114,3),(20,'Труба Шымкент',73,3),(21,'Труба АГК',114,2),(22,'Труба SHLUMBERGER',102,3),(23,'Труба Шымкент',114,5),(24,'Труба АГК',102,3),(25,'Труба Шымкент',114,3),(26,'Труба АГК',114,2),(27,'Труба SHLUMBERGER',114,1.5),(28,'Труба Шымкент',89,5),(29,'Труба АГК',73,3),(30,'Труба Шымкент',89,3),(31,'Труба АГК',114,2),(32,'Труба SHLUMBERGER',102,3),(33,'Труба Шымкент',73,5),(34,'Труба АГК',114,3),(35,'Труба Шымкент',102,3),(36,'Труба АГК',114,2),(37,'Труба SHLUMBERGER',102,3),(38,'Труба Шымкент',89,5),(39,'Труба АГК',114,3),(40,'Труба Шымкент',102,3);
/*!40000 ALTER TABLE `pipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `released`
--

DROP TABLE IF EXISTS `released`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `released` (
  `id_release` int(11) NOT NULL AUTO_INCREMENT,
  `id_auto` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL COMMENT 'Материалға жауапты кісі',
  `date` datetime NOT NULL,
  `id_pipe` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`id_release`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `released`
--

LOCK TABLES `released` WRITE;
/*!40000 ALTER TABLE `released` DISABLE KEYS */;
/*!40000 ALTER TABLE `released` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returns`
--

DROP TABLE IF EXISTS `returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `returns` (
  `id_return` int(11) NOT NULL AUTO_INCREMENT,
  `id_auto` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL COMMENT 'Материалға жауапты кісі',
  `date` datetime NOT NULL,
  `id_pipe` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`id_return`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returns`
--

LOCK TABLES `returns` WRITE;
/*!40000 ALTER TABLE `returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used`
--

DROP TABLE IF EXISTS `used`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `used` (
  `id_use` int(11) NOT NULL AUTO_INCREMENT,
  `id_auto` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL COMMENT 'Материалға жауапты кісі',
  `date` datetime NOT NULL,
  `id_oilfield` int(11) NOT NULL,
  `id_pipe` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  PRIMARY KEY (`id_use`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used`
--

LOCK TABLES `used` WRITE;
/*!40000 ALTER TABLE `used` DISABLE KEYS */;
/*!40000 ALTER TABLE `used` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'matxon','kmadi@inbox.ru','12345');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-23 14:04:04
