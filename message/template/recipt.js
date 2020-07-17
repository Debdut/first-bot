const Template = require('./template')

// https://developers.facebook.com/docs/messenger-platform/send-messages/template/receipt

class Receipt extends Template {
  constructor(recipient_name, order_number, currency, payment_method, order_url, timestamp) {
    super('recipt')
    this.message.attachment.payload = { recipient_name, order_number, currency, payment_method, order_url, timestamp, elements: [] }
  }

  summary (subtotal, total_tax, total_cost, shipping_cost) {
    this.message.attachment.payload.summary = { subtotal, total_tax, total_cost, shipping_cost }
  }

  adjustments (name, amount) {
    this.message.attachment.payload.adjustments = { name, amount }
  }

  addElement (title, subtitle, quantity, price, currency, image_url) {
    this.message.attachment.payload.elements.push({ title, subtitle, quantity, price, currency, image_url })
  }
}

module.exports = (recipient_name, order_number, currency, payment_method, order_url, timestamp) => new Receipt(recipient_name, order_number, currency, payment_method, order_url, timestamp)