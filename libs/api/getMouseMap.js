import fs from "fs"
// 导入router路由middleware

export function getMouseMap() {
    return fs.readFileSync('public/images/mouse-color.svg', 'utf8')
}