-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema zhaltur
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `zhaltur` ;

-- -----------------------------------------------------
-- Schema zhaltur
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zhaltur` DEFAULT CHARACTER SET utf8 ;
USE `zhaltur` ;

-- -----------------------------------------------------
-- Table `zhaltur`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`categories` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`categories` (
  `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`customers` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`customers` (
  `customer_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `customerscol` VARCHAR(45) NULL,
  PRIMARY KEY (`customer_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`suppliers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`suppliers` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`suppliers` (
  `supplier_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NULL,
  `supplier_name` VARCHAR(255) NOT NULL,
  `profile` VARCHAR(512) NOT NULL,
  `web_address` VARCHAR(30) NULL,
  `address` VARCHAR(255) NULL,
  PRIMARY KEY (`supplier_id`),
  CONSTRAINT `fk_suppliers_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `zhaltur`.`categories` (`category_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_suppliers_categories1_idx` ON `zhaltur`.`suppliers` (`category_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`link_table`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`link_table` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`link_table` (
  `link_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_id` INT UNSIGNED NULL,
  `customer_id` INT UNSIGNED NULL,
  PRIMARY KEY (`link_id`),
  CONSTRAINT `fk_link_table_customers1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `zhaltur`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_table_suppliers1`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `zhaltur`.`suppliers` (`supplier_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_link_table_customers1_idx` ON `zhaltur`.`link_table` (`customer_id` ASC);

CREATE INDEX `fk_link_table_suppliers1_idx` ON `zhaltur`.`link_table` (`supplier_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`contacts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`contacts` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`contacts` (
  `contact_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `position` VARCHAR(45) NULL,
  `contact_name` VARCHAR(45) NOT NULL,
  `link_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`contact_id`),
  CONSTRAINT `fk_contacts_link_table1`
    FOREIGN KEY (`link_id`)
    REFERENCES `zhaltur`.`link_table` (`link_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_contacts_link_table1_idx` ON `zhaltur`.`contacts` (`link_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`cos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`cos` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`cos` (
  `cos_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `privileges` VARCHAR(10) NOT NULL DEFAULT 'manager',
  `users` TINYINT NOT NULL DEFAULT 1 COMMENT 'acces mode awr\na - add\nr - read\nw - write',
  `customers` TINYINT NOT NULL DEFAULT 1,
  `companies` TINYINT NOT NULL DEFAULT 1,
  `suppliers` TINYINT NOT NULL DEFAULT 1,
  `orders` TINYINT NOT NULL DEFAULT 1,
  `logistics` TINYINT NOT NULL DEFAULT 1,
  `proposals` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`cos_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`companies` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`companies` (
  `company_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`company_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`users` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `cos_id` INT UNSIGNED NOT NULL,
  `company_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_users_cos1`
    FOREIGN KEY (`cos_id`)
    REFERENCES `zhaltur`.`cos` (`cos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `zhaltur`.`companies` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_users_cos1_idx` ON `zhaltur`.`users` (`cos_id` ASC);

CREATE INDEX `fk_users_companies1_idx` ON `zhaltur`.`users` (`company_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`comments` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`comments` (
  `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `comment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` MEDIUMTEXT NOT NULL,
  `link_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`comment_id`),
  CONSTRAINT `fk_comments_link_table1`
    FOREIGN KEY (`link_id`)
    REFERENCES `zhaltur`.`link_table` (`link_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_comments_link_table1_idx` ON `zhaltur`.`comments` (`link_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`details` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`details` (
  `contact_type` VARCHAR(10) NOT NULL,
  `nameornumber` VARCHAR(45) NOT NULL,
  `contact_id` INT UNSIGNED NOT NULL,
  CONSTRAINT `fk_details_contacts1`
    FOREIGN KEY (`contact_id`)
    REFERENCES `zhaltur`.`contacts` (`contact_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_details_contacts1_idx` ON `zhaltur`.`details` (`contact_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`tenders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`tenders` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`tenders` (
  `tender_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT UNSIGNED NOT NULL,
  `contact_id` INT UNSIGNED NOT NULL,
  `tender_name` VARCHAR(255) NOT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `user_id` INT UNSIGNED NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'Новый',
  `company_id` INT UNSIGNED NOT NULL,
  `file_path` VARCHAR(255) NULL,
  PRIMARY KEY (`tender_id`),
  CONSTRAINT `fk_tenders_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `zhaltur`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tenders_customers1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `zhaltur`.`customers` (`customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tenders_companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `zhaltur`.`companies` (`company_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_tenders_users1_idx` ON `zhaltur`.`tenders` (`user_id` ASC);

CREATE INDEX `fk_tenders_customers1_idx` ON `zhaltur`.`tenders` (`customer_id` ASC);

CREATE INDEX `fk_tenders_companies1_idx` ON `zhaltur`.`tenders` (`company_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`conpetition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`conpetition` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`conpetition` (
  `user_id` INT NOT NULL,
  `query` INT NOT NULL,
  `comment` INT NOT NULL,
  `update` DATETIME NOT NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`quotation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`quotation` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`quotation` (
  `quotation_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `no_proposal` VARCHAR(45) NOT NULL,
  `file_path` VARCHAR(255) NULL,
  PRIMARY KEY (`quotation_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`purchases`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`purchases` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`purchases` (
  `purchase_id` INT UNSIGNED NOT NULL,
  `purchase_no` VARCHAR(45) NOT NULL,
  `purchase_date` DATE NOT NULL,
  `delivery_date` DATE NOT NULL,
  `file_path` VARCHAR(255) NULL,
  `purchase_status` FLOAT NULL,
  `purchase_sum` FLOAT NULL,
  PRIMARY KEY (`purchase_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zhaltur`.`link_tender`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`link_tender` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`link_tender` (
  `link_tender_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quotation_id` INT UNSIGNED NULL,
  `purchase_id` INT UNSIGNED NULL,
  `tender_id` INT UNSIGNED NULL,
  PRIMARY KEY (`link_tender_id`),
  CONSTRAINT `fk_link_tender_tenders1`
    FOREIGN KEY (`tender_id`)
    REFERENCES `zhaltur`.`tenders` (`tender_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_quotation_quotation_id1`
    FOREIGN KEY (`quotation_id`)
    REFERENCES `zhaltur`.`quotation` (`quotation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_link_purchase_purchase_id1`
    FOREIGN KEY (`purchase_id`)
    REFERENCES `zhaltur`.`purchases` (`purchase_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_link_tender_tenders1_idx` ON `zhaltur`.`link_tender` (`tender_id` ASC);

CREATE INDEX `fk_link_tender_quotation1_idx` ON `zhaltur`.`link_tender` (`quotation_id` ASC);

CREATE INDEX `fk_link_tender_purchase1_idx` ON `zhaltur`.`link_tender` (`purchase_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`logistics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`logistics` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`logistics` (
  `logist_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `supplier_id` INT UNSIGNED NOT NULL,
  `logist_status` FLOAT NOT NULL,
  PRIMARY KEY (`logist_id`),
  CONSTRAINT `fk_logistics_suppliers1`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `zhaltur`.`suppliers` (`supplier_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_logistics_suppliers1_idx` ON `zhaltur`.`logistics` (`supplier_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`lots`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`lots` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`lots` (
  `lot_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `stock_code` VARCHAR(15) NULL,
  `name` VARCHAR(255) NOT NULL,
  `unit` VARCHAR(10) NOT NULL,
  `qty` INT NOT NULL,
  `proposal_price` FLOAT NULL,
  `purchase_price` FLOAT NULL,
  `link_tender_id` INT UNSIGNED NOT NULL,
  `logist_id` INT UNSIGNED NULL,
  PRIMARY KEY (`lot_id`),
  CONSTRAINT `fk_lots_link_tender1`
    FOREIGN KEY (`link_tender_id`)
    REFERENCES `zhaltur`.`link_tender` (`link_tender_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lots_logistics1`
    FOREIGN KEY (`logist_id`)
    REFERENCES `zhaltur`.`logistics` (`logist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_lots_link_tender1_idx` ON `zhaltur`.`lots` (`link_tender_id` ASC);

CREATE INDEX `fk_lots_logistics1_idx` ON `zhaltur`.`lots` (`logist_id` ASC);


-- -----------------------------------------------------
-- Table `zhaltur`.`Journal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `zhaltur`.`Journal` ;

CREATE TABLE IF NOT EXISTS `zhaltur`.`Journal` (
  `journal_id` INT UNSIGNED NOT NULL,
  `logist_id` INT UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  `note` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`journal_id`),
  CONSTRAINT `fk_Journal_logistics1`
    FOREIGN KEY (`logist_id`)
    REFERENCES `zhaltur`.`logistics` (`logist_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Journal_logistics1_idx` ON `zhaltur`.`Journal` (`logist_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `zhaltur`.`cos`
-- -----------------------------------------------------
START TRANSACTION;
USE `zhaltur`;
INSERT INTO `zhaltur`.`cos` (`cos_id`, `privileges`, `users`, `customers`, `companies`, `suppliers`, `orders`, `logistics`, `proposals`) VALUES (1, 'admin', DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zhaltur`.`companies`
-- -----------------------------------------------------
START TRANSACTION;
USE `zhaltur`;
INSERT INTO `zhaltur`.`companies` (`company_id`, `company_name`) VALUES (1, 'Жалтур-Атырау');
INSERT INTO `zhaltur`.`companies` (`company_id`, `company_name`) VALUES (2, 'Анком');

COMMIT;


-- -----------------------------------------------------
-- Data for table `zhaltur`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `zhaltur`;
INSERT INTO `zhaltur`.`users` (`user_id`, `user_name`, `email`, `password`, `cos_id`, `company_id`) VALUES (1, 'madi', 'kmadi@inbox.ru', '12345', 1, 1);
INSERT INTO `zhaltur`.`users` (`user_id`, `user_name`, `email`, `password`, `cos_id`, `company_id`) VALUES (1, 'user1', 'user1@inbox.ru', '12345', 1, 1);
INSERT INTO `zhaltur`.`users` (`user_id`, `user_name`, `email`, `password`, `cos_id`, `company_id`) VALUES (1, 'user2', 'user2@inbox.ru', '12345', 1, 1);

COMMIT;

