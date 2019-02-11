import './AppBody.scss'
import BScroll from 'better-scroll'

export default {
    template: `<main>
                    <div class="wrapper">
                        <div v-if="pulldown" class="pull_down_tips">下拉刷新...</div>
                        <slot></slot>
                    </div>
                </main>`,
    data() {
        return {
            scroll: null
        }
    },
    props: {
        pulldown: {
            type: Boolean,
            default: false
        },
        pullup: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.$nextTick(() => {
            setTimeout(() => {
                if (!this.scroll) {
                    let pullDownRefresh = this.pulldown ? {
                        threshold: 60,
                        stop: 60
                    } : false;
                    let pullUpLoad = this.pullup ? {
                        threshold: 30
                    } : false;
                    this.scroll = new BScroll('main', {
                        scrollY: true,
                        click: true,
                        // preventDefault: false,
                        pullDownRefresh,
                        pullUpLoad
                    });
                    if (this.pulldown) {
                        this.scroll.on('pullingDown', () => {
                            this.$emit('pulldown');
                        });
                    }
                    if (this.pullup) {
                        this.scroll.on('pullingUp', () => {
                            this.$emit('pullup');
                        });
                    }
                } else {
                    this.scroll.refresh();
                }
            }, 60);
        });
    },
    updated() {
        let $this = this;
        this.scroll.refresh();
        if (this.pulldown) {
            this.scroll.finishPullDown();
        }
        if (this.pullup) {
            this.scroll.finishPullUp();
        }
        let imgs = document.getElementsByTagName('img');
        if (imgs) {
            [].forEach.call(imgs, function (item, index) {
                item.onload = function () {
                    $this.scroll.refresh();
                }
            });
        }
    }
}