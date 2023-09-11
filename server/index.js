const express = require("express")
const fs = require("fs")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())

app.listen(5000, () => {
  console.log("Server started")
})

const members = []

app.post("/workFile", (req, res) => {
  const data = req.body
  const email = req.body.email
  fs.writeFile(
    path.join(__dirname, `/files/${data.name}.${data.type}`),
    data.text,
    (err) => {
      if (err) throw err
      console.log("File was created or changed")
      res.send({ value: true })
      fs.readFile(path.join(__dirname, "users.txt"), "utf-8", (err, res1) => {
        const str = res1.split("\n")
        str.pop()
        const users = []
        str.forEach((el) => {
          users.push(JSON.parse(el))
        })
        users.map((el) => {
          if (el.email == email) {
            el.files.push(`${data.name}.${data.type}`)
          }
        })
        let string = ""
        users.map((el) => {
          string += JSON.stringify(el) + "\n"
        })
        fs.writeFile(path.join(__dirname, "users.txt"), string, (err) => {
          if (err) throw err
          console.log("users changed")
        })
      })
    }
  )
})
app.post("/files", (req, res) => {
  const email = req.body.email
  fs.readdir(path.join(__dirname, "/files"), (err, files) => {
    if (err) throw err
    fs.readFile(path.join(__dirname, "users.txt"), "utf-8", (err, res1) => {
      const str = res1.split("\n")
      str.pop()
      const users = []
      str.forEach((el) => {
        users.push(JSON.parse(el))
      })
      users.map((el) => {
        if (el.email == email) {
          res.send(el.files)
        }
      })
    })
  })
})
app.post("/registration", (req, res) => {
  const data = req.body
  console.log(req.body)
  const user = {
    name: data.name,
    email: data.email,
    password: data.password,
    files: [],
  }

  fs.appendFile(
    path.join(__dirname, "users.txt"),
    `${JSON.stringify(user)}\n`,
    (err) => {
      if (err) throw err
      res.send("Успешная регистрация")
    }
  )
})

app.post("/login", (req, res) => {
  const data = req.body
  let username = ""
  const user = {
    email: data.email,
    password: data.password,
  }
  fs.readFile(path.join(__dirname, "users.txt"), "utf-8", (err, res1) => {
    const str = res1.split("\n")
    str.pop()
    const users = []
    str.forEach((el) => {
      users.push(JSON.parse(el))
    })
    users.map((el) => {
      if (user.email == el.email && user.password == el.password) {
        username = el.email
      }
    })
    if (username) {
      res.send({ username })
    } else {
      res.send(false)
    }
  })
})
app.get("/file", (req, res) => {
  let nameQuery = req.query.name
  fs.readdir(path.join(__dirname, "/files"), (err, files) => {
    if (err) throw err

    files.forEach((el) => {
      if (el == nameQuery) {
        fs.readFile(
          path.join(__dirname, `/files/${el}`),
          "utf8",
          (err, data) => {
            if (err) throw err
            res.send({ value: data })
          }
        )
      }
    })
  })
})
app.post("/download", (req, res) => {
  const fileName = req.body.name
  console.log(fileName)
  res.download(path.join(__dirname, `/files/${fileName}`), (err) => {
    if (err) {
      console.error("Произошла ошибка при скачивании файла:", err)
      res.status(500).send("Ошибка при скачивании файла")
    }
  })
})
