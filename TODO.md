# TODO - Inquiry form enhancements

- [ ] Update `src/App.jsx` Inquiry section:
  - [ ] Add Address field/section
  - [ ] Add image upload control (multiple images) under/near textarea
  - [ ] Add availability note: only within Jamshedpur, Jharkhand
  - [ ] Replace static WhatsApp link with submit button + handler
  - [ ] Validate address contains “Jamshedpur” (case-insensitive)
  - [ ] Build WhatsApp message including: name, phone, address, inquiry text, and image file names + counts
  - [ ] Redirect to WhatsApp using wa.me/<number>?text=<encoded message>
- [x] Manually test in browser: upload images, submit, verify message content


