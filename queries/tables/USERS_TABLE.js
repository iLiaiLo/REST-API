const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS todo_app.users(
    id UUID PRIMARY KEY,
    username TEXT NOT NULL CHECK (username ~ '^(?=.+[A-Za-z]).{3,}$'),
    email TEXT UNIQUE NOT NULL CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    password TEXT NOT NULL CHECK (LENGTH(TRIM(password))>=6),
    role TEXT NOT NULL CHECK (role IN ('user','admin')),
    
    is_account_verified BOOLEAN NOT NULL DEFAULT FALSE,

    verify_otp VARCHAR(6) NOT NULL CHECK (verify_otp ~ '^[0-9]{6}$' OR verify_otp='') DEFAULT '',
    verify_otp_expire_at BIGINT NOT NULL CHECK (verify_otp_expire_at>=0) DEFAULT 0,

    reset_otp VARCHAR(6) NOT NULL CHECK (reset_otp ~ '^[0-9]{6}$' OR reset_otp='') DEFAULT '',
    reset_otp_expire_at BIGINT NOT NULL CHECK (reset_otp_expire_at>=0) DEFAULT 0,

    recovery_otp VARCHAR(6) NOT NULL CHECK (recovery_otp ~ '^[0-9]{6}$' OR recovery_otp='' ) DEFAULT '',
    recovery_otp_expire_at BIGINT NOT NULL CHECK (recovery_otp_expire_at>=0) DEFAULT 0,
    
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS user_deleted_at ON todo_app.users (deleted_at) WHERE deleted_at IS NOT NULL;
`;

export default createUsersTableQuery;
