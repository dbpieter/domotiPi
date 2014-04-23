 
-- Table: schedules
CREATE TABLE schedules (
    id      INTEGER         PRIMARY KEY AUTOINCREMENT,
    name    VARCHAR( 100 )  NOT NULL,
    enabled BOOLEAN         NOT NULL
);
 
 
-- Table: rules
CREATE TABLE rules (
    id           INTEGER        PRIMARY KEY AUTOINCREMENT
                                NOT NULL,
    cron         VARCHAR( 50 )  NOT NULL,
    schedules_id INTEGER        NOT NULL
                                REFERENCES schedules ( id )
);
 
 
-- Table: devices
CREATE TABLE devices (
    id        INTEGER         PRIMARY KEY AUTOINCREMENT
                              NOT NULL,
    name      VARCHAR( 100 )  NOT NULL,
    pinnumber INTEGER         NOT NULL
);
 
 
-- Table: devices_has_rules
CREATE TABLE devices_has_rules (
    devices_id INTEGER REFERENCES devices ( id ),
    rules_id   INTEGER REFERENCES rules ( id ),
    onoff      BOOLEAN NOT NULL
);
 
 
-- Table: temperatures
CREATE TABLE temperatures (
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    temperature REAL     NOT NULL,
    TIME        DATETIME NOT NULL
);
 
 
-- Table: users
CREATE TABLE users (
    id       INTEGER         PRIMARY KEY AUTOINCREMENT,
    username VARCHAR( 100 )  NOT NULL
                             UNIQUE,
    password VARCHAR( 100 )  NOT NULL
);
 
 
-- Table: logs
CREATE TABLE logs (
    id      INTEGER  PRIMARY KEY AUTOINCREMENT,
    message TEXT     NOT NULL,
    TIME    DATETIME NOT NULL
);