/**
 * Excel 表格 模板数据
 */

import _ from 'lodash'
import XLSX, { Range } from 'xlsx-js-style'

export function GetExcelTemplateData(
  data: TemplateDataArg
): GetExcelTemplateDataReturnType {
  const template = {
    data: [
      [
        {
          v: 'XX区蓝天救援队',
          s: {
            font: {
              bold: true
            },
            alignment: {
              horizontal: 'center',
              vertical: 'center'
            },
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          }
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        '出队信息记录表',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        '时间',
        data.action_time,
        null,
        null,
        null,
        null,
        '地点',
        data.location,
        null,
        null,
        null
      ],
      [
        '内容',
        data.content,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        '后台协调',
        null,
        null,
        null,
        null,
        null,
        '统计人员',
        null,
        null,
        null,
        null
      ],
      [
        '记录整理',
        '秘书组',
        null,
        null,
        null,
        null,
        '信息审核',
        'XXX',
        null,
        null,
        null
      ],
      ['图片存档', 'XXX', null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, '现场秘书', 'XXX', null, null],
      [
        '序号',
        '日期',
        '信息人',
        '蓝天编号',
        '出行方式',
        '车辆数',
        '人数',
        '车牌号',
        '出发时间',
        '返回时间',
        '系统时长统计'
      ]
    ],

    merges: [
      // 前两行
      { s: { c: 0, r: 0 }, e: { c: 10, r: 0 } },
      { s: { c: 0, r: 1 }, e: { c: 10, r: 1 } },

      // 第 3 行
      { s: { c: 1, r: 2 }, e: { c: 5, r: 2 } },
      { s: { c: 7, r: 2 }, e: { c: 10, r: 2 } },

      // 第 4 行
      { s: { c: 1, r: 3 }, e: { c: 10, r: 3 } },

      // 第 5 行
      { s: { c: 1, r: 4 }, e: { c: 5, r: 4 } },
      { s: { c: 7, r: 4 }, e: { c: 10, r: 4 } },

      // 第 6 行
      { s: { c: 1, r: 5 }, e: { c: 5, r: 5 } },
      { s: { c: 7, r: 5 }, e: { c: 10, r: 5 } },

      // 第 7 行
      { s: { c: 1, r: 6 }, e: { c: 10, r: 6 } },

      // 第 8 行
      { s: { c: 0, r: 7 }, e: { c: 6, r: 7 } },
      { s: { c: 8, r: 7 }, e: { c: 10, r: 7 } }
    ],

    cols: [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 120 }
    ]
  }

  return template
}

export type GetExcelTemplateDataReturnType = {
  data: any[][]
  merges: Range[]
  cols: XLSX.ColInfo[]
}

export type TemplateDataArg = {
  /**
   * 任务内容
   */
  content: string

  /**
   * 任务时间 (2022年5月3日)
   */
  action_time: string

  /**
   * 地点
   */
  location: string
}