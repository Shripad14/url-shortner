import express from 'express';

import { signupPostRequestBodySchema } from '../validations/request.validation.js';

import{ hashPasswordWithSalt } from '../utils/hash.js';

import { getUserByEmail, createUserByEmail } from '../services/user.service.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const validationResult =
    await signupPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.json({ error: validationResult.error.format() });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.json({ error: `User with email ${email} already exists.` });
  }

  const { salt, password: hashedPassword } =
    hashPasswordWithSalt(password);

  const user = await createUserByEmail(
    email,
    firstname,
    lastname,
    hashedPassword,
    salt
  );

  return res.status(201).json({
    data: { userId: user.id },
  });
});

export default router;