create table store
(
    id       varchar(36) not null
        primary key,
    location varchar(255),
    name     varchar(255)
);


create table social_media
(
    id       varchar(36) not null
        primary key,
    link     varchar(255),
    name     varchar(255),
    store_id varchar(36)
        constraint fkow0sw700c3dckv1bf25axxjvt
            references store
);

alter table social_media
    owner to admin;

