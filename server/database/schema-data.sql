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

    constraint foreign key (app_user_id) references app_user(app_user_id)
    ON DELETE CASCADE,
    constraint foreign key (app_role_id) references app_role(app_role_id)
    ON DELETE CASCADE,
    constraint primary key (app_user_id, app_role_id)
);

create table restaurants (
	restaurant_id int auto_increment primary key,
    restaurant_name varchar(50) not null unique,
    phone_number varchar(12) not null unique,
    address varchar(120) not null unique,
    open_hours varchar(120) not null,
    descript varchar(350) not null,
    restaurant_image varchar(2040) not null,
	`filter` varchar(250) not null

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
    order_date date not null,
    item_quantity int not null,
    total_price decimal(4,2) not null,


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
    menu_image varchar(2048) not null,
	`filter` varchar(250) not null,

    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    ON DELETE CASCADE
);

insert into app_role (name) values
('USER'),
('ADMIN');

-- johndoe is top-secret-password
-- janedoe is bad-password
-- shurst is butterfly
-- blucky is 2-the-moon
-- afalls is trinity-2000
-- marksmith is marzbarz
insert into app_user (first_name, last_name, username, passhash, email) values
('John', 'Doe', 'johndoe', '$2a$12$NNYEMXoCytN.jhFPmFzZFu6IKmZYHJHTN7unGpRBf8q0TxgogJQ6G', 'johndoe@email.com'),
('Jane', 'Doe', 'janedoe', '$2a$12$udDF/wYAOJNMW6e/yAt2xu98PGo5fKd1UBFi2w2zybtmfoldhoXSW', 'janedoe@email.com'),
('Sam', 'Hurst', 'shurst', '$2a$12$3APECHx23lqiuSLz0IeVyeUfz5fEIZkLPIvjnYUqsutzwjRURAe9C', 'shurst@msn.com'),
('Ben', 'Luck', 'blucky', '$2a$12$J24ghomhtWx1qnW1VwjWIOxkivbUd5YSQ4D7So6diiBA6B122aBwy', 'blucky@email.com'),
('Alice', 'Falls', 'afalls', '$2a$12$L91R/IpuSqxVAU5OgBKBGu75e/ICxH7ELhuaDjKOlKbUm4dlfF9o6', 'alice@gmail.com'),
('Mark', 'Smith', 'marksmith', '$2a$12$AjtBZu1/EbGSmH8sv/dYSeT9icOVhTXOrlFhgVsfVEmKnrTnQcGne', 'mark@gmail.com');

insert into user_roles (app_user_id, app_role_id) values
( 1, 1 ),
( 2, 2 ),
( 3, 1 ),
( 4, 1 ),
( 5, 1 ),
( 6, 2 );

