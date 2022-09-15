# be-social

An API using Mongoose where users can create and react to thoughts as well as add friends.

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
https://youtu.be/1yee-2vcTyE 

## Questions
[jcgcristel's GitHub](https://github.com/jcgcristel)

For additional questions, you can email me at [jcg.cristel@gmail.com](mailto:jcg.cristel@gmail.com.).

