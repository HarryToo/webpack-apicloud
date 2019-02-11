import _ from 'lodash'

export default {
    /**
     * @methodOf 页面文件绝对路径解析
     * @param url {string}
     * @returns {string}
     */
    resolvePath(url) {
        let file_name = url.split('/').pop();
        let root;
        if (process.env.NODE_ENV === 'development') {
            root = `http://${LOCALHOST}:8888/views/`;
        } else {
            root = 'widget://dist/views/';
        }
        return `${root + url}/${file_name}.html`;
    },
    /**
     * @memberOf toast提示
     * @param msg {string}
     */
    toast(msg) {
        api.toast({
            msg: msg,
            location: 'middle',
            global: true
        });
    },
    /**
     * @methodOf 弹窗模块
     * @param option {Object} 选项参数
     */
    alert(option) {
        let opt = {
            title: '提示',
            content: '内容',
            btn: ['确定', '取消'],
            btnColor: ['#FF8E3C', '#999'],
            cb: []
        };
        let o = _.merge({}, opt, option);
        let dialogBoxModule = api.require('dialogBox');
        if (o.btn.length === 1) {
            // 单按钮
            dialogBoxModule.evaluation({
                styles: {
                    bg: '#fff',
                    w: 270,
                    corner: 4,
                    title: {
                        marginT: 20,
                        size: 16,
                        color: '#333',
                        bold: false
                    },
                    content: {
                        marginT: 8,
                        color: '#666',
                        size: 14
                    },
                    buttons: [{
                        marginB: 0,
                        marginL: 0,
                        w: 270,
                        h: 45,
                        bg: '#fff',
                        color: o.btnColor[0],
                        size: 16
                    }]
                },
                texts: {
                    title: o.title,
                    content: o.content,
                    buttons: [{text: o.btn[0]}]
                }
            }, function (ret, err) {
                if (ret) {
                    dialogBoxModule.close({
                        dialogName: 'evaluation'
                    });
                    o.cb[0] && o.cb[0]();
                }
            });
        } else {
            dialogBoxModule.alert({
                texts: {
                    title: o.title,
                    content: o.content,
                    leftBtnTitle: o.btn[0],
                    rightBtnTitle: o.btn[1]
                },
                styles: {
                    bg: '#fff',
                    w: 270,
                    corner: 4,
                    title: {
                        marginT: api.systemType === 'android' ? 18 : 10,
                        iconSize: 40,
                        titleSize: 16,
                        titleColor: '#333'
                    },
                    content: {
                        marginT: api.systemType === 'android' ? 15 : 0,
                        color: '#666',
                        size: 14
                    },
                    left: {
                        marginB: 0,
                        marginL: 0,
                        w: 135,
                        h: 45,
                        corner: 0,
                        bg: '#fff',
                        color: o.btnColor[0] || '#FF8E3C',
                        size: 16
                    },
                    right: {
                        marginB: 0,
                        marginL: 0,
                        w: 135,
                        h: 45,
                        corner: 0,
                        bg: '#fff',
                        color: o.btnColor[1] || '#999',
                        size: 16
                    },
                    horizontalLine: {
                        color: 'rgba(0,0,0,0.05)',
                        height: 1
                    },
                    verticalLine: {
                        color: 'rgba(0,0,0,0.05)',
                        width: 1
                    }
                }
            }, function (ret) {
                dialogBoxModule.close({
                    dialogName: 'alert'
                });
                if (ret.eventType == 'left') {
                    o.cb[0] && o.cb[0]();
                } else {
                    o.cb[1] && o.cb[1]();
                }
            });
        }
    },
    currIndex: null,
    currIndexArr: null,
    /**
     * @methodOf 选择器模块
     * @param option {Object} 选项参数（多个选择器时，请指定name区分）
     */
    picker(option) {
        let $this = this;
        let actionSelectorModule = api.require('UIActionSelector');
        if (document.querySelector('input:focus')) {
            document.querySelector('input:focus').blur();
        }
        let opt = {
            data: [],
            active: 0,
            name: '',
            cb: null
        };
        let o = _.merge({}, opt, option);
        if (o.data instanceof Array && o.data.length) {
            if (!o.active || o.active < 0) {
                o.active = 0;
            }
            if (!$this.currIndex) {
                if (o.name) {
                    if (!$this.currIndexArr) {
                        $this.currIndexArr = {};
                    }
                    $this.currIndexArr[o.name] = o.active;
                } else {
                    $this.currIndex = o.active;
                }
            }
            if (typeof o.data[0] === 'string' || typeof o.data[0] === 'number') {
                o.data = o.data.map(function (item) {
                    return {
                        name: item,
                        value: item
                    };
                });
            }
            actionSelectorModule.open({
                datas: o.data,
                layout: {
                    row: 5,
                    col: 1,
                    height: 40,
                    size: 15,
                    sizeActive: 18,
                    rowSpacing: 0,
                    colSpacing: 10,
                    maskBg: 'rgba(0,0,0,0.4)',
                    bg: '#fff',
                    color: api.systemType === 'ios' ? '#888' : '#C4C4C4',
                    colorActive: '#FF8E3C',
                    colorSelected: '#FF8E3C'
                },
                cancel: {
                    text: '取消',
                    size: 16,
                    w: 50,
                    h: 35,
                    bg: 'rgba(0,0,0,0)',
                    bgActive: 'rgba(0,0,0,0)',
                    color: '#999',
                    colorActive: '#999'
                },
                ok: {
                    text: '确定',
                    size: 16,
                    w: 50,
                    h: 35,
                    bg: 'rgba(0,0,0,0)',
                    bgActive: 'rgba(0,0,0,0)',
                    color: '#FF8E3C',
                    colorActive: '#FF8E3C'
                },
                title: {
                    text: '',
                    size: 16,
                    h: 45,
                    bg: '#E6E6E6',
                    color: '#999'
                },
                actives: [o.name ? $this.currIndexArr[o.name] : $this.currIndex],
                fixedOn: api.frameName
            }, function (ret, err) {
                if (ret.eventType === 'ok') {
                    o.data.forEach(function (item, index) {
                        if (item.name === ret.selectedInfo[0].name && item.value === ret.selectedInfo[0].value) {
                            if (o.name) {
                                $this.currIndexArr[o.name] = index;
                            } else {
                                $this.currIndex = index;
                            }
                        }
                    });
                    o.cb && o.cb(ret.selectedInfo[0]);
                }
            });
        }
    }
};