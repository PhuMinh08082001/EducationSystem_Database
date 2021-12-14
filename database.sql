-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author`
--
CREATE DATABASE school;
use school;
DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `authorID` int NOT NULL,
  `authorName` varchar(255) NOT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (2001,'Nguyễn Đình Huy'),(2002,'Lê Xuân Đại'),(2003,'Võ Thị Hồng'),(2004,'Trần Đức Linh'),(2005,'Nguyễn Văn Hữu'),(2006,'Lê Quốc Thái');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `className` varchar(255) NOT NULL,
  `subjectID` char(6) NOT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`className`,`subjectID`,`semester`),
  KEY `subjectID` (`subjectID`,`semester`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`subjectID`, `semester`) REFERENCES `subject` (`subjectID`, `semester`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES ('L01','CH2041',211),('L01','CH2043',211),('L01','CH2051',211),('L01','CH2053',211),('L01','CH2059',192),('L01','CH2061',192),('L01','CH2087',192),('L01','CH3015',212),('L02','CH3015',212),('L01','CH3347',212),('L02','CH3347',212),('L01','CH3349',212),('L01','CH4007',192),('L01','CI1003',192),('L01','CO2013',211),('L02','CO2013',211),('L03','CO2013',211),('L04','CO2013',211),('L01','CO3001',211),('L02','CO3001',211),('L03','CO3001',211),('L04','CO3001',211),('L01','IM1007',192),('L02','IM1007',192),('L01','IM1009',192),('L02','IM1009',192);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compile`
--

