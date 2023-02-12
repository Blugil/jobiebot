CREATE TABLE images (
  order_added int PRIMARY KEY,
  image_link text
);


CREATE TABLE voice_sessions (
  channel_id text PRIMARY KEY,
  channel_name text,
  start_date text,
  active boolean,
  call_record text
);

