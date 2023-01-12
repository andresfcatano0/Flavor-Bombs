drop database if exists flavor_bombs_test;
create database flavor_bombs_test;

use flavor_bombs_test;

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

    constraint foreign key (app_user_id) references app_user(app_user_id)
    ON DELETE CASCADE,
    constraint foreign key (app_role_id) references app_role(app_role_id)
    ON DELETE CASCADE,
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

    constraint foreign key (app_user_id) references app_user(app_user_id)
    ON DELETE CASCADE,
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    ON DELETE CASCADE
);

create table orders (
	order_id int auto_increment primary key,
    order_items varchar(250) not null,
	app_user_id int not null,
    restaurant_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id)
    ON DELETE CASCADE,
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    ON DELETE CASCADE
);

create table menu (
	menu_id int auto_increment primary key,
    item_name varchar(50) not null,
    item_price decimal(4,2) not null,
    item_description varchar(120) not null,
	restaurant_id int not null,

    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    ON DELETE CASCADE
);


delimiter //
create procedure set_known_good_state()
begin

	delete from menu;
    alter table menu auto_increment = 1;
	delete from orders;
    alter table orders auto_increment = 1;
	delete from reviews;
    alter table reviews auto_increment = 1;
	delete from restaurants;
    alter table restaurants auto_increment = 1;
    delete from user_roles;
	delete from app_role;
	alter table app_role auto_increment = 1;
    delete from app_user;
    alter table app_user auto_increment = 1;


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

insert into reviews (review_text, app_user_id, restaurant_id) values
-- Taco House
('It was great!', 1, 1),
('I love the bean bowl.', 2, 1),
-- Canadian bacon
('We loved our visit to Canadian Bacon and we love ordering takeout from there!', 1, 2),
('Good stuff.', 2, 2),
-- SoulFu
('It was heavenly.', 1, 3),
('Highly Recommend.', 2, 3);

insert into menu (item_name, item_price, item_description, restaurant_id) values
-- Taco House
('Chicken Burrito', '13.50', 'Its a chicken burrito with beans.', 1),
('Chicken Taco', '8.50', 'Ground chicken with pico and lettuce between a corn tortilla.', 1),
('Mexican Rice', '6.70', 'Rice with beans and red and green peppers.', 1),
-- Canadian bacon
('Bison Burger', '15.00', 'Ground bison between two buns.', 2),
('Bacon Burger', '13.00', 'Beef between two bun.s', 2),
('Poutine', '12.70', 'Frech fries with gravy and cheese curds.', 2),
-- SoulFu
('Shrimp Curry Waffles', '12.75', 'Spicy shrimp on top of 3 buttermilk waffles.', 3),
('Pork Fried Rice', '8.25', 'Pork fried with white rice, carrots, and peas.', 3),
('BBQ Potstickers', '9.75', 'Pan seared dumpling with spicy BBQ sauce.', 3);


end //
-- Change the statement terminator back to the original.
delimiter ;