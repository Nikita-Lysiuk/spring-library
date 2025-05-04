CREATE TABLE IF NOT EXISTS users
(
    id                 VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    full_name          VARCHAR(50)  NOT NULL,
    email              VARCHAR(100) NOT NULL UNIQUE,
    password           VARCHAR(100) NOT NULL,
    provider           VARCHAR(50)  NOT NULL,
    provider_id        VARCHAR(255),
    two_factor_enabled BOOLEAN                 DEFAULT FALSE,
    otp_secret         VARCHAR(255),
    avatar_url         VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS roles
(
    id   VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users_roles
(
    user_id VARCHAR(36) NOT NULL,
    role_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS refresh_tokens
(
    id              VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id         VARCHAR(36)  NOT NULL,
    token           VARCHAR(255) NOT NULL UNIQUE,
    expiration_date TIMESTAMP    NOT NULL,
    revoked         BOOLEAN                 DEFAULT FALSE,
    created_at      TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS books
(
    id             VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title          VARCHAR(255) NOT NULL,
    description    TEXT,
    published_date DATE,
    publisher      VARCHAR(100),
    cover_url      VARCHAR(255),
    pdf_url        VARCHAR(255),
    language       VARCHAR(50),
    price          DECIMAL(10, 2),
    page_count     INT,
    created_at     TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS external_books
(
    id             VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    external_id    VARCHAR(255) NOT NULL UNIQUE,
    title          VARCHAR(255) NOT NULL,
    description    TEXT,
    published_date DATE,
    publisher      VARCHAR(100),
    authors        JSON,
    page_count     INT,
    categories     JSON,
    cover_url      VARCHAR(255),
    price          DECIMAL(10, 2),
    language       VARCHAR(50),
    buy_link       VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS authors
(
    id   VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categories
(
    id   VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tags
(
    id   VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS books_authors
(
    book_id   VARCHAR(36) NOT NULL,
    author_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS books_categories
(
    book_id     VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS books_tags
(
    book_id VARCHAR(36) NOT NULL,
    tag_id  VARCHAR(36) NOT NULL,
    PRIMARY KEY (book_id, tag_id),
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS external_book_tags
(
    external_book_id VARCHAR(36) NOT NULL,
    tag_id           VARCHAR(36) NOT NULL,
    PRIMARY KEY (external_book_id, tag_id),
    FOREIGN KEY (external_book_id) REFERENCES external_books (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_book
(
    id             VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id        VARCHAR(36) NOT NULL,
    book_id        VARCHAR(36) NOT NULL,
    current_page   INT,
    purchased_date TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS wishlists
(
    id               VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id          VARCHAR(36) NOT NULL,
    external_book_id VARCHAR(36) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (external_book_id) REFERENCES external_books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS bookmarks
(
    id          VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id     VARCHAR(36) NOT NULL,
    book_id     VARCHAR(36) NOT NULL,
    page_number INT         NOT NULL,
    title       VARCHAR(255),
    created_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS notes
(
    id          VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id     VARCHAR(36) NOT NULL,
    book_id     VARCHAR(36) NOT NULL,
    page_number INT         NOT NULL,
    content     TEXT        NOT NULL,
    created_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews
(
    id         VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id    VARCHAR(36) NOT NULL,
    book_id    VARCHAR(36) NOT NULL,
    rating     INT CHECK (rating >= 1 AND rating <= 5),
    content    TEXT,
    created_at TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS cart
(
    id         VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id    VARCHAR(36) NOT NULL,
    created_at TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS cart_items
(
    id       VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    cart_id  VARCHAR(36) NOT NULL,
    book_id  VARCHAR(36) NOT NULL,
    quantity INT         NOT NULL    DEFAULT 1,

    FOREIGN KEY (cart_id) REFERENCES cart (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS orders
(
    id             VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id        VARCHAR(36)    NOT NULL,
    total          DECIMAL(10, 2) NOT NULL,
    status         VARCHAR(50)    NOT NULL,
    payment_method VARCHAR(50)    NOT NULL,
    created_at     TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP               DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items
(
    id          VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    order_id    VARCHAR(36)    NOT NULL,
    book_id     VARCHAR(36)    NOT NULL,
    quantity    INT            NOT NULL DEFAULT 1,
    price       DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE
);