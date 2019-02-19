import {swiperSlide} from 'vue-awesome-swiper'

export default {
    template: `<swiper-slide><slot></slot></swiper-slide>`,
    components: {
        swiperSlide
    }
};