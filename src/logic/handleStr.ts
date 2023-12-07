
/**
 * 
 * @param str 收一个字符串将首字母大写返回
 * @returns 返回处理后的字符串
 */
export function toUpperCaseFrist(str:string):string{
    return str.charAt(0).toUpperCase() + str.slice(1);
}