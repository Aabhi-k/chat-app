import { Router } from 'express'
const router = Router()
import { findById, findOne } from '../models/UserModel'
import ChatModel, { findOne as _findOne } from '../models/ChatModel'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import isEmail from 'validator/lib/isEmail'
import authMiddleware from '../middleware/authMiddleware'

router.get('/', authMiddleware, async (req, res) =>
{
  const { userId } = req

  try
  {
    const user = await findById(userId)

    return res.status(200).json({ user })
  }
  catch(error)
  {
    console.error(error)
  
    return res.status(500).send(`Server error`)
  }
})

router.post('/', async (req, res) =>
{
  const { email, password } = req.body.user

  if(!isEmail(email)) return res.status(401).send('Invalid Email')

  if(password.length < 6)
  {
    return res.status(401).send('Password must be atleast 6 characters')
  }

  try
  {
    const user = await findOne({ email: email.toLowerCase() }).select('+password')

    if(!user)
    {
      return res.status(401).send('Invalid Credentials')
    }

    const isPassword = await compare(password, user.password)
    
    if(!isPassword)
    {
      return res.status(401).send('Invalid Credentials')
    }

    const chatModel = await _findOne({ user: user._id })

    if(!chatModel)
    {
      await new ChatModel({ user: user._id, chats: [] }).save()
    }

    const payload = { userId: user._id }
    
    sign(payload, process.env.jwtSecret, { expiresIn: '2d' }, (err, token) =>
    {
      if (err) throw err
    
      res.status(200).json(token)
    })
  }
  catch (error)
  {
    console.error(error)
  
    return res.status(500).send(`Server error`)
  }
})

export default router