export class SocketEvent {
    public static readonly SOCKET_OPEN = 'SOCKET_OPEN';
    public static readonly SOCKET_CLOSE = 'SOCKET_CLOSE';
}

export class GameEvent {
    public static readonly NO_UPDATE = 'NO_UPDATE';
    public static readonly OPEN_BUY_CAR = 'OPEN_BUY_CAR';
    public static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
    public static readonly SIGININFO_LOGIN = 'SIGININFO_LOGIN';
    public static readonly BUY_SUCCESS = 'BUY_SUCCESS';
    public static readonly GET_USER_SUCCESS = 'GET_USER_SUCCESS';
    public static readonly ALIREALNAME = 'ALIREALNAME';
    public static readonly MONEY_CHANGE = 'MONEY_CHANGE';
    public static readonly GIVEGOLD_SUCESS = 'GIVEGOLD_SUCESS';
    

    public static readonly GET_MYSTOPCAR_LIST = 'GET_MYSTOPCAR_LIST';
    public static readonly GET_MYCARDLIST = 'GET_MYCARDLIST';
    public static readonly GET_MYCARLIST = 'hall_getMyCar';
    public static readonly GET_MYRAREPARK = 'GET_MYRAREPARK';
    public static readonly SHOP_LIST = 'SHOP_LIST';
    public static readonly HANDBOOK_LIST = 'HANDBOOK_LIST';
    public static readonly YEATBOOK_LIST = 'YEATBOOK_LIST';
    public static readonly YEATBOOK_LIST_ED = 'YEATBOOK_LIST_ED';
    public static readonly YEATBOOK_PRIZE = 'YEATBOOK_PRIZE';
    public static readonly STOP_CAR = 'STOP_CAR';
    public static readonly BUY_ITEM = 'BUY_ITEM';

    public static readonly PAY_TYPE = 'PAY_TYPE';

    public static readonly GAME_LOGS = 'GAME_LOGS';
    public static readonly GetGiveLogs = 'mine_getGiveLogs';
    public static readonly GetLove = 'hall_getLove';
    public static readonly GIVEDOUDOU_SUCESS = 'GIVEDOUDOU_SUCESS';
    public static readonly GetFee = 'hall_getFee';
    public static readonly SELL_ALLCAR_SUCCSE = 'SELL_ALLCAR_SUCCSE';
    public static readonly FRIEND_LIST = 'FRIEND_LIST';
    public static readonly FRIEND_RED_LIST = 'FRIEND_RED_LIST';
    public static readonly BANDSHANGJIID = 'BANDSHANGJIID';
    public static readonly GETHANDLISTSUESS = 'GETHANDLISTSUESS';
    public static readonly LOADBOXINFO = 'LOADBOXINFO';
    public static readonly OPENBOXINFO = 'OPENBOXINFO';
    
    public static readonly TACKBACK_CAR = 'TACKBACK_CAR';
    public static readonly TACKBACK_CAR_TIMES = 'TACKBACK_CAR_TIMES';

    public static readonly REALPRIZELIST = 'REALPRIZELIST';
    public static readonly SALECARCON_LIST = 'SALECARCON_LIST';
    public static readonly MYSALECARLIST = 'MYSALECARLIST';
    public static readonly BUYSUPERCARD = 'BUYSUPERCARD';
    public static readonly ALLSUPERCARLIST = 'ALLSUPERCARLIST';
    public static readonly ORDER_SELETECAR = 'ORDER_SELETECAR';
    public static readonly APPLIY_BUY_SUCCSE = 'APPLIY_BUY_SUCCSE';
    public static readonly APPLIY_SOID_SUCCSE = 'APPLIY_SOID_SUCCSE';
    public static readonly CANCEL_APPLIY = 'CANCEL_APPLIY';

    public static readonly TICKETPAGEINFO = 'TICKETPAGEINFO';
    public static readonly FRIENDZHONGJIANGLISE = 'FRIENDZHONGJIANGLISE';

    public static readonly POWERDOUDOUINFO = 'POWERDOUDOUINFO';
    public static readonly POWERDOUDOUSUCCSE = 'POWERDOUDOUSUCCSE';
    public static readonly BIGRICHLIST = 'BIGRICHLIST';
    public static readonly BIGPLAYERINFO = 'BIGPLAYERINFO';

    public static readonly HEIP_CENTER = 'HEIP_CENTER';

    public static readonly TACKCARBACK_ADV = 'TACKCARBACK_ADV';
    public static readonly ZHUANPAN_FIVE_BOX_ADV = 'ZHUANPAN_FIVE_BOX_ADV';
    public static readonly ZHUANPAN_TEN_BOX_ADV = 'ZHUANPAN_TEN_BOX_ADV';

    public static readonly VIPGUANFEPIRZE = 'VIPGUANFEPIRZE';
    public static readonly TICKETRESULT = 'TICKETRESULT';

