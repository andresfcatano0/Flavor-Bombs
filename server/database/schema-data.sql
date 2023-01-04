drop database if exists flavor_bombs;
create database flavor_bombs;

use flavor_bombs;

create table app_user (
	app_user_id int auto_increment primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
	username varchar(120) not null unique,
    passhash varchar(2048) not null,
    email varchar(200) not null unique,
    enabled bit not null default(1)
);

create table app_role (
	app_role_id int auto_increment primary key,
    `name` varchar(50) not null unique
);

create table user_roles (
	app_user_id int not null,
    app_role_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id),
    constraint foreign key (app_role_id) references app_role(app_role_id),
    constraint primary key (app_user_id, app_role_id)
);

create table reviews (
	review_id int auto_increment primary key,
    review_text varchar(130) not null,
    app_user_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id)
);

create table restaurants (
	restaurant_id int auto_increment primary key,
    restaurant_name varchar(50) not null unique,
    address varchar(120) not null unique,
    review_id int,

    constraint foreign key (review_id) references reviews(review_id)
);

create table orders (
	order_id int auto_increment primary key,
    order_items varchar(250) not null,
	app_user_id int not null,
    restaurant_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id),
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
);

create table menu (
	menu_id int auto_increment primary key,
    item_name varchar(50) not null,
    item_description varchar(120) not null,
	restaurant_id int not null,

    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
);

insert into app_role (name) values
('USER'),
('ADMIN');

-- joe is top-secret-password
-- jane is bad-password
insert into app_user (first_name, last_name, username, passhash, email) values
('john', 'doe', 'johndoe', '$2a$12$NNYEMXoCytN.jhFPmFzZFu6IKmZYHJHTN7unGpRBf8q0TxgogJQ6G', 'johndoe@email.com'),
('jane', 'doe', 'janedoe', '$2a$12$udDF/wYAOJNMW6e/yAt2xu98PGo5fKd1UBFi2w2zybtmfoldhoXSW', 'janedoe@email.com');

insert into user_roles (app_user_id, app_role_id) values
( 1, 1 ),
( 2, 2 );

