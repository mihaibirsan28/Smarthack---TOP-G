create table campaign
(
    id           varchar(36) not null
        primary key,
    name         varchar(255),
    release_date date
);

alter table campaign
    owner to admin;

create table post_social
(
    id                     varchar(36) not null
        primary key,
    initial_clients_number integer,
    link                   varchar(255),
    social_media           varchar(255),
    campaign_id            varchar(36)
        constraint fkggovn24v1jwk6e3al44vs9a39
            references campaign
);

alter table post_social
    owner to admin;

create table store
(
    id       varchar(36) not null
        primary key,
    location varchar(255),
    name     varchar(255)
);

alter table store
    owner to admin;

create table campaign_store
(
    campaign_id varchar(36) not null
        constraint fkrx97jmm36nn43c56yeb9ivdip
            references campaign,
    store_id    varchar(36) not null
        constraint fkfoyhvplb43v0awaat02uaaig5
            references store,
    primary key (campaign_id, store_id)
);

alter table campaign_store
    owner to admin;

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

