-- 데이터베이스 생성 및 사용

CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

-- User 테이블 생성
CREATE TABLE IF NOT EXISTS Users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO Users (user_name, user_password) VALUES ('test', '1234');
