type bodyModel<T> = {
  subcode: number,
  code?: number,
  message: string,
  bodymessage: T
}


class BaseModel<T> {
  bodymessage: T
  code: number
  subcode: number
  message: string
  constructor({ bodymessage, code, subcode, message }: bodyModel<T>) {
      this.bodymessage = bodymessage
      this.code = code
      this.subcode = subcode
      this.message = message
  }
}

/**
 * 成功的模型
 */
class SuccessModel<T> extends BaseModel<T> {
    constructor({ bodymessage, code, subcode, message }: bodyModel<T>) {
        if (code) {
            super({ bodymessage, code, subcode, message })
        } else {
            super({ bodymessage, code: 0, subcode, message })
        }
    }
}

/**
 * 错误的模型
 */
class ErrorModel<T> extends BaseModel<T> {
    constructor({ bodymessage, code, subcode, message }: bodyModel<T>) {
        if (code) {
            super({ bodymessage, code, subcode, message })
        } else {
            super({ bodymessage, code: -1, subcode, message })
        }
    }
}

export {
    SuccessModel,
    ErrorModel
}