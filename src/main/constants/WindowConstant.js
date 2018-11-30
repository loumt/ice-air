/**
 * 窗口配置
 */
export default {
  OPEN_DEV_TOOLS: false, //replace by NODE_ENV === 'development'
  HIDE_MENU: false,
  WINDOW_CONFIG: {
    TITLE: 'Cloud-App',
    SHOW_THUMBNAIL: false,
    MIN_HEIGHT: 600,
    MIN_WIDTH: 800
  },
  TRAY: {
    TOOLTIP: 'CloudApp'
  },
  TRAY_WINDOW: {
    x: 0,
    y: 0,
    width: 400,
    height: 300,
    show: true,
    frame: true,
    resizable: false
  }
}