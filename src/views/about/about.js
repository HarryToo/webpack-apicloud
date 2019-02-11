import './about.scss'
import {AppBody, AppHeader, AppButton} from '@/components/basic'

export default {
    apiready() {
        let header = $api.dom('header');
        $api.fixStatusBar(header);
        vm.param = api.pageParam;
    },
    vm: new Vue({
        el: '#view',
        components: {
            AppBody,
            AppHeader,
            AppButton
        },
        methods: {
            showParam() {
                alert(JSON.stringify(this.param));
            }
        }
    })
};