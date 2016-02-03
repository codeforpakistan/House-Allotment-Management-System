-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 03, 2016 at 12:43 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `estabdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `es_application`
--

CREATE TABLE IF NOT EXISTS `es_application` (
  `es_application_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_officer_id` int(11) DEFAULT NULL,
  `es_cnic_attached` int(1) DEFAULT NULL,
  `es_payslip_attached` int(1) DEFAULT NULL,
  `es_paid_bill_attached` int(1) DEFAULT NULL,
  `es_picture_attached` int(1) DEFAULT NULL,
  `es_appointment_letter_attached` int(1) DEFAULT NULL,
  `es_transfer_order_attached` int(1) DEFAULT NULL,
  `es_application_date` date DEFAULT NULL,
  PRIMARY KEY (`es_application_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `es_application`
--

INSERT INTO `es_application` (`es_application_id`, `es_officer_id`, `es_cnic_attached`, `es_payslip_attached`, `es_paid_bill_attached`, `es_picture_attached`, `es_appointment_letter_attached`, `es_transfer_order_attached`, `es_application_date`) VALUES
(1, 47, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(2, 48, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(3, 49, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(4, 50, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(5, 51, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(6, 52, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(7, 53, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(8, 54, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(9, 55, 0, 0, 0, 0, 0, 0, '2016-02-02'),
(10, 56, 0, 0, 0, 0, 0, 0, '2016-02-02');

-- --------------------------------------------------------

--
-- Table structure for table `es_bps`
--

CREATE TABLE IF NOT EXISTS `es_bps` (
  `es_bps_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_bps_title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`es_bps_id`),
  UNIQUE KEY `es_bps_title` (`es_bps_title`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `es_bps`
--

INSERT INTO `es_bps` (`es_bps_id`, `es_bps_title`) VALUES
(1, 'BPS-01'),
(2, 'BPS-02'),
(3, 'BPS-03'),
(4, 'BPS-04'),
(5, 'BPS-05'),
(6, 'BPS-06'),
(7, 'BPS-07'),
(8, 'BPS-08'),
(9, 'BPS-09'),
(10, 'BPS-10'),
(11, 'BPS-11'),
(12, 'BPS-12'),
(13, 'BPS-13'),
(14, 'BPS-14'),
(15, 'BPS-15'),
(16, 'BPS-16'),
(17, 'BPS-17'),
(18, 'BPS-18'),
(19, 'BPS-19'),
(20, 'BPS-20'),
(21, 'BPS-21'),
(22, 'BPS-22');

-- --------------------------------------------------------

--
-- Table structure for table `es_city`
--

CREATE TABLE IF NOT EXISTS `es_city` (
  `es_city_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_city_name` varchar(255) NOT NULL,
  PRIMARY KEY (`es_city_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `es_city`
--

INSERT INTO `es_city` (`es_city_id`, `es_city_name`) VALUES
(1, 'Peshawar'),
(2, 'Bannu'),
(3, 'Pabbi'),
(4, 'Mardan'),
(5, 'Swat'),
(6, 'Dera Ismail Khan'),
(7, 'Sawabi'),
(8, 'Charsada');

-- --------------------------------------------------------

--
-- Table structure for table `es_colony`
--

CREATE TABLE IF NOT EXISTS `es_colony` (
  `es_colony_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_colony_name` varchar(45) DEFAULT NULL,
  `es_colony_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_colony_id`),
  UNIQUE KEY `es_colony_name` (`es_colony_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `es_colony`
--

INSERT INTO `es_colony` (`es_colony_id`, `es_colony_name`, `es_colony_type_id`) VALUES
(1, 'Colony 01', 1),
(2, 'Colony 02', 2),
(3, 'Colony 03', 3),
(4, 'Colony 04', 4),
(5, 'Colony 05', 5),
(6, 'Colony 06', 6),
(7, 'Colony 07', 1),
(8, 'Colony 08', 1),
(9, 'Colony 09', 1),
(10, 'Colony 10', 2);

-- --------------------------------------------------------

--
-- Table structure for table `es_colony_type`
--

CREATE TABLE IF NOT EXISTS `es_colony_type` (
  `es_colony_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_colony_type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`es_colony_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `es_colony_type`
--

INSERT INTO `es_colony_type` (`es_colony_type_id`, `es_colony_type_name`) VALUES
(1, 'Type 2'),
(2, 'Type 3'),
(3, 'Type 4'),
(4, 'Type 5'),
(5, 'Type 6'),
(6, 'Type 7');

-- --------------------------------------------------------

--
-- Table structure for table `es_cookie`
--

CREATE TABLE IF NOT EXISTS `es_cookie` (
  `es_cookie_main_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_cookie_id` varchar(255) DEFAULT NULL,
  `es_cookie_netid` varchar(255) DEFAULT NULL,
  `es_cookie_ipaddress` varchar(255) DEFAULT NULL,
  `es_cookie_useragent` varchar(255) DEFAULT NULL,
  `es_cookie_orig_page_requested` varchar(120) DEFAULT NULL,
  `es_cookie_php_session_id` varchar(40) DEFAULT NULL,
  `es_cookie_created_at` datetime DEFAULT NULL,
  `es_cookie_updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`es_cookie_main_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `es_department`
--

CREATE TABLE IF NOT EXISTS `es_department` (
  `es_department_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_department_name` varchar(60) DEFAULT NULL,
  `es_department_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_department_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `es_department`
--

INSERT INTO `es_department` (`es_department_id`, `es_department_name`, `es_department_type_id`) VALUES
(1, 'Establishment', 2),
(2, 'Estate Office', 2),
(3, 'Home Office', 1),
(4, 'Police', 1),
(5, 'PMDC', 1),
(6, 'Fire Department', 1),
(7, 'IT Department', 1);

-- --------------------------------------------------------

--
-- Table structure for table `es_department_type`
--

CREATE TABLE IF NOT EXISTS `es_department_type` (
  `es_department_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_department_type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`es_department_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `es_department_type`
--

INSERT INTO `es_department_type` (`es_department_type_id`, `es_department_type_name`) VALUES
(1, 'External'),
(2, 'Internal');

-- --------------------------------------------------------

--
-- Table structure for table `es_designation`
--

CREATE TABLE IF NOT EXISTS `es_designation` (
  `es_designation_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_designation_title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`es_designation_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Dumping data for table `es_designation`
--

INSERT INTO `es_designation` (`es_designation_id`, `es_designation_title`) VALUES
(1, 'Director'),
(2, 'Deputy Director'),
(3, 'Assistant Director'),
(4, 'Commisinor'),
(6, 'Additional Commissioner'),
(7, 'Assistant Commissioner'),
(8, 'Peon'),
(9, 'Driver'),
(10, 'Computer Operator'),
(11, 'Office Assistant'),
(12, 'Assistant IT Manager'),
(13, 'E Office Trainer'),
(14, 'Support Engineer'),
(15, 'Web Engineer'),
(16, 'Assistant Web Developer'),
(17, 'Database Administrator'),
(18, 'Network Administrator'),
(19, 'Application Manager'),
(20, 'Business Process Analyst'),
(21, 'Project Manager'),
(22, 'Professor'),
(23, 'Director General'),
(24, 'Vice Chancellor'),
(25, 'Registerar'),
(26, 'Deputy Secretary'),
(27, 'Chief Secretary'),
(28, 'Sweeper'),
(29, 'Naib Qasid'),
(30, 'Qasid'),
(31, 'Security Guard'),
(32, 'Stenographer'),
(33, 'Senior Assistant'),
(34, 'Monitoring Supervisor'),
(35, 'Jr. Investigation Officer'),
(36, 'Senior Personal Assistant');

-- --------------------------------------------------------

--
-- Table structure for table `es_directoriate`
--

CREATE TABLE IF NOT EXISTS `es_directoriate` (
  `es_directoriate_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_directoriate_title` varchar(45) NOT NULL,
  PRIMARY KEY (`es_directoriate_id`),
  UNIQUE KEY `es_directoriate_title` (`es_directoriate_title`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `es_directoriate`
--

INSERT INTO `es_directoriate` (`es_directoriate_id`, `es_directoriate_title`) VALUES
(1, 'Directorate 01'),
(2, 'Directorate 02'),
(3, 'Directorate 03'),
(4, 'Directorate 04'),
(5, 'Directorate 05'),
(6, 'Directorate 06');

-- --------------------------------------------------------

--
-- Table structure for table `es_district`
--

CREATE TABLE IF NOT EXISTS `es_district` (
  `es_district_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_district_name` varchar(255) NOT NULL,
  PRIMARY KEY (`es_district_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `es_district`
--

INSERT INTO `es_district` (`es_district_id`, `es_district_name`) VALUES
(1, 'Peshawar'),
(2, 'Nowshera'),
(3, 'Swat'),
(4, 'Swabi'),
(5, 'Mardan'),
(6, 'Charsada'),
(7, 'Pabbi');

-- --------------------------------------------------------

--
-- Table structure for table `es_division`
--

CREATE TABLE IF NOT EXISTS `es_division` (
  `es_division_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_division_name` varchar(255) NOT NULL,
  PRIMARY KEY (`es_division_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `es_division`
--

INSERT INTO `es_division` (`es_division_id`, `es_division_name`) VALUES
(1, 'Bannu Division'),
(2, 'D.I Khan Division'),
(3, 'Hazara Division'),
(4, 'Kohat Division'),
(5, 'Peshawar Division'),
(6, 'Mardan Division'),
(7, 'Malakand Division');

-- --------------------------------------------------------

--
-- Table structure for table `es_domicile`
--

CREATE TABLE IF NOT EXISTS `es_domicile` (
  `es_domicile_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_domicile_title` varchar(255) NOT NULL,
  PRIMARY KEY (`es_domicile_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `es_domicile`
--

INSERT INTO `es_domicile` (`es_domicile_id`, `es_domicile_title`) VALUES
(1, 'Peshawar'),
(2, 'Nowshera'),
(3, 'Swat'),
(4, 'Swabi'),
(5, 'Mardan'),
(6, 'Charsada'),
(7, 'Pabbi');

-- --------------------------------------------------------

--
-- Table structure for table `es_employment_type`
--

CREATE TABLE IF NOT EXISTS `es_employment_type` (
  `es_employment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_employment_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`es_employment_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `es_employment_type`
--

INSERT INTO `es_employment_type` (`es_employment_type_id`, `es_employment_type_name`) VALUES
(1, 'Secretariat Employee\r\n'),
(2, 'Attached Department Employee\r\n'),
(3, 'Class-VI Employee\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `es_etgs`
--

CREATE TABLE IF NOT EXISTS `es_etgs` (
  `es_ETGS_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_ETGS_bps_date` date NOT NULL,
  `es_bps_id` int(11) NOT NULL,
  `es_officer_id` int(11) NOT NULL,
  PRIMARY KEY (`es_ETGS_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

--
-- Dumping data for table `es_etgs`
--

INSERT INTO `es_etgs` (`es_ETGS_id`, `es_ETGS_bps_date`, `es_bps_id`, `es_officer_id`) VALUES
(1, '2000-05-31', 1, 1),
(2, '2000-05-31', 2, 2),
(3, '2000-05-31', 3, 3),
(4, '2000-05-31', 4, 4),
(5, '2000-05-31', 5, 5),
(6, '2000-05-31', 6, 6),
(7, '2000-05-31', 7, 7),
(8, '2000-05-31', 8, 8),
(9, '2000-05-31', 9, 9),
(10, '2000-05-31', 10, 10),
(11, '2000-05-31', 11, 11),
(12, '1990-05-31', 7, 12),
(13, '1990-05-31', 8, 17),
(14, '1990-05-31', 9, 18),
(15, '1990-05-31', 10, 19),
(16, '1990-05-31', 11, 20),
(17, '1970-05-31', 7, 21),
(18, '1970-05-31', 8, 22),
(19, '1970-05-31', 9, 23),
(20, '1970-05-31', 10, 24),
(21, '1970-05-31', 11, 25),
(22, '2010-05-31', 12, 26),
(23, '2010-05-31', 14, 27),
(24, '2010-05-31', 12, 28),
(25, '2010-05-31', 14, 29),
(26, '2010-05-31', 14, 30),
(27, '2010-05-31', 12, 31),
(28, '2010-05-31', 14, 32),
(29, '2010-05-31', 12, 33),
(30, '2010-05-31', 14, 34),
(31, '2010-05-31', 14, 35),
(32, '2000-05-31', 15, 0),
(33, '2000-05-31', 15, 37),
(34, '2000-05-31', 16, 38),
(35, '2000-05-31', 16, 39),
(36, '2000-05-31', 15, 40),
(37, '2000-05-31', 15, 41),
(38, '2000-05-31', 15, 42),
(39, '2000-05-31', 16, 43),
(40, '2000-05-31', 16, 44),
(41, '2000-05-31', 15, 45),
(42, '2000-05-31', 15, 46),
(43, '1990-05-31', 19, 47),
(44, '1990-05-31', 18, 48),
(45, '1990-05-31', 17, 49),
(46, '1990-05-31', 19, 50),
(47, '1990-05-31', 17, 51),
(48, '1990-05-31', 19, 52),
(49, '1990-05-31', 18, 53),
(50, '1990-05-31', 17, 54),
(51, '1990-05-31', 19, 55),
(52, '1990-05-31', 17, 56),
(53, '1990-05-31', 19, 57),
(54, '1990-05-31', 18, 58),
(55, '1990-05-31', 17, 59),
(56, '1990-05-31', 19, 60),
(57, '1990-05-31', 17, 61),
(58, '1990-05-31', 19, 62),
(59, '1990-05-31', 18, 63),
(60, '1990-05-31', 17, 64),
(61, '1990-05-31', 19, 65),
(62, '1990-05-31', 17, 66),
(63, '1990-05-31', 19, 67),
(64, '1990-05-31', 18, 68),
(65, '1990-05-31', 17, 69),
(66, '1990-05-31', 19, 70),
(67, '1990-05-31', 17, 71),
(68, '1990-05-31', 19, 72),
(69, '1990-05-31', 18, 73),
(70, '1990-05-31', 17, 74),
(71, '1990-05-31', 19, 75),
(72, '1990-05-31', 17, 76),
(73, '1990-05-31', 19, 77),
(74, '1990-05-31', 18, 78),
(75, '1990-05-31', 17, 79),
(76, '1990-05-31', 19, 80),
(77, '1990-05-31', 17, 81),
(78, '1990-05-31', 19, 82),
(79, '1990-05-31', 18, 83),
(80, '1990-05-31', 17, 84),
(81, '1990-05-31', 19, 85),
(82, '1990-05-31', 17, 86),
(83, '1990-05-31', 19, 87),
(84, '1990-05-31', 18, 88),
(85, '1990-05-31', 17, 89),
(86, '1990-05-31', 19, 90),
(87, '1990-05-31', 17, 91),
(94, '2009-01-21', 12, 97),
(95, '1979-10-10', 14, 97),
(96, '1999-11-06', 13, 97),
(97, '2014-09-14', 19, 98),
(98, '1982-09-02', 4, 98),
(99, '2016-05-03', 9, 98),
(100, '2014-09-14', 19, 98),
(101, '1982-09-02', 4, 98),
(102, '2016-05-03', 9, 98);

-- --------------------------------------------------------

--
-- Table structure for table `es_gender`
--

CREATE TABLE IF NOT EXISTS `es_gender` (
  `es_gender_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_gender_name` varchar(45) NOT NULL,
  PRIMARY KEY (`es_gender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `es_gender`
--

INSERT INTO `es_gender` (`es_gender_id`, `es_gender_name`) VALUES
(1, 'Male'),
(2, 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `es_house`
--

CREATE TABLE IF NOT EXISTS `es_house` (
  `es_house_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_house_no` varchar(15) DEFAULT NULL,
  `es_house_rooms` int(10) DEFAULT NULL,
  `es_house_blockno` varchar(20) DEFAULT NULL,
  `es_house_status` int(1) DEFAULT NULL,
  `es_house_streetno` varchar(20) DEFAULT NULL,
  `es_house_sector` varchar(20) DEFAULT NULL,
  `es_house_mohallah` varchar(45) DEFAULT NULL,
  `es_city_id` int(11) DEFAULT NULL,
  `es_colony_id` int(11) DEFAULT NULL,
  `es_house_occupied_status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`es_house_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `es_house`
--

INSERT INTO `es_house` (`es_house_id`, `es_house_no`, `es_house_rooms`, `es_house_blockno`, `es_house_status`, `es_house_streetno`, `es_house_sector`, `es_house_mohallah`, `es_city_id`, `es_colony_id`, `es_house_occupied_status`) VALUES
(1, 'House#A01', 2, 'A1', 1, 'B1', 'C1', 'Nill', 1, 2, 0),
(2, 'House#A02', 2, 'A1', 1, 'B1', 'C1', 'Nill', 1, 2, 0),
(3, 'House#A03', 2, 'A1', 1, 'B1', 'C1', 'Nill', 1, 2, 0),
(4, 'House#A04', 2, 'A1', 2, 'B1', 'C1', 'Nill', 1, 2, 0),
(5, 'House#A05', 2, 'A1', 2, 'B1', 'C1', 'Nill', 1, 2, 0),
(6, 'House#B01', 3, 'D1', 1, 'E1', 'F1', 'Nill', 1, 3, 0),
(7, 'House#B02', 3, 'D1', 1, 'E1', 'F1', 'Nill', 1, 3, 0),
(8, 'House#B03', 3, 'D1', 1, 'E1', 'F1', 'Nill', 1, 3, 0),
(9, 'House#B04', 3, 'D1', 1, 'E1', 'F1', 'Nill', 1, 3, 0),
(10, 'House#B05', 3, 'D1', 1, 'E1', 'F1', 'Nill', 1, 3, 0),
(11, 'House#C01', 4, 'G1', 1, 'H1', 'i1', 'Nill', 1, 4, 0),
(12, 'House#C02', 4, 'G1', 1, 'H1', 'i1', 'Nill', 1, 4, 0),
(13, 'House#C03', 4, 'G1', 1, 'H1', 'i1', 'Nill', 1, 4, 0),
(14, 'House#C04', 4, 'G1', 1, 'H1', 'i1', 'Nill', 1, 4, 0),
(15, 'House#C05', 4, 'G1', 1, 'H1', 'i1', 'Nill', 1, 4, 0),
(16, 'House#D01', 5, 'G1', 1, 'H1', 'i1', 'Nill', 1, 5, 0),
(17, 'House#D02', 5, 'G1', 1, 'H1', 'i1', 'Nill', 1, 5, 0),
(18, 'House#D03', 2, 'G1', 1, 'H1', 'i1', 'Nill', 1, 5, 0),
(19, 'House#D04', 5, 'G1', 1, 'H1', 'i1', 'Nill', 1, 5, 0),
(20, 'House#D05', 5, 'G1', 1, 'H1', 'i1', 'Nill', 1, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `es_login_history`
--

CREATE TABLE IF NOT EXISTS `es_login_history` (
  `es_login_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_login_history_user_id` int(11) DEFAULT NULL,
  `es_login_history_time_in` varchar(45) DEFAULT NULL,
  `es_login_history_time_out` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`es_login_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `es_marital_status`
--

CREATE TABLE IF NOT EXISTS `es_marital_status` (
  `es_marital_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_marital_status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`es_marital_status_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `es_marital_status`
--

INSERT INTO `es_marital_status` (`es_marital_status_id`, `es_marital_status_name`) VALUES
(1, 'Single'),
(2, 'Married'),
(3, 'Divorced'),
(4, 'Seperated'),
(5, 'Do Not Mention');

-- --------------------------------------------------------

--
-- Table structure for table `es_occupied_house`
--

CREATE TABLE IF NOT EXISTS `es_occupied_house` (
  `es_occupied_house_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_occupied_house_doalt` date DEFAULT NULL,
  `es_occupied_house_dov` date DEFAULT NULL,
  `es_officers_id` int(11) DEFAULT NULL,
  `es_house_id` int(11) DEFAULT NULL,
  `es_colony_id` int(11) NOT NULL,
  `es_application_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_occupied_house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `es_officers`
--

CREATE TABLE IF NOT EXISTS `es_officers` (
  `es_officer_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_officer_name` varchar(45) DEFAULT NULL,
  `es_officer_fname` varchar(45) DEFAULT NULL,
  `es_officer_dob` date DEFAULT NULL,
  `es_officer_cnic` bigint(13) NOT NULL,
  `es_gender_id` int(11) DEFAULT NULL,
  `es_marital_status_id` int(11) DEFAULT NULL,
  `es_officer_Paddress` varchar(500) NOT NULL,
  `es_officer_Taddress` varchar(500) NOT NULL,
  `es_officer_cell` bigint(11) DEFAULT NULL,
  `es_officer_phone` int(10) DEFAULT NULL,
  `es_officer_email` varchar(45) NOT NULL,
  `es_officer_personal_no` int(11) NOT NULL,
  `es_officer_doappt` date DEFAULT NULL,
  `es_officer_dop` date NOT NULL,
  `es_officer_EDFA` date NOT NULL,
  `es_officer_dor` date DEFAULT NULL,
  `es_bps_id` int(11) DEFAULT NULL,
  `es_designation_id` int(11) DEFAULT NULL,
  `es_department_id` int(11) DEFAULT NULL,
  `es_division_id` int(11) DEFAULT NULL,
  `es_domicile_id` int(11) DEFAULT NULL,
  `es_officer_apply_status` int(1) NOT NULL DEFAULT '1',
  `es_service_type_id` int(1) NOT NULL,
  `es_employment_type_id` int(1) NOT NULL,
  `es_civil_servant` int(1) NOT NULL,
  PRIMARY KEY (`es_officer_id`),
  KEY `es_officer_personal_no` (`es_officer_personal_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=100 ;

--
-- Dumping data for table `es_officers`
--

INSERT INTO `es_officers` (`es_officer_id`, `es_officer_name`, `es_officer_fname`, `es_officer_dob`, `es_officer_cnic`, `es_gender_id`, `es_marital_status_id`, `es_officer_Paddress`, `es_officer_Taddress`, `es_officer_cell`, `es_officer_phone`, `es_officer_email`, `es_officer_personal_no`, `es_officer_doappt`, `es_officer_dop`, `es_officer_EDFA`, `es_officer_dor`, `es_bps_id`, `es_designation_id`, `es_department_id`, `es_division_id`, `es_domicile_id`, `es_officer_apply_status`, `es_service_type_id`, `es_employment_type_id`, `es_civil_servant`) VALUES
(1, 'abc', 'abc father', '1980-05-31', 1730112345611, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050121, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 1, 8, 7, 5, 1, 1, 0, 3, 1),
(2, 'cde', 'cde father', '1980-05-31', 1730112345612, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050122, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 2, 8, 7, 5, 1, 1, 0, 3, 1),
(3, 'efg', 'efg father', '1980-05-31', 1730112345613, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050123, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 3, 8, 7, 5, 1, 1, 0, 3, 1),
(4, 'ghi', 'ghi father', '1980-05-31', 1730112345614, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050124, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 4, 8, 7, 5, 1, 1, 0, 3, 1),
(5, 'ijk', 'ijk father', '1980-05-31', 1730112345615, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050125, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 5, 9, 7, 5, 1, 1, 0, 3, 1),
(6, 'klm', 'klm father', '1980-05-31', 1730112345616, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050126, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 6, 9, 4, 5, 1, 1, 0, 3, 1),
(7, 'mno', 'mno father', '1980-05-31', 1730112345617, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050120, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 7, 9, 5, 5, 1, 1, 0, 3, 1),
(8, 'opq', 'opq father', '1980-05-31', 1730112345618, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050128, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 8, 28, 1, 5, 1, 1, 0, 3, 1),
(9, 'qrs', 'qrs father', '1980-05-31', 1730112345619, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050129, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 9, 30, 1, 5, 1, 1, 0, 3, 1),
(10, 'stu', 'stu father', '2000-03-19', 1730112345460, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050120, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 10, 29, 1, 5, 1, 1, 0, 3, 1),
(11, 'uvw', 'uvw father', '1980-05-31', 1730112345621, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050131, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 11, 30, 1, 5, 1, 1, 0, 3, 1),
(12, 'abc', 'abc father', '1970-05-31', 1730112345622, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050132, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 7, 30, 1, 5, 1, 1, 0, 1, 1),
(17, 'cde', 'cde father', '1970-05-31', 1730112345633, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050133, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 8, 29, 1, 5, 1, 1, 0, 1, 1),
(18, 'efg', 'efg father', '1970-05-31', 1730112345634, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050134, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 9, 28, 2, 5, 1, 1, 0, 1, 1),
(19, 'ghi', 'ghi father', '1970-05-31', 1730112345635, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'witep@yahoo.com', 9050135, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 10, 9, 2, 5, 1, 1, 0, 1, 1),
(20, 'ijk', 'ijk father', '1970-05-31', 1730112345636, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050136, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 11, 29, 1, 5, 1, 1, 0, 1, 1),
(21, 'abc', 'abc father', '1960-05-31', 17301121345637, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'witep@yahoo.com', 9050137, '1970-05-31', '1970-05-31', '1970-05-31', '2030-05-31', 7, 9, 1, 5, 1, 1, 0, 2, 1),
(22, 'cde', 'cde father', '1960-05-31', 1730112345638, 2, 5, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050138, '1970-05-31', '1970-05-31', '1970-05-31', '2030-05-31', 8, 28, 2, 5, 1, 1, 0, 2, 1),
(23, 'efg', 'efg father', '1960-05-31', 1730112345639, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050139, '1970-05-31', '1970-05-31', '1970-05-31', '2030-05-31', 9, 9, 3, 5, 1, 1, 0, 2, 1),
(24, 'ghi', 'ghi father', '1960-05-31', 1730112345640, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050140, '1970-05-31', '1970-05-31', '1970-05-31', '2030-05-31', 10, 29, 2, 5, 1, 1, 0, 2, 1),
(25, 'ijk', 'ijk', '1960-05-31', 1730112345641, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050141, '1970-05-31', '1970-05-31', '1970-05-31', '2030-05-31', 11, 30, 4, 5, 1, 1, 0, 2, 1),
(26, 'abc', 'abc father', '1980-05-31', 1730112345642, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050142, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 12, 10, 2, 5, 1, 1, 0, 1, 1),
(27, 'cde', 'cde father', '1980-05-31', 1730112345643, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050143, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 11, 1, 5, 1, 1, 0, 1, 1),
(28, 'efg', 'efg father', '1980-05-31', 1730112345644, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050144, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 12, 10, 1, 5, 1, 1, 0, 1, 1),
(29, 'ghi', 'ghi father', '1980-05-31', 1730112345645, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050145, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 10, 1, 5, 1, 1, 0, 1, 1),
(30, 'ijk', 'ijk father', '1980-05-31', 1730112345646, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@yahoo.com', 9050146, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 10, 2, 5, 1, 1, 0, 1, 1),
(31, 'abc', 'abc father', '1980-05-31', 1730112345647, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050147, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 12, 10, 2, 5, 1, 1, 0, 2, 1),
(32, 'cde', 'cde father', '1980-05-31', 1730112345648, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050148, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 11, 1, 5, 1, 1, 0, 2, 1),
(33, 'efg', 'efg father', '1980-05-31', 1730112345649, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050149, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 12, 10, 1, 5, 1, 1, 0, 2, 1),
(34, 'ghi', 'ghi father', '1980-05-31', 1730112345650, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050150, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 10, 1, 5, 1, 1, 0, 2, 1),
(35, 'ijk', 'ijk father', '1980-05-31', 1730112345651, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@yahoo.com', 9050151, '2010-05-31', '2010-05-31', '2010-05-31', '2070-05-31', 14, 10, 2, 5, 1, 1, 0, 2, 1),
(37, 'abc', 'abc father', '1970-05-31', 1730112345652, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050152, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 15, 7, 5, 1, 1, 0, 1, 1),
(38, 'cde', 'cde father', '1970-05-31', 1730112345653, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050153, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 16, 36, 7, 5, 1, 1, 0, 1, 1),
(39, 'efg', 'efg father', '1970-05-31', 1730112345654, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050154, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 16, 35, 7, 5, 1, 1, 0, 1, 1),
(40, 'ghi', 'ghi father', '1970-05-31', 1730112345655, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050155, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 32, 1, 5, 1, 1, 0, 1, 1),
(41, 'ijk', 'ijk father', '1970-05-31', 1730112345656, 1, 5, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050156, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 16, 7, 5, 1, 1, 0, 1, 1),
(42, 'abc', 'abc father', '1970-05-31', 1730112345657, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050157, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 15, 7, 5, 1, 1, 0, 2, 1),
(43, 'cde', 'cde father', '1970-05-31', 1730112345658, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050158, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 16, 36, 7, 5, 1, 1, 0, 2, 1),
(44, 'efg', 'efg father', '1970-05-31', 1730112345659, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050159, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 16, 35, 7, 5, 1, 1, 0, 2, 1),
(45, 'ghi', 'ghi father', '1970-05-31', 1730112345660, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050160, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 32, 1, 5, 1, 1, 0, 2, 1),
(46, 'ijk', 'ijk father', '1970-05-31', 1730112345661, 1, 5, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050161, '2000-05-31', '2000-05-31', '2000-05-31', '2060-05-31', 15, 16, 7, 5, 1, 1, 0, 2, 1),
(47, 'abc', 'abc father', '1970-05-31', 1730112345662, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050162, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 0, 0, 1, 1),
(48, 'cde', 'cde father', '1970-05-31', 1730112345663, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050163, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 0, 0, 1, 1),
(49, 'efg', 'efg father', '1970-05-31', 1730112345664, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050164, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 0, 0, 1, 1),
(50, 'ghi', 'ghi father', '1970-05-31', 1730112345665, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050165, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 0, 0, 1, 1),
(51, 'ijk', 'ijk father', '1970-05-31', 1730112345666, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050166, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 0, 0, 1, 1),
(52, 'abc', 'abc father', '1970-05-31', 1730112345667, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050167, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 0, 0, 2, 1),
(53, 'cde', 'cde father', '1970-05-31', 1730112345668, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050168, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 0, 0, 2, 1),
(54, 'efg', 'efg father', '1970-05-31', 1730112345669, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050169, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 0, 0, 2, 1),
(55, 'ghi', 'ghi father', '1970-05-31', 1730112345670, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050170, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 0, 0, 2, 1),
(56, 'ijk', 'ijk father', '1970-05-31', 1730112345671, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050171, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 0, 0, 2, 1),
(57, 'abc', 'abc father', '1970-05-31', 1730112345673, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050173, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 1, 1, 1),
(58, 'cde', 'cde father', '1970-05-31', 1730112345674, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050174, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 1, 1, 1),
(59, 'efg', 'efg father', '1970-05-31', 1730112345675, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050175, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 1, 1, 1),
(60, 'ghi', 'ghi father', '1970-05-31', 1730112345676, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 9158476, 'mwgi2005@gmail.com', 9050176, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 1, 1, 1),
(61, 'ijk', 'ijk father', '1970-05-31', 1730112345677, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050177, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 1, 1, 1),
(62, 'abc', 'abc father', '1970-05-31', 1730112345678, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050178, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 2, 1, 1),
(63, 'cde', 'cde father', '1970-05-31', 1730112345679, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050179, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 2, 1, 1),
(64, 'efg', 'efg father', '1970-05-31', 1730112345680, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050180, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 2, 1, 1),
(65, 'ghi', 'ghi father', '1970-05-31', 1730112345681, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050181, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 2, 1, 1),
(66, 'ijk', 'ijk father', '1970-05-31', 1730112345682, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050182, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 2, 1, 1),
(67, 'abc', 'abc father', '1970-05-31', 1730112345683, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050183, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 3, 1, 1),
(68, 'cde', 'cde father', '1970-05-31', 1730112345684, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050184, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 3, 1, 1),
(69, 'efg', 'efg father', '1970-05-31', 1730112345685, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050185, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 3, 1, 1),
(70, 'ghi', 'ghi father', '1970-05-31', 1730112345686, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050186, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 3, 1, 1),
(71, 'ijk', 'ijk father', '1970-05-31', 1730112345687, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050187, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 3, 1, 1),
(72, 'abc', 'abc father', '1970-05-31', 1730112345688, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050188, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 1, 2, 1),
(73, 'cde', 'cde father', '1970-05-31', 1730112345689, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050189, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 1, 2, 1),
(74, 'efg', 'efg father', '1970-05-31', 1730112345690, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050190, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 1, 2, 1),
(75, 'ghi', 'ghi father', '1970-05-31', 1730112345691, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050191, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 1, 2, 1),
(76, 'ijk', 'ijk father', '1970-05-31', 1730112345692, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050192, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 1, 2, 1),
(77, 'abc', 'abc father', '1970-05-31', 1730112345693, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050193, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 2, 2, 1),
(78, 'cde', 'cde father', '1970-05-31', 1730112345694, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847676, 'cde@gmail.com', 9050194, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 2, 2, 1),
(79, 'efg', 'efg father', '1970-05-31', 1730112345695, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050195, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 2, 2, 1),
(80, 'ghi', 'ghi father', '1970-05-31', 1730112345696, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050196, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 2, 2, 1),
(81, 'ijk', 'ijk father', '1970-05-31', 1730112345697, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050197, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 2, 2, 1),
(82, 'abc', 'abc father', '1970-05-31', 1730112345698, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050198, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 2, 1, 5, 1, 1, 3, 2, 1),
(83, 'cde', 'cde father', '1970-05-31', 1730112345699, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050199, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 18, 21, 7, 5, 1, 1, 3, 2, 1),
(84, 'efg', 'efg father', '1970-05-31', 1730112345700, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050200, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 17, 7, 5, 1, 1, 3, 2, 1),
(85, 'ghi', 'ghi father', '1970-05-31', 1730112345701, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050201, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 19, 6, 7, 5, 1, 1, 3, 2, 1),
(86, 'ijk', 'ijk father', '1970-05-31', 1730112345702, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050202, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 17, 18, 7, 5, 1, 1, 3, 2, 1),
(87, 'abc', 'abc father', '1970-05-31', 1730112345703, 2, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ryhilyvyf@gmail.com', 9050203, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 20, 6, 1, 5, 1, 1, 2, 1, 1),
(88, 'cde', 'cde father', '1970-05-31', 1730112345704, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'cde@gmail.com', 9050204, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 21, 24, 7, 5, 1, 1, 3, 2, 1),
(89, 'efg', 'efg father', '1970-05-31', 1730112345705, 1, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'efg@gmail.com', 9050205, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 22, 27, 7, 5, 1, 1, 2, 2, 1),
(90, 'ghi', 'ghi father', '1970-05-31', 1730112345706, 1, 1, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'mwgi2005@gmail.com', 9050206, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 20, 4, 7, 5, 1, 1, 3, 2, 1),
(91, 'ijk', 'ijk father', '1970-05-31', 1730112345707, 2, 2, 'House#01, Gulber#04', 'House#01, Gulber#04', 923459050120, 915847693, 'ijk@gmail.com', 9050207, '1990-05-31', '1990-05-31', '1990-05-31', '2050-05-31', 21, 23, 7, 5, 1, 1, 2, 1, 1),
(97, 'Axel Bowen', 'Bruce Hopkins', '2004-05-27', 16, 2, 2, 'Culpa quis fugiat velit et officia tempor laudantium deleniti irure', 'Dignissimos nisi quo ad delectus rem', 0, 511, 'gegymocow@hotmail.com', 0, '2011-09-16', '2005-02-14', '1993-08-21', '1998-03-15', 10, 9, 2, 1, 1, 1, 3, 2, 1),
(98, 'Hedley Pate', 'Christopher Poole', '1985-02-19', 3, 2, 2, 'Ullam tempore consequat Esse quibusdam voluptatem ipsam', 'Cupidatat sed adipisicing magnam lorem quisquam accusantium ea aspernatur vitae consequuntur quis eos incididunt quidem dolorum Nam modi', 0, 156, 'wuqufa@hotmail.com', 0, '2005-01-11', '1992-03-08', '1989-01-09', '1997-04-06', 13, 30, 5, 4, 6, 1, 3, 1, 1),
(99, 'Hedley Pate', 'Christopher Poole', '1985-02-19', 3, 2, 2, 'Ullam tempore consequat Esse quibusdam voluptatem ipsam', 'Cupidatat sed adipisicing magnam lorem quisquam accusantium ea aspernatur vitae consequuntur quis eos incididunt quidem dolorum Nam modi', 0, 156, 'wuqufa@hotmail.com', 0, '2005-01-11', '1992-03-08', '1989-01-09', '1997-04-06', 13, 30, 5, 4, 6, 1, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `es_officer_family_member`
--

CREATE TABLE IF NOT EXISTS `es_officer_family_member` (
  `es_officer_family_member_id` int(11) NOT NULL DEFAULT '0',
  `es_officer_family_member_name` varchar(45) DEFAULT NULL,
  `es_officer_family_member_relation` varchar(45) DEFAULT NULL,
  `es_officer_family_member_age` int(3) DEFAULT NULL,
  `es_application_id` int(11) DEFAULT NULL,
  `es_officers_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_officer_family_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `es_picture`
--

CREATE TABLE IF NOT EXISTS `es_picture` (
  `es_picture_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_picture_name` varchar(45) DEFAULT NULL,
  `es_application_id` int(11) DEFAULT NULL,
  `es_officer_id` int(11) DEFAULT NULL,
  `es_house_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_picture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `es_service_type`
--

CREATE TABLE IF NOT EXISTS `es_service_type` (
  `es_service_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_service_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`es_service_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `es_service_type`
--

INSERT INTO `es_service_type` (`es_service_type_id`, `es_service_type_name`) VALUES
(1, 'PMS (Provincial Management Services)\r\n'),
(2, 'PAS (Pakistan Administrative Services)\r\n'),
(3, 'PSP (Police Service Of Pakistan)\r\n'),
(4, 'None');

-- --------------------------------------------------------

--
-- Table structure for table `es_session`
--

CREATE TABLE IF NOT EXISTS `es_session` (
  `es_session_id` varchar(40) NOT NULL DEFAULT '0',
  `es_session_ipaddress` varchar(45) DEFAULT '0',
  `es_session_useragent` varchar(120) DEFAULT NULL,
  `es_session_last_activity` int(10) DEFAULT '0',
  `es_session_user_data` text,
  PRIMARY KEY (`es_session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `es_status`
--

CREATE TABLE IF NOT EXISTS `es_status` (
  `es_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_status_name` varchar(45) NOT NULL,
  PRIMARY KEY (`es_status_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `es_status`
--

INSERT INTO `es_status` (`es_status_id`, `es_status_name`) VALUES
(1, 'Active'),
(2, 'Inactive');

-- --------------------------------------------------------

--
-- Table structure for table `es_user`
--

CREATE TABLE IF NOT EXISTS `es_user` (
  `es_user_id` int(11) NOT NULL DEFAULT '0',
  `es_user_firstname` varchar(255) DEFAULT NULL,
  `es_user_lastname` varchar(255) DEFAULT NULL,
  `es_user_email_address` varchar(255) DEFAULT NULL,
  `es_user_username` varchar(255) DEFAULT NULL,
  `es_user_password` varchar(45) DEFAULT NULL,
  `es_officers_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`es_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `es_waiting_list`
--

CREATE TABLE IF NOT EXISTS `es_waiting_list` (
  `es_wl_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_application_id` int(11) DEFAULT NULL,
  `es_officer_id` int(11) DEFAULT NULL,
  `es_wl_status` int(11) NOT NULL DEFAULT '1',
  `es_wl_added_date` date NOT NULL,
  `es_wl_added_time` time NOT NULL,
  PRIMARY KEY (`es_wl_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `es_waiting_list`
--

INSERT INTO `es_waiting_list` (`es_wl_id`, `es_application_id`, `es_officer_id`, `es_wl_status`, `es_wl_added_date`, `es_wl_added_time`) VALUES
(1, 1, 47, 1, '0000-00-00', '00:00:00'),
(2, 2, 48, 1, '0000-00-00', '00:00:00'),
(3, 3, 49, 1, '0000-00-00', '00:00:00'),
(4, 4, 50, 1, '0000-00-00', '00:00:00'),
(5, 5, 51, 1, '0000-00-00', '00:00:00'),
(6, 6, 52, 1, '0000-00-00', '00:00:00'),
(7, 7, 53, 1, '0000-00-00', '00:00:00'),
(8, 8, 54, 1, '0000-00-00', '00:00:00'),
(9, 9, 55, 1, '0000-00-00', '00:00:00'),
(10, 10, 56, 1, '0000-00-00', '00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
