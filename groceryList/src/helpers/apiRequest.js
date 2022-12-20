export const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj)
        if (!response.ok) throw Error('Please reload the app,something went wrong')
    } catch (error) {
        errMsg = error.message
    } finally {
        return errMsg
    }
}