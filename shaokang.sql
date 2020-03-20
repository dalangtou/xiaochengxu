/*
 Navicat Premium Data Transfer

 Source Server         : 120.77.211.37
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 120.77.211.37:3306
 Source Schema         : shaokang

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 11/02/2020 11:47:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for k_comment
-- ----------------------------
DROP TABLE IF EXISTS `k_comment`;
CREATE TABLE `k_comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_id` int(11) NOT NULL COMMENT '信息iD',
  `u_id` int(11) NOT NULL COMMENT '发送者id',
  `to_u_id` int(11) NOT NULL COMMENT '接收者id',
  `p_id` int(11) NOT NULL DEFAULT 0 COMMENT '父级id',
  `c_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `is_del` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0正常  1 已删除',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_comment
-- ----------------------------
INSERT INTO `k_comment` VALUES (1, 3, 1, 2, 0, '今天是个好日子大撒大撒  2312', 0, '2020-01-12 10:30:23', '2020-01-12 10:30:23');
INSERT INTO `k_comment` VALUES (2, 3, 1, 2, 0, '今天是个好日子大撒大撒  2312', 0, '2020-01-12 10:35:43', '2020-01-12 10:35:43');
INSERT INTO `k_comment` VALUES (3, 3, 1, 2, 0, '今天是个好日子大撒大撒  2312', 0, '2020-01-12 15:09:50', '2020-01-12 15:09:50');
INSERT INTO `k_comment` VALUES (4, 10, 1, 17, 0, '今天是个好日子大撒大撒  2312', 0, '2020-01-12 15:15:36', '2020-01-12 15:15:36');
INSERT INTO `k_comment` VALUES (5, 10, 1, 17, 0, '今天是23  2312', 0, '2020-01-12 15:19:55', '2020-01-12 15:19:55');

-- ----------------------------
-- Table structure for k_information
-- ----------------------------
DROP TABLE IF EXISTS `k_information`;
CREATE TABLE `k_information`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL COMMENT 'user id',
  `i_tag` tinyint(3) NOT NULL COMMENT 'tags表 id',
  `i_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `i_type` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0 纯文字 1 图片 2 语音 3 视频',
  `i_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `i_voice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '音频',
  `i_video` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '视频',
  `i_city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市',
  `i_latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '维度',
  `i_longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '经度',
  `i_geohash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '经纬度hash',
  `i_look` int(11) NOT NULL DEFAULT 0 COMMENT '查看量',
  `i_status` tinyint(3) NOT NULL DEFAULT 1 COMMENT '1正常 2过期 ',
  `i_comment_num` int(11) NOT NULL DEFAULT 0 COMMENT '评论数量',
  `is_del` tinyint(2) NOT NULL DEFAULT 0 COMMENT '是否删除 1 已删除',
  `i_stale_at` timestamp(0) NULL DEFAULT NULL COMMENT '过期时间',
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_information
-- ----------------------------
INSERT INTO `k_information` VALUES (1, 1, 1, '你们!', 0, NULL, NULL, NULL, '香港', '22.20000', '114.10000', 'wecnk3mh6ey', 2, 1, 0, 0, '2021-01-09 09:59:43', '2020-01-09 08:47:35', '2020-01-09 09:59:43');
INSERT INTO `k_information` VALUES (2, 1, 2, '你们好呀天气好啊!', 0, NULL, NULL, NULL, '上海', '31.24235534633529', '121.37436652824816', 'wtw39zqpgtpkcrhxnuxbpe', 0, 1, 0, 0, '2021-01-09 09:59:43', '2020-01-09 09:45:40', '2020-01-09 09:55:13');
INSERT INTO `k_information` VALUES (3, 2, 2, '今天是个好日子大撒大撒', 0, NULL, NULL, NULL, '天津', '39.13333', '117.20000', 'wwgqdun2jvq', 0, 1, 0, 0, '2021-01-09 09:59:43', '2020-01-09 10:00:37', '2020-01-09 10:00:37');
INSERT INTO `k_information` VALUES (4, 1, 2, '今天是个好日子大撒大撒', 0, NULL, NULL, NULL, '天津', '39.13333', '117.20000', 'wwgqdun2jvq', 0, 1, 0, 0, '2021-01-09 09:59:43', '2020-01-09 10:01:50', '2020-01-09 10:01:50');
INSERT INTO `k_information` VALUES (5, 1, 2, '今天是个好日子大撒大撒', 0, NULL, NULL, NULL, '郑州', '34.76667', '113.65000', 'ww0vf1j6scn', 0, 1, 0, 0, '2021-01-09 09:59:43', '2020-01-09 10:02:52', '2020-01-09 10:02:52');
INSERT INTO `k_information` VALUES (6, 1, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '郑州', '34.76657', '113.65000', 'ww0vf1j3uyq', 0, 1, 0, 0, '2020-01-19 15:00:44', '2020-01-12 14:56:47', '2020-01-12 14:56:47');
INSERT INTO `k_information` VALUES (7, 1, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '郑州', '34.76657', '113.65000', 'ww0vf1j3uyq', 0, 1, 0, 0, '2020-01-31 17:00:13', '2020-01-12 15:00:13', '2020-01-12 15:00:13');
INSERT INTO `k_information` VALUES (8, 1, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '郑州', '34.76657', '113.65200', 'ww0vf1ncgw3', 0, 1, 0, 0, '2020-01-12 17:01:31', '2020-01-12 15:01:31', '2020-01-12 15:01:31');
INSERT INTO `k_information` VALUES (9, 1, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '郑州', '34.76657', '113.65200', 'ww0vf1ncgw3', 0, 1, 0, 0, '2020-01-12 17:03:57', '2020-01-12 15:03:57', '2020-01-12 15:03:57');
INSERT INTO `k_information` VALUES (10, 17, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '郑州', '34.76657', '113.65200', 'ww0vf1ncgw3', 0, 1, 0, 0, '2020-01-12 17:05:22', '2020-01-12 15:05:22', '2020-01-12 15:05:22');
INSERT INTO `k_information` VALUES (11, 1, 4, '迪士尼日子大撒hhh', 0, NULL, NULL, NULL, '上海', '31.242088', '121.375543', 'wtw3f02j3', 0, 1, 0, 0, '2020-01-13 12:56:25', '2020-01-13 10:56:25', '2020-01-13 10:56:25');
INSERT INTO `k_information` VALUES (12, 1, 2, '快乐风男', 0, NULL, NULL, NULL, '上海', '31.2484', '121.381', 'wtw3f0dgn', 0, 1, 0, 0, '2020-01-13 12:57:41', '2020-01-13 10:57:41', '2020-01-13 10:57:41');
INSERT INTO `k_information` VALUES (13, 1, 2, '哈哈哈3213123', 0, NULL, NULL, NULL, '上海', '31.2484', '121.381', 'wtw3f0dgn', 0, 1, 0, 0, '2020-02-01 15:48:00', '2020-01-13 13:48:00', '2020-01-13 13:48:00');
INSERT INTO `k_information` VALUES (14, 1, 2, '在这普通的一天111', 0, NULL, NULL, NULL, '上海', '31.2474', '121.408', 'wtw3f8qt7', 0, 1, 0, 0, '2020-02-01 15:48:34', '2020-01-13 13:48:34', '2020-01-13 13:48:34');
INSERT INTO `k_information` VALUES (15, 1, 2, '你们好4444', 0, NULL, NULL, NULL, '上海', '31.2494', '121.408', 'wtw3f8y8g', 0, 1, 0, 0, '2020-02-08 12:16:05', '2020-01-13 16:16:05', '2020-01-13 16:16:05');
INSERT INTO `k_information` VALUES (16, 1, 2, 'tianqi', 0, NULL, NULL, NULL, '上海', '31.2520', '121.399', 'wtw3f8y8g', 0, 1, 0, 0, '2020-02-22 12:27:19', '2020-01-13 16:27:19', '2020-01-13 16:27:19');
INSERT INTO `k_information` VALUES (17, 1, 2, '你们好', 0, NULL, NULL, NULL, '上海', '31.2494', '121.408', 'wtw3f8y8g', 0, 1, 0, 0, '2020-01-20 13:25:50', '2020-01-19 17:25:50', '2020-01-19 17:25:50');

-- ----------------------------
-- Table structure for k_like
-- ----------------------------
DROP TABLE IF EXISTS `k_like`;
CREATE TABLE `k_like`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `option_id` int(11) NOT NULL COMMENT 'information_id 或者 用户id',
  `u_id` int(11) NOT NULL COMMENT '点赞用户id',
  `l_type` tinyint(2) NOT NULL COMMENT '1用户点赞 2 information点赞 3评论点赞',
  `is_del` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0 正常 1 被删除',
  `l_num` int(11) NOT NULL DEFAULT 1 COMMENT '点赞数量',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for k_tags
-- ----------------------------
DROP TABLE IF EXISTS `k_tags`;
CREATE TABLE `k_tags`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `is_del` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0 正常  1已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_tags
-- ----------------------------
INSERT INTO `k_tags` VALUES (1, '篮球', 0);
INSERT INTO `k_tags` VALUES (2, '好好吃', 0);
INSERT INTO `k_tags` VALUES (3, '驴友', 0);
INSERT INTO `k_tags` VALUES (4, '好好玩', 0);
INSERT INTO `k_tags` VALUES (5, '献爱心', 1);
INSERT INTO `k_tags` VALUES (6, '无聊', 0);
INSERT INTO `k_tags` VALUES (7, '其他', 0);

-- ----------------------------
-- Table structure for k_user
-- ----------------------------
DROP TABLE IF EXISTS `k_user`;
CREATE TABLE `k_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `we_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '微信名',
  `phone` bigint(11) NULL DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头像',
  `status` tinyint(2) NOT NULL DEFAULT 1 COMMENT '状态 1 正常 ',
  `like_num` int(11) NOT NULL DEFAULT 0 COMMENT '获赞数量',
  `country` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '国家',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市',
  `language` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '语言\r\nen	英文	\r\nzh_CN	简体中文	\r\nzh_TW	繁体中文',
  `openid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` timestamp(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_user
-- ----------------------------
INSERT INTO `k_user` VALUES (1, NULL, '小黄人', 15514721982, 'http://qiniu.ve-link.com//img/20191203/4a612971c7719acc0608766aff9117703999c394.jpg?imageView2/3/q/100', 1, 0, '中国', '上海', '上海', NULL, NULL, '2020-01-03 10:14:47', '2020-01-03 10:14:47');
INSERT INTO `k_user` VALUES (4, NULL, '馒头', 0, 'http://qiniu.ve-link.com//img/20191203/4a612971c7719acc0608766aff9117703999c394.jpg?imageView2/3/q/100', 1, 0, '中国', '河南', '郑州', 'CN', NULL, '2020-01-12 13:53:43', '2020-01-12 13:53:43');
INSERT INTO `k_user` VALUES (14, NULL, '老骨头', 0, 'http://qiniu.ve-link.com//img/20191203/4a612971c7719acc0608766aff9117703999c394.jpg?imageView2/3/q/100', 1, 0, '中国', '河南', '郑州', 'CN', NULL, '2020-01-12 14:03:43', '2020-01-12 14:03:43');
INSERT INTO `k_user` VALUES (15, NULL, '宝宝', 0, 'http://qiniu.ve-link.com//img/20191203/4a612971c7719acc0608766aff9117703999c394.jpg?imageView2/3/q/100', 1, 0, '中国', '河南', '郑州', 'CN', NULL, '2020-01-12 14:03:54', '2020-01-12 14:03:54');
INSERT INTO `k_user` VALUES (17, NULL, '星星', 15514721981, 'http://qiniu.ve-link.com//img/20191203/4a612971c7719acc0608766aff9117703999c394.jpg?imageView2/3/q/100', 1, 0, '中国', '河南', '郑州', 'CN', '123456786', '2020-01-12 14:26:51', '2020-01-12 14:26:51');

-- ----------------------------
-- Table structure for k_userdetails
-- ----------------------------
DROP TABLE IF EXISTS `k_userdetails`;
CREATE TABLE `k_userdetails`  (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL COMMENT 'user id',
  `level` tinyint(3) NOT NULL DEFAULT 1 COMMENT '级别',
  `experience` int(11) NOT NULL DEFAULT 0 COMMENT '经验值',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头衔',
  `sex` tinyint(2) NOT NULL DEFAULT 0 COMMENT '用户的性别，值为1时是男性，值为2时是女性，值为0时是未知',
  `age` tinyint(3) NULL DEFAULT NULL COMMENT '年龄',
  `tagid_list` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户被打上的标签ID列表（wx）',
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '纬度，范围为 -90~90，负数表示南纬',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '经度，范围为 -180~180，负数表示西经',
  `geohash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '经纬度hash',
  `lastmessagetime` timestamp(0) NULL DEFAULT NULL COMMENT '上次获取消息时间',
  `newmessagetime` timestamp(0) NULL DEFAULT NULL COMMENT '新消息时间',
  `post_time` int(11) NOT NULL DEFAULT 0 COMMENT '提问次数',
  `active_value` int(11) NOT NULL DEFAULT 0 COMMENT '活跃度  提问和评论+1',
  `created_at` timestamp(0) NULL DEFAULT NULL,
  `updated_at` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`d_id`) USING BTREE,
  UNIQUE INDEX `u_id`(`u_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of k_userdetails
-- ----------------------------
INSERT INTO `k_userdetails` VALUES (1, 1, 1, 0, NULL, 1, 18, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL);
INSERT INTO `k_userdetails` VALUES (2, 0, 1, 0, NULL, 0, NULL, NULL, '22.20000', '114.10000', 'wecnk3mh6ey', NULL, NULL, 0, 0, '2020-01-12 13:53:44', '2020-01-12 13:53:44');
INSERT INTO `k_userdetails` VALUES (6, 14, 1, 0, NULL, 0, NULL, NULL, '22.20000', '114.10000', 'wecnk3mh6ey', NULL, NULL, 0, 0, '2020-01-12 14:03:43', '2020-01-12 14:03:43');
INSERT INTO `k_userdetails` VALUES (7, 15, 1, 0, NULL, 0, NULL, NULL, '22.20000', '114.10000', 'wecnk3mh6ey', NULL, NULL, 0, 0, '2020-01-12 14:03:54', '2020-01-12 14:03:54');
INSERT INTO `k_userdetails` VALUES (9, 17, 1, 0, NULL, 0, NULL, NULL, '22.20000', '114.10000', 'wecnk3mh6ey', NULL, NULL, 0, 0, '2020-01-12 14:26:51', '2020-01-12 14:26:51');

SET FOREIGN_KEY_CHECKS = 1;
