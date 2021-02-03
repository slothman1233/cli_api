type bodyModel<T> = {
    subcode: number,
    code?: number,
    message: string,
    bodyMessage: T
}


class BaseModel<T> {
    bodyMessage: T
    code: number
    subcode: number
    message: string
    constructor({ bodyMessage, code, subcode, message }: bodyModel<T>) {
        this.bodyMessage = bodyMessage
        this.code = code
        this.subcode = subcode
        this.message = message
    }
}

/**
 * 成功的模型
 */
class SuccessModel<T> extends BaseModel<T> {
    constructor({ bodyMessage, code, subcode, message }: bodyModel<T>) {
        if (code) {
            super({ bodyMessage, code, subcode, message })
        } else {
            super({ bodyMessage, code: 0, subcode, message })
        }
    }
}

/**
 * 错误的模型
 */
class ErrorModel<T> extends BaseModel<T> {
    constructor({ bodyMessage, code, subcode, message }: bodyModel<T>) {
        if (code) {
            super({ bodyMessage, code, subcode, message })
        } else {
            super({ bodyMessage, code: -1, subcode, message })
        }
    }
}

export {
    SuccessModel,
    ErrorModel,
    bodyModel
}