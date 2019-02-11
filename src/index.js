export default {
    apiready() {
        api.openFrameGroup({
            name: 'home_body_group',
            scrollEnabled: false,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: api.winHeight - (api.safeArea.bottom + 50)
            },
            frames:
                [
                    {
                        name: 'home_body_1',
                        url: app.resolvePath('home/home_body/home_body_1')
                    },
                    {
                        name: 'home_body_2',
                        url: app.resolvePath('home/home_body/home_body_2')
                    }
                ]
        }, function (ret, err) {
        });
        api.openFrame({
            name: 'navigation_bar',
            url: app.resolvePath('home/navigation_bar'),
            rect: {
                x: 0,
                y: api.winHeight - (api.safeArea.bottom + 50),
                w: 'auto',
                h: api.safeArea.bottom + 50
            },
            bgColor: '#fff'
        });
    }
};