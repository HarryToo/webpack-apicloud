import './home_body_1.scss'
import {AppBody, AppHeader, AppButton} from '@/components/basic'

export default {
    apiready() {
        let header = $api.dom('header');
        $api.fixStatusBar(header);
        vm.getData();
    },
    vm: new Vue({
        el: '#view',
        data: {
            labels: [],
            num: 0,
            text: 'DOM更新前'
        },
        components: {
            AppBody,
            AppHeader,
            AppButton
        },
        methods: {
            async getData() {
                try {
                    let {errorcode, labels} = await req.home.getTestList({
                        data: {
                            uid: '1'
                        }
                    });
                    if (errorcode === 1) {
                        this.labels = labels;
                    }
                } catch (e) {
                }
            },
            async loadMore() {
                try {
                    let {errorcode, labels} = await req.home.getTestList({
                        data: {
                            uid: '1'
                        }
                    });
                    if (errorcode === 1) {
                        this.labels = this.labels.concat(labels);
                    }
                } catch (e) {
                }
            },
            openAboutWin() {
                api.openWin({
                    name: 'about',
                    url: app.resolvePath('about'),
                    pageParam: {
                        num: 123
                    }
                });
            }
        }
    })
}