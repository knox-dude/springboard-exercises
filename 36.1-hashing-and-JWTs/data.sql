\c messagely

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

COPY public.users (username, password, first_name, last_name, phone, join_at) FROM stdin;
andrew	password	andrew	knox	123.233.4323	2018-09-08 12:20:07-07
john	other	john	john	123.455.6788	2018-09-08 12:20:07-07
me	name	jeff	jeff	123.234.3456	2018-09-08 12:20:07-07
four	four	four	four	444.444.4444	2018-09-08 12:20:07-07
\.

COPY public.messages (id, from_username, to_username, body, sent_at) FROM stdin;
1	andrew	john	Well all this shit is reserved.	2018-09-08 12:20:07-07
2	john	andrew	Well all this shit is not reserved.	2018-09-08 12:20:07-07
3	andrew	me	Well all this shit is reserved.	2018-09-08 12:20:07-07
\.
