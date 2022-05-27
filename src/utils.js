import moment from "moment"
export const getZodiacRange = (day, month, year, sign) => {
    const date = moment(`${year}-${month}-${day}`)
    const checkDate = date.format("YYYY-MM-DD")
    // console.log(checkDate)
    if (sign === "aries"){
        if (moment(checkDate).isBetween(`${year}-03-21`, `${year}-04-19`))
        return true
        else
        return false
    }
    if (sign === "taurus"){
        if (moment(checkDate).isBetween(`${year}-04-20`, `${year}-05-20`))
        return true
        else
        return false
    }
    if (sign === "gemini"){
        if (moment(checkDate).isBetween(`${year}-05-21`, `${year}-06-20`))
        return true
        else
        return false
    }
    if (sign === "cancer"){
        if (moment(checkDate).isBetween(`${year}-06-21`, `${year}-07-22`))
        return true
        else
        return false
    }
    if (sign === "leo"){
        if (moment(checkDate).isBetween(`${year}-07-23`, `${year}-08-22`))
        return true
        else
        return false
    }
    if (sign === "virgo"){
        if (moment(checkDate).isBetween(`${year}-08-23`, `${year}-09-22`))
        return true
        else
        return false
    }
    if (sign === "libra"){
        if (moment(checkDate).isBetween(`${year}-09-23`, `${year}-10-22`))
        return true
        else
        return false
    }
    if (sign === "scorpio"){
        if (moment(checkDate).isBetween(`${year}-10-23`, `${year}-11-21`))
        return true
        else
        return false
    }
    if (sign === "sagittarius"){
        if (moment(checkDate).isBetween(`${year}-11-22`, `${year}-12-21`))
        return true
        else
        return false
    }
    if (sign === "capricorn"){
        if (moment(checkDate).isBetween(`${year}-12-22`, `${year}-01-19`))
        return true
        else
        return false
    }
    if (sign === "aquarius"){
        if (moment(checkDate).isBetween(`${year}-01-20`, `${year}-02-18`))
        return true
        else
        return false
    }
    if (sign === "pisces"){
        if (moment(checkDate).isBetween(`${year}-02-19`, `${year}-03-20`))
        return true
        else
        return false
    }
        
    
}