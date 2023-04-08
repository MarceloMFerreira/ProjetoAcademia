-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 08-Abr-2023 às 17:48
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projetoacademia2023`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `acessorios`
--

DROP TABLE IF EXISTS `acessorios`;
CREATE TABLE IF NOT EXISTS `acessorios` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_DESCRICAO` varchar(100) NOT NULL,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `acessorios_fk_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `acessorios`
--

INSERT INTO `acessorios` (`INT_ID`, `TXT_DESCRICAO`, `INT_ID_EMPRESA`, `BOOL_ATIVO`) VALUES
(1, 'Acessório 1', 1, 1),
(2, 'Acessório 2', 1, 1),
(3, 'Acessório 3', 1, 1),
(4, 'Acessório 4', 1, 1),
(5, 'eddd', 1, 0),
(6, 'Acessório 5', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `agenda`
--

DROP TABLE IF EXISTS `agenda`;
CREATE TABLE IF NOT EXISTS `agenda` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  `INT_ID_PACIENTE` int(11) NOT NULL,
  `DATE_INICIO_AGENDOU` datetime NOT NULL,
  `DATE_FIM_AGENDOU` datetime NOT NULL,
  `INT_ID_CADASTRO` int(11) NOT NULL,
  `DATE_CADASTRO` datetime NOT NULL,
  `INT_ID_ALTERACAO` int(11) DEFAULT NULL,
  `DATE_ALTERACAO` datetime DEFAULT NULL,
  `INT_ID_EXCLUSAO` int(11) DEFAULT NULL,
  `DATE_EXCLUSAO` datetime DEFAULT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `agenda_fk_empresa_idx` (`INT_ID_EMPRESA`),
  KEY `agenda_fk_paciente_idx` (`INT_ID_PACIENTE`),
  KEY `agenda_cadastro_fk_colaborador_idx` (`INT_ID_CADASTRO`),
  KEY `agenda_alteracao_fk_colaborador_idx` (`INT_ID_ALTERACAO`),
  KEY `agenda_exclusao_fk_colaborador_idx` (`INT_ID_EXCLUSAO`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `agenda`
--

INSERT INTO `agenda` (`INT_ID`, `INT_ID_EMPRESA`, `INT_ID_PACIENTE`, `DATE_INICIO_AGENDOU`, `DATE_FIM_AGENDOU`, `INT_ID_CADASTRO`, `DATE_CADASTRO`, `INT_ID_ALTERACAO`, `DATE_ALTERACAO`, `INT_ID_EXCLUSAO`, `DATE_EXCLUSAO`, `BOOL_ATIVO`) VALUES
(38, 1, 11, '2023-01-09 12:00:00', '2023-01-09 20:00:00', 1, '2023-01-07 20:44:15', 1, '2023-01-07 21:09:47', NULL, NULL, 1),
(39, 1, 14, '2023-01-08 20:00:00', '2023-01-08 21:00:00', 1, '2023-01-07 20:44:53', 1, '2023-01-07 21:52:49', NULL, NULL, 1),
(40, 1, 13, '2023-01-09 18:00:00', '2023-01-09 19:00:00', 1, '2023-01-07 20:45:16', NULL, NULL, NULL, NULL, 1),
(41, 1, 14, '2023-01-07 12:00:00', '2023-01-07 13:00:00', 1, '2023-01-07 21:39:48', 1, '2023-01-07 21:40:06', NULL, NULL, 1),
(42, 1, 11, '2023-01-07 13:00:00', '2023-01-07 14:00:00', 1, '2023-01-07 21:45:43', NULL, NULL, 1, '2023-01-07 21:50:58', 0),
(43, 1, 13, '2023-01-07 20:00:00', '2023-01-07 21:00:00', 1, '2023-01-07 21:46:07', 1, '2023-01-07 21:50:45', NULL, NULL, 1),
(44, 1, 11, '2023-01-07 15:00:00', '2023-01-07 16:00:00', 1, '2023-01-07 22:03:04', NULL, NULL, NULL, NULL, 1),
(45, 1, 11, '2023-01-08 22:02:00', '2023-01-08 22:02:00', 1, '2023-01-09 01:02:21', NULL, NULL, NULL, NULL, 1),
(46, 1, 11, '2023-02-11 14:53:00', '2023-02-11 14:53:00', 1, '2023-02-11 17:53:56', NULL, NULL, NULL, NULL, 1),
(47, 1, 11, '2023-02-11 16:01:00', '2023-02-11 17:01:00', 1, '2023-02-11 17:59:52', NULL, NULL, NULL, NULL, 1),
(48, 1, 14, '2023-02-11 20:05:00', '2023-02-11 21:05:00', 1, '2023-02-11 18:00:06', NULL, NULL, NULL, NULL, 1),
(49, 1, 14, '2023-02-20 15:22:00', '2023-02-20 16:22:00', 8, '2023-02-20 18:22:11', NULL, NULL, NULL, NULL, 1),
(50, 1, 11, '2023-02-21 19:28:00', '2023-02-20 20:29:00', 8, '2023-02-20 18:24:53', NULL, NULL, NULL, NULL, 1),
(51, 1, 11, '2023-02-20 19:29:00', '2023-02-20 20:29:00', 8, '2023-02-20 18:25:11', NULL, NULL, NULL, NULL, 1),
(52, 1, 11, '2023-03-04 17:31:00', '2023-03-04 18:31:00', 1, '2023-03-04 18:31:55', NULL, NULL, NULL, NULL, 1),
(53, 1, 11, '2023-03-04 17:41:00', '2023-03-04 19:41:00', 1, '2023-03-04 20:41:51', 1, '2023-03-07 13:12:00', NULL, NULL, 1),
(54, 1, 11, '2023-03-04 17:41:00', '2023-03-04 23:41:00', 1, '2023-03-04 20:42:07', 1, '2023-03-07 13:14:14', NULL, NULL, 1),
(55, 1, 14, '2023-03-04 17:42:00', '2023-03-04 16:42:00', 1, '2023-03-04 20:43:02', NULL, NULL, 1, '2023-03-07 13:13:43', 0),
(56, 1, 11, '2023-03-04 17:43:00', '2023-03-04 08:43:00', 1, '2023-03-04 20:43:14', NULL, NULL, 1, '2023-03-07 13:13:38', 0),
(57, 1, 11, '2023-03-04 18:44:00', '2023-03-04 19:44:00', 1, '2023-03-04 20:45:07', NULL, NULL, NULL, NULL, 1),
(58, 1, 26, '2023-03-25 18:45:00', '2023-03-25 19:45:00', 1, '2023-03-25 18:45:42', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aparelhos`
--

