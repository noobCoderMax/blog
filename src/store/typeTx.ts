export interface ShowAddSwitch {
  confirm: boolean;
  dead: boolean;
  nowConfirm: boolean;
  noInfect: boolean;
  all: boolean;
  suspect: boolean;
  heal: boolean;
  nowSevere: boolean;
  importedCase: boolean;
  localConfirm: boolean;
  localinfeciton: boolean;
}

export interface Today {
  isUpdated: boolean;
  confirm: number;
}

export interface Total {
  showHeal: boolean;
  continueDayZeroLocalConfirm: number;
  nowConfirm: number;
  confirm: number;
  dead: number;
  heal: number;
  wzz: number;
  mediumRiskAreaNum: number;
  mtime: string;
  showRate: boolean;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  provinceLocalConfirm: number;
  adcode: string;
}

export interface Today {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  wzz_add: string;
  local_confirm_add: number;
}

export interface TotalMode {
  dead: number;
  showHeal: boolean;
  mtime: string;
  adcode: string;
  confirm: number;
  heal: number;
  wzz: number;
  mediumRiskAreaNum: number;
  provinceLocalConfirm: number;
  continueDayZeroLocalConfirm: number;
  nowConfirm: number;
  showRate: boolean;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
}

export interface Children {
  adcode: string;
  date: string;
  today: Today;
  total: Total;
  name: string;
}

export interface Today {
  wzz_add: string;
  local_confirm_add: number;
  abroad_confirm_add: number;
  dead_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
}

export interface Total {
  nowConfirm: number;
  wzz: number;
  continueDayZeroConfirmAdd: number;
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  mtime: string;
  confirm: number;
  showRate: boolean;
  heal: number;
  provinceLocalConfirm: number;
  dead: number;
  showHeal: boolean;
  continueDayZeroConfirm: number;
  adcode: string;
}

export interface Children {
  children: Children[];
  name: string;
  adcode: string;
  date: string;
  today: Today;
  total: Total;
  id: number;
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Children[];
}

export interface ChinaTotal {
  localConfirm: number;
  dead: number;
  showLocalConfirm: number;
  confirmAdd: number;
  local_acc_confirm: number;
  nowConfirm: number;
  confirm: number;
  suspect: number;
  showlocalinfeciton: number;
  localConfirmH5: number;
  deadAdd: number;
  mediumRiskAreaNum: number;
  mRiskTime: string;
  nowSevere: number;
  importedCase: number;
  noInfect: number;
  nowLocalWzz: number;
  mtime: string;
  localConfirmAdd: number;
  highRiskAreaNum: number;
  heal: number;
  noInfectH5: number;
  localWzzAdd: number;
}

export interface ChinaAdd {
  confirm: number;
  heal: number;
  noInfect: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  nowSevere: number;
  importedCase: number;
}

export interface Diseaseh5Shelf {
  isShowAdd: boolean;
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
}

export interface StatisGradeCityDetail {
  city: string;
  dead: number;
  heal: number;
  date: string;
  mtime: string;
  sdate: string;
  province: string;
  confirmAdd: number;
  confirm: number;
  grade: string;
  syear: number;
  wzz_add: string;
  nowConfirm: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}
