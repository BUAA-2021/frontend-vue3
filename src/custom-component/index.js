import * as Vue from 'vue'
const modules = import.meta.glob([
  './CircleShape/*.vue',
  './Picture/*.vue',
  './VText/*.vue',
  './VButton/*.vue',
  './Group/*.vue',
  './RectShape/*.vue',
  './LineShape/*.vue',
  './VTable/*.vue',
  './VCheckbox/*.vue',
  './svgs/SVGStar/*.vue',
  './svgs/SVGHexagon/*.vue',
  './svgs/SVGTriangle/*.vue',
])
export const componentInit = ()=>{
  const components = [
    'CircleShape',
    'Picture',
    'VText',
    'VButton',
    'Group',
    'RectShape',
    'LineShape',
    'VTable',
    'VCheckbox',
  ]
  console.log("modules",modules)
  const svgs = ['SVGStar', 'SVGTriangle','SVGHexagon']
  components.forEach((key) => {
    window.$vueApp.component(
      key,
      Vue.defineAsyncComponent(
        modules[`./${key}/Component.vue`]
      )
    )
    window.$vueApp.component(
      key + 'Attr',
      Vue.defineAsyncComponent(
        modules[`./${key}/Attr.vue`]
      )
    )
  })
  svgs.forEach((key) => {
    if(key=='SVGStar'){
      window.$vueApp.component(
        key,
        Vue.defineAsyncComponent(
          modules[`./svgs/SVGStar/Component.vue`]
        )
      )
    }
    if(key=='SVGTriangle'){
      window.$vueApp.component(
        key,
        Vue.defineAsyncComponent(
          modules[`./svgs/SVGTriangle/Component.vue`]
        )
      )
    }
    if(key=='SVGHexagon'){
      window.$vueApp.component(
        key,
        Vue.defineAsyncComponent(
          modules[`./svgs/SVGHexagon/Component.vue`]
        )
      )
    }
  })
}