DROP TABLE IF EXISTS `aparelhos`;
CREATE TABLE IF NOT EXISTS `aparelhos` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_DESCRICAO` varchar(100) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `aparelhos_fk_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `aparelhos`
--

INSERT INTO `aparelhos` (`INT_ID`, `TXT_DESCRICAO`, `BOOL_ATIVO`, `INT_ID_EMPRESA`) VALUES
(1, 'aparelho 1', 0, 1),
(2, 'Aparelho 2', 1, 1),
(3, 'Aparelho 3', 1, 1),
(4, 'Aparelho 4', 1, 1),
(6, 'teste', 0, 1),
(7, 'asdasdas', 0, 1),
(8, 'AParelho 1', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
CREATE TABLE IF NOT EXISTS `avaliacao` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DECIMAL_ALTURA` decimal(10,2) NOT NULL,
  `DECIMAL_PESO` decimal(10,1) NOT NULL,
  `DATE_AVALIACAO` date NOT NULL,
  `INT_ID_CADASTRO` int(11) NOT NULL,
  `DATE_CADASTRO` datetime NOT NULL,
  `INT_ID_ALTERCAO` int(11) DEFAULT NULL,
  `DATE_ALTERCAO` datetime DEFAULT NULL,
  `INT_ID_EXCLUSAO` int(11) DEFAULT NULL,
  `DATE_EXCLUSAO` datetime DEFAULT NULL,
  `TXT_OUTRAS_QUEIXAS` varchar(2000) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `INT_ID_PACIENTE` int(11) NOT NULL,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `avaliacao_cadastro_fk_colaborador_idx` (`INT_ID_CADASTRO`),
  KEY `avaliacao_alteracao_fk_colaborador_idx` (`INT_ID_ALTERCAO`),
  KEY `avaliacao_exclusao_fk_colaborador_idx` (`INT_ID_EXCLUSAO`),
  KEY `avaliacao_fk_paciente_idx` (`INT_ID_PACIENTE`),
  KEY `avaliacao_fk_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `avaliacao`
--

INSERT INTO `avaliacao` (`INT_ID`, `DECIMAL_ALTURA`, `DECIMAL_PESO`, `DATE_AVALIACAO`, `INT_ID_CADASTRO`, `DATE_CADASTRO`, `INT_ID_ALTERCAO`, `DATE_ALTERCAO`, `INT_ID_EXCLUSAO`, `DATE_EXCLUSAO`, `TXT_OUTRAS_QUEIXAS`, `BOOL_ATIVO`, `INT_ID_PACIENTE`, `INT_ID_EMPRESA`) VALUES
(1, '1.78', '60.0', '2023-11-04', 1, '2010-11-04 00:00:00', 8, '2022-12-26 00:00:00', 1, '2023-01-02 00:00:00', 'a', 0, 11, 1),
(2, '1.78', '90.0', '2022-12-26', 1, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', 'testeb', 0, 11, 1),
(3, '1.99', '80.0', '2022-12-26', 1, '2022-12-26 00:00:00', NULL, NULL, 8, '2022-12-26 00:00:00', 'teste', 0, 14, 1),
(4, '2.01', '72.0', '2022-12-22', 1, '2022-12-26 00:00:00', 1, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', 'rtrthrt', 0, 14, 1),
(5, '2.03', '60.0', '2022-12-19', 1, '2022-12-26 00:00:00', 1, '2022-12-26 00:00:00', NULL, NULL, 'teste', 1, 14, 1),
(6, '1.70', '45.0', '2022-12-26', 1, '2022-12-26 00:00:00', NULL, NULL, NULL, NULL, 'nada', 1, 13, 1),
(7, '2226.00', '6.6', '2022-12-19', 1, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', NULL, NULL, 'teste', 1, 14, 1),
(8, '23.00', '223.0', '2024-12-27', 8, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', NULL, NULL, 'wewe', 1, 11, 1),
(9, '232323.00', '23232.0', '2022-12-20', 8, '2022-12-26 00:00:00', NULL, NULL, NULL, NULL, 'etetet', 1, 14, 1),
(10, '1212.00', '12.0', '2022-12-23', 8, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', NULL, NULL, 'teste', 1, 13, 1),
(11, '5.00', '-1.0', '2022-11-20', 8, '2022-12-26 00:00:00', 8, '2022-12-26 00:00:00', NULL, NULL, 'adasd', 1, 14, 1),
(12, '23.00', '23.0', '2022-12-22', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, 'asdsad', 1, 14, 1),
(13, '23.00', '23.0', '2022-12-10', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, '23', 1, 14, 1),
(14, '23.00', '2.0', '2023-01-07', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, 'asd', 1, 14, 1),
(15, '1212.00', '231.0', '2023-01-05', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, 'asdsad', 1, 14, 1),
(16, '23.00', '2323.0', '2022-12-02', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, 'asdsad', 1, 14, 1),
(17, '2323.00', '2323.0', '2025-09-15', 1, '2022-12-27 00:00:00', NULL, NULL, NULL, NULL, 'asdasd', 1, 14, 1),
(18, '343.00', '34.0', '2023-01-24', 1, '2023-01-02 00:00:00', 1, '2023-03-04 19:06:25', NULL, NULL, 'wrwer\r\nhjk\r\nhjk', 1, 11, 1),
(19, '678.00', '67.0', '2023-01-25', 1, '2023-01-02 00:00:00', NULL, NULL, NULL, NULL, 't', 1, 11, 1),
(20, '69.00', '4.0', '2023-01-12', 1, '2023-01-07 21:57:54', 1, '2023-01-07 21:58:39', 8, '2023-01-07 22:00:30', 'QWEQWEWE', 0, 11, 1),
(21, '32.00', '2.0', '2023-03-04', 1, '2023-03-04 17:30:37', NULL, NULL, 1, '2023-03-04 18:52:22', 'asdasd\r\nasdasdasd\r\nASDAsdasd\r\nASDAsdasd', 0, 11, 1),
(22, '34.00', '34.0', '2023-03-04', 1, '2023-03-04 18:52:39', NULL, NULL, 1, '2023-03-04 18:52:50', 'sasdasd\r\nghjghj\r\nhjkhjk', 0, 11, 1),
(23, '34343.00', '3434.0', '2023-03-04', 1, '2023-03-04 18:53:03', 1, '2023-03-04 18:53:11', 1, '2023-03-04 18:53:16', 'asdasdasd\r\nasdasdsa\r\nasdsad', 0, 11, 1),
(24, '23.00', '23.0', '2023-03-04', 1, '2023-03-04 18:53:26', NULL, NULL, 1, '2023-03-04 19:01:03', 'asddsad\r\nasdsad\r\nasdsad', 0, 11, 1),
(25, '434.00', '3.0', '2023-03-04', 1, '2023-03-04 18:58:07', NULL, NULL, 1, '2023-03-04 19:01:07', 'sadsa\r\nasd\r\nasd', 0, 11, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cliente_fornecedor`
--

DROP TABLE IF EXISTS `cliente_fornecedor`;
CREATE TABLE IF NOT EXISTS `cliente_fornecedor` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  `TXT_NOME` varchar(100) NOT NULL,
  `TXT_NOME_FANTASIA` varchar(100) NOT NULL,
  `TXT_CPF_CNPJ` varchar(45) NOT NULL,
  `BOOL_PF_PJ` tinyint(1) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `TXT_RUA` varchar(100) NOT NULL,
  `TXT_BAIRRO` varchar(100) NOT NULL,
  `TXT_CIDADE` varchar(100) NOT NULL,
  `TXT_NUMERO` varchar(10) NOT NULL,
  `TXT_UF` varchar(2) NOT NULL,
  `TXT_CEP` varchar(45) NOT NULL,
  `BOOL_PACIENTE` tinyint(1) NOT NULL,
  `TXT_QUEIXA` varchar(1000) DEFAULT NULL,
  `DATE_NASCIMENTO` date DEFAULT NULL,
  `TXT_PROFISSAO` varchar(200) DEFAULT NULL,
  `CHAR_SEXO` char(1) DEFAULT NULL COMMENT 'M = MASCULINO\nF = FEMININO',
  `CHAR_DESTRO_CANHOTO` char(2) DEFAULT NULL COMMENT 'D = DESTRO\\nC = CANHOTO\\nDC = AMBIDESTRO',
  `TXT_FOTO` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `cliente_fornecedor_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `cliente_fornecedor`
--

INSERT INTO `cliente_fornecedor` (`INT_ID`, `INT_ID_EMPRESA`, `TXT_NOME`, `TXT_NOME_FANTASIA`, `TXT_CPF_CNPJ`, `BOOL_PF_PJ`, `BOOL_ATIVO`, `TXT_RUA`, `TXT_BAIRRO`, `TXT_CIDADE`, `TXT_NUMERO`, `TXT_UF`, `TXT_CEP`, `BOOL_PACIENTE`, `TXT_QUEIXA`, `DATE_NASCIMENTO`, `TXT_PROFISSAO`, `CHAR_SEXO`, `CHAR_DESTRO_CANHOTO`, `TXT_FOTO`) VALUES
(1, 1, 'teste PJ edit', 'asdasdasd', '10384515000196', 0, 1, 'Rua A', 'Bairro A', 'Cidade A', '101', 'MG', '37757000', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'teste PF', ' ', '14312835683', 1, 0, 'Rua B', 'Bairro B', 'Cidade B', '202', 'SP', '37757000', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 'vxcvxcvxcv', '', '00000000000', 1, 1, 'cvxcv', 'nvbnvbnbv', 'vbnvbnvb', 'nbnbnb', 'AC', 'nbvnbvnbv', 0, NULL, NULL, NULL, NULL, NULL, '7.jpg'),
(8, 1, 'TESTE', '', '14312835683', 1, 0, 'awdawdaw23', 'dawdawdaw23', 'Poço Fundo23', '212123', 'AC', '37757-00023', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 1, 'Aaaaaaa', '', '00000000000', 1, 1, 'sdfsfsdfds', 'sdfsdfsdf', 'sdfsdfsdf', '2323', 'MG', '2332323', 0, NULL, NULL, NULL, NULL, NULL, '10.jpg'),
(11, 1, 'Juquinha', '', '0000000000', 1, 1, 'asdasdsa', 'asdasdasd', 'asdasdasd', '22', 'SP', '23232', 1, 'DOR', '2022-03-03', 'Programmer', 'F', 'C', '11.jpg'),
(12, 1, 'sdfsdfsdfsdf', '', '00000000000', 1, 1, 'qweqwe', 'qweqwe', 'qweqwe', '23', 'MA', '232323', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 1, 'testeteste', '', '00000000000', 1, 1, 'teste', 'teste', 'etste', '2323', 'AM', '00022', 1, 'teste editado', '2010-11-04', 'editado', 'M', 'C', NULL),
(14, 1, 'MARCELO MARTINS FERREIRA editado asdasdasdasdsadad', '', '08476913060', 1, 1, 'asdasdasd', 'asdasdasd', 'Poço Fundo', '2323', 'MG', '37757-000', 1, 'fsdfsdf', '2022-12-01', 'sfsfsdf', 'F', 'DC', '14.jpg'),
(15, 1, 'testeaasasd', 'asdassdasd', '52867215000108', 0, 1, 'asdas', 'asdasdsa', 'asdasd', '121', 'MG', '50545', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 2, 'asdasdasdas', '', '56506477040', 1, 1, 'asdasdas', 'dasdasdasd', 'sadasdsa', '2323', 'MG', '232323', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 2, 'fsf', 'sdfsdfsdf', '41094720000140', 0, 1, 'adasdas', 'dasdasd', 'asdasd', '2323', 'MG', '2323', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 1, 'teste imagem', '', '00000000000', 1, 0, 'asdasd', 'asdasdsa', 'asdasdasdas', '232323', 'MG', 'dasdasd', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 1, 'teste imagem', '', '00000000000', 1, 1, 'xcvxc', 'xcvxcv', 'cvbcvb', '3434', 'PE', 'cvbcv', 0, NULL, NULL, NULL, NULL, NULL, '19.jpg'),
(20, 1, 'sadasd', '', '00000000000', 1, 1, 'sdfsdf', 'sdfsdf', 'sdf', '34', 'MG', 'sdfsdf', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 1, 'werwer', '', '00000000000', 1, 1, 'xvxcvxcv', 'fsdfds', 'cxvxcv', '34', 'MG', '2323', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 1, 'qweq', '', '00000000000', 1, 0, 'asdasdsa', 'asdasd', 'asdasdasd', '213', 'MG', '23232', 0, NULL, NULL, NULL, NULL, NULL, '.jpg'),
(23, 1, 'xcvxcvxcv', '', '00000000000', 1, 0, 'xvxcvxcv', 'xcvxcv', 'xcvxc', '23', 'MG', '23', 0, NULL, NULL, NULL, NULL, NULL, '.jpg'),
(24, 1, 'WER', '', '00000000000', 1, 1, 'WEREWR', 'WERWER', 'ASDASD', '23', 'MG', '23', 0, NULL, NULL, NULL, NULL, NULL, '24.jpg'),
(25, 1, 'asdaasdas', '', '00000000000', 1, 1, 'asdas', 'asd', 'asdasd', '232', 'MG', '23', 0, NULL, NULL, NULL, NULL, NULL, '25.jpg'),
(26, 1, 'teste', '', '00000000000', 1, 1, 'teste', 'teste', 'teste', '34', 'MG', '343434', 1, 'teste', '2023-02-11', 'teste', 'M', 'D', '26.jpg'),
(27, 1, 'zxzxzx', '', '00000000000', 1, 1, 'sdfsd', 'fsdfsdf', 'sdfsf', '34', 'MG', '34', 1, 'sdfsdf', '2023-03-25', 'sdfsdf', 'M', 'D', NULL),
(28, 1, 'asdasdsad', '', '00000000000', 1, 1, 'asda', 'asd', 'asd', '23', 'MG', '23', 1, 'asdasdas', '2023-03-04', 'asdasd', 'M', 'D', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `colaborador`
--

DROP TABLE IF EXISTS `colaborador`;
CREATE TABLE IF NOT EXISTS `colaborador` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_NOME` varchar(100) NOT NULL,
  `TXT_EMAIL` varchar(100) NOT NULL,
  `TXT_SENHA` varchar(500) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `colaborador_fk_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `colaborador`
--

INSERT INTO `colaborador` (`INT_ID`, `TXT_NOME`, `TXT_EMAIL`, `TXT_SENHA`, `BOOL_ATIVO`, `INT_ID_EMPRESA`) VALUES
(1, 'Marcelo Ferreira', 'teste@email.com', '250cf8b51c773f3f8dc8b4be867a9a02', 1, 1),
(3, 'Isabelle Pratesi', 'teste1@email.com', '202cb962ac59075b964b07152d234b70', 1, 2),
(4, 'Colaborador teste', 'teste2@email.com', '202cb962ac59075b964b07152d234b70', 0, 2),
(6, 'Colaborador 2', 'teste3@email.com', '68053af2923e00204c3ca7c6a3150cf7', 1, 2),
(7, 'Colaborador asdasdasd', 'teste111@email.com', '202cb962ac59075b964b07152d234b70', 1, 3),
(8, 'Teste', 'teste@erer.hj', '202cb962ac59075b964b07152d234b70', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `contato`
--

DROP TABLE IF EXISTS `contato`;
CREATE TABLE IF NOT EXISTS `contato` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_CONTATO` varchar(100) NOT NULL,
  `BOOL_EMAIL_TELEFONE` tinyint(1) NOT NULL,
  `INT_ID_CLIENTE_FORNECEDOR` int(11) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `BOOL_WPP` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `contato_fk_cliente_fornecedor_idx` (`INT_ID_CLIENTE_FORNECEDOR`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `contato`
--

INSERT INTO `contato` (`INT_ID`, `TXT_CONTATO`, `BOOL_EMAIL_TELEFONE`, `INT_ID_CLIENTE_FORNECEDOR`, `BOOL_ATIVO`, `BOOL_WPP`) VALUES
(1, '35999308141', 0, 1, 1, 1),
(2, '3599959585', 0, 1, 1, 1),
(3, '35999357020', 0, 8, 0, 1),
(4, 'marcelomf.0071@gmail.com', 1, 8, 0, 0),
(5, 'asdsd@sds.hj', 0, 8, 0, 0),
(6, '35999308141', 0, 8, 0, 0),
(7, '35999350000', 0, 1, 1, 0),
(8, 'aaaaaaaa@aa.a', 1, 7, 1, 0),
(9, '35999308141', 0, 7, 1, 0),
(10, '35999308141', 0, 7, 1, 1),
(11, 'dfgdfg@sdsd.fg', 1, 10, 0, 0),
(12, 'sdfds@sfd.hjg', 1, 1, 1, 0),
(13, '35999308141', 0, 13, 1, 1),
(14, 'marcelomf.0071@gmail.com', 1, 17, 1, 0),
(15, '3232323', 0, 7, 1, 0),
(16, '34343434', 0, 7, 1, 0),
(17, '000000000000', 0, 10, 0, 0),
(18, '2', 0, 10, 1, 0),
(19, '343434', 0, 10, 1, 0),
(20, '546566767', 0, 10, 1, 0),
(21, 'aaaaaaa@aaaa.a', 1, 10, 1, 0),
(22, '55555555', 0, 25, 1, 0),
(23, '32222342323', 0, 25, 1, 0),
(24, '33333333', 0, 25, 1, 0),
(25, '232323', 0, 10, 1, 0),
(26, '23232323', 0, 11, 1, 0),
(27, '0', 0, 10, 1, 1),
(28, '1', 0, 10, 0, 1),
(29, '234234234234', 0, 10, 1, 1),
(30, '22222222222', 0, 10, 0, 0),
(31, '111111111111', 0, 10, 0, 0),
(32, '1212121200', 0, 10, 1, 1),
(33, 'erterter@asd.c', 1, 10, 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_RAZAO_SOCIAL` varchar(100) NOT NULL,
  `TXT_NOME_FANTASIA` varchar(100) NOT NULL,
  `BOOL_TESTE` tinyint(1) NOT NULL,
  `DATE_FIM_TESTE` datetime NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `TXT_TELEFONE` varchar(45) NOT NULL,
  `TXT_EMAIL` varchar(45) NOT NULL,
  `TXT_REPRESENTANTE` varchar(45) NOT NULL,
  `BOOL_PILATES` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`INT_ID`, `TXT_RAZAO_SOCIAL`, `TXT_NOME_FANTASIA`, `BOOL_TESTE`, `DATE_FIM_TESTE`, `BOOL_ATIVO`, `TXT_TELEFONE`, `TXT_EMAIL`, `TXT_REPRESENTANTE`, `BOOL_PILATES`) VALUES
(1, '1', '1', 1, '2024-12-12 00:00:00', 1, '1', '1', '11', 1),
(2, '2', '2', 1, '2025-12-12 00:00:00', 1, '2', '2', '2', 0),
(3, '3', '3', 1, '2025-12-12 00:00:00', 1, '3', '3', '3', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_de_treino`
--

DROP TABLE IF EXISTS `tipo_de_treino`;
CREATE TABLE IF NOT EXISTS `tipo_de_treino` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TXT_DESCRICAO` varchar(100) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `tipo_de_treino_fk_empresa_idx` (`INT_ID_EMPRESA`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tipo_de_treino`
--

INSERT INTO `tipo_de_treino` (`INT_ID`, `TXT_DESCRICAO`, `BOOL_ATIVO`, `INT_ID_EMPRESA`) VALUES
(1, 'Tipo 1', 0, 1),
(2, 'tipo 2', 1, 1),
(3, 'Tipo 3', 1, 1),
(4, 'adkasjdklajs', 0, 1),
(5, 'asdasdasd', 1, 3),
(6, 'qweqweqwe', 1, 1),
(7, 'werwerwer', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `treino`
--

DROP TABLE IF EXISTS `treino`;
CREATE TABLE IF NOT EXISTS `treino` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_EMPRESA` int(11) NOT NULL,
  `DATE_INICIO` datetime NOT NULL,
  `DATE_FINAL` datetime DEFAULT NULL,
  `INT_ID_PACIENTE` int(11) NOT NULL,
  `INT_ID_AGENDA` int(11) DEFAULT NULL,
  `INT_CHEGOU_COM_DOR` int(11) NOT NULL,
  `INT_SAIU_COM_DOR` int(11) DEFAULT NULL,
  `TXT_OBS_CHEGOU_COM_DOR` varchar(500) DEFAULT NULL,
  `TXT_OBS_SAIU_COM_DOR` varchar(500) DEFAULT NULL,
  `TXT_OBS` varchar(500) DEFAULT NULL,
  `TXT_OBS_PACIENTE` varchar(500) DEFAULT NULL,
  `INT_ID_CADASTRO` int(11) NOT NULL,
  `DATE_CADASTRO` datetime NOT NULL,
  `INT_ID_ALTERACAO` int(11) DEFAULT NULL,
  `DATE_ALTERACAO` datetime DEFAULT NULL,
  `INT_ID_EXCLUSAO` int(11) DEFAULT NULL,
  `DATE_EXCLUSAO` datetime DEFAULT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `treino_fk_empresa_idx` (`INT_ID_EMPRESA`),
  KEY `treino_fl_paciente_idx` (`INT_ID_PACIENTE`),
  KEY `treino_fk_agenda_idx` (`INT_ID_AGENDA`),
  KEY `treino_cadastro_fk_colaborador_idx` (`INT_ID_CADASTRO`),
  KEY `treino_alteracao_fk_colaborador_idx` (`INT_ID_ALTERACAO`),
  KEY `treino_exclusao_fk_colaborador_idx` (`INT_ID_EXCLUSAO`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `treino`
--

INSERT INTO `treino` (`INT_ID`, `INT_ID_EMPRESA`, `DATE_INICIO`, `DATE_FINAL`, `INT_ID_PACIENTE`, `INT_ID_AGENDA`, `INT_CHEGOU_COM_DOR`, `INT_SAIU_COM_DOR`, `TXT_OBS_CHEGOU_COM_DOR`, `TXT_OBS_SAIU_COM_DOR`, `TXT_OBS`, `TXT_OBS_PACIENTE`, `INT_ID_CADASTRO`, `DATE_CADASTRO`, `INT_ID_ALTERACAO`, `DATE_ALTERACAO`, `INT_ID_EXCLUSAO`, `DATE_EXCLUSAO`, `BOOL_ATIVO`) VALUES
(1, 1, '2023-03-25 00:00:00', '2023-04-01 00:00:00', 11, NULL, 8, 10, 'qweqweqweqwe', 'ewrwe', 'rwerwer', 'asdasdasdasdsad', 1, '2023-03-25 18:37:41', NULL, NULL, NULL, NULL, 1),
(2, 1, '2023-04-01 00:00:00', '2023-04-01 00:00:00', 14, NULL, 7, 2, 'werwerewrewr', 'asdasd', 'sadsad', 'teste', 1, '2023-04-01 15:20:21', NULL, NULL, 1, '2023-04-01 22:22:04', 0),
(3, 1, '2023-04-01 00:00:00', '2023-04-01 00:00:00', 11, NULL, 3, 2, 'qweqwe', 'aaaaaaaaaaaa', 'rem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley', 'sadasdasd', 1, '2023-04-01 15:29:14', NULL, NULL, NULL, NULL, 1),
(4, 1, '2023-04-01 00:00:00', '2023-04-01 00:00:00', 26, NULL, 4, 10, 'werwer', 'asdasdasd', 'asasdasd', 'dsfsdf', 1, '2023-04-01 19:37:47', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `treino_aparelho`
--

DROP TABLE IF EXISTS `treino_aparelho`;
CREATE TABLE IF NOT EXISTS `treino_aparelho` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_APARELHO` int(11) NOT NULL,
  `INT_ID_TREINO` int(11) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  `DATE_CADASTRO` datetime NOT NULL,
  `INT_ID_CADASTRO` int(11) NOT NULL,
  `DATE_ALTERACAO` datetime DEFAULT NULL,
  `INT_ID_ALTERACAO` int(11) DEFAULT NULL,
  `DATE_EXCLUSAO` datetime DEFAULT NULL,
  `INT_ID_EXCLUSAO` int(11) DEFAULT NULL,
  `TXT_OBS` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `treino_aparelho_fk_aparelho_idx` (`INT_ID_APARELHO`),
  KEY `treino_aparelho_fk_treino_idx` (`INT_ID_TREINO`),
  KEY `treino_aparelho_cadastro_fk_colaborador_idx` (`INT_ID_CADASTRO`),
  KEY `treino_aparelho_alteracao_fk_colaborador_idx` (`INT_ID_ALTERACAO`),
  KEY `treino_aparelho_exclusao_fk_colaborador_idx` (`INT_ID_EXCLUSAO`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `treino_aparelho`
--

INSERT INTO `treino_aparelho` (`INT_ID`, `INT_ID_APARELHO`, `INT_ID_TREINO`, `BOOL_ATIVO`, `DATE_CADASTRO`, `INT_ID_CADASTRO`, `DATE_ALTERACAO`, `INT_ID_ALTERACAO`, `DATE_EXCLUSAO`, `INT_ID_EXCLUSAO`, `TXT_OBS`) VALUES
(12, 2, 2, 0, '2023-04-01 17:47:20', 1, '2023-04-01 21:43:12', 1, '2023-04-01 22:22:04', 1, 'alterado só o primeiro'),
(13, 2, 3, 1, '2023-04-01 18:05:45', 1, '2023-04-01 21:44:29', 1, NULL, NULL, 'fdgdfg'),
(14, 3, 2, 0, '2023-04-01 18:27:28', 1, NULL, NULL, '2023-04-01 20:10:00', 1, NULL),
(15, 8, 2, 0, '2023-04-01 19:05:17', 1, '2023-04-01 21:16:51', 1, '2023-04-01 22:22:04', 1, 'alteraaaaaa'),
(16, 3, 3, 1, '2023-04-01 19:07:29', 1, '2023-04-01 21:44:15', 1, NULL, NULL, 'alterado só o segundo'),
(17, 8, 1, 1, '2023-04-01 19:09:13', 1, NULL, NULL, NULL, NULL, NULL),
(18, 4, 1, 1, '2023-04-01 19:09:29', 1, NULL, NULL, NULL, NULL, 'ewerewr'),
(19, 8, 3, 1, '2023-04-01 19:35:17', 1, NULL, NULL, NULL, NULL, 'asdsdasdasd'),
(20, 4, 3, 1, '2023-04-01 19:35:34', 1, NULL, NULL, NULL, NULL, 'aaaaaaa'),
(21, 2, 1, 1, '2023-04-01 19:35:51', 1, NULL, NULL, NULL, NULL, 'asd'),
(22, 3, 1, 1, '2023-04-01 19:36:11', 1, NULL, NULL, NULL, NULL, 'qweqweqwe'),
(23, 2, 4, 1, '2023-04-01 19:37:57', 1, '2023-04-01 21:44:56', 1, NULL, NULL, 'werwerwer'),
(24, 8, 4, 1, '2023-04-01 19:38:15', 1, NULL, NULL, NULL, NULL, 'werwer'),
(25, 3, 4, 1, '2023-04-01 19:38:46', 1, NULL, NULL, NULL, NULL, 'ert'),
(26, 3, 2, 0, '2023-04-01 21:17:23', 1, NULL, NULL, '2023-04-01 21:17:39', 1, NULL),
(27, 3, 2, 0, '2023-04-01 21:18:05', 1, NULL, NULL, '2023-04-01 21:20:38', 1, NULL),
(28, 4, 2, 0, '2023-04-01 21:19:46', 1, NULL, NULL, '2023-04-01 21:20:41', 1, NULL),
(29, 4, 2, 0, '2023-04-01 21:20:59', 1, NULL, NULL, '2023-04-01 21:21:23', 1, NULL),
(30, 3, 2, 0, '2023-04-01 21:24:06', 1, '2023-04-01 21:29:55', 1, '2023-04-01 21:35:12', 1, 'asdasdsadaaaaaaaa'),
(31, 4, 2, 0, '2023-04-01 21:26:31', 1, NULL, NULL, '2023-04-01 22:22:04', 1, NULL),
(32, 3, 2, 0, '2023-04-01 21:35:38', 1, '2023-04-01 21:44:43', 1, '2023-04-01 22:22:04', 1, 'alterado 3 op');

-- --------------------------------------------------------

--
-- Estrutura da tabela `treino_aparelho_acessorio`
--

DROP TABLE IF EXISTS `treino_aparelho_acessorio`;
CREATE TABLE IF NOT EXISTS `treino_aparelho_acessorio` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_TREINO_APARELHO` int(11) NOT NULL,
  `INT_ID_ACESSORIO` int(11) NOT NULL,
  `TXT_OBS` varchar(500) DEFAULT NULL,
  `INT_ID_CADASTRO` int(11) NOT NULL,
  `DATE_CADASTRO` datetime NOT NULL,
  `INT_ID_ALTERACAO` int(11) DEFAULT NULL,
  `DATE_ALTERACAO` datetime DEFAULT NULL,
  `INT_ID_EXCLUSAO` int(11) DEFAULT NULL,
  `DATE_EXCLUSAO` datetime DEFAULT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `treino_aparelho_acessorio_fk_treino_aparelho_idx` (`INT_ID_TREINO_APARELHO`),
  KEY `treino_aparelho_acessorio_fk_acessorio_idx` (`INT_ID_ACESSORIO`),
  KEY `treino_aparelho_acessorio_cadsatro_fk_colaborador_idx` (`INT_ID_CADASTRO`),
  KEY `treino_aparelho_acessorio_alteracao_fk_colaborador_idx` (`INT_ID_ALTERACAO`),
  KEY `treino_aparelho_acessorio_exclusao_fk_colaborador_idx` (`INT_ID_EXCLUSAO`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `treino_aparelho_acessorio`
--

INSERT INTO `treino_aparelho_acessorio` (`INT_ID`, `INT_ID_TREINO_APARELHO`, `INT_ID_ACESSORIO`, `TXT_OBS`, `INT_ID_CADASTRO`, `DATE_CADASTRO`, `INT_ID_ALTERACAO`, `DATE_ALTERACAO`, `INT_ID_EXCLUSAO`, `DATE_EXCLUSAO`, `BOOL_ATIVO`) VALUES
(1, 14, 3, 'sfsfsdf', 1, '2023-04-01 18:27:36', NULL, NULL, 1, '2023-04-01 20:06:52', 0),
(2, 22, 2, 'qwewqe', 1, '2023-04-01 19:36:21', NULL, NULL, NULL, NULL, 1),
(3, 23, 1, 'dsf', 1, '2023-04-01 19:38:04', NULL, NULL, NULL, NULL, 1),
(4, 24, 3, 'dfgdfg', 1, '2023-04-01 19:38:28', NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `treino_aparelho_tipo_treino`
--

DROP TABLE IF EXISTS `treino_aparelho_tipo_treino`;
CREATE TABLE IF NOT EXISTS `treino_aparelho_tipo_treino` (
  `INT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `INT_ID_TIPO_TREINO` int(11) NOT NULL,
  `INT_ID_TREINO_APARELHO` int(11) NOT NULL,
  `BOOL_ATIVO` tinyint(1) NOT NULL,
  PRIMARY KEY (`INT_ID`),
  KEY `treino_aparelho_tipo_treino_fk_tipo_treino_idx` (`INT_ID_TIPO_TREINO`),
  KEY `treino_aparelho_fk_treino_aparelho_idx` (`INT_ID_TREINO_APARELHO`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `treino_aparelho_tipo_treino`
--

INSERT INTO `treino_aparelho_tipo_treino` (`INT_ID`, `INT_ID_TIPO_TREINO`, `INT_ID_TREINO_APARELHO`, `BOOL_ATIVO`) VALUES
(1, 2, 12, 0),
(2, 3, 12, 0),
(3, 2, 13, 1),
(4, 3, 13, 0),
(5, 6, 14, 0),
(6, 3, 14, 1),
(7, 2, 14, 0),
(8, 6, 15, 0),
(9, 2, 15, 0),
(10, 6, 16, 0),
(11, 2, 16, 1),
(12, 3, 16, 0),
(13, 3, 16, 0),
(14, 6, 17, 1),
(15, 2, 18, 1),
(16, 3, 18, 1),
(17, 6, 19, 1),
(18, 3, 20, 1),
(19, 2, 21, 1),
(20, 2, 22, 1),
(21, 3, 22, 1),
(22, 6, 22, 1),
(23, 6, 23, 0),
(24, 2, 23, 1),
(25, 3, 23, 0),
(26, 6, 24, 1),
(27, 6, 25, 1),
(28, 3, 25, 1),
(29, 6, 30, 0),
(30, 2, 30, 0),
(31, 3, 30, 0),
(32, 6, 31, 0),
(33, 3, 31, 0),
(34, 6, 32, 0),
(35, 2, 32, 0),
(36, 3, 32, 0),
(37, 6, 12, 0),
(38, 6, 13, 1);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `acessorios`
--
ALTER TABLE `acessorios`
  ADD CONSTRAINT `acessorios_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_alteracao_fk_colaborador` FOREIGN KEY (`INT_ID_ALTERACAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_cadastro_fk_colaborador` FOREIGN KEY (`INT_ID_CADASTRO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_exclusao_fk_colaborador` FOREIGN KEY (`INT_ID_EXCLUSAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_fk_paciente` FOREIGN KEY (`INT_ID_PACIENTE`) REFERENCES `cliente_fornecedor` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `aparelhos`
--
ALTER TABLE `aparelhos`
  ADD CONSTRAINT `aparelhos_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_alteracao_fk_colaborador` FOREIGN KEY (`INT_ID_ALTERCAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `avaliacao_cadastro_fk_colaborador` FOREIGN KEY (`INT_ID_CADASTRO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `avaliacao_exclusao_fk_colaborador` FOREIGN KEY (`INT_ID_EXCLUSAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `avaliacao_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `avaliacao_fk_paciente` FOREIGN KEY (`INT_ID_PACIENTE`) REFERENCES `cliente_fornecedor` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `cliente_fornecedor`
--
ALTER TABLE `cliente_fornecedor`
  ADD CONSTRAINT `cliente_fornecedor_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `colaborador`
--
ALTER TABLE `colaborador`
  ADD CONSTRAINT `colaborador_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `contato`
--
ALTER TABLE `contato`
  ADD CONSTRAINT `contato_fk_cliente_fornecedor` FOREIGN KEY (`INT_ID_CLIENTE_FORNECEDOR`) REFERENCES `cliente_fornecedor` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tipo_de_treino`
--
ALTER TABLE `tipo_de_treino`
  ADD CONSTRAINT `tipo_de_treino_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `treino`
--
ALTER TABLE `treino`
  ADD CONSTRAINT `treino_alteracao_fk_colaborador` FOREIGN KEY (`INT_ID_ALTERACAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_cadastro_fk_colaborador` FOREIGN KEY (`INT_ID_CADASTRO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_exclusao_fk_colaborador` FOREIGN KEY (`INT_ID_EXCLUSAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_fk_agenda` FOREIGN KEY (`INT_ID_AGENDA`) REFERENCES `agenda` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_fk_empresa` FOREIGN KEY (`INT_ID_EMPRESA`) REFERENCES `empresa` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_fk_paciente` FOREIGN KEY (`INT_ID_PACIENTE`) REFERENCES `cliente_fornecedor` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `treino_aparelho`
--
ALTER TABLE `treino_aparelho`
  ADD CONSTRAINT `treino_aparelho_alteracao_fk_colaborador` FOREIGN KEY (`INT_ID_ALTERACAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_cadastro_fk_colaborador` FOREIGN KEY (`INT_ID_CADASTRO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_exclusao_fk_colaborador` FOREIGN KEY (`INT_ID_EXCLUSAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_fk_aparelho` FOREIGN KEY (`INT_ID_APARELHO`) REFERENCES `aparelhos` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_fk_treino` FOREIGN KEY (`INT_ID_TREINO`) REFERENCES `treino` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `treino_aparelho_acessorio`
--
ALTER TABLE `treino_aparelho_acessorio`
  ADD CONSTRAINT `treino_aparelho_acessorio_alteracao_fk_colaborador` FOREIGN KEY (`INT_ID_ALTERACAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_acessorio_cadsatro_fk_colaborador` FOREIGN KEY (`INT_ID_CADASTRO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_acessorio_exclusao_fk_colaborador` FOREIGN KEY (`INT_ID_EXCLUSAO`) REFERENCES `colaborador` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_acessorio_fk_acessorio` FOREIGN KEY (`INT_ID_ACESSORIO`) REFERENCES `acessorios` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_acessorio_fk_treino_aparelho` FOREIGN KEY (`INT_ID_TREINO_APARELHO`) REFERENCES `treino_aparelho` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limitadores para a tabela `treino_aparelho_tipo_treino`
--
ALTER TABLE `treino_aparelho_tipo_treino`
  ADD CONSTRAINT `treino_aparelho_fk_treino_aparelho` FOREIGN KEY (`INT_ID_TREINO_APARELHO`) REFERENCES `treino_aparelho` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `treino_aparelho_tipo_treino_fk_tipo_treino` FOREIGN KEY (`INT_ID_TIPO_TREINO`) REFERENCES `tipo_de_treino` (`INT_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
