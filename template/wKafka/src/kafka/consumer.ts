import dotenv from 'dotenv'
dotenv.config()

import { EachMessagePayload } from 'kafkajs'

import { kafka } from './config'
import { Subcriber } from './subcriber'

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_CLIENT,
})

consumer.connect()

consumer.subscribe({ topic: process.env.KAFKA_TOPIC })

consumer.run({
  eachMessage: async (message: EachMessagePayload) => {
    const key = message.message.key.toString()
    const value = JSON.parse(message.message.value.toString())
    try {
      Subcriber[key](value)
    } catch (error) {
      console.log(error)
    }
  },
})
