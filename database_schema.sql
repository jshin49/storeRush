DROP TABLE if exists note cascade;

CREATE TABLE note (
  id serial primary key,
  channel text,
  field text
);
