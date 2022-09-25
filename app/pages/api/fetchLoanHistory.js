const axios = require("axios")

const getLoanHistory = async()=>{
    const loanHistory = await axios.post(
        'https://api.studio.thegraph.com/query/35243/loanyee/0.3.0',
        {
            query:`
            {
                loanHistories(first: 5) {
                  id
                  interestRate
                  borrowAmount
                  interestRate
                  paybackMonths
                  borrower
                }
            }
            `
        }
    )
    return loanHistory

}

export default getLoanHistory