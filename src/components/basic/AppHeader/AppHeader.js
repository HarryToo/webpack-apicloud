import './AppHeader.scss'

export default {
    template: `<header :class="{'aui-bar': true, 'aui-bar-nav': true, 'border-bottom-1px': border}" :style="{color: color, background: bg}">
                    <a class="aui-pull-left aui-btn" @click="closeWin" v-if="back">
                        <span class="iconfont icon-back" :style="{color: color}"></span>
                    </a>
                    <div class="aui-title" :style="{color: color}"><slot></slot></div>
                    <a class="aui-pull-right aui-btn">
                        <slot name="menu"></slot>
                    </a>
                </header>`,
    props: {
        back: {
            type: Boolean,
            default: true
        },
        color: {
            type: String,
            default: '#333'
        },
        bg: {
            type: String,
            default: '#fff'
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        closeWin() {
            api.closeWin();
        }
    }
}