# ext_adityapathania_exercise

![](https://user-images.githubusercontent.com/89087450/177692942-05a00b72-f0c3-405a-82bf-2def76c20c1f.PNG)

## About

This is a code repository for Auth0 interview exercise.

Using React, Redux, Material UI, Node.js (Fastify) & MongoDB. The App is a simple quotes sharing app where the main views consist of quotes coming from an external API and authenticated users can post, edit, delete quotes.

Setup:

- run `npm i && npm start` for both client and server side to start the app

# Quotes API

**MongoDB connection string**: mongodb+srv://apathania:admin123@cluster0.9gwuc2f.mongodb.net/?retryWrites=true&w=majority

**Response**

```ts
{
  _id: string;
  // The full name of the author
  authorName: string;
  // The quotation text
  text: string;
}
```

**Examples**

Get all the quotes in the database [try in browser](http://localhost:8080/api/quotes)

```HTTP
GET /api/quotes
```

Get list of quotes of passed authorName [try in browser](http://localhost:8080/api/quotes?authorName=Mahatma Gandhi)

```HTTP
GET /api/quotes?authorName=Mahatma Gandhi
```

Get quote by given ID [try in browser](http://localhost:8080/api/quotes/62c39ee973fe5ef2935c4f9c)

```HTTP
GET /api/quotes/{id}
```

Create new quote [try in browser](http://localhost:8080/api/quotes)

```HTTP
POST /api/quotes
```

Edit quote of given ID. [try in browser](http://localhost:8080/api/quotes/62c39ee973fe5ef2935c4f9c)

```HTTP
PUT /api/quotes/{id}
```

Delete quote of given ID. [try in browser](http://localhost:8080/api/quotes/62c39ee973fe5ef2935c4f9c)

```HTTP
DELETE /api/quotes/{id}
```

<br>
