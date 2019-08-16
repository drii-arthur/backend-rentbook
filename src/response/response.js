const crypto = require('crypto')

module.exports = {
    respon: (res, result, status, error, jumlah) => {
        let resultPrint = {}
        resultPrint.error = error || null
        resultPrint.result = result
        resultPrint.status_code = status || 200
        resultPrint.jumlah = jumlah

        return res.status(resultPrint.status_code).json(resultPrint)
    }

}