import webim from "webim-tencent"; //引入node 模块
//global.webim = webim;
//配置云通信应用
let sdkAppID = 1400197658; //应用ID不可更改
let accountType = 36862;      //应用账户类型不可更改
let accountMode = 0;  // 0为独立模式 1为托管模式

let selType = webim.SESSION_TYPE.C2C; // 当前聊天类型C2C是私聊，GROUP是群聊
let selToID = "";        // 当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
let selSess = null;                   // 当前聊天会话对象
//默认好友头像
let friendHeadUrl = 'img/friend.jpg'; //仅demo使用，用于没有设置过头像的好友
//存放c2c或者群信息（c2c用户：c2c用户id，昵称，头像；群：群id，群名称，群头像）
let infoMap = {}; //初始化时，可以先拉取我的好友和我的群组信息
let getPrePageC2CHistroyMsgInfoMap = {}; //保留下一次拉取好友历史消息的信息
let reqMsgCount = 10; //每次请求的历史消息(c2c获取群)条数，仅demo用得到

let sendUser = {}; //初始化发送用户信息
let toUser = {}; //初始化接收用户信息

let openEmotionFlag = false; //是否打开过表情
let openSendBottomFlag = false; // 是否打开过发送文件合子

let myUnread = 0

//云通信登录态
function loginWebIm () {
    //当前默认用户身份
    let loginInfo = {
        'sdkAppID': sdkAppID, //用户所属应用id,必填
        'appIDAt3rd': sdkAppID,
        'identifier': sendUser.identifier,  // 当前用户ID,必须是否字符串类型，必填 （实例）
        //'identifier': sessionStorage.getItem('identifier'),  // 当前用户ID,必须是否字符串类型，必填  正式开发的时候需要根据个人信息去后台获取用户ID
        'accountType': accountType, //用户所属应用帐号类型，必填
        //'userSig': sessionStorage.getItem('userSig'),   // 正式开发的时候需要根据个人信息去后台获取身份凭证
        'userSig': sendUser.userSig,
        //当前用户身份凭证，必须是字符串类型，必填
        'identifierNick': sendUser.identifierNick, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id

    };
    console.log(sendUser.identifier)
    // 监听连接状态回调变化事件
    let onConnNotify = function (resp) {
        let info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
                break;
            case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                // alert(info);
                webim.Log.warn(info);
                break;
            default:
                webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
                break;
        }
    };

    let jsonpCallback = function (resp) {
        webim.setJsonpLastRspData(resp);
    };

    //监听新消息事件 newMsgList 为新消息数组，结构为[Msg]
    let onMsgNotify = function (newMsgList) {
        console.log('新消息监听:', newMsgList);
        var sess, newMsg;
        // 获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();
        console.log('获取所有消息列表:', sessMap);
        if (newMsgList.length !== 0) {
            initRecentContactList();
        }
        for (let j in newMsgList) { // 遍历新消息
            newMsg = newMsgList[j];
            console.log("账户消息");
            console.log(newMsg.getSession().id());
            console.log(selToID);
            console.log(newMsg.getSession());

            if (newMsg.getSession().id() === selToID) { // 为当前聊天对象的消息
                selSess = newMsg.getSession();
                //在聊天窗体中新增一条消息
                console.warn(newMsg);
                console.log("显示消息列表");
                addOneMsg(newMsg);
            }
        }
        // 消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(selSess, true, true);
        for (var i in sessMap) {
            sess = sessMap[i];
            if (selToID != sess.id()) { // 更新其他聊天对象的未读消息数
                console.log("监听其它消息未读数量", sess.type(), sess.id(), sess.unread());
                //this.updateSessDiv(sess.type(), sess.id(), sess.unread());
            }
        }
    };

    //监听 C2C 消息通道的处理，方法在 receive_new_msg.js 文件中
    let onC2cEventNotifys = {
        "92": onMsgReadedNotify, //消息已读通知
    };
    //监听事件
    let listeners = {
        "onConnNotify": onConnNotify,                 //监听连接状态回调变化事件,必填
        "jsonpCallback": jsonpCallback,       //IE9(含)以下浏览器用到的 jsonp 回调函数，
        "onMsgNotify": onMsgNotify,          //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        "onC2cEventNotifys": onC2cEventNotifys  //监听 C2C 系统消息通道
    };

    //初始化时，其他对象，选填
    let options = {
        'isAccessFormalEnv': true, 	// 是否访问正式环境，默认访问正式，选填
        'isLogOn': true  	// 是否开启控制台打印日志,默认开启，选填
    };
    // if (webim.checkLogin()) {	// 检查是否登录返回true和false,不登录则重新登录
    //     console.log('已登录');
    //     let chatHeight = $("#video_sms_list").outerHeight();
    //     initRecentContactList();  // 获取会话列表
    //     getLastC2CHistoryMsgs(toUser.identifier,chatHeight);  // 获取消息内容列表
    // } else {
    webim.login(
        loginInfo, listeners, options,
        function (resp) {
            let chatHeight = $("#video_sms_list").outerHeight();
            console.log('信息展示:', resp);
            loginInfo.identifierNick = resp.identifierNick;//设置当前用户昵称
            console.log("登录成功");
            initRecentContactList(); //会话列表
            getLastC2CHistoryMsgs(toUser.identifier, chatHeight);  //获取消息内容
        },
        function (err) {
            console.log("登录错误信息提示:", err.ErrorInfo);
        }
    );
    // }
}
//初始化聊天界面最近会话列表
function initRecentContactList () {
    webim.getRecentContactList({//获取会话列表的方法
        'Count': 20 //最近的会话数 ,最大为 100
    }, function (resp) {
        console.log('回调显示列表：', resp);
        if (resp.SessionItem) {
            let items = resp.SessionItem;
            console.log('items:', items);
            // 这里可以对数据进行相应的处理
            webim.syncMsgs(initUnreadMsgCount); // 初始化最近会话的消息未读数
        } else {
        }
    }, function (resp) {
        //错误回调
    });

}
// 初始化最近会话的消息未读数
function initUnreadMsgCount () {
    let sess;
    let sessMap = webim.MsgStore.sessMap();
    // var sessGroup = []
    myUnread = 0
    for (let i in sessMap) {
        sess = sessMap[i];
        console.log(sess);
        console.log('sess.unread()', sess.unread());
        myUnread += sess._impl.unread
    }
    return sessMap
}

