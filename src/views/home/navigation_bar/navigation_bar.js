import './navigation_bar.scss'

export default {
    navBarHandle(index) {
        $api.removeCls($api.dom('ul li.active'), 'active');
        $api.addCls($api.dom(`ul li:nth-child(${index + 1})`), 'active');
        api.setFrameGroupIndex({
            name: 'home_body_group',
            index: index
        });
    }
}
