<template>
  <div class="app-chart">
    <div class="app-chart__wrapper">
      <div class="app-chart__row d-flex">
        <div class="app-chart__col">
          <div class="app-chart__col-inner">
            <div class="app-chart-header">
              <div class="app-chart__cell"
                v-for="(interval, idx) of intervalList" v-bind:key="idx"
              >
                <div class="h-100 d-flex flex-direction-column justify-content-flex-end">
                  <span class="app-chart-text_sub">{{ interval }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="app-chart__col flex-basis-auto flex-grow-1">
          <div class="app-chart__col-inner">
            <div class="app-chart-main">
              <div class="app-chart-main-grid position-relative">
                <div class="app-chart-main-grid__wrapper"
                  v-bind:style="{
                    'padding-left': `${ paddingSide }px`,
                    'padding-right': `${ paddingSide }px`
                  }"
                >
                  <div class="app-chart__cell"
                    v-for="(interval, idx) of intervalList" v-bind:key="idx"
                  >
                    <div class="h-100 d-flex flex-direction-column justify-content-flex-end"
                      v-if="idx !== ( intervalList.length - 1 )"
                    >
                      <div class="app-chart-divider_dashed"></div>
                    </div>
                  </div>
                </div>

                <div class="app-chart-background position-absolute top-0 left-0 h-100 w-100"
                  v-bind:style="{
                    'padding-left': `${ paddingSide }px`,
                    'padding-right': `${ paddingSide }px`,
                    'padding-bottom': `${ paddingTop }px`
                  }"
                >
                  <div class="app-chart-background-color h-100 w-100"
                    v-bind:style="{ 'clip-path': clipPathBackground }"
                  ></div>
                </div>

                <svg class="position-absolute top-0 left-0 h-100 w-100"
                  ref="chartSvg"
                >
                  <polyline
                    fill="none"
                    stroke="#52C1BA"
                    stroke-width="2"
                    v-bind:points="linePoints"
                  />
                </svg>
              </div>
            </div>

            <div class="app-chart-divider"></div>
            
            <div class="app-chart-footer">
              <div class="app-chart-footer__wrapper">
                <div class="app-chart-footer__row d-flex justify-content-space-between">
                  <div class="app-chart-footer__col"
                    v-for="(mark, idx) of markList" v-bind:key="idx"
                  >
                    <div class="app-chart-footer__col-inner">
                      <span class="app-chart-text_sub">{{ mark }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import useAppChart from './main'
  import { paddingSide, paddingTop } from './options'

  export default {
    setup() {
      const { markList, intervalList, clipPathBackground, linePoints, chartSvg } = useAppChart()
      return {
        paddingSide, paddingTop,
        markList, intervalList, clipPathBackground, linePoints, chartSvg
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./main";
</style>