function unreadNum () {
    return myUnread
}

//消息已读通知
function onMsgReadedNotify (notify) {

    console.log("消息已读信息：", notify);
    //return false;
    var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + notify.From_Account];
    if (sessMap) {
        var msgs = _.clone(sessMap.msgs());
        var rm_msgs = _.remove(msgs, function (m) {
            return m.time <= notify.LastReadTime
        });
        var unread = sessMap.unread() - rm_msgs.length;
        unread = unread > 0 ? unread : 0;
        //更新sess的未读数
        sessMap.unread(unread);
        console.log('更新C2C未读数:', notify.From_Account, unread);
        //更新页面的未读数角标

        if (unread > 0) {
            //角标显示
            //$("#badgeDiv_" + notify.From_Account).text(unread).show();
        } else {
            //角标隐藏
            //$("#badgeDiv_" + notify.From_Account).val("").hide();
        }
    }
}
//发送一条消息
function onSendMsg (sendMsg) {
    if (!selToID) {
        // alert("你还没有选中好友或者群组，暂不能聊天");
        return;
    }
    let loginInfo = {
        "identifier": toUser.identifier,           //用户ID
        "identifierNick": toUser.identifierNick,  //用户昵称
        "headurl": toUser.headurl,  //用户头像
    };
    //获取消息内容
    let msgContent = sendMsg;
    let msgLen = webim.Tool.getStrBytes(msgContent);

    if (msgContent.length < 1) {
        // alert("发送的消息不能为空!");
        return;
    }
    let maxLen, errInfo;
    if (selType === webim.SESSION_TYPE.C2C) {
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    } else {
        maxLen = webim.MSG_MAX_LENGTH.GROUP;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    }
    if (msgLen > maxLen) {
        // alert(errInfo);
        return;
    }

    //发消息处理
    if (!selSess) {
        var selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType; //消息子类型
    if (selType === webim.SESSION_TYPE.C2C) {
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    } else {
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
    }
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);

    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgContent.match(expr);
    if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgContent);
        msg.addText(text_obj);
    } else {
        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];

            if (emotion) {
                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new webim.Msg.Elem.Text(emotions[i]);
                msg.addText(text_obj);
            }
            restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
            msgContent = msgContent.substring(restMsgIndex);
        }
        if (msgContent) {
            text_obj = new webim.Msg.Elem.Text(msgContent);
            msg.addText(text_obj);
        }
    }

    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    msg.originContent = msgContent;
    addOneMsg(msg);
    $("#send_msg_text textarea").val('');
    $("#send_msg_text textarea").css("height", "0.3rem");
    webim.sendMsg(msg, function (resp) {
        //发送成功，把sending清理
        $("#send_msg_text textarea").val('');
        $("#send_msg_text textarea").css("height", "0.2rem");
        hideDiscussForm(); //隐藏评论表单
        showDiscussTool(); //显示评论工具栏
        hideDiscussEmotion(); //隐藏表情
        $('.barrage').css("height", "calc(100vh - 1.5rem)");
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight());
        webim.Tool.setCookie("tmpmsg_" + selToID, '', 0);
    }, function (err) {
        console.log("发送失败！");
        alert("发送失败,该店长已下线！");
        //提示重发
    });
}
//添加一条消息在聊天窗口里面
function addOneMsg (msg, e, prePage) {
    console.log("得到消息信息");
    let isSelfSend, fromAccount, fromAccountNick, fromAccountImage, sessType, subType;
    let chatlist, li, paneDiv, textDiv, nickNameSpan, contentSpan, userImg;
    let chatTime = formatDate(new Date(msg.time * 1000), "MM-dd hh:mm:ss");
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();
    isSelfSend = msg.getIsSend(); //消息是否为自己发的
    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        return;
    }

    if (isSelfSend) { //如果是自己发的消息
        if (sendUser.identifierNick) {
            fromAccountNick = sendUser.identifierNick;
        } else {
            fromAccountNick = fromAccount;
        }
        //获取头像
        if (sendUser.headurl) {
            fromAccountImage = sendUser.headurl;
        } else {
            fromAccountImage = friendHeadUrl;
        }
    } else { //如果别人发的消息
        let key = webim.SESSION_TYPE.C2C + "_" + fromAccount;
        let info = infoMap[key];
        if (info && info.name) {
            fromAccountNick = info.name;
        } else if (msg.getFromAccountNick()) {
            fromAccountNick = msg.getFromAccountNick();
        } else {
            fromAccountNick = fromAccount;
        }
        //获取头像
        if (info && info.image) {
            fromAccountImage = info.image;
        } else if (msg.fromAccountHeadurl) {
            fromAccountImage = msg.fromAccountHeadurl;
        } else {
            fromAccountImage = friendHeadUrl;
        }
    }
    chatlist = document.getElementById("video_sms_list"); //获取聊天窗口元素

    let maxDisplayMsgCount = 100;
    let opacityStep = 0.2;
    let opacity;
    let childrenLiList = $("#video_sms_list").children();
    if (childrenLiList.length == maxDisplayMsgCount) {
        $("#video_sms_list").children(":first").remove();
        for (let i = 0; i < maxDisplayMsgCount; i++) {
            opacity = opacityStep * (i + 1) + 0.2;
            $('#video_sms_list').children().eq(i).css("opacity", opacity);
        }
    }
    li = document.createElement("li");
    //包含头像和内容的盒子
    let chatDiv = document.createElement("div")
    chatDiv.setAttribute('class', 'chat-content')

    // 包含头像的盒子
    paneDiv = document.createElement("div");
    paneDiv.setAttribute('class', 'video-sms-pane');

    // 昵称
    nickNameSpan = document.createElement("span");
    let colorList = ['red', 'green', 'white', 'org'];
    let index = Math.round(fromAccount.length % colorList.length);
    let color = colorList[index];
    nickNameSpan.setAttribute('class', 'user-name-' + color);
    nickNameSpan.innerHTML = webim.Tool.formatText2Html("" + fromAccountNick + "") + "：";

    //聊天时间盒子
    let userDiv = document.createElement("div");
    userDiv.setAttribute('class', 'video-sms-time');
    userDiv.innerHTML = chatTime;

    //包含时间和个人昵称的盒子
    let userInfosDiv = document.createElement("div");
    userInfosDiv.setAttribute('class', 'userInfos');

    // 包含聊天内容的盒子
    contentSpan = document.createElement("div");
    contentSpan.setAttribute('class', 'video-sms-box');

    let bigDiv = document.createElement("div");
    bigDiv.setAttribute('class', 'video-sms-bigbox');
    bigDiv.appendChild(contentSpan);

    //userInfosDiv.append(nickNameSpan);
    userInfosDiv.append(userDiv);

    // let onemsg = document.createElement("div");
    // if (msg.sending) {
    //     onemsg.id = "id_" + msg.random;
    //     //发送中
    //     var spinner = document.createElement("div");
    //     spinner.className = "spinner";
    //     spinner.innerHTML = '<div class="bounce1"></div> <div class="bounce2"></div> <div class="bounce3"></div>';
    //     //onemsg.appendChild(spinner);
    //     console.log("发送信息中:",spinner);
    // } else {
    //     $("#id_" + msg.random).remove();
    // }
    // onemsg.className = "onemsg";
    // let msghead = document.createElement("p");
    // let msgbody = document.createElement("p");
    // let msgPre = document.createElement("pre");
    // msghead.className = "msghead";
    // msgbody.className = "msgbody";


    //如果是发给自己的消息
    // if (!isSelfSend) msghead.style.color = "blue";
    //昵称  消息时间
    // msghead.innerHTML = "<img class='headurlClass' src='" + fromAccountImage + "'>" + "&nbsp;&nbsp;" + webim.Tool.formatText2Html(fromAccountNick + "&nbsp;&nbsp;" + webim.Tool.formatTimeStamp(msg.getTime()));


    //解析消息
    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();
    //console.log("消息类型----：",subType);
    switch (subType) {
        case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
            contentSpan.innerHTML = convertMsgtoHtml(msg);
            //console.log("消息类型0----：",subType);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
            contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
            //console.log("消息类型1----：",subType);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
            //console.log("消息类型2----：",subType);
            //展示点赞动画
            //showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
            //console.log("消息类型3----：",subType);
            break;
    }

    if (sessType == webim.SESSION_TYPE.C2C) {

        userImg = document.createElement("img");
        userImg.setAttribute('class', 'video-sms-user');
        if (isSelfSend) {
            //自己
            nickNameSpan.innerHTML = sendUser.identifierNick;
            li.setAttribute('class', 'infos-right');
            userImg.setAttribute("src", sendUser.headurl);
            //paneDiv.appendChild(userInfosDiv);
            paneDiv.appendChild(userImg);

            li.appendChild(userDiv);
            li.appendChild(chatDiv);
            chatDiv.appendChild(contentSpan);
            chatDiv.appendChild(paneDiv);

            if (prePage) {
                chatlist.insertBefore(li, chatlist.firstChild);
            } else {
                chatlist.appendChild(li);
            }
        } else {
            nickNameSpan.innerHTML = toUser.identifierNick;
            li.setAttribute('class', 'infos-left');
            userImg.setAttribute('class', 'video-sms-user video-sms-user-left');
            userImg.setAttribute("src", toUser.headurl);
            paneDiv.appendChild(userImg);
            //paneDiv.appendChild(userInfosDiv);
            li.appendChild(userDiv);
            li.appendChild(chatDiv);
            chatDiv.appendChild(paneDiv);
            chatDiv.appendChild(contentSpan);

            if (prePage) {
                chatlist.insertBefore(li, chatlist.firstChild);
            } else {
                chatlist.appendChild(li);
            }
            // 点击图片跳转
            $(document).on("click", ".video-sms-user-left", function () {
                console.log(636);
                // toUser.that为传过来的this对象
                toUser.that.$router.push({ name: 'factoryDes', params: { sid: toUser.id } })
                // window.location.href = "http://localhost:8080/#/factoryDes/"+toUser.id
            })
        }
    }
    if (e) {
        // console.log($("#video_sms_list").outerHeight())
        $("#scrollList").scrollTop(($("#video_sms_list").outerHeight()) - e)
    } else {
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight())
    }

    // msgbody.appendChild(msgPre);
    // onemsg.appendChild(msghead);
    // onemsg.appendChild(msgbody);
    // //消息列表
    // let msgflow = document.getElementsByClassName("msgflow")[0];
    // if (prepend) {
    //     //300ms后,等待图片加载完，滚动条自动滚动到底部
    //     msgflow.insertBefore(onemsg, msgflow.firstChild);
    //     if (msgflow.scrollTop == 0) {
    //         setTimeout(function() {
    //             msgflow.scrollTop = 0;
    //         }, 300);
    //     }
    // } else {
    //     //msgflow.appendChild(onemsg);
    //     console.log("加载图片信息:",onemsg);
    //     //300ms后,等待图片加载完，滚动条自动滚动到底部
    //     setTimeout(function() {
    //         //msgflow.scrollTop = msgflow.scrollHeight;
    //     }, 300);
    // }
}
//把消息转换成Html
function convertMsgtoHtml (msg) {
    let html = "", elems, elem, type, content;
    elems = msg.getElems(); //获取消息包含的元素数组
    let count = elems.length;
    for (let i = 0; i < count; i++) {
        elem = elems[i];
        type = elem.getType(); //获取元素类型
        content = elem.getContent(); //获取元素对象
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                let eleHtml = convertTextMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                if (i <= count - 2) {
                    let customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
                    let imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
                    html += convertImageMsgToHtml(content, imgName);
                    i++; //下标向后移一位
                } else {
                    html += convertImageMsgToHtml(content);
                }
                break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
                // html += convertSoundMsgToHtml(content);
                html += convertSoundMsgToAMRPlayer(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.LOCATION:
                html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                var eleHtml = convertCustomMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                var eleHtml = convertGroupTipMsgToHtml(content);
                //转义，防XSS
                html += webim.Tool.formatText2Html(eleHtml);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
    }
    if (html.indexOf("<p>") === -1) {
        html = '<div class="video-sms-text"><div class="message-inner">' + html + '</div></div>'
    }
    //return html;
    return webim.Tool.formatHtml2Text(html);
}
//解析文本消息元素
function convertTextMsgToHtml (content) {
    return content.getText();
}
//解析表情消息元素
function convertFaceMsgToHtml (content) {
    let faceUrl = null;
    let data = content.getData();
    let index = webim.EmotionDataIndexs[data];

    let emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
        faceUrl = emotion[1];
    }
    if (faceUrl) {
        return "<img width=28 height=28 src='" + faceUrl + "'/>";
    } else {
        return data;
    }
}
//解析图片消息元素
function convertImageMsgToHtml (content, imageName) {
    let smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
    let bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
    let oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
    if (!bigImage) {
        bigImage = smallImage;
    }
    if (!oriImage) {
        oriImage = smallImage;
    }
    return "<img class='smallImage' width='80' name='" + imageName + "' src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' alt='' />";
}

