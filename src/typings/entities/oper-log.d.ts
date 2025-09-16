declare namespace Entity {
  /**
   * 操作日志
   */
  interface OperLog {
    /**
     * 日志编号
     */
    id: number
    /**
     * 模块标题
     */
    title: string
    /**
     * 方法名称
     */
    method: string
    /**
     * 请求方式
     */
    requestMethod: string
    /**
     * 操作人员
     */
    operName: string
    /**
     * 部门名称
     */
    deptName: string
    /**
     * 请求URL
     */
    operUrl: string
    /**
     * 主机地址
     */
    operIp: string
    /**
     * 操作地点
     */
    operLocation: string
    /**
     * 浏览器类型
     */
    browser: string
    /**
     * 操作系统
     */
    os: string
    /**
     * 请求参数
     */
    operParam: string
    /**
     * 返回参数
     */
    jsonResult: string
    /**
     * 操作状态（0正常 1异常）
     */
    status: number
    /**
     * 错误消息
     */
    errorMsg: string
    /**
     * 消耗时间
     */
    costTime: string
    /**
     * 操作时间
     */
    operTime: Date
  }
}
