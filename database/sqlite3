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
    devices_id INTEGER REFERENCES devices ( id )
                                NOT NULL,
    cron         VARCHAR( 50 )  NOT NULL,
    schedules_id INTEGER        NOT NULL
                                REFERENCES schedules ( id ) ,
    onoff      BOOLEAN          NOT NULL
    
);


-- Table: devices
CREATE TABLE devices ( 
    id        INTEGER         PRIMARY KEY AUTOINCREMENT
                              NOT NULL,
    name      VARCHAR( 100 )  NOT NULL,
    pin         INTEGER       NOT NULL
                              UNIQUE

);

-- Table: temperatures
CREATE TABLE temperatures ( 
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    temperature REAL     NOT NULL,
    time        DATETIME NOT NULL 
);


-- Table: logs
CREATE TABLE logs ( 
    id      INTEGER  PRIMARY KEY AUTOINCREMENT,
    message TEXT     NOT NULL,
    time    DATETIME NOT NULL 
);


-- Table: users
CREATE TABLE users ( 
    id       INTEGER         PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR( 100 )  NOT NULL,
    password VARCHAR( 100 )  NOT NULL,
    email    VARCHAR( 100 )  NOT NULL UNIQUE,
    updated_at DATETIME,
    created_at DATETIME,
    remember_token varchar(60)
);