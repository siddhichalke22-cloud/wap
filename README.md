# wap
# 📦 Watchlist API

A RESTful API that allows users to manage watchlists — including creating, updating, deleting, and moving items between watchlists.

---

## 🚀 Features

* Create and manage watchlists
* Add/remove items
* Move items between watchlists
* Reorder items
* Secure authentication

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB

---

## 📂 Base URL

```
http://localhost:3000/api
```

---

## 🔐 Authentication

This API uses JWT-based authentication.

Include the token in headers:

```
Authorization: Bearer <your_token>
```

---

## 📌 Endpoints

### 1. Create Watchlist

**POST** `/watchlist`

#### Request

```json
{
  "name": "My Favorites"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "watchlist1",
    "name": "My Favorites"
  }
}
```

---

### 2. Get All Watchlists

**GET** `/watchlist`

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "watchlist1",
      "name": "My Favorites"
    }
  ]
}
```

---

### 3. Add Item to Watchlist

**POST** `/watchlist/add`

#### Request

```json
{
  "watchlistId": "watchlist1",
  "itemId": "123"
}
```

#### Response

```json
{
  "success": true,
  "message": "Item added successfully"
}
```

---

### 4. Remove Item from Watchlist

**DELETE** `/watchlist/remove`

#### Request

```json
{
  "watchlistId": "watchlist1",
  "itemId": "123"
}
```

---

### 5. Move Item Between Watchlists

**POST** `/watchlist/move`

#### Request

```json
{
  "itemId": "123",
  "sourceWatchlistId": "watchlist1",
  "targetWatchlistId": "watchlist2",
  "position": 1
}
```

#### Response

```json
{
  "success": true,
  "message": "Item moved successfully"
}
```

---

### 6. Update Watchlist Name

**PUT** `/watchlist/:id`

#### Request

```json
{
  "name": "Updated Name"
}
```

---

### 7. Delete Watchlist

**DELETE** `/watchlist/:id`

---

## ⚠️ Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common errors:

* 400 → Bad request
* 401 → Unauthorized
* 404 → Not found
* 500 → Server error

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/watchlist-api.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
npm start
```

---

## 🧪 Example cURL

```bash
curl -X POST http://localhost:3000/api/watchlist/move \
-H "Authorization: Bearer your_token" \
-H "Content-Type: application/json" \
-d '{
  "itemId": "123",
  "sourceWatchlistId": "watchlist1",
  "targetWatchlistId": "watchlist2"
}'
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Your Name
