/** 
 * 封装对本地存储的操作
*/
export default {
    get(key) {
        return window.localStorage.getItem(key)
    },
    set(key, value) {
        return window.localStorage.setItem(key, value)
    },
    remove(key) {
        return window.localStorage.removeItem(key)
    }
}

