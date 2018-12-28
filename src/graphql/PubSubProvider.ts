import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

export const pubSubProvider = {
  provide: 'Pubsub',
  useValue: pubSub
}