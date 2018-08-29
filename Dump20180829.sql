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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoequipments`
--

LOCK TABLES `autoequipments` WRITE;
/*!40000 ALTER TABLE `autoequipments` DISABLE KEYS */;
INSERT INTO `autoequipments` VALUES (1,'KZ 304 AE 06'),(2,'KZ 305 AE 06'),(3,'KZ 791 AD 06'),(4,'KZ 871 AO 06'),(5,'E580DRM'),(6,'KZ 759 CVA 06');
/*!40000 ALTER TABLE `autoequipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `information` varchar(255) NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Т ОО \"Анега Қазақстан\"','тел. білмеймін'),(2,'aksdkk','asdfasdf'),(3,'&lt;script&gt;','&lt;div&gt;div tag&lt;/div&gt;'),(4,'ИП &quot;Толқын&quot;','Толқын'),(5,'\'----\'','`---`');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Болаткали Серік','Начальник партии'),(2,'Уразбаев Бауыржан','Начальник партии'),(3,'Ералиев Арман','Начальник партии'),(4,'Бисалиев Рустем','Начальник партии'),(7,'Кульчиков Танатар','Начальник партии'),(8,'Азербаев Асылбек','Начальник партии'),(9,'Амангалиев Ержан','Начальник партии'),(10,'Бимуханов Ерлан','Начальник партии'),(11,'Амангалиев Талгат','Начальник партии'),(12,'Камешов Данияр','Начальник партии'),(13,'Асылбеков','Начальник партии'),(14,'Султанбеков','Начальник партии'),(15,'Тулеубаев','Начальник партии'),(16,'Пәленше 1','Начальник партии'),(17,'Пәленше 2','Начальник партии'),(18,'Пәленше 3','Каротажник-взрывник'),(19,'Пәленше 4','машинист'),(20,'Тексеру','Тексеру');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oilfields`
--

LOCK TABLES `oilfields` WRITE;
/*!40000 ALTER TABLE `oilfields` DISABLE KEYS */;
INSERT INTO `oilfields` VALUES (1,'Сазанқұрақ'),(2,'Мәтен'),(3,'Аңсаған'),(4,'Прорва');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pipes`
--

LOCK TABLES `pipes` WRITE;
/*!40000 ALTER TABLE `pipes` DISABLE KEYS */;
INSERT INTO `pipes` VALUES (45,'Шымкент',50,0.1),(46,'Шымкент',50,0.2),(47,'Труба АГК',50,0.9),(48,'&quot;&lt;&gt;&quot; ; \'  dsadf \'',50,0.4),(49,'Труба АГК',73,3);
/*!40000 ALTER TABLE `pipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `releaseAction`
--

DROP TABLE IF EXISTS `releaseAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `releaseAction` (
  `id_release` int(11) NOT NULL AUTO_INCREMENT,
  `id_auto` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL COMMENT 'Материалға жауапты кісі',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id_release`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `releaseAction`
--

LOCK TABLES `releaseAction` WRITE;
/*!40000 ALTER TABLE `releaseAction` DISABLE KEYS */;
INSERT INTO `releaseAction` VALUES (1,5,8,'2018-08-29 00:00:00'),(2,5,8,'2018-08-29 00:00:00'),(3,1,9,'2018-08-29 00:00:00'),(4,4,2,'2018-08-28 00:00:00'),(5,2,13,'2018-08-29 00:00:00');
/*!40000 ALTER TABLE `releaseAction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `released`
--

DROP TABLE IF EXISTS `released`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `released` (
  `id_release` int(11) NOT NULL,
  `id_pipe` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  KEY `index_id_release` (`id_release`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `released`
--

LOCK TABLES `released` WRITE;
/*!40000 ALTER TABLE `released` DISABLE KEYS */;
INSERT INTO `released` VALUES (2,48,1),(3,47,1),(3,45,3),(3,46,2),(4,46,1),(4,45,1),(5,49,4),(5,45,3),(5,46,6);
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

-- Dump completed on 2018-08-29 14:37:57