    public static readonly CHANGEDOWBTAB = 'CHANGEDOWBTAB';

    public static readonly LOAD_ROULETTE_SUCCESS = 'LOAD_ROULETTE_SUCCESS';
    public static readonly CHOUJIANG_SUCCESS = 'CHOUJIANG_SUCCESS';
    public static readonly ROLL_ROULETTE_SUCCESS = 'CHOUJIANG_SUCCESS';
    public static readonly VIPFREEAD_SUCCESS = 'VIPFREEAD_SUCCESS';

    public static readonly GET_GONGGAO_SUCCESS = 'GET_GONGGAO_SUCCESS';    
    public static readonly YANZHENFMA_SUCCESS = 'YANZHENFMA_SUCCESS';
    public static readonly ZHUCE_SUCCESS = 'ZHUCE_SUCCESS';
    public static readonly WANGJI_MIMA_SUCCESS = 'WANGJI_MIMA_SUCCESS';

    public static readonly REGISTER_SUCCESS = 'REGISTER_SUCCESS';
    public static readonly RESET_SUCCESS = 'RESET_SUCCESS';
    public static readonly BINDPHONE_SUCCESS = 'BINDPHONE_SUCCESS';
    
    public static readonly NEED_BIND_PHONE = 'NEED_BIND_PHONE';
    
    public static readonly LOADJACKPOT = 'LOADJACKPOT';
    public static readonly JOINJACKPOT = 'JOINJACKPOT';
    public static readonly LOADPERMIT = 'LOADPERMIT';
    public static readonly BUYPERMIT = 'BUYPERMIT';
    public static readonly GETPERMITLIST = 'GETPERMITLIST';
    public static readonly GETPERMITREWARD = 'GETPERMITREWARD';
    public static readonly GETVIPCONFIGLIST = 'GETVIPCONFIGLIST';
    public static readonly GETMYVIP = 'GETMYVIP';
    public static readonly GETVIPPRIZE = 'GETVIPPRIZE';
    public static readonly GETUSERVIPCONFIGLIST = 'GETUSERVIPCONFIGLIST';
    
    public static readonly DOUDOUINFO = 'DOUDOUINFO';
    public static readonly GETREALPRIZE = 'GETREALPRIZE';
    public static readonly GET_VIP_PRICE = 'GET_VIP_PRICE';
    public static readonly GETRANKLIST_SUCCESS = 'GETRANKLIST_SUCCESS';
    public static readonly SOUSUO_SUCCESS = 'SOUSUO_SUCCESS';
    
    public static readonly GETSHAREINFO = 'GETSHAREINFO';
    public static readonly GETSHANGJI = 'GETSHANGJI';
    public static readonly GETFRAGMENTLIST = 'GETFRAGMENTLIST';
    public static readonly EXCHANGEFRAGMENT = 'EXCHANGEFRAGMENT';
    public static readonly GETFRAGMENTEXCHANGELOG = 'GETFRAGMENTEXCHANGELOG';
    public static readonly GET_AGREEMENT_SUCCESS = 'GET_AGREEMENT_SUCCESS';
    public static readonly CHECK_VERSION_SUCCESS = 'CHECK_VERSION_SUCCESS';
    public static readonly GETWITHDRAWLOGS = 'GETWITHDRAWLOGS';
    public static readonly GETJISHOULOGS = 'GETJISHOULOGS';
    public static readonly SUIPIAN_UPDATE = 'SUIPIAN_UPDATE';
    

    // public static readonly FFT_CHANGE = 'FFT_CHANGE';
    // public static readonly YANZHENGMA_SUCCESS = 'YANZHENGMA_SUCCESS';
    // public static readonly ZHUCE_SUCCESS = 'ZHUCE_SUCCESS';
    // public static readonly WANGJI_MIMA_SUCCESS = 'WANGJI_MIMA_SUCCESS';
    // public static readonly ZHONGZHI_SUCCESS = 'ZHONGZHI_SUCCESS';
    // public static readonly REFRESH_ZHIWU = 'REFRESH_ZHIWU';
    // public static readonly YUGOU_SUCCESS = 'YUGOU_SUCCESS';

