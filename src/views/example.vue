<template>
  <DDR onResize={this.handleResize} onRotate={this.handleRotate} onDrag={this.handleDrag} value={this.transform}>
        <div style="width:100%;height:100%">child</div>
    </DDR>
</template>

<script>
import DDR from 'yoyoo-ddr'
import 'yoyoo-ddr/dist/yoyoo-ddr.css'
export default {
data() {
    return {
      transform: { x: 100, y: 100, width: 100, height: 100, rotation: 0 },
    }
  },
  methods: {
    handleDrag(event, transform) {
      this.transform = transform
    },
    handleResize(event, transform) {
      this.transform = transform
    },
    handleRotate(event, transform) {
      this.transform = transform
    },
  },
}
</script>

<style>

</style>