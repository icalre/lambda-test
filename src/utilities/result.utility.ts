export class ResultUtility<T> {
    isSuccess: boolean
    isFailure: boolean
    error: string
    value: any

    constructor (isSuccess: boolean, error: string = '', value?: any) {
      this.isSuccess = isSuccess
      this.isFailure = !isSuccess
      this.error = error
      this.value = value
    }

    getValue (): T {
      return this.value
    }

    static ok<U> (value?: U): ResultUtility<U> {
      return new ResultUtility<U>(true, undefined, value)
    }

    static fail<U> (error: string): ResultUtility<U> {
      return new ResultUtility<U>(false, error)
    }
  }


  const resulOk = (success: boolean, error:string = '', value?:any) => {
      return {
          success: success,
          error: error,
          value: value
      };
  }
