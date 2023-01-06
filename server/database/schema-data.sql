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

create table restaurants (
	restaurant_id int auto_increment primary key,
    restaurant_name varchar(50) not null unique,
    address varchar(120) not null unique,
    open_hours varchar(120) not null,
    descript varchar(350) not null
);

create table reviews (
	review_id int auto_increment primary key,
    review_text varchar(130) not null,
    app_user_id int not null,
    restaurant_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id),
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
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
    item_price decimal(4,2) not null,
    item_description varchar(120) not null,
	restaurant_id int not null,

    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
);

insert into app_role (name) values
('USER'),
('ADMIN');

-- johndoe is top-secret-password
-- janedoe is bad-password
insert into app_user (first_name, last_name, username, passhash, email) values
('john', 'doe', 'johndoe', '$2a$12$NNYEMXoCytN.jhFPmFzZFu6IKmZYHJHTN7unGpRBf8q0TxgogJQ6G', 'johndoe@email.com'),
('jane', 'doe', 'janedoe', '$2a$12$udDF/wYAOJNMW6e/yAt2xu98PGo5fKd1UBFi2w2zybtmfoldhoXSW', 'janedoe@email.com');

insert into user_roles (app_user_id, app_role_id) values
( 1, 1 ),
( 2, 2 );

insert into restaurants (restaurant_name, address, open_hours, descript) values
('Taco House', '111 taco street', 'Monday to Saturday - 10am to 11pm', 'Serving the best tacos in town since 1958'),
('Canadian Bacon', '333 bacon street', 'Tuesday to Saturday - 9am to 9pm', 'Serving the bacon burger in town since 1999'),
('Soulfu', '555 tasty avenue', 'Monday to Friday - 11am to 8pm', 'Serving the best waffles in town since 2001');

insert into orders (order_items, app_user_id, restaurant_id) values
('Chicken Burrito', 1, 1),
('Bison Burger', 2, 2),
('Shrimp Curry Waffles', 1, 3);






