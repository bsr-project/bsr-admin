/**
 * 表格工具
 */
import _ from 'lodash'
import XLSX, { Range } from 'xlsx-js-style'

export default class Excel {
  private _data: any[][] = []

  private _merges: Range[] = []

  private _rows: XLSX.RowInfo[] = []
  private _cols: XLSX.ColInfo[] = []

  public SetData(data: any[][]) {
    // 默认边框设置
    const defaultValue = {
      s: {
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }

    _.forEach(data, (row, index) => {
      data[index] = _.map(row, (val) => {
        // 对象
        if (_.isObject(val)) {
          return _.merge(val, defaultValue)

          // 字符串
        } else if (_.isString(val)) {
          return {
            v: val,
            ...defaultValue
          }
        }

        // 其他
        return {
          v: '',
          s: {
            border: {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            }
          }
        }
      }) as any[]
    })

    this._data = data

    return this
  }

  public SetMerges(merges: Range[]) {
    this._merges = merges

    return this
  }

  public SetRows(rows: XLSX.RowInfo[]) {
    this._rows = rows

    return this
  }

  public SetCols(cols: XLSX.ColInfo[]) {
    this._cols = cols

    return this
  }

  public Download(fileName: string, sheetName?: string) {
    const workbook = XLSX.utils.book_new()

    const worksheet = this.GetWorkSheet()

    // 合并单元格信息
    worksheet['!merges'] = this._merges
    worksheet['!rows'] = this._rows
    worksheet['!cols'] = this._cols

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Sheet1')

    const fileBuffer = XLSX.write(workbook, {
      type: 'buffer'
    })

    const blob = new Blob([fileBuffer])
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }

  private GetWorkSheet() {
    return XLSX.utils.aoa_to_sheet(this._data)
  }
}
