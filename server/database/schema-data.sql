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
    phone_number varchar(12) not null unique,
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
-- shurst is butterfly
-- blucky is 2-the-moon
-- afalls is trinity_2000
-- marksmith is marzbarz
insert into app_user (first_name, last_name, username, passhash, email) values
('John', 'Doe', 'johndoe', '$2a$12$NNYEMXoCytN.jhFPmFzZFu6IKmZYHJHTN7unGpRBf8q0TxgogJQ6G', 'johndoe@email.com'),
('Jane', 'Doe', 'janedoe', '$2a$12$udDF/wYAOJNMW6e/yAt2xu98PGo5fKd1UBFi2w2zybtmfoldhoXSW', 'janedoe@email.com'),
('Sam', 'Hurst', 'shurst', '$2a$12$3APECHx23lqiuSLz0IeVyeUfz5fEIZkLPIvjnYUqsutzwjRURAe9C', 'shurst@msn.com'),
('Ben', 'Luck', 'blucky', '$2a$12$J24ghomhtWx1qnW1VwjWIOxkivbUd5YSQ4D7So6diiBA6B122aBwy', 'blucky@email.com'),
('Alice', 'Falls', 'afalls', '$2a$12$An.Cvb2BXLFfzqOaobdS5uWwfEknrWFsnATySTyOy5f1v8kTou0yq ', 'alice@gmail.com'),
('Mark', 'Smith', 'marksmith', '$2a$12$AjtBZu1/EbGSmH8sv/dYSeT9icOVhTXOrlFhgVsfVEmKnrTnQcGne', 'mark@gmail.com');

insert into user_roles (app_user_id, app_role_id) values
( 1, 1 ),
( 2, 2 ),
( 3, 1 ),
( 4, 1 ),
( 5, 1 ),
( 6, 2 );

insert into restaurants (restaurant_name, phone_number, address, open_hours, descript) values
('Taco House', '612-555-0186', '111 taco street', 'Monday to Saturday - 10am to 11pm', 'Serving the best tacos in town since 1958'),
('Canadian Bacon', '612-555-0156', '333 bacon street', 'Tuesday to Saturday - 9am to 9pm', 'Serving the bacon burger in town since 1999'),
('Soulfu', '612-555-0150', '555 tasty avenue', 'Monday to Friday - 11am to 8pm', 'Serving the best waffles in town since 2001'),
('Party Fowl', '763-555-0133', '89391 Christiansen Road', 'Monday to Sunday - 10am to 8pm', 'Serving the best waffles in town since 2001'),
('9021PHO', '612-555-9157', '685 Swift Valleys', 'Tuesday to Sunday - 11am to 10pm', 'Hipster-friendly fusion with a little extra spice.'),
('Tequila Mockingbird', '612-555-2850', '93661 Bayer Square', 'Monday to Sunday - 11am to 11pm', 'We are a family-run operation spanning three generations of hard-working chefs.  
We strive for an experience that blows you out of this world.'),
('Vincent Van Doughnut', '763-555-1123', '4192 Pietro Crossing', 'Monday to Sunday - 6am to 12am', 'Attention-hungry humans! Welcome you to our world-class restaurant.'),
('Nacho Daddy', '952-555-3619', '411 Kareem Route', 'Monday to Friday - 11am to 8pm', 'You will get the OG taste of food at our restaurant.'),
('Lord of the Wings', '763-555-8712', '320 Mizey Junction', 'Monday to Saturday - 10am to 11pm', 'We do wings and only wings'),
('Pastabilities', '952-555-5873', '531 Dickinson Road', 'Monday to Sunday - 11am to 11pm', 'Everything can be solved with a little pasta');



-- insert into orders (order_items, app_user_id, restaurant_id) values
-- ('Chicken Burrito', 1, 1),
-- ('Bison Burger', 2, 2),
-- ('Bison Burger', 2, 2),
-- ('Shrimp Curry Waffles', 1, 3),
