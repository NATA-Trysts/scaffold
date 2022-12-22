import { Request, Response } from 'express'

import { producer } from '../kafka/config'
import { User } from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  const { username, age } = req.body

  try {
    const newUser = await User.create({
      username,
      age,
    })
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    })

    const messages = [
      {
        key: 'userCreated',
        value: JSON.stringify(newUser),
      },
    ]

    await producer.sendBatch({
      topicMessages: [
        {
          topic: 'topic_1',
          messages,
        },
        {
          topic: 'topic_2',
          messages,
        },
      ],
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
    })
  }
}
