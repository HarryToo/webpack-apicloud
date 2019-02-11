import {ajax} from '@/assets/util'

export default {
    //  所属功能模块:{
    //      接口1: function,
    //      接口2: function,
    //      ...
    //  }
    home: {
        getTestList(option) {
            return ajax('User/user_index', option);
        }
    }
}
