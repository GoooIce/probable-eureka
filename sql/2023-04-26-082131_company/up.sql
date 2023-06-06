CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  operating_status VARCHAR(255),
  legal_representative VARCHAR(255),
  registered_capital VARCHAR(255),
  paid_in_capital VARCHAR(255),
  establishment_date VARCHAR(255),
  approval_date VARCHAR(255),
  business_term VARCHAR(255),
  province VARCHAR(255),
  city VARCHAR(255),
  district VARCHAR(255),
  unified_social_credit_code VARCHAR(255),
  taxpayer_identification_number VARCHAR(255),
  registration_number VARCHAR(255),
  organization_code VARCHAR(255),
  insured_number VARCHAR(255),
  company_type VARCHAR(255),
  industry VARCHAR(255),
  former_name VARCHAR(255),
  registered_address VARCHAR(255),
  latest_annual_report_address VARCHAR(255),
  website VARCHAR(255),
  phone VARCHAR(255),
  other_phone VARCHAR(255),
  email VARCHAR(255),
  other_email VARCHAR(255),
  business_scale VARCHAR(555),
  customer_type VARCHAR(255),
    -- 增加用于存储geo向量的字段
  geo_vector VARCHAR(255),


  -- 审计字段
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  email VARCHAR(255),
  wechat VARCHAR(255),
  first_photo DATE,
  birthday DATE,
  confirmation_status VARCHAR(255),
  -- 审计字段
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
  -- FOREIGN KEY (customer_id) REFERENCES customers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

