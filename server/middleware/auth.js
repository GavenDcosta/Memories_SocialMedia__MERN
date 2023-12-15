import jwt from 'jsonwebtoken'

//suppose we want to like a post 
//middlewares are like verifiers
// click the like button => auth middleware (next) => call the like controller 

const auth = async (req, res, next) => {
    try {  
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData

        if(token && isCustomAuth){         //for jwt token
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id
        }else{                              // for google token
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub    //sub is a google id that we can use to differentiate the users
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth