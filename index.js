// expressのセットアップ
const express = require("express")
const app = express()
// app.use(express.text())
app.use(express.json())

// データベース
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./twitter.db")

// export
const userFail = require("./user")
const tweetFail = require("./tweet")

app.use("/index", express.static(__dirname + "/html"))
app.use("/users", express.static(__dirname + "/html/registerUser"))

app.get("/hello", (req, res) => {
    res.send("Hello world!")
})

// ユーザー登録
app.post("/users", (req, res) => {
    const user = req.body
    userFail.getUser(user.userName, (err, row) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else if (row === undefined) {
            userFail.registerUser(user.userName, user.displayName, (err) => {
                if (err !== null) {
                    console.log(err)
                    res.statusCode = 500
                    res.json(err)
                } else {
                    res.end()
                    // const user = {
                    //     id: row.id,
                    //     userName: row.userName,
                    //     displayName: row.displayName
                    // }
                    // res.json(user)
                }
            })
        } else {
            res.statusCode = 409
            res.end()
        }
    })
})

// ユーザー一覧取得
app.get("/users", (req, res) => {
    userFail.getAllUsers((err, rows) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else {
            res.json(rows)
            // const users = rows.map(row => {
            //     return {
            //         id: row.id,
            //         userName: row.userName,
            //         displayName: row.displayName
            //     }
            // })
            // res.json(users)
        }
    })
})

// ユーザー単体取得
app.get("/users/:username", (req, res) => {
    const userName = Number(req.params["userName"])
    userFail.getUser(userName, (err, row) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else if (row === undefined) {
            res.statusCode = 404
            res.end()
        } else {
            res.json(row)
            // const user = {
            //     id: row.id,
            //     userName: row.userName,
            //     displayName: row.displayName
            // }
            // res.json(user)
        }
    })
})

// ユーザー削除
app.delete("/users/:username", (req, res) => {
    const userName = Number(req.params["userName"])
    userFail.getUser(userName, (err, row) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else if (row === undefined) {
            res.statusCode = 404
            res.end()
        } else {
            userFail.deleteUser(userName, (err) => {
                if (err !== null) {
                    console.log(err)
                    res.statusCode = 500
                    res.json(err)
                } else {
                    res.end()
                }
            })
        }
    })
})

// ツイート投稿
app.post("/tweets", (req, res) => {
    const tweet = req.body
    tweetFail.postTweet(tweet.content, (err) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else {
            res.end()
            // const user = {
            //     id: row.id,
            //     userName: row.userName,
            //     displayName: row.displayName
            // }
            // res.json(user)
        }
    })
})

// ツイート一覧取得
app.get("/tweets", (req, res) => {
    tweetFail.getAllTweets((err, rows) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else {
            res.json(rows)
            // const users = rows.map(row => {
            //     return {
            //         id: row.id,
            //         userName: row.userName,
            //         displayName: row.displayName
            //     }
            // })
            // res.json(users)
        }
    })
})

// ツイート単体取得
app.get("/tweets/:id", (req, res) => {
    const userId = Number(req.params["userId"])
    tweetFail.getTweet(userId, (err, row) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else if (row === undefined) {
            res.statusCode = 404
            res.end()
        } else {
            res.json(row)
            // const tweet = {
            //     id: row.id,
            //     userId: row.userId,
            //     content: row.content
            // }
            // res.json(tweet)
        }
    })
})

// ツイート削除
app.delete("/tweets/:id", (req, res) => {
    const userId = Number(req.params["userId"])
    tweetFail.getUser(userId, (err, row) => {
        if (err !== null) {
            console.log(err)
            res.statusCode = 500
            res.json(err)
        } else if (row === undefined) {
            res.statusCode = 404
            res.end()
        } else {
            tweetFail.deleteTweet(userId, (err) => {
                if (err !== null) {
                    console.log(err)
                    res.statusCode = 500
                    res.json(err)
                } else {
                    res.end()
                }
            })
        }
    })
})

// サーバーの起動
app.listen(3000, () => {
    console.log("server start")
})