import _ from 'lodash'
import Vue from '$vue'
import {API_ROOT} from '@/config/config'

/**
 * @methodOf ajax请求参数处理
 * @param url {string} 接口后缀
 * @param option {Object} 请求参数
 * @returns {Object}
 */
function ajaxParamHandle(url, option) {
    let opt = {
        url: url.indexOf('http') === 0 ? url : API_ROOT + url,
        method: 'post',
        timeout: 15
    };
    if (option) {
        if (option.method) {
            opt.method = option.method;
        }
        if (option.data || option.files) {
            opt.data = {};
            if (option.data) {
                opt.data.values = option.data;
                option.data = null;
            }
            if (option.files) {
                opt.data.files = option.files;
                option.files = null;
            }
        }
        opt = _.merge(option, opt);
    }
    return opt;
}

/**
 * @methodOf ajax请求封装
 * @param url {string} 接口后缀
 * @param option {Object} 请求参数
 * @returns {Promise<any>}
 */
export const ajax = (url, option) => {
    let opt = ajaxParamHandle(url, option);
    return new Promise((resolve, reject) => {
        api.showProgress({
            title: '加载中',
            text: '请稍等'
        });
        api.ajax(opt, function (ret, err) {
            api.hideProgress();
            if (ret) {
                resolve(ret);
            } else {
                app.toast('请求失败，请稍后再试');
                reject(err);
            }
        });
    });
};

// 图片缓存指令（开发环境下不启用）
Vue.directive('cache', function (ele, binding) {
    if (process.env.NODE_ENV === 'development') {
        ele.src = binding.value;
    } else {
        let url = binding.value;
        if (url && url.length) {
            api.imageCache({
                url: url
            }, function (ret, err) {
                if (ret && ret.status) {
                    ele.src = ret.url;
                }
            });
        }
    }
});
// Vue实例模板（预留接口）
export const Profile = Vue.extend({});