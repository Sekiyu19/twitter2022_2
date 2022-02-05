const express = require("express")
const app = express()
app.use(express.json())
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./twitter.db")

// ツイート投稿
exports.postTweet = (userId, content, callback) => {
    db.serialize(() => {
        db.run("INSERT INTO tweets (userId, content) VALUES (?, ?)", userId, content, (err) => {
            if (err !== null) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}

// ツイート一覧取得
exports.getAllTweets = (callback) => {
    db.serialize(() => {
        db.all("SELECT * FROM tweets;", (err, rows) => {
            if (err !== null) {
                callback(err, undefined)
            } else {
                const tweets = rows.map(row => {
                    return {
                        id: row.id,
                        userId: row.userId,
                        content: row.content
                    }
                })
                callback(null, tweets)
            }
        })
    })
}

// ツイート単体取得
exports.getTweet = (id, callback) => {
    db.serialize(() => {
        db.get("SELECT * FROM tweets WHERE id = ?", id, (err, row) => {
            if (err !== null) {
                callback(err, undefined)
            } else if (row === undefined) {
                callback(null, undefined)
            } else {
                const tweet = {
                    id: row.id,
                    userId: row.userId,
                    content: row.content
                }
                callback(null, tweet)
            }
        })
    })
}

// ツイート削除
exports.deleteTweet = (id, callback) => {
    db.serialize(() => {
        db.run("DELETE FROM tweets WHERE id = ?", id, (err) => {
            if (err !== null) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}