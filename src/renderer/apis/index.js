import http from './http'

/**
 * Global Define Rule:
 *
 * -> 请求数据
 *
 * <- Promise对象
 */


/**
 * 用户登录
 * @param username <用户名>
 * @param password <MD5密码>
 *
 * @result Promise
 */
export function login(username, password) {
    return http.post('/login', {
        name: username,
        password: password
    })
}


/**
 * 应用参数接口
 * @param appId <应用ID>
 */
export function obtainApplicationParams(appId){
    // return http.get('')
}


