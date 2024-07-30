import { boot } from 'quasar/wrappers'
import notify from 'devextreme/ui/notify'
import DxFileUploader from 'devextreme-vue/file-uploader'
import DxSelectBox from 'devextreme-vue/select-box'
import DxButton from 'devextreme-vue/button'
import { DxTooltip } from 'devextreme-vue/tooltip'
import { DxHtmlEditor, DxItem, DxMediaResizing, DxToolbar } from 'devextreme-vue/html-editor'
import {
  DxColumn,
  DxDataGrid,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxLoadPanel,
  DxLookup,
  DxMasterDetail,
  DxPager,
  DxPaging,
  DxRowDragging,
  DxScrolling,
  DxSearchPanel,
  DxSelection,
  DxSorting,
  DxSummary,
  DxTotalItem,
} from 'devextreme-vue/data-grid'

const $notify = notify
const $success = (msg) => notify(msg, 'success', 3000)
const $error = (msg) => notify(msg, 'error', 3000)

export { $notify, $success, $error }

export default boot(({ app }) => {
  app.config.globalProperties.$notify = $notify
  app.config.globalProperties.$success = $success
  app.config.globalProperties.$error = $error

  app.component('DxDataGrid', DxDataGrid)
  app.component('DxColumn', DxColumn)
  app.component('DxSorting', DxSorting)
  app.component('DxLoadPanel', DxLoadPanel)
  app.component('DxFilterRow', DxFilterRow)
  app.component('DxEditing', DxEditing)
  app.component('DxSearchPanel', DxSearchPanel)

  app.component('DxFileUploader', DxFileUploader)
  app.component('DxHeaderFilter', DxHeaderFilter)
  app.component('DxMasterDetail', DxMasterDetail)
  app.component('DxSummary', DxSummary)
  app.component('DxTotalItem', DxTotalItem)
  app.component('DxSelection', DxSelection)

  app.component('DxPager', DxPager)
  app.component('DxPaging', DxPaging)
  app.component('DxRowDragging', DxRowDragging)
  app.component('DxSelectBox', DxSelectBox)
  app.component('DxLookup', DxLookup)
  app.component('DxScrolling', DxScrolling)

  app.component('DxHtmlEditor', DxHtmlEditor)
  app.component('DxToolbar', DxToolbar)
  app.component('DxMediaResizing', DxMediaResizing)
  app.component('DxItem', DxItem)

  app.component('DxButton', DxButton)
  app.component('DxTooltip', DxTooltip)
})
