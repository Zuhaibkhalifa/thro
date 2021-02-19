-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 18, 2021 at 10:20 AM
-- Server version: 5.6.49-cll-lve
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thrombo`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nurse_section_five`
--

CREATE TABLE `nurse_section_five` (
  `sec_five_id` int(10) NOT NULL,
  `year` varchar(15) DEFAULT NULL,
  `procedure` varchar(150) DEFAULT NULL COMMENT 'Procedure',
  `date_of_procedure` date DEFAULT NULL COMMENT 'Date of Procedure',
  `indication_for_anticoagulation` varchar(200) DEFAULT NULL COMMENT 'Indication(s) for Anticoagulation',
  `chads_score_and_distribution` varchar(200) DEFAULT NULL COMMENT 'CHADS Score And Distribution',
  `poc_inr` date DEFAULT NULL COMMENT 'POC -INR',
  `poc_creat` date DEFAULT NULL COMMENT 'POC - CREAT',
  `hb` varchar(100) DEFAULT NULL,
  `plt` varchar(100) DEFAULT NULL,
  `details_on_recomemendation` varchar(200) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Final Report';

--
-- Dumping data for table `nurse_section_five`
--

INSERT INTO `nurse_section_five` (`sec_five_id`, `year`, `procedure`, `date_of_procedure`, `indication_for_anticoagulation`, `chads_score_and_distribution`, `poc_inr`, `poc_creat`, `hb`, `plt`, `details_on_recomemendation`, `user_id`) VALUES
(67, NULL, NULL, NULL, 'sdgdfggcxvc', 'fgsdfgcvx gdfg', '2021-01-26', '2021-01-24', '2021-01-21', '2021-01-26', 'sdfgsgddfzcvxs f', 4),
(69, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '21', 8);

-- --------------------------------------------------------

--
-- Table structure for table `nurse_section_one`
--

CREATE TABLE `nurse_section_one` (
  `section_one_id` int(10) NOT NULL,
  `date` date DEFAULT NULL,
  `referred_by` varchar(150) DEFAULT NULL,
  `procedure1` varchar(200) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `cabg` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Procedure';

--
-- Dumping data for table `nurse_section_one`
--

INSERT INTO `nurse_section_one` (`section_one_id`, `date`, `referred_by`, `procedure1`, `user_id`, `cabg`) VALUES
(26, '2021-01-25', 'zdsadjjhd i v c', NULL, 4, NULL),
(27, '2021-02-12', 'Vinai', NULL, 16, NULL),
(29, '2021-02-11', 'Dr Kiran', NULL, 8, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nurse_section_three`
--

CREATE TABLE `nurse_section_three` (
  `sec_three_id` int(10) NOT NULL,
  `who_is_completing_this_form` varchar(50) DEFAULT NULL COMMENT 'Who is completing this from?',
  `patient_accompanied_by` varchar(50) DEFAULT NULL COMMENT 'Patient accompanied by',
  `lmwh` varchar(50) DEFAULT NULL COMMENT 'LMWH',
  `administration` varchar(50) DEFAULT NULL COMMENT 'Administration',
  `understanding` varchar(50) DEFAULT NULL,
  `explained` varchar(100) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nurse_section_three`
--

INSERT INTO `nurse_section_three` (`sec_three_id`, `who_is_completing_this_form`, `patient_accompanied_by`, `lmwh`, `administration`, `understanding`, `explained`, `user_id`) VALUES
(22, 'Family Member', 'Alone', 'Has previously self-inject LMWH', 'Self', 'Good', NULL, 4),
(23, 'MD', 'Spouse', 'Instruction given with LMWH', 'Self', 'Fair', NULL, 16),
(25, NULL, NULL, NULL, NULL, 'Good', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('inam@cloudams.com', '$2y$10$ePD9KFO5sbxfrfhnVsEu.OZMto8eINwYtUogLoubzXI73gSkO0IPi', '2020-11-18 05:04:35'),
('bhagiv@mcmaster.ca', '$2y$10$YbY.xZB/nPu2X/BuqNEgI.63pF4o38piYWdK0doKO3WNRKUvRBUtS', '2020-12-16 17:09:53'),
('newuser05@yopmail.com', '$2y$10$om4L.fNfc2mdvQLovTSKTe2Xgf90t0i4uCd.Een.scWx09iQHuQha', '2021-01-31 23:16:33'),
('chandpasha.syed@gmail.com', '$2y$10$f1ZaX7HcZx2dB9pyPkuI1OjFCOSoJA3CqJqLnA7KoYCz22awUX1sC', '2021-01-31 23:40:53'),
('zack.muqtadir@gmail.com', '$2y$10$vVpav7FXZbPU6VVLPWhLdeWpamsXhQELS2OLzoVdgs5vHURpUVFJe', '2021-02-01 23:15:17'),
('inam11@yopmail.com', '$2y$10$f4/AoqXxU2EViDZaVUcYt.q3Ki3fGGlg/.Yx7qDXkuP9KaIrCVpde', '2021-02-18 03:57:48');

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_eight`
--

CREATE TABLE `pat_section_eight` (
  `sec_eight_id` int(11) NOT NULL,
  `pradaxa` varchar(50) DEFAULT NULL COMMENT 'Pradaxa (Dabigatran)',
  `pradaxa_dosage` varchar(100) DEFAULT NULL COMMENT 'Xarelto (Rivaroxaban)',
  `xarelto` varchar(50) DEFAULT NULL COMMENT 'Eliquis (Apixaban)',
  `xarelto_dosage` varchar(100) DEFAULT NULL COMMENT 'Edoxabon (Lixiana)',
  `xarelto_dosage_time` varchar(100) DEFAULT NULL,
  `eliquis` varchar(50) DEFAULT NULL,
  `eliquis_dosage` varchar(100) DEFAULT NULL,
  `eliquis_dosage_time` varchar(100) DEFAULT NULL,
  `edoxabon` varchar(50) DEFAULT NULL,
  `edoxabon_dosage` varchar(100) DEFAULT NULL,
  `edoxabon_dosage_time` varchar(100) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Are you currently on any of these drugs?';

--
-- Dumping data for table `pat_section_eight`
--

INSERT INTO `pat_section_eight` (`sec_eight_id`, `pradaxa`, `pradaxa_dosage`, `xarelto`, `xarelto_dosage`, `xarelto_dosage_time`, `eliquis`, `eliquis_dosage`, `eliquis_dosage_time`, `edoxabon`, `edoxabon_dosage`, `edoxabon_dosage_time`, `user_id`) VALUES
(26, 'Pradaxa (Dabigatran)', '75 mg twice dialy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13),
(30, NULL, NULL, 'Xarelto (Rivaroxaban)', '15 mg once daily', 'sfDFsdfasdf', NULL, NULL, NULL, NULL, NULL, NULL, 4),
(36, 'Pradaxa (Dabigatran)', '75 mg twice daily', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_eleven`
--

CREATE TABLE `pat_section_eleven` (
  `sec_eleven_id` int(10) NOT NULL,
  `aspirin` varchar(50) NOT NULL COMMENT 'Aspirin (ASA)',
  `aspirin_dosage` varchar(50) DEFAULT NULL,
  `aspirin_dosage_time` varchar(50) DEFAULT NULL,
  `plavix` varchar(50) DEFAULT NULL COMMENT 'Plavix (Clopidogrel)',
  `plavix_dosage` varchar(50) DEFAULT NULL,
  `plavix_dosage_time` varchar(50) DEFAULT NULL,
  `brillinta` varchar(50) DEFAULT NULL,
  `brillinta_dosage` varchar(50) DEFAULT NULL,
  `brillinta_dosage_timie` varchar(50) DEFAULT NULL,
  `effient_dosage` varchar(50) DEFAULT NULL,
  `effient_dosage_time` varchar(50) DEFAULT NULL,
  `effient` varchar(25) DEFAULT NULL,
  `not_using_drugs` varchar(50) DEFAULT NULL COMMENT 'No, I am not on any of these medications',
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Antiplatelets';

--
-- Dumping data for table `pat_section_eleven`
--

INSERT INTO `pat_section_eleven` (`sec_eleven_id`, `aspirin`, `aspirin_dosage`, `aspirin_dosage_time`, `plavix`, `plavix_dosage`, `plavix_dosage_time`, `brillinta`, `brillinta_dosage`, `brillinta_dosage_timie`, `effient_dosage`, `effient_dosage_time`, `effient`, `not_using_drugs`, `user_id`) VALUES
(4, 'Aspirin (ASA)', 'asdasd', 'Once daily', 'Plavix (Clopidogrel)', 'asdasd', 'Twice daily', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_fifteen`
--

CREATE TABLE `pat_section_fifteen` (
  `sec_fifteen_id` int(10) NOT NULL,
  `being_treated_cancer` varchar(50) DEFAULT NULL COMMENT 'Are you being treated with cancer?',
  `cancer` varchar(100) DEFAULT NULL,
  `radiation` varchar(10) DEFAULT NULL,
  `radiation_ongoing` varchar(10) DEFAULT NULL,
  `chemotherapy` varchar(10) DEFAULT NULL,
  `chemotherapy_ongoing` varchar(10) DEFAULT NULL,
  `chemotherapy_finished` varchar(30) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_fifteen`
--

INSERT INTO `pat_section_fifteen` (`sec_fifteen_id`, `being_treated_cancer`, `cancer`, `radiation`, `radiation_ongoing`, `chemotherapy`, `chemotherapy_ongoing`, `chemotherapy_finished`, `user_id`) VALUES
(9, 'Yes', 'dfssdsdgdsgfdsfg sdfg sdfh', 'Yes', 'Yes', 'Yes', NULL, 'Yes', 4),
(7, 'Yes', 'CML', 'Yes', 'Yes', 'Yes', 'Yes', NULL, 13),
(13, 'Yes', 'I do not know name', 'Yes', 'Yes', 'Yes', NULL, 'Yes', 8);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_five`
--

CREATE TABLE `pat_section_five` (
  `sec_five_id` int(10) NOT NULL,
  `deep_vein_thrombosis` int(11) DEFAULT NULL COMMENT 'Deep vein Thrombosis',
  `deep_vein_thrombosis_how_long_ago` varchar(50) DEFAULT NULL COMMENT 'If So, how long ago',
  `pulmonary_embolism` int(11) DEFAULT NULL COMMENT 'Pulmonary Embolism',
  `pulmonary_embolism_how_long_ago` varchar(50) DEFAULT NULL,
  `not_sure` int(11) DEFAULT NULL COMMENT 'Not Sure',
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Please specify the type of condition';

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_four`
--

CREATE TABLE `pat_section_four` (
  `sec_four_id` int(10) NOT NULL,
  `venous_thromboelism` varchar(50) DEFAULT NULL COMMENT 'Venous Thromboelism (VTE)',
  `dvt` varchar(50) DEFAULT NULL COMMENT 'Atrial Fibrillation of flutter',
  `dvt_how_long_ago` varchar(50) DEFAULT NULL,
  `pe` varchar(50) DEFAULT NULL COMMENT 'If So, how long ago',
  `pe_dvt_how_long_ago` varchar(50) DEFAULT NULL,
  `atrial_fibrillation_of_flutter` varchar(50) DEFAULT NULL COMMENT 'Atrial Fibrillation of flutter',
  `heart_valve_replacement` varchar(50) DEFAULT NULL COMMENT 'Heart Valve Replacement',
  `blood_clot_in_heart` varchar(50) DEFAULT NULL COMMENT 'Blood clot in heart',
  `arterial_peripheral_thrombosis` varchar(50) DEFAULT NULL COMMENT 'Arterial Peripheral Thrombosis',
  `peripheral_arterial_disease` varchar(50) DEFAULT NULL COMMENT 'Peripheral arterial Disease',
  `other` varchar(50) DEFAULT NULL COMMENT 'Other',
  `none` varchar(50) DEFAULT NULL COMMENT 'None Of The Above',
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_four`
--

INSERT INTO `pat_section_four` (`sec_four_id`, `venous_thromboelism`, `dvt`, `dvt_how_long_ago`, `pe`, `pe_dvt_how_long_ago`, `atrial_fibrillation_of_flutter`, `heart_valve_replacement`, `blood_clot_in_heart`, `arterial_peripheral_thrombosis`, `peripheral_arterial_disease`, `other`, `none`, `user_id`) VALUES
(25, 'Yes', 'Yes', 'Between 1 and 3 months ago', NULL, NULL, 'Yes', 'Yes', 'Yes', 'Yes', 'Other', 'sdafsdf', NULL, 4),
(30, 'Yes', 'Yes', 'Less than 1 month ago', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
(20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', 13);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_fourteen`
--

CREATE TABLE `pat_section_fourteen` (
  `sec_fourteen_id` int(10) NOT NULL,
  `cirrhosis_of_liver` varchar(50) NOT NULL COMMENT 'Do you have cirrhosis of the liver?',
  `antiphospholipid_antibody_syndrome` varchar(50) NOT NULL COMMENT 'Do you have antiphospholipid antibody syndrome?',
  `user_id` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Other medical conditions';

--
-- Dumping data for table `pat_section_fourteen`
--

INSERT INTO `pat_section_fourteen` (`sec_fourteen_id`, `cirrhosis_of_liver`, `antiphospholipid_antibody_syndrome`, `user_id`) VALUES
(9, 'Yes', 'Yes', 4),
(13, 'Yes', 'Yes', 8),
(7, 'Yes', 'Yes', 13);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_one`
--

CREATE TABLE `pat_section_one` (
  `pat_section_one` int(10) NOT NULL,
  `age` int(2) DEFAULT NULL,
  `gender` varchar(12) DEFAULT NULL,
  `weight` int(2) DEFAULT NULL,
  `weight_unit` varchar(10) DEFAULT NULL,
  `doc_name` varchar(100) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_one`
--

INSERT INTO `pat_section_one` (`pat_section_one`, `age`, `gender`, `weight`, `weight_unit`, `doc_name`, `user_id`, `updated_at`, `created_at`) VALUES
(2, 34, 'Male', 28, 'Pound', 'nbj', 4, NULL, NULL),
(8, 67, 'Male', 28, 'Pound', 'nbj', 4, '2021-01-13 00:04:24', '2021-01-13 00:04:24'),
(7, 67, 'Female', 28, 'Pound', 'nbj', 4, '2021-01-13 00:04:01', '2021-01-13 00:04:01');

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_seven`
--

CREATE TABLE `pat_section_seven` (
  `sec_seven_id` int(10) NOT NULL,
  `cognitive_heart_failure` varchar(50) DEFAULT NULL COMMENT 'Cognitive Heart Failure (ever)',
  `high_blood_pressure` varchar(50) DEFAULT NULL COMMENT 'High Blood Pressure (or have had high blood pressure in the past)',
  `diabetes` varchar(50) DEFAULT NULL COMMENT 'Diabetes',
  `mitral_stenosis` varchar(50) DEFAULT NULL COMMENT 'Mitral Stenosis',
  `stroke_or_mini_stroke` varchar(50) DEFAULT NULL COMMENT 'Stroke or Mini-Stroke',
  `stroke_how_long` varchar(100) DEFAULT NULL COMMENT 'how long ago (Stroke or Mini-Stroke)',
  `not_sure` varchar(50) DEFAULT NULL COMMENT 'Not Sure',
  `none_of_above` varchar(50) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Potential Diagnosis';

--
-- Dumping data for table `pat_section_seven`
--

INSERT INTO `pat_section_seven` (`sec_seven_id`, `cognitive_heart_failure`, `high_blood_pressure`, `diabetes`, `mitral_stenosis`, `stroke_or_mini_stroke`, `stroke_how_long`, `not_sure`, `none_of_above`, `user_id`) VALUES
(67, 'on', 'Yes', 'Yes', 'Yes', 'Yes', NULL, NULL, NULL, '4'),
(63, 'on', NULL, NULL, NULL, 'Yes', NULL, NULL, 'None Of Above', '13'),
(72, 'Yes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '8');

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_six`
--

CREATE TABLE `pat_section_six` (
  `sec_six_id` int(10) NOT NULL,
  `mechanical_heart_valve` varchar(50) DEFAULT NULL COMMENT 'Please specify the type of heart Valve Replacement technique that was used',
  `tissue_heart_valve` varchar(30) DEFAULT NULL,
  `mechanical_heart_valve_Is_the_valve_bileaflet` varchar(30) DEFAULT NULL,
  `mechanical_heart_valve_Is_the_valve_ball_and_cage` varchar(30) DEFAULT NULL,
  `mechanical_heart_valve_Is_the_valve_tilting_disc` varchar(30) DEFAULT NULL,
  `mechanical_heart_valve_Is_the_valve_dont_know` varchar(30) DEFAULT NULL,
  `location_aortic` varchar(50) DEFAULT NULL COMMENT 'Please specify location',
  `location_mitral` varchar(30) DEFAULT NULL,
  `location_other` varchar(30) DEFAULT NULL,
  `location_dont_know` varchar(30) DEFAULT NULL,
  `dont_know` varchar(25) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Please specify the type of heart Valve Replacement technique';

--
-- Dumping data for table `pat_section_six`
--

INSERT INTO `pat_section_six` (`sec_six_id`, `mechanical_heart_valve`, `tissue_heart_valve`, `mechanical_heart_valve_Is_the_valve_bileaflet`, `mechanical_heart_valve_Is_the_valve_ball_and_cage`, `mechanical_heart_valve_Is_the_valve_tilting_disc`, `mechanical_heart_valve_Is_the_valve_dont_know`, `location_aortic`, `location_mitral`, `location_other`, `location_dont_know`, `dont_know`, `user_id`) VALUES
(71, 'Mechanical Heart valve', NULL, 'Bileaflet', NULL, NULL, NULL, 'Aortic', NULL, NULL, NULL, 'on', 8),
(51, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'I dont Know', 13),
(67, 'Mechanical Heart valve', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Other', NULL, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_sixteen`
--

CREATE TABLE `pat_section_sixteen` (
  `sec_sixteen_id` int(10) NOT NULL,
  `type_of_procedure` varchar(100) DEFAULT NULL,
  `date_of_procedure` varchar(50) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_sixteen`
--

INSERT INTO `pat_section_sixteen` (`sec_sixteen_id`, `type_of_procedure`, `date_of_procedure`, `user_id`) VALUES
(41, 'Populated from page16', '2021-02-19', 8),
(33, NULL, '2021-01-01', 13),
(37, 'xccfgfdgdfg', '2021-02-18', 4),
(42, 'Not Sure', NULL, 22);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_ten`
--

CREATE TABLE `pat_section_ten` (
  `sec_ten_id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coumadin` varchar(50) DEFAULT NULL,
  `coumadin_monday` varchar(50) DEFAULT NULL,
  `coumadin_tuesday` varchar(50) DEFAULT NULL,
  `coumadin_wednesday` varchar(50) DEFAULT NULL,
  `coumadin_thursday` varchar(50) DEFAULT NULL,
  `coumadin_friday` varchar(50) DEFAULT NULL,
  `coumadin_saturday` varchar(50) DEFAULT NULL,
  `coumadin_sunday` varchar(50) DEFAULT NULL,
  `sintrom` varchar(10) DEFAULT NULL,
  `sintrom_monday` varchar(50) DEFAULT NULL,
  `sintrom_tuesday` varchar(50) DEFAULT NULL,
  `sintrom_wednesday` varchar(50) DEFAULT NULL,
  `sintrom_thursday` varchar(50) DEFAULT NULL,
  `sintrom_friday` varchar(50) DEFAULT NULL,
  `sintrom_saturday` varchar(50) DEFAULT NULL,
  `sintrom_sunday` varchar(50) DEFAULT NULL,
  `not_sure` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Current Drugs';

--
-- Dumping data for table `pat_section_ten`
--

INSERT INTO `pat_section_ten` (`sec_ten_id`, `user_id`, `coumadin`, `coumadin_monday`, `coumadin_tuesday`, `coumadin_wednesday`, `coumadin_thursday`, `coumadin_friday`, `coumadin_saturday`, `coumadin_sunday`, `sintrom`, `sintrom_monday`, `sintrom_tuesday`, `sintrom_wednesday`, `sintrom_thursday`, `sintrom_friday`, `sintrom_saturday`, `sintrom_sunday`, `not_sure`) VALUES
(30, 4, 'Coumadin (Warfarin)', '1', '1', '1', NULL, '3', '4', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 13, 'Coumadin (Warfarin)', '32', '132', '31', NULL, '31', '32', '13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 8, 'Coumadin (Warfarin)', '-1', '-1', '-1', NULL, '1', '1', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_thirteen`
--

CREATE TABLE `pat_section_thirteen` (
  `sec_thirteen_id` int(10) NOT NULL,
  `bleeding_requiring_treatment` varchar(50) DEFAULT NULL COMMENT 'Bleeding requiring treatment in hospital or emergency department?',
  `bleeding_requiring_treatment_last_three_months` varchar(50) DEFAULT NULL,
  `bleeding_from_stomach` varchar(50) DEFAULT NULL COMMENT 'Bleeding from the stomach or bowel',
  `bleeding_from_stomach_last_three_months` varchar(50) DEFAULT NULL,
  `ulcer_in_stomach_or_bowel` varchar(50) DEFAULT NULL,
  `ulcer_in_stomach_or_bowel_last_three_months` text,
  `liver_disease` varchar(50) DEFAULT NULL,
  `kidney_disease` varchar(50) DEFAULT NULL,
  `not_sure` varchar(50) DEFAULT NULL,
  `had_transfusion_in_last_three_months` varchar(50) DEFAULT NULL,
  `had_transfusion_in_last_three_months_when` date DEFAULT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_thirteen`
--

INSERT INTO `pat_section_thirteen` (`sec_thirteen_id`, `bleeding_requiring_treatment`, `bleeding_requiring_treatment_last_three_months`, `bleeding_from_stomach`, `bleeding_from_stomach_last_three_months`, `ulcer_in_stomach_or_bowel`, `ulcer_in_stomach_or_bowel_last_three_months`, `liver_disease`, `kidney_disease`, `not_sure`, `had_transfusion_in_last_three_months`, `had_transfusion_in_last_three_months_when`, `user_id`) VALUES
(14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Yes', 'Yes', NULL, 8),
(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Yes', 'Yes', NULL, 13),
(9, 'Yes', 'Yes', 'Yes', 'Not Sure', 'Yes', 'Not Sure', 'Yes', 'Yes', NULL, 'Yes', '2021-01-13', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_three`
--

CREATE TABLE `pat_section_three` (
  `sec_three_id` int(10) NOT NULL,
  `blood_clot_blood_thinner_interrupted` varchar(50) DEFAULT NULL COMMENT 'Have you had a blood clot while your blood thinner was interrupted?',
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_three`
--

INSERT INTO `pat_section_three` (`sec_three_id`, `blood_clot_blood_thinner_interrupted`, `user_id`) VALUES
(34, 'No', 4),
(39, 'Yes', 8),
(30, 'Yes', 13);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_twelve`
--

CREATE TABLE `pat_section_twelve` (
  `sec_twelve_id` int(11) NOT NULL,
  `lab_location_for_inr_test` varchar(50) DEFAULT NULL COMMENT 'Lab location for INR test',
  `user_id` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Lab Location';

--
-- Dumping data for table `pat_section_twelve`
--

INSERT INTO `pat_section_twelve` (`sec_twelve_id`, `lab_location_for_inr_test`, `user_id`) VALUES
(20, 'Life Labs', 8),
(13, 'dfg', 13),
(15, 'Life Labs', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pat_section_two`
--

CREATE TABLE `pat_section_two` (
  `sec_two_id` int(10) NOT NULL,
  `age` varchar(5) DEFAULT NULL,
  `weight` varchar(5) DEFAULT NULL,
  `weight_unit` varchar(10) DEFAULT NULL,
  `physicianName` varchar(60) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `user_id` int(10) DEFAULT NULL,
  `patient_id` varchar(15) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_section_two`
--

INSERT INTO `pat_section_two` (`sec_two_id`, `age`, `weight`, `weight_unit`, `physicianName`, `gender`, `user_id`, `patient_id`) VALUES
(30, '67', '4', 'Pound', 'dr.hgjhg', 'Female', 4, '12333'),
(35, '36', '85', 'KG', 'Dr Chand', 'Male', 8, '12869'),
(26, '36', '74', 'KG', 'Dr Kiran', 'Male', 13, '13536');

-- --------------------------------------------------------

--
-- Table structure for table `pat_sub_questions`
--

CREATE TABLE `pat_sub_questions` (
  `sub_q_id` int(10) NOT NULL,
  `q_id` int(10) DEFAULT NULL,
  `sub_question` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pat_sub_questions`
--

INSERT INTO `pat_sub_questions` (`sub_q_id`, `q_id`, `sub_question`) VALUES
(1, 2, 'DVT'),
(2, 2, 'PE');

-- --------------------------------------------------------

--
-- Table structure for table `pat_sub_questions_answer`
--

CREATE TABLE `pat_sub_questions_answer` (
  `sub_q_ans_id` int(10) NOT NULL,
  `question_id` int(10) DEFAULT NULL,
  `ans_one` varchar(50) DEFAULT NULL,
  `ans_two` varchar(50) DEFAULT NULL,
  `ans_three` varchar(50) DEFAULT NULL,
  `ans_four` varchar(50) DEFAULT NULL,
  `ans_five` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@admin.com', NULL, '$2y$10$yzfBqGevGHjrayhs14/Q9u2C7sjCXd/n3Cm5bnih7krhmg.Q1V806', NULL, '2020-11-08 05:18:59', '2020-11-08 05:18:59'),
(2, 'John Doe', 'user@user.com', NULL, '$2y$10$gPqs1zav2efQpmLr.ozqE.ap.OV1e93WNzyFScDK4ah7TxaNy2hAu', NULL, '2020-11-08 05:18:59', '2020-11-08 05:18:59'),
(15, 'sfsdf', 'inam11@yopmail.com', '2021-02-03 02:53:22', '$2y$10$IatM69VQ7ieb2RJBC4BHguSmvvVyLKG4zvH2.qzZW1/NUlU3JfT2e', NULL, '2021-02-03 02:51:00', '2021-02-03 02:55:49'),
(4, 'Inam', 'inam@yopmail.com', '2021-02-03 02:53:22', '$2y$10$7ACwulshn0Ok4jFxCx3iaeUkrFGI67j71yEhqI7ps1qOU.R06UXn2', NULL, '2020-11-08 09:27:35', '2021-02-18 20:02:17'),
(5, 'Zack', 'zack.muqtadir@gmail.com', NULL, '$2y$10$.pDjxc59znPy2CObeZ3qj.ujMN/dGpq5JxFpfbnfJRVF9n.OoYhH6', NULL, '2020-11-14 05:32:40', '2020-11-14 05:32:40'),
(6, 'Vinai', 'bhagiv@mcmaster.ca', NULL, '$2y$10$IV4xeM8t7OfFnlLZyef.NeRV9ybpUAZOJARmB8E/QzNtJvPhLkgiC', NULL, '2020-11-14 06:36:58', '2020-11-14 06:36:58'),
(7, 'Fady', 'saidf3@mcmaster.ca', NULL, '$2y$10$qWWO/Bf4kuvCzk6oX29zDOAb2v3NAUBAfpwVhFhWhAAyTWA8miWKS', NULL, '2020-11-19 09:54:25', '2020-11-19 09:54:25'),
(8, 'Chand', 'chandpasha.syed@gmail.com', NULL, '$2y$10$.n3UH2IkPaXPIu7Lu.qElOyp4f2NI5GxUNWJdOa12TVBGuunshPKm', NULL, '2020-12-24 20:48:27', '2020-12-24 20:48:27'),
(9, 'tbl', 'tbltestuser1@yopmail.com', NULL, '$2y$10$mFEbJx6/Ju0NbQfbz8NAoeC.FlgeEYULVr2x7g6oT8owvdj41aaSG', NULL, '2020-12-31 05:50:43', '2020-12-31 05:50:43'),
(14, 'inam', 'inam1@yopmail.com', NULL, '$2y$10$TeczgwyYIlIuaiu5Tn865OTfxFPayMXh3CKgXtXrxTjUzmj0lEQJS', NULL, '2021-02-03 00:44:45', '2021-02-03 00:44:45'),
(11, 'thrombouser', 'thrombouser01@yopmail.com', NULL, '$2y$10$3.2Aimp8elCwtyPthtpCXut3UANUY2oBaexLwxCKMNM0MSgYOhLqW', NULL, '2021-01-26 20:26:51', '2021-01-26 20:26:51'),
(12, 'unknowemail', 'wrongemail@yopmail.com', NULL, '$2y$10$mLQ.4SW/1Sfo79fyAuBV9u/bG/wqhPDG5i5uY41JDDhBz8GfCO9yK', NULL, '2021-01-26 20:34:28', '2021-01-26 20:34:28'),
(13, 'newuserSIX', 'newuser05@yopmail.com', NULL, '$2y$10$Dc1Nzr/DVldNIGGA0.Xb0uvPHVaboo/JsAfm0.mY/m7Ru/ddDQ7XW', NULL, '2021-01-31 23:16:11', '2021-01-31 23:16:11'),
(16, 'Zack', 'info@zltechnovation.com', '2021-02-06 00:24:51', '$2y$10$m8IhdOcTxvTV/8eWyDfd7eUSP.vS5nwu2tZML0jIHuKC/bwrkKmz2', NULL, '2021-02-06 00:00:29', '2021-02-06 00:24:51'),
(17, 'Inam', 'inam2@yopmail.com', NULL, '$2y$10$9MHVz/TX96xy7HapoIUs6.zEbv4j3BVmKatd4WGvpGdlYJXIBFy/e', NULL, '2021-02-13 02:44:21', '2021-02-13 02:44:21'),
(18, 'Inam', 'inam111@yopmail.com', '2021-02-15 00:21:38', '$2y$10$lJXhfQpGvcl3e/7V2CllieF9cK6I5.p340qYzXJUdLfVhAWlCuJQm', NULL, '2021-02-15 00:08:15', '2021-02-15 00:21:38'),
(19, 'Inam', 'inam4@yopmail.com', NULL, '$2y$10$1ADJAaqwZvBfzULd5OeyiubzXRQ2u9RMrD9JF0UoUENctcI2A658m', NULL, '2021-02-15 00:26:38', '2021-02-15 00:26:38'),
(20, 'Inam', 'inam5@yopmail.com', NULL, '$2y$10$aCjJG1pp24/tzH4ra.SGN.skXmoo96/pvYNrrfiluBRCFo8kV/quG', NULL, '2021-02-15 00:39:55', '2021-02-15 00:39:55'),
(21, 'Inam', 'inam6@yopmail.com', NULL, '$2y$10$Ob6F3SQDLMlzhAShXTUDpOG8REiSXxwE7dWqC0tJo1E5LrW.fcatu', NULL, '2021-02-15 02:32:05', '2021-02-15 02:32:05'),
(22, 'Fady', 'fady.nhl.said@gmail.com', '2021-02-18 03:30:16', '$2y$10$MxTgct97Ur11ZgPN.SDn6.gR9sSPar0.jhjTkAM9zH9XTcxUjciqa', NULL, '2021-02-18 03:28:52', '2021-02-18 03:30:16'),
(23, 'Inam', 'inam3@yopmail.com', NULL, '$2y$10$iRVXJ4wXq8bdqTtqU5Sjlu8ZFkgg5eMl1dlMQtqZdxXa0nA5QKzGS', NULL, '2021-02-18 04:00:06', '2021-02-18 04:00:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nurse_section_five`
--
ALTER TABLE `nurse_section_five`
  ADD PRIMARY KEY (`sec_five_id`);

--
-- Indexes for table `nurse_section_one`
--
ALTER TABLE `nurse_section_one`
  ADD PRIMARY KEY (`section_one_id`);

--
-- Indexes for table `nurse_section_three`
--
ALTER TABLE `nurse_section_three`
  ADD PRIMARY KEY (`sec_three_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`),
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `pat_section_eight`
--
ALTER TABLE `pat_section_eight`
  ADD PRIMARY KEY (`sec_eight_id`);

--
-- Indexes for table `pat_section_eleven`
--
ALTER TABLE `pat_section_eleven`
  ADD PRIMARY KEY (`sec_eleven_id`);

--
-- Indexes for table `pat_section_fifteen`
--
ALTER TABLE `pat_section_fifteen`
  ADD PRIMARY KEY (`sec_fifteen_id`);

--
-- Indexes for table `pat_section_five`
--
ALTER TABLE `pat_section_five`
  ADD PRIMARY KEY (`sec_five_id`);

--
-- Indexes for table `pat_section_four`
--
ALTER TABLE `pat_section_four`
  ADD PRIMARY KEY (`sec_four_id`);

--
-- Indexes for table `pat_section_fourteen`
--
ALTER TABLE `pat_section_fourteen`
  ADD PRIMARY KEY (`sec_fourteen_id`);

--
-- Indexes for table `pat_section_one`
--
ALTER TABLE `pat_section_one`
  ADD PRIMARY KEY (`pat_section_one`);

--
-- Indexes for table `pat_section_seven`
--
ALTER TABLE `pat_section_seven`
  ADD PRIMARY KEY (`sec_seven_id`);

--
-- Indexes for table `pat_section_six`
--
ALTER TABLE `pat_section_six`
  ADD PRIMARY KEY (`sec_six_id`);

--
-- Indexes for table `pat_section_sixteen`
--
ALTER TABLE `pat_section_sixteen`
  ADD PRIMARY KEY (`sec_sixteen_id`);

--
-- Indexes for table `pat_section_ten`
--
ALTER TABLE `pat_section_ten`
  ADD PRIMARY KEY (`sec_ten_id`);

--
-- Indexes for table `pat_section_thirteen`
--
ALTER TABLE `pat_section_thirteen`
  ADD PRIMARY KEY (`sec_thirteen_id`);

--
-- Indexes for table `pat_section_three`
--
ALTER TABLE `pat_section_three`
  ADD PRIMARY KEY (`sec_three_id`);

--
-- Indexes for table `pat_section_twelve`
--
ALTER TABLE `pat_section_twelve`
  ADD PRIMARY KEY (`sec_twelve_id`);

--
-- Indexes for table `pat_section_two`
--
ALTER TABLE `pat_section_two`
  ADD PRIMARY KEY (`sec_two_id`);

--
-- Indexes for table `pat_sub_questions`
--
ALTER TABLE `pat_sub_questions`
  ADD PRIMARY KEY (`sub_q_id`);

--
-- Indexes for table `pat_sub_questions_answer`
--
ALTER TABLE `pat_sub_questions_answer`
  ADD PRIMARY KEY (`sub_q_ans_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nurse_section_five`
--
ALTER TABLE `nurse_section_five`
  MODIFY `sec_five_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `nurse_section_one`
--
ALTER TABLE `nurse_section_one`
  MODIFY `section_one_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `nurse_section_three`
--
ALTER TABLE `nurse_section_three`
  MODIFY `sec_three_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `pat_section_eight`
--
ALTER TABLE `pat_section_eight`
  MODIFY `sec_eight_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `pat_section_eleven`
--
ALTER TABLE `pat_section_eleven`
  MODIFY `sec_eleven_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pat_section_fifteen`
--
ALTER TABLE `pat_section_fifteen`
  MODIFY `sec_fifteen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pat_section_five`
--
ALTER TABLE `pat_section_five`
  MODIFY `sec_five_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pat_section_four`
--
ALTER TABLE `pat_section_four`
  MODIFY `sec_four_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `pat_section_fourteen`
--
ALTER TABLE `pat_section_fourteen`
  MODIFY `sec_fourteen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pat_section_one`
--
ALTER TABLE `pat_section_one`
  MODIFY `pat_section_one` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pat_section_seven`
--
ALTER TABLE `pat_section_seven`
  MODIFY `sec_seven_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `pat_section_six`
--
ALTER TABLE `pat_section_six`
  MODIFY `sec_six_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `pat_section_sixteen`
--
ALTER TABLE `pat_section_sixteen`
  MODIFY `sec_sixteen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `pat_section_ten`
--
ALTER TABLE `pat_section_ten`
  MODIFY `sec_ten_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pat_section_thirteen`
--
ALTER TABLE `pat_section_thirteen`
  MODIFY `sec_thirteen_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pat_section_three`
--
ALTER TABLE `pat_section_three`
  MODIFY `sec_three_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `pat_section_twelve`
--
ALTER TABLE `pat_section_twelve`
  MODIFY `sec_twelve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `pat_section_two`
--
ALTER TABLE `pat_section_two`
  MODIFY `sec_two_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `pat_sub_questions`
--
ALTER TABLE `pat_sub_questions`
  MODIFY `sub_q_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pat_sub_questions_answer`
--
ALTER TABLE `pat_sub_questions_answer`
  MODIFY `sub_q_ans_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
