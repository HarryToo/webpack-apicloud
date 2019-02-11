import './AppBanner.scss'
import BScroll from 'better-scroll'

function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className)
}

function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export default {
    template: `<div class="slider" ref="slider">
                    <div class="slider-group" ref="sliderGroup">
                        <slot></slot>
                    </div>
                    <div v-if="showDot" class="dots">
                        <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
                    </div>
                </div>`,
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 2500
        },
        showDot: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() { // 完成挂载
        setTimeout(() => {
            this._setSliderWidth();
            this._initDots();
            this._initSlider();

            if (this.autoPlay) {
                this._play()
            }
        }, 60);

        window.addEventListener('resize', () => {
            if (!this.slider) { // slider还没有初始化的时候
                return
            }
            this._setSliderWidth(true);
            this.slider.refresh() // 宽度发生变化则重新计算
        })
    },
    methods: { // 方法
        _setSliderWidth(isResize) { // 计算宽度
            this.children = this.$refs.sliderGroup.children;

            let width = 0;
            let sliderWidth = this.$refs.slider.clientWidth;
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                addClass(child, 'slider-item');
                child.style.width = sliderWidth + 'px';
                width += sliderWidth
            }
            if (this.loop && !isResize) { // 如果是轮播图&&如果是resize的情况下
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initDots() { // 初始化点的数量
            this.dots = new Array(this.children.length) // 长度根据节点length
            // console.log(this.children.length)
        },
        _initSlider() { // 初始化
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true, // 滚动方向
                scrollY: false,
                momentum: false, // 当快速滑动时是否开启滑动惯性
                snap: { // 为slider组件使用
                    loop: this.loop, // 是否无缝循环轮播
                    threshold: 0.3, // 用手指滑动时页面可切换的阀值，大于这个阀值时可以滑动到下一页
                    speed: 400 // 轮播图切换的动画时间
                }
            });

            this.slider.on('scrollEnd', () => { // 派发scrollEnd事件,获取当前页currentPageIndex
                let pageIndex = this.slider.getCurrentPage().pageX; // 获取索引
                // console.log(pageIndex)
                /*  if (this.loop) { // 如果是循环
                    pageIndex += 0 // 因为循环模式下默认会节点拷贝了，所以实际index 应该 -1
                 } */
                this.currentPageIndex = pageIndex; // 赋值给当前currentPageIndex

                if (this.autoPlay) { // 判断如果是自动轮播
                    clearTimeout(this.timer);
                    this._play()
                }
            })
        },
        _play() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.slider.next() // 下一个
            }, this.interval);
        }
    }
}