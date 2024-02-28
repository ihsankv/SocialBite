import { graphql } from "../../gql";
export const verifyUserGoogleTokenQuery = graphql(`
        #graphql
         query VerifyUserGoogleToken($token: String!) {
            verifyGoogleToken(token: $token)
        }
`)

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
    }
}
`)
// import { graphql } from "graphql";

// export const verifyUseGoogleTokenQuery = graphql{`
//         #graphql
//         query VerifyUserGoogleToken($token: String!) {
//             verifyGoogleToken(token: $token)
//         }
// `};