//自定义图片消息点击放大
$(document).on("click", ".smallImage", function () {
    let imgSrc = $(this).attr("src");
    let chat = document.getElementById("chat");
    let maxImgBox = document.createElement("div");
    maxImgBox.setAttribute('class', 'max-img-box');
    let bigImg = document.createElement("img");
    bigImg.setAttribute('src', imgSrc);
    bigImg.setAttribute('class', 'bigImg');
    maxImgBox.appendChild(bigImg);
    let cancel = document.createElement("div");
    cancel.setAttribute('class', 'cancel');
    cancel.setAttribute('id', 'cancel');
    cancel.innerText = "关闭";
    maxImgBox.appendChild(cancel);
    chat.appendChild(maxImgBox);
});

//关闭大图
$(document).on("click", ".max-img-box .cancel", function () {
    console.log("退出大图");
    console.log($(this));
    $('.max-img-box').remove();
});

/**
 * @uses amr音频信息转使用amr.js播放
 * @param {Object} content
 */
function convertSoundMsgToAMRPlayer (content) {
    let convertSoundMsgToAMRPlayerLoadBenzAMRRecorderRetryCount = 0;  //变量取长一点， 防止重复
    //因为BenzAMRRecorder文件比较大， 加载时间比较长， 这里重试三次。防止失败
    if (typeof BenzAMRRecorder == 'undefined') {
        if (convertSoundMsgToAMRPlayerLoadBenzAMRRecorderRetryCount <= 3) {
            stouTimeout(function () {
                convertSoundMsgToAMRPlayerLoadBenzAMRRecorderRetryCount++;
                convertSoundMsgToAMRPlayer(content)
            }, 500);
            return;
        }
    }
    var iconStartChar = '&nbsp;&nbsp;&#9658;&nbsp;&nbsp;';
    var btnid = ['amrplay_btn_', content.uuid, '-', Math.round(Math.random() * 1000000)].join('');
    var aElmentString = ['<button id="', btnid, '" style="font-size:1.5em;" data-url="', content.downUrl, '">', iconStartChar, '</button>'].join('');
    setTimeout(function () {
        convertSoundMsgToAMRPlayerLoadBenzAMRRecorderRetryCount = 0;
        var btelm = document.getElementById(btnid);
        btelm.onclick = function (event) {
            var amr = new BenzAMRRecorder();
            var seed = null;
            amr.onPlay(function () {
                let arr = ['&#9744;', '&#9744;', '&#9744;', '&#9744;', '&#9744;'];
                var count = 0;
                seed = setInterval(function () {
                    arr = ['&#9744;', '&#9744;', '&#9744;', '&#9744;', '&#9744;'];
                    arr[count % arr.length] = '&#9635;';
                    event.target.innerHTML = arr.join('');
                    count++;
                }, 90)
            });
            amr.onStop(function () {
                clearInterval(seed);
                event.target.innerHTML = iconStartChar;
            });
            amr.initWithUrl(content.downUrl).then(function () {
                amr.play();
            });
        }
    }, 0);
    return aElmentString;
}
//解析文件消息元素
function convertFileMsgToHtml (content) {
    var fileSize, unitStr;
    fileSize = content.getSize();
    unitStr = "Byte";
    if (fileSize >= 1024) {
        fileSize = Math.round(fileSize / 1024);
        unitStr = "KB";
    }
    // return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + unitStr + ')</i></a>';

    // return '<a href="javascript:;" onclick=\'webim.onDownFile("' + content.uuid + '")\' title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.name + '(' + fileSize + unitStr + ')</i></a>';
    return '<a href="' + content.downUrl + '" target="' + content.name + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.name + '(' + fileSize + unitStr + ')</i></a>';
}
//解析位置消息元素
function convertLocationMsgToHtml (content) {
    return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
}
//解析自定义消息元素
function convertCustomMsgToHtml (content) {
    let data = content.getData(); //自定义数据
    let desc = content.getDesc(); //描述信息
    let ext = content.getExt(); //扩展信息
    return "data=" + data + ", desc=" + desc + ", ext=" + ext;
}
//解析群提示消息元素
function convertGroupTipMsgToHtml (content) {
    var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    var text = "";
    var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    var opType, opUserId, userIdList;
    var groupMemberNum;
    opType = content.getOpType(); //群提示消息类型（操作类型）
    opUserId = content.getOpUserId(); //操作人id
    switch (opType) {
        case webim.GROUP_TIP_TYPE.JOIN: //加入群
            userIdList = content.getUserIdList();
            //text += opUserId + "邀请了";
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text = text.substring(0, text.length - 1);
            text += "加入该群，当前群成员数：" + content.getGroupMemberNum();
            break;
        case webim.GROUP_TIP_TYPE.QUIT: //退出群
            text += opUserId + "离开该群，当前群成员数：" + content.getGroupMemberNum();
            break;
        case webim.GROUP_TIP_TYPE.KICK: //踢出群
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "踢出该群";
            break;
        case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
            text += opUserId + "将";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "设为管理员";
            break;
        case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
            text += opUserId + "取消";
            userIdList = content.getUserIdList();
            for (var m in userIdList) {
                text += userIdList[m] + ",";
                if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + userIdList.length + "人";
                    break;
                }
            }
            text += "的管理员资格";
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
            text += opUserId + "修改了群资料：";
            var groupInfoList = content.getGroupInfoList();
            var type, value;
            for (var m in groupInfoList) {
                type = groupInfoList[m].getType();
                value = groupInfoList[m].getValue();
                switch (type) {
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                        text += "群头像为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                        text += "群名称为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                        text += "群主为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                        text += "群公告为" + value + "; ";
                        break;
                    case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                        text += "群简介为" + value + "; ";
                        break;
                    default:
                        text += "未知信息为:type=" + type + ",value=" + value + "; ";
                        break;
                }
            }
            break;

        case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
            text += opUserId + "修改了群成员资料:";
            var memberInfoList = content.getMemberInfoList();
            var userId, shutupTime;
            for (var m in memberInfoList) {
                userId = memberInfoList[m].getUserId();
                shutupTime = memberInfoList[m].getShutupTime();
                text += userId + ": ";
                if (shutupTime != null && shutupTime !== undefined) {
                    if (shutupTime == 0) {
                        text += "取消禁言; ";
                    } else {
                        text += "禁言" + shutupTime + "秒; ";
                    }
                } else {
                    text += " shutupTime为空";
                }
                if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                    text += "等" + memberInfoList.length + "人";
                    break;
                }
            }
            break;
        default:
            text += "未知群提示消息类型：type=" + opType;
            break;
    }
    return text;
}

