import { h, ref } from "vue"
// import TableButton from "./components/TableButton.vue"
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
// // 清空数组null
// const removeEmptyArray = (array: any[]) => {
//   return array.filter((item) => item)
// }
// const getKeyAndTitle = (array: any[]) => {
//   return array.map((item: any) => {
//     return {
//       title: item.title,
//       active: item.active,
//       data: item.data,
//       columns: item.columns.map((i: any) => {
//         return {
//           key: i.key,
//           title: i.title,
//         }
//       }),
//     }
//   })
// }

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
  // BankGuarantee,
  guaranteeOtherCOList:BankGuarantee,
  // guaranteeCOList: Guarantee,
  guaranteeSelfCOList: Guarantee,
  acceptDraftCOList: DrawerMoneyOrder,
  commDraftDiscountCOList: UnexpiredMoneyOrder,
  commDraftAcceptCOList: HolderMoneyOrder,
  letterCreditCOList: IrrevocableOfCredit,
  fxContractCOList: ForeignTradingContract,
  propertyDocCOList: PropertyDocument,
  finProductCOList: FinancialProducts,
  otherMatterCOList: OtherMatters,
  // FundCollection
  appendixCOList:FundCollection,
}
// confBaseInfoCO
