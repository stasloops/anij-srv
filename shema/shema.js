const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type UserResponse {
        user: User
        tokens: Tokens
        errors: Error
    }

    type User {
        id: ID
        status: String
        avatar: Avatar
        username: String
        password: String
    }

    type Avatar {
        lastModified: ID
        lastModifiedDate: String
        name: String
        size: Int
        type: String
        webkitRelativePath: String
    }

    type Tokens {
        refreshToken: String
        accessToken: String
    }

    type Error {
        code: Int!
        message: String
    }

    input UserInput {
        username: String!
        password: String!
    }

    input TokensInput {
        refreshToken: String
    }

    input UpdateInput {
        avatar: AvatarInput
        userid: String
    }

    input AvatarInput {
        lastModified: ID
        lastModifiedDate: String
        name: String
        size: Int
        type: String
        webkitRelativePath: String
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }

    type Mutation {
        update(input: UpdateInput): UserResponse
        logout(input: TokensInput): UserResponse
        refresh(input: TokensInput): UserResponse
        registration(input: UserInput): UserResponse
        login(input: UserInput): UserResponse
    }
    
`)

module.exports = schema
