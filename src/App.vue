<template>
  <div class="app_container">
    <div class="scroll_container" :style="{
      transform: 'translateX(' + translateX + 'px)',
      transition: transitionAble ? 'all 0.5s' : 'none'
    }">
      <div class="list" @touchstart="listTouchStart" @touchmove="listTouchMove" @touchend="listTouchEnd">
        <div class="list_item" :key="n" v-for="n in list">{{n}}</div>
      </div>
      <div class="scroll_load">
        <div class="load">
          <span :class="{ 'step': step > 0 }"></span>
          <span :class="{ 'step': step > 1 }"></span>
          <span :class="{ 'step': step > 2 }"></span>
        </div>
        <div class="text">{{ step !== 3 ? '查看更多' : '松手跳转' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import "./base.styl";
export default {
  name: 'ScroolRow',
  data() {
    return {
      initFlag: false,
      totalScroll: 0,
      startX: 0,
      translateX: 0,
      transitionAble: false,
      list: 6,
    };
  },
  created() {
  },
  mounted() {
    document.addEventListener('touchmove', this.contentTouchMove);
  },
  methods: {
    contentTouchMove(el) {
      el.preventDefault();
    },
    init(el) {
      if (!this.initFlag) {
        this.initFlag = true;
        this.totalScroll = el.currentTarget.scrollWidth;
      }
    },
    listTouchStart(el) {
      this.init(el);
      this.startX = 0;
      el.stopPro
    },
    listTouchMove(el) {
      const left = el.currentTarget.scrollLeft;
      const currentScroll = left + el.currentTarget.offsetWidth;
      if (currentScroll >= this.totalScroll) {
        this.transitionAble = false;
        if (this.startX === 0) {
          this.startX = el.touches[0].clientX;
        }
        const moveX = el.touches[0].clientX;
        const distanceX = moveX - this.startX;
        if (distanceX > 0) {
          this.translateX = 0;
        } else {
          this.translateX = distanceX;
        }
      }
    },
    listTouchEnd(el) {
      if (this.translateX !== 0) {
        if (this.translateX <= -160) {
          this.list = 10;
        }
        this.translateX = 0;
        this.transitionAble = true;
      }
    }
  },
  computed: {
    step: function() {
      if (this.translateX > -100) {
        return 1;
      }
      if (this.translateX > -160) {
        return 2;
      }
      return 3;
    }
  }
};
</script>


<style lang="stylus" scoped> 
.app_container{
  width 100%
  position relative
  padding-top 50px
  .scroll_container{
    width 100%
    height 100px
    box-sizing border-box
    padding-left 10px
    position relative
    .list{
      width 100%
      height 100px
      display flex 
      overflow-x auto
      overflow-y hidden
      flex-direction row 
      perspective 1000px
      &::-webkit-scrollbar{
        display: none
      }
      .list_item{
        flex none
        width 80px
        height 100px
        background-color #f40
        margin-right 10px
      }
    }
    .scroll_load{
      position absolute
      width 100px
      height 100%
      top 50%
      left 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      transform translate(0, -50%) 
      .load{
        width 40px
        height 40px
        background-color #999
        border-radius 50%
        display flex
        justify-content space-around
        align-items center
        span{
          width 6px
          height 6px
          border-radius 50%
          background-color #666
          &.step{
            background-color #fff  
          }
        }
      }
      .text{
        font-size 12px
        height 24px
        line-height 24px
      } 
    }
  }
}
</style>
