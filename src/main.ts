import { createApp } from "vue"
import "@/assets/styles/reset.scss"
import "@/assets/styles/global.scss"
import router from "./router/index"
import "amfe-flexible/index.js"
import { createPinia } from "pinia"
import App from "./App.vue"

const pinia = createPinia()
const app = createApp(App)
const requireComponent = import.meta.glob("./components/*.vue")
Object.keys(requireComponent).forEach((fileName: any) => {
  const componentName: string | undefined = (<string>(
    fileName.split("/").pop()
  )).replace(/\.\w+$/, "")
  if (<string>componentName) {
    app.component(componentName, fileName.default)
  }
})
app.use(router).use(pinia).mount("#app")