//显示历史消息
//获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息
function getLastC2CHistoryMsgs (selToID, chatheight) {

    console.log("获取聊天对象：", selToID);


    if (selType == webim.SESSION_TYPE.GROUP) {
        // alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
        return;
    }
    if (!selToID || selToID == '@TIM#SYSTEM') {
        // alert('当前的聊天id非法，selToID=' + selToID);
        return;
    }
    var lastMsgTime = 0; //第一次拉取好友历史消息时，必须传0
    var msgKey = '';
    var options = {
        'Peer_Account': selToID, //好友帐号
        'MaxCnt': reqMsgCount, //拉取消息条数
        'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
    };
    selSess = null;
    webim.MsgStore.delSessByTypeId(selType, selToID);
    webim.getC2CHistoryMsgs(
        options,
        function (resp) {
            var complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有

            if (resp.MsgList.length == 0) {
                webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
                return;
            }
            getPrePageC2CHistroyMsgInfoMap[selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
                'LastMsgTime': resp.LastMsgTime,
                'MsgKey': resp.MsgKey
            };

            let list = document.getElementById("video_sms_list");
            list.innerHTML = "";
            let msgList = resp.MsgList;
            getHistoryMsgCallback(msgList, chatheight);
        },
        function (e) {
            console.log("错误消息列表展示1", e);
        }
    );
}
//向上翻页，获取更早的好友历史消息
function getPrePageC2CHistoryMsgs (selToID, chatheight) {
    if (selType == webim.SESSION_TYPE.GROUP) {
        // alert('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
        return;
    }
    let tempInfo = getPrePageC2CHistroyMsgInfoMap[selToID]; //获取下一次拉取的c2c消息时间和消息Key
    let lastMsgTime;
    let msgKey;
    if (tempInfo) {
        lastMsgTime = tempInfo.LastMsgTime;
        msgKey = tempInfo.MsgKey;
    } else {
        alert('获取下一次拉取的c2c消息时间和消息Key为空');
        return;
    }
    let options = {
        'Peer_Account': selToID, //好友帐号
        'MaxCnt': reqMsgCount, //拉取消息条数
        'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': msgKey
    };
    webim.getC2CHistoryMsgs(
        options,
        function (resp) {
            var complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
            if (resp.MsgList.length == 0) {
                webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
                return;
            }
            getPrePageC2CHistroyMsgInfoMap[selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
                'LastMsgTime': resp.LastMsgTime,
                'MsgKey': resp.MsgKey
            };
            //let list = document.getElementById("video_sms_list");
            //list.innerHTML = "";
            let msgList = resp.MsgList;
            getHistoryMsgCallback(msgList, chatheight, true);
        },
        function (e) {
            console.log("显示错误2：", e);
        }
    );
}
//遍历展示消息以及历史消息内容
function getHistoryMsgCallback (msgList, chatHeight, prePage) {
    let msg;
    prePage = prePage || false;

    //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
    if (prePage) {
        msgList.reverse();
    }
    for (let j in msgList) { //遍历新消息
        msg = msgList[j];
        if (msg.getSession().id() === selToID) { //为当前聊天对象的消息
            selSess = msg.getSession();
            addOneMsg(msg, chatHeight, prePage);
        }
    }
    webim.setAutoRead(selSess, true, true);
}
//设置私聊当前用户信息
function setSendUser (userInfo) {
    sendUser = userInfo;  //获取聊天对象内容
    console.log("=========设置当前用户信息======");
    console.log(userInfo);
}
//设置私聊对方用户信息
function setToUser (userInfo) {
    toUser = userInfo;             //获取聊天对象内容
    selToID = userInfo.identifier; //得到当前聊天对象ID
    console.log("=========设置发送者用户信息======");
    console.log(userInfo);
}
//时间格式处理
function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}
//初始化表情
function initEmotionUL (that) {
    //console.log("显示表情1");
    //return;
    console.log("显示表情2", webim.Emotions);
    for (let index in webim.Emotions) {
        let emotions = $('<img>').attr({
            "id": webim.Emotions[index][0],
            "src": webim.Emotions[index][1],
            "style": "cursor:pointer; width:28px;"
        }).click(function () {
            selectEmotionImg(this, that);
        });
        $('<li>').append(emotions).appendTo($('#emotionUL'));
    }
}
//选中表情
function selectEmotionImg (selImg, that) {
    let selectEm = $("#send_msg_text textarea");
    selectEm.val(selectEm.val() + selImg.id);
    that.chatMsg = selectEm.val();
}
//打开或显示表情
function showEmotionDialog () {
    if (openEmotionFlag) { //如果已经打开
        openEmotionFlag = false;
        hideDiscussEmotion(); //关闭
        $('.barrage').css("height", "calc(100vh - 1.5rem)");
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight())
    } else { //如果未打开
        openSendBottomFlag = false;
        hideDiscussSendBottom();//关闭图片和视频发送框
        openEmotionFlag = true;
        showDiscussEmotion(); //打开
        // initEmotionUL();
        $('.barrage').css("height", "calc(100vh - 4.5rem)");
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight())
    }
}
//隐藏表情框
function hideDiscussEmotion () {
    $(".video-discuss-emotion").hide();
    //$(".video-discuss-emotion").fadeOut("slow");
}
//显示表情框
function showDiscussEmotion () {
    $(".video-discuss-emotion").show();
    //$(".video-discuss-emotion").fadeIn("slow");
}
//隐藏评论文本框
function hideDiscussForm () {
    $(".video-discuss-form").hide();
}
//隐藏图片和视频上传框
function hideDiscussSendBottom () {
    $(".send-bottom").hide();
}
//显示评论工具栏
function showDiscussTool () {
    $(".video-discuss-tool").show();
}

