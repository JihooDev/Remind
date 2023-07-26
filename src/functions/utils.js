/**
 * @function sliceText
 * @param {string} text = 자를 문자열 
 * @param {number} length = 몇 글자 까지만 보이게 할지 설정하는 숫자
 * @returns {String} = ex. test...
 */
export const sliceText = (text, length = 10) => {
    if (text?.length > 10) {
        return `${text.slice(0, length)}...`
    } else {
        return `${text}`
    }
}