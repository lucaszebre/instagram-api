import prisma from '../db'
import * as dotenv from 'dotenv';
dotenv.config();
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'
import { Resend } from 'resend';
import uuid from 'uuid'

const resend = new Resend(process.env.RESEND);

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

    const emailVerificationToken = uuid(); // Generate a unique token for email verification

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        username: req.body.username,
        emailVerificationToken, // Store the verification token
        emailVerificationTokenExpiry: new Date(Date.now() + 60 * 60 * 1000), // Token expiry set to 1 hour from now
      },
    });

    await resend.emails.send({ 
      from: 'onboarding@resend.dev',
      to: req.body.email,
      subject: 'Email Verification',
      text: `Click on this link to verify your email: https://yourdomain.com/verify-email?token=${emailVerificationToken}`
    });

    const token = createJWT(user);
    res.json({ token });
    // ... rest of your code
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



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



export const requestPasswordReset = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email }
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const passwordResetToken = uuid();
    await prisma.user.update({
      where: { email: req.body.email },
      data: {
        passwordResetToken,
        passwordResetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
      }
    });

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'yakirisk@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}



export const resetPassword = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { passwordResetToken: req.body.token }
    });

    if (!user || user.passwordResetTokenExpiry < new Date()) {
      res.status(400).json({ message: 'Invalid or expired token' });
      return;
    }

    const newPassword = await hashPassword(req.body.newPassword);
    await prisma.user.update({
      where: { email: user.email },
      data: {
        password: newPassword,
        passwordResetToken: null,
        passwordResetTokenExpiry: null
      }
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}



export const editProfile = async (req, res) => {
  try {
    const updates = req.body; // Get the updates from the request
    const user = await prisma.user.update({
      where: { id: req.userId }, // Assume you get the user ID from the request after authentication
      data: updates
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}