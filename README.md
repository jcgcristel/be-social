# be-social

An API using Mongoose where users can create and react to thoughts as well have friends.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Question](#questions)

## Dependencies
### Core
- Mongoose
- Express

    npm i mongoose express

## Usage
CRUD Schemas include:
- User
- Thought

Virtual Schema:
- Reaction

## Examples
### User

    // POST: /api/users
    {
        "username" : "myUsername",
        "email" : "myEmail" 
    }

### Thought

    // POST: /api/thoughts
    {
        "thoughtBody" : "My thoughts on the matter...",
        "username" : "myUsername"
    }

### Friends

    // POST: /api/users/:userId/friends/:friendId

### Reaction

    // POST: /api/thoughts/:thoughtId/reactions/
    // DEL: /api/thoughts/:thoughtId/reactions/:reactionId

### Demo
https://gentle-lake-33039.herokuapp.com/ 

## Questions
[jcgcristel's GitHub](https://github.com/jcgcristel)

For additional questions, you can email me at [jcg.cristel@gmail.com](mailto:jcg.cristel@gmail.com.).

