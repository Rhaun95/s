drop table movie;
CREATE TABLE movie (
                         `movieId` int NOT null AUTO_INCREMENT,
                         `title` varchar(60) NOT NULL,
                         `directorNm` varchar(45) NOT NULL,
                         `actorNm` varchar(45) NOT NULL,
                         `genre` varchar(45) NOT NULL,
                         `runtime` int NOT NULL,
                         `repRlsDate` date NOT NULL,
                         `rating` varchar(45) NOT NULL,
                         `posterUrl` varchar(200) NOT NULL,
                         `plot` varchar(1000) NOT NULL,
                         `star` double DEFAULT '0',
                         `audiAcc` int NOT NULL,
                         `stillUrl` varchar(1000) NOT NULL,
                         `country` varchar(100) not null,
                         `audioUrl` varchar(1000) not null,
                         PRIMARY KEY (`movieId`),
                         UNIQUE KEY `title_UNIQUE` (`title`),
                         UNIQUE KEY `posterUrl_UNIQUE` (`posterUrl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



drop table board;

CREATE TABLE `board` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `user_id` varchar(45) NOT NULL,
                         `title` varchar(100) NOT NULL,
                         `content` varchar(2000) NOT NULL,
                         `regDate` varchar(45) NOT NULL,
                         `hit` int NOT NULL DEFAULT '0',
                         `type` varchar(15) NOT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


drop table comment;
CREATE TABLE `comment` (
                           `id` int NOT NULL,
                           `user_id` varchar(45) NOT NULL DEFAULT 'manager',
                           `content` varchar(600) NOT NULL,
                           `title` varchar(45) NOT NULL,
                           `regDate` varchar(45) NOT NULL,
                           `posting_num` int NOT NULL AUTO_INCREMENT,
                           PRIMARY KEY (`posting_num`)
) ENGINE=InnoDB AUTO_INCREMENT=1096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



drop table community;
CREATE TABLE `community` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `user_id` varchar(45) NOT NULL,
                             `title` varchar(45) NOT NULL,
                             `content` varchar(300) NOT NULL,
                             `regDate` varchar(45) NOT NULL,
                             `hit` int NOT NULL DEFAULT '0',
                             `type` varchar(15) NOT NULL,
                             `url` varchar(100) DEFAULT NULL,
                             `cinema_name` varchar(45) DEFAULT NULL,
                             `star` int NOT NULL DEFAULT '0',
                             `cinema_image` varchar(100) DEFAULT NULL,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


drop table store;
CREATE TABLE store (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `price` int NOT NULL,
                         `amount` int DEFAULT NULL,
                         `name` varchar(45) NOT NULL,
                         `type` varchar(30) NOT NULL,
                         `image` varchar(500) NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `name_UNIQUE` (`name`),
                         UNIQUE KEY `image_UNIQUE` (`image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



drop table cinema;
create table cinema
(
    id int auto_increment primary key,
    cinema_name varchar(45) not null,
    total_seat  int         not null,
    lat double not null,
    lng double not null,
    star double default 0,
    constraint cinema_name_UNIQUE
        unique (cinema_name),
    constraint id_UNIQUE
        unique (id)
);



drop table user;
create table user(
                     `user_id` int NOT NULL AUTO_INCREMENT,
                     `username` varchar(45) NOT null,
                     `password` varchar(200) NOT NULL,
                     `nickname` varchar(45) NOT NULL,
                     `activated` varchar(45) NOT NULL,
                     PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



drop table authority;
create table authority(
                          `authority_name` varchar(60) NOT null,
                          PRIMARY KEY (`authority_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



drop table user_authority;
create table user_authority(
                               `user_id` INT NOT NULL ,
                               `authority_name` varchar(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




drop table seatdb;
create table seatdb
(
    id     varchar(12)       not null
        primary key,
    booked tinyint default 0 not null,
    constraint id_UNIQUE
        unique (id)
);



drop table showing_movie;
create table showing_movie(
                              id               int auto_increment primary key,
                              title            varchar(60)                         not null,
                              cinema_name      varchar(45)                         not null,
                              showing_date     varchar(45)                         not null,
                              runtime          int                                 not null,
                              restSeat         int                                 not null,
                              seat_num         varchar(12)                         not null,
                              price            int              default 12000      not null,
                              showing_lastDate varchar(45)                         not null,
                              regDate          timestamp default CURRENT_TIMESTAMP not null
);


drop table item_basket;
create table item_basket
(
    id           int auto_increment
        primary key,
    user_id      varchar(45)  null,
    item_name    varchar(45)  not null,
    total_price  int          null,
    total_amount int          null,
    item_image   varchar(100) not null
);


drop table movie_basket;
create table movie_basket
(
    id           int auto_increment
        primary key,
    user_id      varchar(45)  not null,
    title        varchar(60)  not null,
    posterUrl    varchar(100) not null,
    movie_time   varchar(20)  not null,
    reserveDate  varchar(40)  not null,
    cinema_name  varchar(45)  not null,
    cinema_id    int          null,
    seat_num     varchar(45)  not null,
    total_amount int          null,
    total_price  int          null,
    mbti         varchar(15)  null
);


