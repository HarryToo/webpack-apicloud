import {swiper} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
    template: `<swiper :options="swiperOption">
                   <slot></slot>
                   <div class="swiper-pagination" slot="pagination"></div>
              </swiper>`,
    components: {
        swiper
    },
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            default: function () {
                return {
                    delay: 2500,
                    disableOnInteraction: false
                }
            }
        },
        slideIndex: {
            type: Number,
            default: 0
        },
        slideCenter: {
            type: Boolean,
            default: false
        },
        slideView: {
            type: Number,
            default: 1
        },
        slideGroup: {
            type: Number,
            default: 1
        },
        slideSpace: {
            default: 0
        },
        pagination: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            swiperOption: {}
        }
    },
    beforeMount() {
        if (this.pagination) {
            this.swiperOption.pagination = {
                el: '.swiper-pagination'
            }
        }
        this.swiperOption.loop = this.loop;
        this.swiperOption.autoplay = this.autoPlay;
        this.swiperOption.initialSlide = this.slideCenter;
        this.swiperOption.centeredSlides = this.slideCenter;
        this.swiperOption.slidesPerView = this.slideView;
        this.swiperOption.slidesPerGroup = this.slideGroup;
        this.swiperOption.spaceBetween = this.slideSpace;
        console.log(this.swiperOption);
    }
};