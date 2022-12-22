import { Request, Response } from 'express'

import { producer } from '../kafka/config'
import { UserService } from '../services/user.service'

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await UserService.get(`${process.env.FAKE_NAME_SERVICE}/users`)

    const newUser = {
      username: `${data.first_name} ${data.last_name}`,
    }

    res.status(200).json(newUser)

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
