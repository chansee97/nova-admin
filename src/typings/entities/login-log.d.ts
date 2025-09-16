declare namespace Entity {
  /**
   * 登录日志
   */
  interface LoginLog {
    /**
     * 日志编号
     */
    id: number
    /**
     * 用户账号
     */
    username: string
    /**
     * 登录IP地址
     */
    ipaddr: string
    /**
     * 登录地点
     */
    loginLocation: string
    /**
     * 浏览器类型
     */
    browser: string
    /**
     * 操作系统
     */
    os: string
    /**
     * 登录状态（0成功 1失败）
     */
    status: number
    /**
     * 提示消息
     */
    msg: string
    /**
     * 访问时间
     */
    loginTime: string
  }
}
