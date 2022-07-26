exports.userServiceError = {
    USER_ERR_UNAUTHORIZED: "errors.unauthorized",
    USER_ERR_TOKEN_EXPIRED: "errors.token_expired",
    USER_ERR_INVALID_USER_ID: "errors.invalid_user_id",
    USER_ERR_INVALID_USER_BODY: "errors.invalid_user_body",
    USER_ERR_ALREADY_REGISTERED: "errors.user_already_registered",
    USER_ERR_USER_NOT_FOUND: "errors.user_not_found",
    USER_ERR_INVALID_UPDATE: "errors.invalid_update",
    USER_ERR_ROLE_NOT_FOUND: "errors.role_not_found",
    USER_ERR_FAIL_ALTER_ROLE: "errors.fail_alter_role",
    USER_ERR_MISSING_ROLE: "errors.missing_role",
    USER_ERR_PUBLISH_RESTRICTED: "errors.publish_restricted",
    USER_ERR_BCRYPT_PASSWORD_MISMATCH: "errors.password mimatch",
}

exports.userServiceMessages = {}

exports.isEmployee = (role) => !["user", "manager"].includes(role)
