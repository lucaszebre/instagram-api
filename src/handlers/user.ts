import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'


export const createNewUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        name:req.body.name,
      }
    })
  
    const token = createJWT(user)
    res.json({ token })
    // ... rest of your code
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
 
}

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })
  
    const isValid = await comparePasswords(req.body.password, user.password)
  
    if (!isValid) {
      res.status(401)
      res.json({message: 'nope'})
      return
    }
  
    const token = createJWT(user)
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  
}