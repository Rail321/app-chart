<template>
  <div class="container p-1">
    <view-chart-examples />
  </div>
  <div class="container_xxl p-1">
    <view-chart-examples />
  </div>
  <div class="container_xl p-1">
    <view-chart-examples />
  </div>
  <div class="container_lg p-1">
    <view-chart-examples />
  </div>
  <div class="container_md p-1">
    <view-chart-examples />
  </div>
  <div class="container_sm p-1">
    <view-chart-examples />
  </div>
  <div class="container_xs p-1">
    <view-chart-examples />
  </div>
</template>

<script>
  import ViewChartExamples from '@/views/ViewChartExamples'

  export default {
    components: { ViewChartExamples }
  }
</script>

<style lang="scss">
  @import "@/style";
</style>