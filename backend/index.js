const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const secret = "serdtdcref56gtfvggyuhjyujmkknjhtfsa"

const app = express();

app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json());

const DB =
  "mongodb+srv://blog:6sDDG5bXCCrgcSHT@cluster0.mvedj36.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

userSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = new User({
      username,
      password: bcrypt.hashSync(password, saltRounds),
      email,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async(req, res) => {
  const { username, password} = req.body;
  const userDoc = await User.findOne({username});

  if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
      jwt.sign({username,id:userDoc._id},secret, {},(err,token)=>{
        if (err) throw err;
        res.cookie("token",token).json("ok");
      });
    }else{
      res.status(400).json("wrong credentials")
    }
  }else{
    res.status(400).json("wrong credentials")
  }
});

app.get("/profile",(req,res)=>{
  res.json(req.cookies)
})


app.listen(4000, () => console.log("listening to port 4000"));
