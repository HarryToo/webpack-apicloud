import './home_body_2.scss'
import {AppBody, AppHeader, AppButton, AppSwiper, AppSlide, AppRuler} from '@/components/basic'

export default {
    apiready() {
        let header = $api.dom('header');
        $api.fixStatusBar(header);
    },
    vm: new Vue({
        el: '#view',
        data: {
            rulerValue: 5000,
            pickerData1: ['撒大苏打','夫士大夫'],
            pickerValue1: '撒大苏打',
            pickerData2: ['大师傅但','第三方的'],
            pickerValue2: '大师傅但'
        },
        components: {
            AppHeader,
            AppBody,
            AppButton,
            AppSwiper,
            AppSlide,
            AppRuler
        },
        methods: {
            test() {
                app.toast('vue标题栏组件');
            },
            rulerChange(e){
                this.rulerValue = e;
            },
            dialog() {
                app.alert({
                    title: '提示',
                    content: '弹窗内容',
                    btn: ['确定', '取消'],
                    btnColor: ['#FF8E3C', '#999'],
                    cb: [
                        function () {
                            app.toast('点击确定');
                        },
                        function () {
                            app.toast('点击取消');
                        }
                    ]
                })
            },
            picker1(){
                let $this = this;
                app.picker({
                    name: 'one',
                    data: $this.pickerData1,
                    active: $this.pickerData1.indexOf($this.pickerValue1),
                    cb: function (res) {
                        $this.pickerValue1 = res.value;
                    }
                });
            },
            picker2(){
                let $this = this;
                app.picker({
                    name: 'two',
                    data: $this.pickerData2,
                    active: $this.pickerData2.indexOf($this.pickerValue2),
                    cb: function (res) {
                        $this.pickerValue2 = res.value;
                    }
                });
            },
            change(e){
                console.log(e);
            }
        }
    })
}