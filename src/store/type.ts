export interface Add_daily {
  addcon: number;
  addsus: number;
  adddeath: number;
  addcure: number;
  wjw_addsus: string;
  addcon_new: string;
  adddeath_new: string;
  addcure_new: string;
  wjw_addsus_new: string;
  addecon_new: string;
  addhecon_new: string;
  addjwsr: string;
  addasymptom: string;
}

export interface JwsrTop {
  jwsrNum: string;
  name: string;
  ename: string;
}

export interface Adddaily {
  conadd: string;
  deathadd: string;
  cureadd: string;
  econadd: string;
  conadd_n: string;
  deathadd_n: string;
  cureadd_n: string;
}

export interface City {
  name: string;
  conNum: string;
  conadd: string;
  conadd_str: string;
  hejian: string;
  susNum: string;
  cureNum: string;
  deathNum: string;
  mapName: string;
  citycode: string;
  econNum: string;
  zerodays: string;
  jwsr: string;
  asymptomNum: string;
}

export interface List {
  name: string;
  ename: string;
  value: string;
  conadd: string;
  hejian: string;
  econNum: string;
  susNum: string;
  deathNum: string;
  asymptomNum: string;
  cureNum: string;
  zerodays: string;
  jwsr: string;
  jwsrNum: string;
  showCurData: string;
  adddaily: Adddaily;
  city: City[];
}

export interface Othertotal {
  certain: string;
  uncertain: string;
  die: string;
  recure: string;
  certain_inc: string;
  uncertain_inc: string;
  die_inc: string;
  recure_inc: string;
  ecertain: string;
  ecertain_inc: string;
}

export interface Otherlist {
  conNum: string;
  susNum: string;
  cureNum: string;
  deathNum: string;
  conadd: string;
  susadd: string;
  cureadd: string;
  deathadd: string;
  econNum: string;
  name: string;
  citycode: string;
  value: string;
  is_show_entrance: number;
  is_show_map: number;
}

export interface Otherhistorylist {
  certain: string;
  uncertain: string;
  die: string;
  recure: string;
  certain_inc: string;
  uncertain_inc: string;
  die_inc: string;
  recure_inc: string;
  date: string;
}

export interface Historylist {
  date: string;
  cn_conNum: string;
  cn_deathNum: string;
  cn_cureNum: string;
  cn_susNum: string;
  cn_econNum: string;
  cn_heconNum: string;
  cn_deathRate: string;
  cn_cureRate: string;
  is_show: string;
  wjw_susNum: string;
  wuhan_conNum: string;
  wuhan_deathNum: string;
  wuhan_cureNum: string;
  wuhan_susNum?: any;
  cn_conadd: string;
  cn_jwsrNum: string;
  cn_addjwsrNum: string;
  cn_asymptomNum: string;
}

export interface Worldlist {
  name: string;
  value: string;
  susNum: string;
  deathNum: string;
  cureNum: string;
  econNum: string;
}

export interface CaseClearCityInfo {
  ljClearCityNum: number;
  ljNoClearCityNum: number;
  ljCityNum: number;
}

export interface RootObject {
  times: string;
  mtime: string;
  cachetime: string;
  gntotal: string;
  deathtotal: string;
  sustotal: string;
  curetotal: string;
  econNum: string;
  heconNum: string;
  asymptomNum: string;
  jwsrNum: string;
  add_daily: Add_daily;
  jwsrTop: JwsrTop[];
  list: List[];
  othertotal: Othertotal;
  otherlist: Otherlist[];
  otherhistorylist: Otherhistorylist[];
  historylist: Historylist[];
  worldlist: Worldlist[];
  caseClearCityInfo: CaseClearCityInfo;
}
