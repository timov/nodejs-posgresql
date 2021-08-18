CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL UNIQUE,
    sync_state character varying(255) NOT NULL,
    sync_message character varying(255) NOT NULL,
    sync_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);