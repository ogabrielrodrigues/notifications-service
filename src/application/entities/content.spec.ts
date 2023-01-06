import { Content } from './content'

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Nova notificação')

    expect(content).toBeTruthy()
  })

  it('should not be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('abc')).toThrow()
  })

  it('should not be able to create a notification content with more then 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
