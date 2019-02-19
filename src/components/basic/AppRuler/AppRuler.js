import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './AppRuler.scss'

export default {
    template: `<div id="app_ruler">
                    <div class="indicator"></div>
                    <swiper :options="swiperOption" ref="mySwiper" @slideChange="slideChange">
                        <template v-for="item in scaleList">
                            <swiper-slide><div class="app_ruler_item" :style="{color}">{{item}}</div></swiper-slide>
                        </template>
                    </swiper>
               </div>`,
    data() {
        return {
            swiperOption: {
                slidesPerView: 7,
                centeredSlides: true
            },
            activeIndex: 3
        }
    },
    props: {
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 10
        },
        space: {
            type: Number,
            default: 1
        },
        quantity: {
            type: Number,
            default: 7
        },
        active: {
            type: Number,
            default: function () {
                return parseInt((this.max - this.min) / 2);
            }
        },
        color: {
            type: String,
            default: '#999'
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        scaleList() {
            let list = [];
            let start = this.min;
            let end = this.max;
            for (let i = start; i <= end; i++) {
                let n = i * this.space;
                list.push(n);
            }
            return list;
        }
    },
    beforeMount() {
        this.swiperOption.slidesPerView = this.quantity;
        this.swiperOption.initialSlide = this.active;
    },
    methods: {
        slideChange() {
            let value = this.swiper.wrapperEl.children[this.swiper.activeIndex].children[0].innerText;
            this.$emit('change', value);
        }
    }
};