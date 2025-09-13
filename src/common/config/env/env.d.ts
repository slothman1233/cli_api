/**
 * @description 配置文件说明
 * @author 文亮
 */

/**
 * mysql 配置
 */
type mysql = {
  /**
   * 账号
   */
  user: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 地址
   */
  host: string;
  /**
   * 端口
   */
  port: number;
  /**
   * 表名称
   */
  database: string;
};

/**
 * redis 配置
 */
type redis = {
  /**
   * 地址
   */
  host: string;
  /**
   * 端口
   */
  port: number;
  password: string;
  keys: string[];
};

type env = {
  /**
   * mysql 配置
   */
  mysql: mysql;
  /**
   * redis 配置
   */
  redis: redis;
  /**
   * mongodb 配置
   */
  mongodb: string;
};

export { mysql, redis, env };
