export const Schema = [`
  # Declare custom scalars
  scalar Date

  # A group chat entity
  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User]! # users in the group
    messages: [Message] # messages sent to the group
  }

  # a user -- keep type straight forward for now
  type User {
    id: Int! # unique id for user
    email: String! # required email for each user
    username: String # optional username
    messages: [Message] # messages sent by user
    groups: [Group] # groups the user belongs to
    friends: [User] # user's friends/contacts
  }

  # a message sent from the user to the group
  type Message {
    id: Int! # unique id for message
    to: Group! # group message was sent int
    from: User! # user whom sent the message
    text: String! # message text (contents)
    createdAt: Date! # when the message was created
  }
`];

export default Schema;
