import { request } from '@/utils/alova'

export interface ServerStatus {
  /** 主机名，例如：DESKTOP-XXXX */
  hostname: string
  /** 操作系统信息 */
  os: {
    /** 平台，例如：win32、linux、darwin */
    platform: string
    /** 架构，例如：x64、arm64 */
    arch: string
    /** 系统版本号，例如：10.0.26100 */
    release: string
    /** 系统运行时长，已格式化，例如："1d 2h 3m 4s" */
    uptime: string
    /** 内核类型，例如：Windows_NT、Linux、Darwin */
    type?: string
    /** 内核版本（可能为空，平台相关） */
    kernelVersion?: string
    /**
     * 系统负载等级（仅类 Unix 系统有意义）
     * - low: 负载较轻
     * - medium: 负载中等
     * - high: 负载较高
     * - overload: 过载
     * - 平台差异：Windows 上为 undefined
     */
    load?: 'low' | 'medium' | 'high' | 'overload'
  }
  /** CPU 概览 */
  cpu: {
    /** CPU 型号名称 */
    model: string
    /** CPU 核心数（含单位），例如："12 cores" */
    cores: string
    /** 主频（含单位），例如："3700 MHz" */
    speed: string
    /** 逻辑核心数量（数值） */
    logicalCores?: number
    /** CPU 用户使用率（百分比） */
    userUsage: number
    /** CPU 系统使用率（百分比） */
    systemUsage: number
    /** CPU 当前空闲率（百分比） */
    idle: number
  }
  /** 内存概览 */
  memory: {
    /** 总内存（含单位），例如："31.9 GB" */
    total: string
    /** 已用内存（含单位），例如："11.3 GB" */
    used: string
    /** 空闲内存（含单位），例如："20.7 GB" */
    free: string
    /** 内存占用百分比（含%），例如："35.32" */
    usedPercent: number
  }
  /** 网络信息 */
  network: {
    /** 主要 IPv4 地址（首个非内网 IPv4），可能为空 */
    primaryIPv4?: string
    /** 网卡接口数量（字符串），例如："3" */
    interfaceCount: string
    /** 网卡接口简单列表 */
    interfaces?: Array<{
      /** 网卡名称（接口名） */
      name: string
      /** 物理地址（可能为空） */
      mac?: string
      /** IPv4 地址列表 */
      ipv4: string[]
      /** IPv6 地址列表 */
      ipv6: string[]
      /** 是否为内网/回环接口 */
      internal: boolean
    }>
  }
  /** 进程信息 */
  process: {
    /** 进程 ID（字符串） */
    pid: string
    /** Node.js 版本，例如："v18.19.0" */
    nodeVersion: string
    /** 进程运行时长，已格式化，例如："14m 8s" */
    uptime: string
  }
}

export function getServerStatus() {
  return request.Get<Api.Response<ServerStatus>>('/server-status')
}
