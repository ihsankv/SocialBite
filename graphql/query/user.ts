import {graphql} from "../../gql";
export const verifyUserGoogleTokenQuery = graphql(`
        #graphql
         query VerifyUserGoogleToken($token: String!) {
            verifyGoogleToken(token: $token)
        }
`)

// import { graphql } from "graphql";

// export const verifyUseGoogleTokenQuery = graphql{`
//         #graphql
//         query VerifyUserGoogleToken($token: String!) {
//             verifyGoogleToken(token: $token)
//         }
// `};