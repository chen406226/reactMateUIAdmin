const url = {
    login: '/base/login',//登录接口
    GetMenu: '/menu/getMenu',//获取用户动态路由菜单树
    GetMenuList: '/menu/getMenuList',//分页获取基础menu列表
    AddBaseMenu: '/menu/addBaseMenu',//新增菜单
    UpdateBaseMenu: '/menu/updateBaseMenu',//更新菜单
    loginOut: '/user/loginOut.html',//退出登录
    loginCheck: '/user/login/befor.html', //校验用户是否登录
    loginUnlock: '/user/unlock/account.html',      //get 获取解锁短信码  post 提交解锁请求

    ModifyLoginPwd: '/account/changePassword.html', //修改登录密码接口
    SetPayPwd: '/account/setPayPwd.html',//设置交易密码
    ModifyPayPwd: '/account/changePayPwd.html',//修改交易密码接口
    getPayCode: '/account/sendPayPwdVcode.html',//重置交易密码，验证码发送
    forgetPayPwd: '/account/resetPassword.html',//忘记交易密码（重置交易密码）

    //修改手机号
    sendOldMobileVcode: '/account/sendOldMobileVcode.html',//向旧手机发送验证码
    validateOldMobileVCode: '/account/validateOldMobileVCode.html',//校验原手机验证码
    sendNewMobileVcode: '/account/sendNewMobileVcode.html',//向新手机发送验证码
    resetMobile: '/account/resetMobile.html',//重新绑定手机号

    salt: '/user/salt.html',//注册加盐
    registerGetSms: '/user/sendVcode.html',//注册获取短信码
    registerInitSlide: '/user/codeCheckGet.html',//注册滑块校验
    register: '/user/regist.html',//注册接口
    openAccountSendCode: '/account/openAccountSendSmsCode.html',//开通存管获取短信验证码
    openAccount: '/account/openAccount.html',                //开通存管
    forgetLoginPassGetSms: '/user/sendUserVcode.html', //忘记登录密码获取短信码
    forgetLoginPassValidateVCode: '/user/validateVCode.html',//忘记登录密码 校验第一步
    forgetLoginPass: '/user/resetPassword.html',  //忘记交易密码
    provideBank: '/recharge/querySupportBank.html',//四要素开户银行列表

    //充值提现及相关
    showBankInfoWeb: '/recharge/showBankInfoWeb.html',//充值页面银行卡信息展示
    showBankLimitListWeb: '/recharge/showBankLimitListWeb.html',//银行限额列表
    showBankListWY: '/recharge/showBankListWY.html',//网银列表
    createRechargeWeb: '/recharge/createRechargeWeb.html',//连连充值
    netBankRecharge: '/recharge/selectGetWay.html',//网银充值
    selectRechargeChannel: '/recharge/selectChannel.html',//快捷充值选择充值渠道
    quickRechargeSubmit: '/recharge/quickRechargeSubmit.html',//快捷充值请求
    quickRechargeConfirm: '/recharge/quickRechargeConfirm.html',//快捷支付确认

    showWithdrawInfoWeb: '/withdraw/showWithdrawInfoWeb.html',//提现页面展示
    showWithdrawLevels: '/withdraw/showWithdrawLevels.html',   //手续费等级
    getWithDrawFee: '/withdraw/getWithDrawFee.html',            //根据输入金额获取手续费
    addWithdrawRecord: '/withdraw/addWithdrawRecord.html',      //发起提现
    financeDetail: '/accountPage/showAccountLogList.html',//资金明细

    getArticleList: '/article/getArticleList.html',  //获取文章列表
    getArticleDetails: '/article/getArticleDetails.html',//获取文章详情

    getIndex: '/index/getIndex.html', //首页接口
    recommend: '/borrow/index/recommend.html',//首页精选标
    isShowImg:'/index/getIshowImg',   //首页图片

    accountIndex: '/accountPage/accountIndex.html',//我的账户
    accountIndexOtherInfo: '/accountPage/otheriInformation.html',//我的账户2
    uploadImage: '/account/uploadImage.html',//更换头像
    changeNickName: '/account/changeNickName.html',//更换昵称
    myRTender: '/rplan/myTender.html',//R计划列表
    myRTenderDetail: '/rplan/myTender/detail.html',//R计划投资详情
    myRRepayment: '/rplan/myTender/detail/repayment.html',//R计划还款详情
    borrowinfo: '/user/borrowinfo.html',//借款人信息
    userRisk: '/user/risk/update.html',//风险测评

    getRedpacketList: '/redpacket/getRedpacketList.html',//优惠券列表
    myTenderSelect: '/center/product.html', //选取可选择的标的列表
    myTender: '/center/myTender.html',//个人中心 我的投资 散标列表
    createTransfer: '/pc/bond/createBond1.html',//发起债权转让
    cancelTransfer: '/pc/bond/bondCancel1.html',//取消债权转让
    myTransferDetail: '/borrow/creditor1.html',//我的投资 债权转让详情
    getCreateTransferSms: '/pc/bond/createBondSendSmsCode.html',//发布债权转让时候获取短信
    myTenderProgress: '/center/tender/flow.html',//我的投资  投资流程进度

    getNoticeList: '/notice/getNoticeList.html',//消息中心
    readNotice: '/notice/readNotice.html',//阅读消息
    isNewNotice: '/notice/isNewNotice.html',

    borrowSearch: '/borrow/search.html',    //标列表
    transferSearch: '/pc/bond/queryBondAttornPage.html',   //债权转让列表
    transferTender: '/pc/bond/bondTender1.html',    //承接债权转让
    newBorrow: '/borrow/newBorrow.html',        //新手标
    detail: '/borrow/detail.html',//标详情
    tenderList: '/borrow/detail/tender/list.html',//标详情投资列表
    tender: '/borrow/tender.html',//投标
    progress: '/borrow/detail/progress.html',//项目历程
    protocol: '/borrow/detail/protocol.html',//协议模板
    oldProtocol: '/center/tender/oldProtocol.html',//老标的协议
    oldBondProtocol: '/center/tender/oldBondProtocol.html',//老标的债转协议
    investProtocol: '/center/tender/investProtocol.html',// 债转协议 返回html
    updateRiskAgreeStatus: '/user/updateRiskStatus.html',//同意风险测评协议

    inviteList: '/invite/inviteIndex.html',// 邀请人列表
    rewardList: '/invite/rewardList.html',//奖励列表
    getQrCode: '/invite/getQrCode.html',//邀请链接
    invitee: '/user/invite.html',//被邀请人手机号或名称
    inviteRank:'/invite/getInviteRanking.html',//人脉榜
    inviteScroll:'/invite/getNewRedpacket.html',//滚动列表
    myInviteRank:'/invite/myInviteRanking.html',//我的排名
    myLastMonRanking:'/invite/lastMonRanking.html',//历史排行榜-上月排行榜接口


    activeCenter: '/banner/getBannerList.html',//活动中心

    growPack: '/redpacket/listMyCoupon.html',//成长红包
    platformData: '/index/dailyData.html',//平台数据
    borrowCount:'/information/getBorrowCount.html',

    nowDate: '/index/nowData.html',   //获取服务器时间
}

export default url