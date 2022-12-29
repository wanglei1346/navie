import { h } from "vue"
import TableButton from "./components/TableButton.vue"
import BankDeposit from "@/dictionaries/BankDeposit"
import BankLoan from "@/dictionaries/BankLoan"
import CancelAccount from "@/dictionaries/CancelAccount"
import LenderOfLoans from "@/dictionaries/LenderOfLoans"
import BorrowerOfLoans from "@/dictionaries/BorrowerOfLoans"
import Guarantee from "@/dictionaries/Guarantee"
import DrawerMoneyOrder from "@/dictionaries/DrawerMoneyOrder"
import UnexpiredMoneyOrder from "@/dictionaries/UnexpiredMoneyOrder"
import HolderMoneyOrder from "@/dictionaries/HolderMoneyOrder"
import IrrevocableOfCredit from "@/dictionaries/IrrevocableOfCredit"
import ForeignTradingContract from "@/dictionaries/ForeignTradingContract"
import PropertyDocument from "@/dictionaries/PropertyDocument"
import OtherMatters from "@/dictionaries/OtherMatters"
import FinancialProducts from "@/dictionaries/FinancialProducts"
import BankGuarantee from "@/dictionaries/BankGuarantee"
import FundCollection from "@/dictionaries/FundCollection"
// 清空数组null
const removeEmptyArray = (array: any[]) => {
  return array.filter((item) => item)
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 19:48:31
 * @description 发函管理列表配置
 */
export const tableColumns = (
  tabName: string,
  getList: () => void,
  confStates: any[]
) => {
  return removeEmptyArray([
    {
      type: "selection",
    },
    {
      title: "函证编码",
      key: "confNo",
    },
    {
      title: "所属项目",
      key: "prjName",
    },
    {
      title: "函证类型",
      key: "confType",
      render(row: any) {
        return confTypes.find((type: any) => type.value === row.confType)?.label
      },
    },
    tabName === "invalidate"
      ? null
      : {
          title: "函证状态",
          key: "confState",
          render(row: any) {
            return confStates.find(
              (state: any) => state.value === row.confState
            )?.label
          },
        },
    tabName === "send"
      ? null
      : {
          title: "授权单位",
          key: "confAuthorizerCompany",
        },
    tabName === "send"
      ? null
      : {
          title: "回函单位",
          key: "confReplyerCompany",
        },
    tabName === "send"
      ? {
          title: "发函时间",
          key: "confSendDate",
        }
      : null,
    tabName === "send"
      ? {
          title: "回函时间",
          key: "confReplyDate",
        }
      : null,
    {
      title: "操作",
      key: "tags",
      width: 200,
      render(row: any) {
        return h(TableButton, { tabName: tabName, row, getList }, {})
      },
    },
  ])
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-10-31 19:48:51
 * @description 发函管理编辑-函证内容配置
 */
export const ProofContentOption = {
  depositCOList: BankDeposit,
  borrowingCOList: BankLoan,
  closeAcctCOList: CancelAccount,
  entrustLoanBorrowerCOList: LenderOfLoans,
  entrustLoanLenderCOList: BorrowerOfLoans,
  guaranteeSelfCOList: BankGuarantee,
  guaranteeOtherCOList: Guarantee,
  acceptDraftCOList: DrawerMoneyOrder,
  commDraftDiscountCOList: UnexpiredMoneyOrder,
  commDraftAcceptCOList: HolderMoneyOrder,
  letterCreditCOList: IrrevocableOfCredit,
  fxContractCOList: ForeignTradingContract,
  propertyDocCOList: PropertyDocument,
  finProductCOList: FinancialProducts,
  otherMatterCOList: OtherMatters,
  appendixCOList: FundCollection,
}
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-20 16:33:27
 * @description 函证类型
 */
export const confTypes = [
  {
    label: "银行函证",
    value: 1,
  },
  {
    label: "往来函证",
    value: 2,
  },
  {
    label: "自定义函证",
    value: 3,
  },
]
/**
 * @author wanglei<wanglei@cdtrust.com>
 * @date 2022-12-20 16:34:01
 * @description 状态
 */
export const confStates = [
  {
    label: "草稿",
    value: "1",
  },
  {
    label: "待发函",
    value: "2",
  },
]

// 查询表单配置
export const getFormOption = (confStates: any[], tabName: string) => {
  return removeEmptyArray([
    {
      label: "函证类型",
      key: "confType",
      type: "select",
      placeholder: "请选择函证类型",
      options: confTypes,
    },
    tabName === "invalidate"
      ? null
      : {
          label: "状态",
          key: "confState",
          type: "select",
          placeholder: "请选择函证状态",
          options: confStates,
        },
  ])
}
