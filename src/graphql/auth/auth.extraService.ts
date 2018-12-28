import { Injectable } from '@nestjs/common'
import { SECRET_CODE } from 'env'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

@Injectable()
export class AuthExtraService {
  async isPwdsIdentical (pwd1, pwd2) {
    return await bcrypt.compare(pwd1, pwd2)
  }

  async generateToken (user) {
    return await jwt.sign({
      userId: user.id,
      userUsn: user.usn
    },
      SECRET_CODE,
    {
      expiresIn: '1h'
    })
  }
}