//打开或显示自定义图片和视频发送框
function showCustomDialog () {
    if (openSendBottomFlag) { //如果已经打开
        openSendBottomFlag = false;
        hideDiscussSendBottom(); //关闭
        $('.barrage').css("height", "calc(100vh - 1.5rem)")
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight())
    } else { //如果未打开
        openEmotionFlag = false;
        hideDiscussEmotion();//关闭表情发送框
        openSendBottomFlag = true;
        showDiscussSendBottom(); //打开
        $('.barrage').css("height", "calc(100vh - 3rem)")
        $("#scrollList").scrollTop($("#video_sms_list").outerHeight())
    }

}
//显示图片和视频上传框
function showDiscussSendBottom () {
    $(".send-bottom").show();
    $('.barrage').css("height", "calc(100vh - 3rem)")
}

function sendMsgToImage (file) {
    console.log("发送图片信息：", file);
    //var uploadFiles = document.getElementById('upd_pic');
    //var file = uploadFiles.files[0];
    let businessType; //业务类型，1-发群图片，2-向好友发图片
    if (selType === webim.SESSION_TYPE.C2C) { //向好友发图片
        businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
    } else if (selType === webim.SESSION_TYPE.GROUP) { //发群图片
        businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
    }
    //封装上传图片请求
    let opt = {
        'file': file, //图片对象
        'onProgressCallBack': onProgressCallBack, //上传图片进度条回调函数
        //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
        'To_Account': selToID, //接收者
        'businessType': businessType //业务类型
    };
    //上传图片
    webim.uploadPic(opt,
        function (resp) {
            //上传成功发送图片
            sendPic(resp, file.name);
        },
        function (err) {
            // alert(err.ErrorInfo);
        }
    );
}
//发送图片消息
function sendPic (images, imgName) {
    console.debug('发送图片名称：', imgName);
    if (!selToID) {
        // alert("您还没有好友，暂不能聊天");
        return;
    }
    if (!selSess) {
        var selSess = new webim.Session(selType, selToID, selToID, friendHeadUrl, Math.round(new Date().getTime() / 1000));
    }
    var msg = new webim.Msg(selSess, true, -1, -1, -1, sendUser.identifier, 0, sendUser.identifierNick);

    console.debug(imgName.split(".")[1]);
    var images_obj = new webim.Msg.Elem.Images(images.File_UUID, imgName.split(".")[1]);
    for (var i in images.URL_INFO) {
        var img = images.URL_INFO[i];
        var newImg;
        var type;
        switch (img.PIC_TYPE) {
            case 1: //原图
                type = 1; //原图
                break;
            case 2: //小图（缩略图）
                type = 3; //小图
                break;
            case 4: //大图
                type = 2; //大图
                break;
        }
        newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
        images_obj.addImage(newImg);
    }
    msg.addImage(images_obj);
    //if(imgName){
    //    var data=imgName;//通过自定义消息中的data字段保存图片名称
    //    var custom_obj = new webim.Msg.Elem.Custom(data, '', '');
    //    msg.addCustom(custom_obj);
    //}
    //调用发送图片消息接口
    webim.sendMsg(msg, function (resp) {
        if (selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            addOneMsg(msg);
        }
    }, function (err) {
        // alert(err.ErrorInfo);
    });
}
//上传图片进度条回调函数
//loadedSize-已上传字节数
//totalSize-图片总字节数
function onProgressCallBack (loadedSize, totalSize) {
    //let progress = document.getElementById('upd_progress'); //上传图片进度条
    //progress.value = (loadedSize / totalSize) * 100;
    console.log("上传进度：", (loadedSize / totalSize) * 100);
}


export {
    loginWebIm,
    onSendMsg,
    initRecentContactList,
    getLastC2CHistoryMsgs,
    getPrePageC2CHistoryMsgs,
    setSendUser,
    setToUser,
    showEmotionDialog,
    initEmotionUL,
    showCustomDialog,
    sendMsgToImage,
    initUnreadMsgCount,
    hideDiscussSendBottom,
    unreadNum
}
