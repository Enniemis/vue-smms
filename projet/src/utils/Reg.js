/***
 * 正则表达式
 */

export function pwdReg (value){
   const reg=  /^[a-zA-Z0-9_]{3,6}$/;;
   return reg.test(value);
}