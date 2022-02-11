const express = require("express")
const app = express()
app.use(express.json())
const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./twitter.db")

// ユーザー登録
exports.registerUser = (username, displayName, callback) => {
    db.serialize(() => {
        db.run("INSERT INTO users (username, displayName) VALUES (?, ?)", username, displayName, (err) => {
            if (err !== null) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}

// ユーザー一覧取得
exports.getAllUsers = (callback) => {
    db.serialize(() => {
        db.all("SELECT * FROM users;", (err, rows) => {
            if (err !== null) {
                callback(err, undefined)
            } else {
                const users = rows.map(row => {
                    return {
                        id: row.id,
                        username: row.username,
                        displayName: row.displayName
                    }
                })
                callback(null, users)
            }
        })
    })
}

// ユーザー単体取得
exports.getUser = (username, callback) => {
    db.serialize(() => {
        db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
            if (err !== null) {
                callback(err, undefined)
            } else if (row === undefined) {
                callback(null, undefined)
            } else {
                const user = {
                    id: row.id,
                    username: row.username,
                    displayName: row.displayName
                }
                callback(null, user)
            }
        })
    })
}

// ユーザー削除
exports.deleteUser = (username, callback) => {
    db.serialize(() => {
        db.run("DELETE FROM users WHERE username = ?", username, (err) => {
            if (err !== null) {
                callback(err)
            } else {
                callback(null)
            }
        })
    })
}
