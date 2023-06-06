-- Time: 2023年5月29日10:17:21
-- use postgresql
-- =============================================
-- Author: GoooIce
-- =============================================

-- DROP TABLE IF EXISTS `tenant`;
CREATE TABLE `tenant` (
    'id' SERIAL PRIMARY KEY,
    'name' VARCHAR(255) NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `org`;
create table 'org' (
    'id' SERIAL PRIMARY KEY,
    'name' VARCHAR(50) NOT NULL,
    'tenant_id' int NOT NULL,
    'superior_id' int,    
    'leader_id' int,      -- fk = emp_id
    'org_type_code' char(10) NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `org_type`;
create table 'org_type' (
    'code' char(10) PRIMARY KEY,
    'name' VARCHAR(10) NOT NULL,
    'tenant_id' int NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `emp`;
create table emp (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'org_id' int,
    'name' VARCHAR(255) NOT NULL,
    'num' varchar(20) NOT NULL, -- 工号
    'id_num' varchar(20) NOT NULL, -- 身份证号
    'gender' char(2), -- 0:男 1:女
    'dob' date, -- date of birth
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `emp_post`;
create table emp_post (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'emp_id' int NOT NULL,
    'post_code' char(10) NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `post`;
create table post (
    'code' char(10) PRIMARY KEY,
    'name' VARCHAR(10) NOT NULL,
    'tenant_id' int NOT NULL,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `project`;
create table project (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'name' VARCHAR(255) NOT NULL,
    'code' char(10) NOT NULL,
    'mng_id' int,      -- fk = emp_id
    'num' varchar(50) NOT NULL, -- 项目编号
    'name' VARCHAR(50) NOT NULL,
    'status' char(2) NOT NULL, -- 0:正常 1:完工 2:暂停 3:取消
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `project_member`;
create table project_member (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'project_id' int NOT NULL,
    'emp_id' int NOT NULL,
    'estimate_invest_ratio' smallint NOT NULL, -- 预估投入比例
    'start_at' date NOT NULL,
    'end_at' date,
    'status' char(2) NOT NULL, -- 0:正常 1:离职
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `contract`;
create table contract (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'client_id' int NOT NULL,
    'mng_id' int NOT NULL, -- fk = emp_id
    'num' varchar(50) NOT NULL, -- 合同编号
    'name' VARCHAR(50) NOT NULL,
    'status' char(2) NOT NULL, -- 0:正常 1:完工 2:暂停 3:取消
    'start_at' date NOT NULL,
    'end_at' date,
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `client`;
create table client (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'mngr_id' int NOT NULL, -- fk = emp_id
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- DROP TABLE IF EXISTS `effort_record`;
create table effort_record (
    'id' SERIAL PRIMARY KEY,
    'tenant_id' int NOT NULL,
    'emp_id' int NOT NULL,
    'project_id' int NOT NULL,
    'work_date' date NOT NULL,
    'effort' decimal(2,1) NOT NULL, -- 0-100
    'notes' varchar(255),
    'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'created_by' int NOT NULL,
    'last_updated_at' TIMESTAMP,
    'last_updated_by' int,
)

-- All DROP Sqls
-- DROP TABLE IF EXISTS `tenant`;
-- DROP TABLE IF EXISTS `org`;
-- DROP TABLE IF EXISTS `org_type`;
-- DROP TABLE IF EXISTS `emp`;
-- DROP TABLE IF EXISTS `emp_post`;
-- DROP TABLE IF EXISTS `post`;
-- DROP TABLE IF EXISTS `project`;
-- DROP TABLE IF EXISTS `project_member`;
-- DROP TABLE IF EXISTS `contract`;
-- DROP TABLE IF EXISTS `client`;
-- DROP TABLE IF EXISTS `effort_record`;