DROP TABLE IF EXISTS `compile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compile` (
  `authorID` int NOT NULL,
  `textBookID` int NOT NULL,
  PRIMARY KEY (`authorID`,`textBookID`),
  KEY `textBookID` (`textBookID`),
  CONSTRAINT `compile_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `author` (`authorID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `compile_ibfk_2` FOREIGN KEY (`textBookID`) REFERENCES `textbook` (`textbookID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compile`
--

LOCK TABLES `compile` WRITE;
/*!40000 ALTER TABLE `compile` DISABLE KEYS */;
INSERT INTO `compile` VALUES (2001,1010),(2001,1111),(2001,2222),(2002,3333),(2002,4444),(2003,5555),(2004,6666),(2005,7777),(2005,8888),(2002,9999);
/*!40000 ALTER TABLE `compile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty` (
  `facultyID` int NOT NULL,
  `facultyName` varchar(255) NOT NULL,
  PRIMARY KEY (`facultyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (106,'Khoa học và Kĩ thuật máy tính'),(113,'Kĩ thuật hóa học'),(115,'Quản lý công nghiệp');
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecturer`
--

DROP TABLE IF EXISTS `lecturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecturer` (
  `lecturerID` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `facultyID` int NOT NULL,
  PRIMARY KEY (`lecturerID`),
  KEY `facultyID` (`facultyID`),
  CONSTRAINT `lecturer_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecturer`
--

LOCK TABLES `lecturer` WRITE;
/*!40000 ALTER TABLE `lecturer` DISABLE KEYS */;
INSERT INTO `lecturer` VALUES (9000001,'Mguyễn Thị Nhi',106),(9000002,'Lê Thị Thùy Trang',106),(9000003,'Lê Phạm Quốc Bảo',106),(9000004,'Trần Kim Liên',106),(9100001,'Võ Hoàng Phú',113),(9100002,'Hoàng Xuân Vinh',113),(9100003,'Lê Duy Tân',113),(9100004,'Lê Minh Quốc',113),(9200001,'Lê Khôi Nguyên',115),(9200002,'Lê Thị Mỹ Duyên',115),(9200003,'Võ Minh Đức',115),(9200004,'Nguyễn Ngọc Anh',115);
/*!40000 ALTER TABLE `lecturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managepoint`
--

DROP TABLE IF EXISTS `managepoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managepoint` (
  `subjectID` char(6) NOT NULL,
  `className` varchar(255) NOT NULL,
  `studentID` int NOT NULL,
  `lecturerID` int NOT NULL,
  `summaryPoINT` float DEFAULT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`subjectID`,`className`,`studentID`,`semester`),
  KEY `subjectID` (`subjectID`,`semester`),
  KEY `className` (`className`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `managepoint_ibfk_1` FOREIGN KEY (`subjectID`, `semester`) REFERENCES `class` (`subjectID`, `semester`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `managepoint_ibfk_2` FOREIGN KEY (`className`) REFERENCES `class` (`className`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `managepoint_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `managepoint_chk_1` CHECK ((((`summaryPoINT` >= 0) and (`summaryPoINT` <= 10)) or (`summaryPoINT` is null)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managepoint`
--

LOCK TABLES `managepoint` WRITE;
/*!40000 ALTER TABLE `managepoint` DISABLE KEYS */;
INSERT INTO `managepoint` VALUES ('CH2041','L01',1910007,9100002,0,211),('CH2043','L01',1910007,9200002,0,211),('CH2051','L01',1910007,9000002,0,211),('CH2053','L01',1910007,9200002,0,211),('CH2059','L01',1910007,9200002,0,192),('CH2061','L01',1910007,9200002,0,192),('CH2087','L01',1910007,9000002,0,192),('CH3015','L01',1910007,9100001,8,212),('CH3347','L01',1910007,9100001,0,212),('CH3349','L01',1910007,9100002,0,212),('CH4007','L01',1910007,9200004,0,192),('CI1003','L01',1910007,9100002,0,192),('CO2013','L01',1910006,9100002,0,211),('CO2013','L01',1911111,9000001,0,211),('CO2013','L01',1913328,9000001,9,211),('CO2013','L01',1915350,9000001,9,211),('CO2013','L02',1912345,9000002,9.5,211),('IM1007','L02',1910017,9200004,10,192);
/*!40000 ALTER TABLE `managepoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managesubject`
--

DROP TABLE IF EXISTS `managesubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managesubject` (
  `subjectID` char(6) NOT NULL,
  `textbookID` int NOT NULL,
  `lecturerID` int NOT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`subjectID`,`textbookID`,`semester`),
  KEY `subjectID` (`subjectID`,`semester`),
  KEY `textbookID` (`textbookID`),
  CONSTRAINT `managesubject_ibfk_1` FOREIGN KEY (`subjectID`, `semester`) REFERENCES `subject` (`subjectID`, `semester`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `managesubject_ibfk_2` FOREIGN KEY (`textbookID`) REFERENCES `textbook` (`textbookID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managesubject`
--

LOCK TABLES `managesubject` WRITE;
/*!40000 ALTER TABLE `managesubject` DISABLE KEYS */;
INSERT INTO `managesubject` VALUES ('CH3015',3333,9100001,212),('CH3015',4444,9100001,212),('CH3015',9999,9100001,212),('CO2013',1111,9000001,211),('CO2013',2222,9000001,211),('IM1007',7777,9200002,192),('IM1007',8888,9200002,192);
/*!40000 ALTER TABLE `managesubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `publisherID` int NOT NULL,
  `publisherName` varchar(255) NOT NULL,
  `domestic` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`publisherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1001,'Nhà xuất bản đại học quốc gia Hà Nội',1),(1002,'Nhà xuất bản đại học quốc gia TPHCM',1),(1003,'Nhà xuất bản đại học và trung học chuyên nghiệp',1);
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `subjectID` char(6) NOT NULL,
  `studentID` int NOT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`subjectID`,`studentID`,`semester`),
  KEY `subjectID` (`subjectID`,`semester`),
  KEY `studentID` (`studentID`),
  CONSTRAINT `register_ibfk_1` FOREIGN KEY (`subjectID`, `semester`) REFERENCES `subject` (`subjectID`, `semester`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `register_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `student` (`studentID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES ('CO2013',1910006,211),('CH2041',1910007,211),('CH2043',1910007,211),('CH2051',1910007,211),('CH2053',1910007,211),('CH2059',1910007,192),('CH2061',1910007,192),('CH2087',1910007,192),('CH3015',1910007,212),('CH3347',1910007,212),('CH3349',1910007,212),('CH4007',1910007,192),('CI1003',1910007,192),('IM1007',1910017,192),('IM1009',1910017,192),('CO2013',1911111,211),('CO2013',1912345,211),('CO3001',1912345,211),('CO2013',1913328,211),('CO3001',1913328,211),('CO2013',1915350,211),('CO3001',1915350,211);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `studentID` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `facultyID` int NOT NULL,
  PRIMARY KEY (`studentID`),
  KEY `facultyID` (`facultyID`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1811111,'Nguyễn Quang Anh','2000-01-01','Male','Active',113),(1811112,'Bùi Việt Anh ','2000-01-02','Male','Active',106),(1811113,'Nguyễn Xuân Hoàng','2000-02-05','Male','Active',113),(1811114,'Nguyễn Trần Quỳnh Anh','2000-01-03','Female','Active',115),(1811115,'Đoàn Đức Huy','2000-02-06','Male','Active',106),(1811116,'Đỗ Lê Khanh','2000-10-07','Male','Active',106),(1900010,'Lê Công Minh','2001-01-01','Male','Active',106),(1910001,'Nguyễn Thị Lâm Bằng','2001-01-04','Female','Active',115),(1910002,'Hoàng Ngọc Phương Chi','2001-01-05','Female','Active',115),(1910003,'Hoàng Mạnh Cường','2001-01-06','Male','Active',106),(1910004,'Nguyễn Đức Minh Đăng','2001-02-01','Male','Active',106),(1910005,'Phạm Minh Đức','2001-02-03','Male','Active',113),(1910006,'Hoàng Minh Hạnh','2001-02-04','Female','Active',106),(1910007,'Phan Bảo Phương Linh','2001-11-08','Female','Active',113),(1910008,'Đặng Thị Khánh Linh','2001-07-11','Male','Active',115),(1910009,'Phạm Hoàng Mạnh','2001-07-29','Male','Active',115),(1910011,'Trần Hà Thu','2001-03-15','Female','Active',115),(1910012,'Đỗ Thùy Trang','2001-08-11','Female ','Active',113),(1910013,'Nguyễn Hải Yến','2001-09-10','Female','Active',106),(1910015,'Nguyễn Ngọc Trinh','2001-10-04','Female','Active',106),(1910016,'Lương Hữu Phúc','2001-10-03','Male','Active',113),(1910017,'Lê Văn Vinh','2001-03-03','Male','Active',115),(1911111,'Nguyễn Văn A','2001-01-04','Male','Active',106),(1912345,'Nguyễn Minh Phú','2001-12-12','Male','Active',106),(1913328,'Hoàng Văn Hiếu','2001-01-29','Male','Active',106),(1915350,'Bùi Xuân Thông','2001-01-01','Male','Active',106);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subjectID` char(6) NOT NULL,
  `subjectName` varchar(255) NOT NULL,
  `facultyID` int NOT NULL,
  `numOfCredits` int NOT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`subjectID`,`semester`),
  KEY `facultyID` (`facultyID`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`facultyID`) REFERENCES `faculty` (`facultyID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `subject_chk_1` CHECK (((`numOfCredits` > 0) and (`numOfCredits` < 4)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('CH1001','Nhập môn kỹ thuật',113,2,191),('CH1003','Hóa đại cương',113,2,191),('CH2003','Hóa lý 1',113,2,201),('CH2013','Hóa vô cơ',113,2,201),('CH2019','Quá trình av thiết ị cơ học',113,1,202),('CH2021','Hóa hữu cơ',113,3,202),('CH2041','Thí nghiệm hóa lý ',113,1,211),('CH2043','Quá trình và thiết bị truyền nhiệt',113,3,202),('CH2043',' Quá trình và thiết bị truyền nhiệt',113,2,211),('CH2051','Quá trình và thiết bị truyền khối',113,2,211),('CH2053',' Thí nghiệm hóa hữu cơ',113,1,211),('CH2059','Kỹ thuật phản ứng',113,3,192),('CH2061','Cơ sở tính toán và thiết kế thiết bị hóa chất',113,2,192),('CH2087','Thực tập quá trình và thiết bị',113,1,192),('CH2109','Hóa lý 2',113,2,202),('CH2113','Hóa phân tích',113,3,201),('CH2115','Thí nghiệm hóa phân tích',113,1,202),('CH3015','Thí nghiệm quá trình thiết bị ',113,2,212),('CH3347','Kỹ thuật phản ứng ',113,3,212),('CH3349','Cơ sở tính toán thiết kế thiết bị hóa học',113,2,212),('CH4007','Đồ án thiết kế kỹ thuật hóa học',113,3,192),('CI1003','Vẽ Kĩ Thuật',113,2,192),('CO1005','Nhập môn lập trình',106,3,191),('CO1007','Cấu trúc rời rạc',106,2,192),('CO1023','Hệ thống số',106,3,191),('CO1027','Kĩ thuật lập trình',106,3,192),('CO2001','Kỹ năng chuyên nguyện cho kỹ sư',106,2,212),('CO2003','Cấu trúc dữ liệu và giải thuật',106,3,201),('CO2007','Kiến trúc máy tính',106,3,201),('CO2011','Mô hình hóa toán học',106,2,201),('CO2013','Hệ cơ sở dữ liệu',106,3,211),('CO2017','Hệ điều hành',106,3,202),('CO2039','Lập trình nâng cao',106,2,202),('CO3001','Công nghệ phần mềm',106,3,211),('CO3005','Nguyên lý ngôn ngữ lập trình',106,3,212),('CO3093','Mạng máy tính',106,3,211),('IM1001','Giới thiệu ngành',115,2,191),('IM1003','Kinh tế học vi mô',115,3,191),('IM1007','Quản trị đại cương ',115,3,192),('IM1009','Kinh tế học vĩ mô',115,3,192),('IM1011','Máy tính trong kinh doanh ',115,3,201),('IM1015','Kế toán tài chính ',115,3,191),('IM1017','Thống kê trong kinh doanh',115,2,192),('IM1019','Tiếp thị căn bản',115,1,192),('IM1029','Hệ thống sản xuất',115,3,201),('IM2017','Hành vi tổ chức',115,2,201),('IM2019','Kế toán quản trị ',115,2,201),('IM2033','Tài chính doanh nghiệp',115,2,202),('IM2035','Phương pháp định lượng ',115,1,202),('IM3021','Quản lý chuỗi cung ứng ',115,3,212),('IM3041','Hệ hỗ trợ quyết định và trí tuệ kinh doanh',115,1,212),('IM3047','Giao tiếp trong kinh doanh',115,3,211),('IM3059','Quản lý chiến lược',115,3,212),('IM3063','Quản lý chất lượng',115,2,211),('IM3081','Quản trị kinh doanh quốc tế ',115,2,212),('IM3085','Tài chính quốc tế',115,3,212),('IM3087','Hệ thống thông tin quản lý ',115,3,211);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teach`
--

DROP TABLE IF EXISTS `teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teach` (
  `className` varchar(255) NOT NULL,
  `subjectID` char(6) NOT NULL,
  `lecturerID` int NOT NULL,
  `week` int NOT NULL,
  `semester` int NOT NULL,
  PRIMARY KEY (`className`,`subjectID`,`week`,`lecturerID`,`semester`),
  KEY `subjectID` (`subjectID`,`semester`),
  KEY `lecturerID` (`lecturerID`),
  CONSTRAINT `teach_ibfk_1` FOREIGN KEY (`className`) REFERENCES `class` (`className`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_2` FOREIGN KEY (`subjectID`, `semester`) REFERENCES `class` (`subjectID`, `semester`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `teach_ibfk_3` FOREIGN KEY (`lecturerID`) REFERENCES `lecturer` (`lecturerID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teach`
--

LOCK TABLES `teach` WRITE;
/*!40000 ALTER TABLE `teach` DISABLE KEYS */;
INSERT INTO `teach` VALUES ('L01','CO2013',9000001,1,211),('L02','CO2013',9000002,1,211),('L02','CO2013',9000002,2,211),('L01','CO2013',9000003,2,211),('L01','CO2013',9000004,3,211),('L01','CH3015',9100001,1,212),('L01','CH3015',9100001,2,212),('L02','CH3015',9100002,1,212),('L02','CH3015',9100002,2,212),('L01','IM1007',9200002,1,192),('L01','IM1007',9200002,2,192),('L02','IM1007',9200004,1,192),('L02','IM1007',9200004,2,192);
/*!40000 ALTER TABLE `teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textbook`
--

DROP TABLE IF EXISTS `textbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textbook` (
  `textbookID` int NOT NULL,
  `textbookName` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `publisherID` int NOT NULL,
  `publishcationDate` date DEFAULT NULL,
  PRIMARY KEY (`textbookID`),
  KEY `publisherID` (`publisherID`),
  CONSTRAINT `textbook_ibfk_1` FOREIGN KEY (`publisherID`) REFERENCES `publisher` (`publisherID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textbook`
--

LOCK TABLES `textbook` WRITE;
/*!40000 ALTER TABLE `textbook` DISABLE KEYS */;
INSERT INTO `textbook` VALUES (1010,'Danh sách liên kết ','Công nghệ thôn tinh',1001,'2015-10-10'),(1111,'C++','Công nghệ thôn tin',1001,'2015-10-10'),(2222,'MySQL','Công nghệ thôn tin',1001,'2015-10-10'),(3333,'Hóa hữu cơ','Hóa học',1002,'2018-03-17'),(4444,'Hóa phân tích','Hóa học',1002,'2018-03-17'),(5555,'Cấu trúc dữ liệu','Công nghệ thôn tin',1001,'2015-10-10'),(6666,'HTML CSS JS từ cơ bản đến nâng cao','Công nghệ thông tin',1001,'2015-10-10'),(7777,'Kinh tế vĩ mô','Kinh tế',1003,'2014-01-01'),(8888,'Tiếp thị căn bản','Kinh tế',1003,'2014-01-01'),(9999,'Hóa vô cơ','Hóa học',1002,'2018-03-17');
/*!40000 ALTER TABLE `textbook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 23:55:11
