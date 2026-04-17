export type ValidationErrorType = {
    field: string;
    message: string;
}
export type ValidationErrorsMessagesType = {
    errorsMessages: ValidationErrorType[]
}