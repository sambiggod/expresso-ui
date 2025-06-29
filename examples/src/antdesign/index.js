import Message from "./message"

export default {
  install(app) {
    app.config.globalProperties['$message'] = Message
  }
}
