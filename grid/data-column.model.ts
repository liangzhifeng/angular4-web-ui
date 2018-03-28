/**
 * Interface of Data Grid Column
 */

export interface DataColumn {
  name?: string;      // 类型属性名
  title?: string;     // 显示的列名
  sortable?: boolean; // 是否可排序
  template?: any;
  width?: string;
  sortField?: string;
}