insert into restaurants (restaurant_name, phone_number, address, open_hours, descript, restaurant_image) values
('Taco House', '612-555-0186', '111 taco street', 'Monday to Saturday - 10am to 11pm', 'Serving the best tacos in town since 1958', "./assets/images/restaurant-overhead.jpg"),
('Canadian Bacon', '612-555-0156', '333 bacon street', 'Tuesday to Saturday - 9am to 9pm', 'Serving the bacon burger in town since 1999', "./assets/images/bar-outside.jpg"),
('Soulfu', '612-555-0150', '555 tasty avenue', 'Monday to Friday - 11am to 8pm', 'Serving the best waffles in town since 2001', "./assets/images/food-seasoning.jpg"),
('Party Fowl', '763-555-0133', '89391 Christiansen Road', 'Monday to Sunday - 10am to 8pm', 'Serving the best waffles in town since 2001', "./assets/images/pub-orange.jpg"),
('9021PHO', '612-555-9157', '685 Swift Valleys', 'Tuesday to Sunday - 11am to 10pm', 'Hipster-friendly fusion with a little extra spice.', "./assets/images/kitchen-working.jpg"),
('Tequila Mockingbird', '612-555-2850', '93661 Bayer Square', 'Monday to Sunday - 11am to 11pm', 'We are a family-run operation spanning three generations of hard-working chefs.
We strive for an experience that blows you out of this world.', "./assets/images/storefront-red.jpg"),
('Vincent Van Doughnut', '763-555-1123', '4192 Pietro Crossing', 'Monday to Sunday - 6am to 12am', 'Attention-hungry humans! Welcome you to our world-class restaurant.', "./assets/images/bakery-inside.jpg"),
('Nacho Daddy', '952-555-3619', '411 Kareem Route', 'Monday to Friday - 11am to 8pm', 'You will get the OG taste of food at our restaurant.', "./assets/images/cafe-inside.jpg"),
('Lord of the Wings', '763-555-8712', '320 Mizey Junction', 'Monday to Saturday - 10am to 11pm', 'We do wings and only wings', "./assets/images/cafe-dim.jpg"),
('Pastabilities', '952-555-5873', '531 Dickinson Road', 'Monday to Sunday - 11am to 11pm', 'Everything can be solved with a little pasta', "./assets/images/cafe-seats.jpg");

insert into reviews (review_text, app_user_id, restaurant_id) values
-- Taco House
('It was great!', 1, 1),
('I love the bean bowl.', 3, 1),
('Amazing food.', 4, 1),
-- Canadian bacon
('We loved our visit to Canadian Bacon and we love ordering takeout from there!', 5, 2),
('Good stuff.', 1, 2),
('Love it.', 3, 2),
-- SoulFu
('It was heavenly.', 4, 3),
('Highly Recommend.', 5, 3),
('Its ok.', 1, 3),
-- Party Fowl
('Super great!', 3, 4),
('Amazing food.', 4, 4),
('Love it.', 5, 4),
-- 9021PHO
('Decent place. Everything I tried was bursting with flavor.', 1, 5),
('Overall experience: 4 stars.', 3, 5),
('Everything was just so yummy.', 4, 5),
-- Tequila Mockingbird
('It was much better than I expected.', 5, 6),
('The food was flavorful, savory, and succulent.', 1, 6),
('Easily earned their 5 stars!', 3, 6),
-- Vincent Van Doughnut
('I tried was bursting with flavor..', 4, 7),
('Highly Recommend', 5, 7),
('Make sure to save room for dessert, its amazing!', 1, 7),
-- Nacho Daddy
('It was much better than I expected.', 3, 8),
('Yummers!', 4, 8),
('They got a new customer for life!', 5, 8),
-- Lord of the Wings
('The entrees are simply to die for.', 1, 9),
('Everything from the starters to the entrees to the desserts meshed perfectly with my flavor-profile.', 3, 9),
(' The food was cooked to perfection. Id give more than 5 stars if I could!', 4, 9),
-- Pastabilities
('It was much better than I expected.', 5, 10),
('Try out the huge selection of incredible appetizers.', 1, 10),
('This place had a lot of heart.', 3, 10);

insert into orders (order_items, app_user_id, restaurant_id) values
('Chicken Burrito', 1, 1),
('Bison Burger', 2, 2),
('Bison Burger', 2, 2),
('Shrimp Curry Waffles', 1, 3);

insert into menu (item_name, item_price, item_description, restaurant_id, menu_image) values
-- Taco House
('Chicken Burrito', '13.50', 'Its a chicken burrito with beans.', 1, './assets/images/burrito-chicken.jpg'),
('Chicken Taco', '8.50', 'Ground chicken with pico and lettuce between a corn tortilla.', 1, "./assets/images/taco.jpg"),
('Mexican Rice', '6.70', 'Rice with beans and red and green peppers.', 1, "./assets/images/mexican-rice.jpg"),
-- Canadian bacon
('Bison Burger', '15.00', 'Ground bison between two buns.', 2, "./assets/images/bison-burger.jpg"),
('Bacon Burger', '13.00', 'Beef between two bun.s', 2, "./assets/images/baconburger.jpg"),
('Poutine', '12.70', 'Frech fries with gravy and cheese curds.', 2, "./assets/images/poutine.jpg"),
-- SoulFu
('Shrimp Curry Waffles', '12.75', 'Spicy shrimp on top of 3 buttermilk waffles.', 3, "./assets/images/waffles.jpg"),
('Pork Fried Rice', '8.25', 'Pork fried with white rice, carrots, and peas.', 3, "./assets/images/pork-rice.jpg"),
('BBQ Potstickers', '9.75', 'Pan seared dumpling with spicy BBQ sauce.', 3, "./assets/images/potsticker.jpg"),
-- Party Fowl
('Chicken Dinner', '19.75', 'Just like how Momma used to make.', 4, "./assets/images/chicken-dinner.jpg"),
('Fried Chicken', '14.00', 'Its a bird fried to golden perfection.', 4, "./assets/images/fried-chicken.jpg"),
('French Fries ', '14.00', 'Fried potato strings.', 4, "./assets/images/fries.jpg"),
-- 9021PHO
('Basil and Duck Kebab', '17.50', 'Skewer-cooked fresh basil and duck served in warm pitta pockets.', 5, "./assets/images/duck-kebab.jpg"),
('Leek and Tuna Pizza', '25.00', 'Deep pan pizza topped with baby leek and tuna.', 5, "./assets/images/leek-pizza.jpg"),
('Crab and nectarine wontons', '13.25', 'Crab and nectarine wontons.', 5, "./assets/images/wontons.jpg"),
-- Tequila Mockingbird
('Turkey Panini', '9.50', 'A hot, pressed panini filled with smoked turkey.', 6, "./assets/images/fries.jpg"),
('Sweetcorn', '6.50', 'Buttered sweet corn.', 6, "./assets/images/corn.jpg"),
('Cinnamon Bread', '8.75', 'Fluffy bread with added cinnamon.', 6, "./assets/images/cinnamon-bread.jpg"),
-- Vincent Van Doughnut
('Bean and pumpkin cake', '15.00', 'White cake made with bean and fresh pumpkin.', 7, "./assets/images/pumpkin-cake.jpg"),
('Apple Crumble', '11.50', 'red apple cake topped with butter crumble.', 7, "./assets/images/apple-crumble.jpg"),
('13 Angry Doughnuts', '11.00', 'Thirteen of our weekly special doughnuts.', 7, "./assets/images/doughnuts.jpg"),
-- Nacho Daddy
('Party Pack', '44.00', 'Good friends are like nachos. You can never have enough of them.', 8, "./assets/images/nacho-party.jpg"),
('Nacho Nacho Man', '18.50', 'A cheesy mountain of epic proportions.', 8, "./assets/images/nacho-man.jpg"),
('Nacho Bizness', '13.25', 'Cheese and salsa heaven on top of yummy nacho goodness.', 8, "./assets/images/nacho-bizness.jpg"),
-- Lord of the Wings
('A Wing and a Prayer', '10.25', 'Our spiciest wings sauce on top of eight wings.', 9, "./assets/images/wings-prayer.jpg"),
('Winged Perfection', '12.75', 'Award winning wings with a tangy dry rub', 9, "./assets/images/wings-perfection.jpg"),
('Queen Wings', '14.50', 'Crispy fried wings fit for a Queen', 9, "./assets/images/wings-queen.jpg"),
-- Pastabilities
('Canola oil and pasta salad', '19.00', 'A crisp salad featuring canola oil and dried pasta', 10, "./assets/images/pasta-salad.jpg"),
('Tofu and mushroom soup', '13.00', 'Smoked tofu and oyster mushroom combined into chunky soup', 10, "./assets/images/mushroom-soup.jpg"),
('Mozzarella and thyme pizza', 18.00, 'Thin and crispy pizza topped with fresh mozzarella and thyme', 10, "./assets/images/mozzarella.jpg");