    // public static readonly GET_SHOP_STOCKS = 'GET_SHOP_STOCKS';
    // public static readonly CHEDAN_SUCCESS = 'CHEDAN_SUCCESS';
    // public static readonly USE_DAOJU_SUCCESS = 'USE_DAOJU_SUCCESS';
    // public static readonly GET_JILU_STOCKS = 'GET_JILU_STOCKS';
    // public static readonly ZHIWU_CLICK = 'ZHIWU_CLICK';
    // public static readonly DUIHUAN_SUCCESS = 'DUIHUAN_SUCCESS';
    // public static readonly GET_XIAJI_SUCCESS = 'GET_XIAJI_SUCCESS';
    // public static readonly GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
    // public static readonly GET_HY_CHATS_SUCCESS = 'GET_HY_CHATS_SUCCESS';
    // public static readonly GET_FIND_F_SUCCESS = 'GET_FIND_F_SUCCESS';
    // public static readonly SHENQING_SUCCESS = 'SHENQING_SUCCESS';
    // public static readonly F_SQ_LIST_SUCCESS = 'F_SQ_LIST_SUCCESS';
    // public static readonly GET_F_LIST_SUCCESS = 'GET_F_LIST_SUCCESS';
    // public static readonly F_TONGYI_SUCCESS = 'F_TONGYI_SUCCESS';
    // public static readonly F_JUJUE_SUCCESS = 'F_JUJUE_SUCCESS';
    // public static readonly EXCHANGES_SUCCESS = 'EXCHANGES_SUCCESS';
    // public static readonly MISSIONED_SUCCESS = 'MISSIONED_SUCCESS';
    // public static readonly CHOUJIANG_SUCCESS = 'CHOUJIANG_SUCCESS';
    // public static readonly GET_USER_F_SUCCESS = 'GET_USER_F_SUCCESS';
    // 
    // public static readonly HIDE_ZW_BTNS = 'HIDE_ZW_BTNS';
    // public static readonly YANZHENFMA_SUCCESS = 'YANZHENFMA_SUCCESS';


    // public static readonly LOAD_SHOP_SUCCESS = 'LOAD_SHOP_SUCCESS';
    // public static readonly LOAD_BAG_SUCCESS = 'LOAD_BAG_SUCCESS';
    // public static readonly LOAD_ROULETTE_SUCCESS = 'LOAD_ROULETTE_SUCCESS';
    // public static readonly ROLL_ROULETTE_SUCCESS = 'ROLL_ROULETTE_SUCCESS';
    // public static readonly LOAD_TASK_SUCCESS = 'LOAD_TASK_SUCCESS';
    // public static readonly LOAD_RANKING_SUCCESS = 'LOAD_RANKING_SUCCESS';
    // public static readonly GET_FRIENDS_LIST_SUCCESS = 'GET_FRIENDS_LIST_SUCCESS';
    // public static readonly FIND_FRIEND_SUCCESS = 'FIND_FRIEND_SUCCESS';
    // public static readonly GET_FRIEND_APPLY_LIST = 'GET_FRIEND_APPLY_LIST';
    // public static readonly CLOSE_HAOYOU_SHENQING_POP = 'CLOSE_HAOYOU_SHENQING_POP';
    // public static readonly GET_BUY_LIST_SUCCESS = 'GET_BUY_LIST_SUCCESS';
    // public static readonly GET_ZHUANPAN_LIST_SUCCESS = 'GET_ZHUANPAN_LIST_SUCCESS';
    // public static readonly GET_NONGCHANG_LIST_SUCCESS = 'GET_NONGCHANG_LIST_SUCCESS';
    // public static readonly GET_COIN_LIST_SUCCESS = 'GET_COIN_LIST_SUCCESS';
    // public static readonly GET_XIAJI_LIST_SUCCESS = 'GET_XIAJI_LIST_SUCCESS';
    // public static readonly SET_CAOZUO_MIMA_SUCCESS = 'SET_CAOZUO_MIMA_SUCCESS';
    // public static readonly XIU_DENGLU_MIMA_SUCCESS = 'XIU_DENGLU_MIMA_SUCCESS';
    // public static readonly GET_GONGGAO_SUCCESS = 'GET_GONGGAO_SUCCESS';
    // public static readonly SELL_SUCCESS = 'SELL_SUCCESS';
    // public static readonly CLOSE_CHUSHOUCHENGGONG_POP = 'CLOSE_CHUSHOUCHENGGONG_POP';
    // public static readonly CHANGE_NAME_SUCCESS = 'CHANGE_NAME_SUCCESS';
    // public static readonly DUIHUAN_JINBI_SUCCESS = 'DUIHUAN_JINBI_SUCCESS';
    // public static readonly REQUIRE_SUCCESS = 'REQUIRE_SUCCESS';
    // public static readonly XIUGAI_MIMA_SUCCESS = 'XIUGAI_MIMA_SUCCESS';
    // public static readonly CHANGE_LEVEL = 'CHANGE_LEVEL';
    // public static readonly CHANGE_EXP = 'CHANGE_EXP';
    // public static readonly GET_TRANSFERBEFORE_SUCCESS = 'GET_TRANSFERBEFORE_SUCCESS';
    // public static readonly SET_BANK_INFO_SUCCESS = 'SET_BANK_INFO_SUCCESS';
    // public static readonly SET_SEND_YZM_SUCCESS = 'SET_SEND_YZM_SUCCESS';
}

/** 全局事件 */
export enum EnumEvent {
    /** 刷新协议、隐私勾选按钮状态 */
    anniu_refresh_status = 'anniu_refresh_status',
}