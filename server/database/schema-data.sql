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
    on delete cascade,
    constraint foreign key (app_role_id) references app_role(app_role_id)
    on delete cascade,
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
    latitude decimal(8,6) not null,
    longitude decimal(9,6) not null,
 	`filters` varchar(250)

);

create table reviews (
	review_id int auto_increment primary key,
    review_text varchar(130) not null,
    app_user_id int not null,
    restaurant_id int not null,

    constraint foreign key (app_user_id) references app_user(app_user_id)
    on delete cascade,
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    on delete cascade
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
    on delete cascade,
    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    on delete cascade
);

create table menu (
	menu_id int auto_increment primary key,
    item_name varchar(50) not null,
    item_price decimal(4,2) not null,
    item_description varchar(120) not null,
	restaurant_id int not null,
    menu_image varchar(2048) not null,
	`filters` varchar(250) not null,

    constraint foreign key (restaurant_id) references restaurants(restaurant_id)
    on delete cascade
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

insert into restaurants (restaurant_name, phone_number, address, open_hours, descript, restaurant_image, latitude, longitude, `filters`) values
('Taco House', '612-555-0186', '111 taco street', 'Monday to Saturday - 10am to 11pm', 'Serving the best tacos in town since 1958', "/images/restaurant-overhead.jpg", 44.986657, -93.258139,"chicken,burrito,lettuce,taco,corn,tortilla,pico,peppers,beans,mexican,rice" ),
('Canadian Bacon', '612-555-0156', '333 bacon street', 'Tuesday to Saturday - 9am to 9pm', 'Serving the bacon burger in town since 1999', "/images/bar-outside.jpg", 44.946346, -93.305101,"bison,burger,lettuce,cheese,beef,fries,curds,gravy,poutine"),
('Soulfu', '612-555-0150', '555 tasty avenue', 'Monday to Friday - 11am to 8pm', 'Serving the best waffles in town since 2001', "/images/food-seasoning.jpg", 44.97482, -93.275941,"bbq,spicy,dumpling,potstickers,carrots,rice,peas,pork,fried,waffles,shrimp,curry,savory"),
('Party Fowl', '763-555-0133', '89391 Christiansen Road', 'Monday to Sunday - 10am to 8pm', 'Serving the best waffles in town since 2001', "/images/pub-orange.jpeg", 44.978471, -93.275941,"potato,fries,fried,chicken,spicy,savory,homemade,warm"),
('9021PHO', '612-555-9157', '685 Swift Valleys', 'Tuesday to Sunday - 11am to 10pm', 'Hipster-friendly fusion with a little extra spice.', "/images/kitchen-working.jpg", 44.977032, -93.272362,"crab,wontons,fried,tuna,leek,pizza,deep pan,pitta,duck,basil,kebab,savory"),
('Tequila Mockingbird', '612-555-2850', '93661 Bayer Square', 'Monday to Sunday - 11am to 11pm', 'We are a family-run operation spanning three generations of hard-working chefs.
We strive for an experience that blows you out of this world.', "/images/storefront-red.jpg", 44.969191, -93.247046,"cinnamon,bread,sweet,fluffy,corn,buttered,tequila,turkey,panini,smoked"),
('Vincent Van Doughnut', '763-555-1123', '4192 Pietro Crossing', 'Monday to Sunday - 6am to 12am', 'Attention-hungry humans! Welcome you to our world-class restaurant.', "/images/bakery-inside.jpg", 44.968174, -93.276598,"doughnuts,fresh,special,sweet,fresh,apple,crumble,cake,butter,pumpkin,bean"),
('Nacho Daddy', '952-555-3619', '411 Kareem Route', 'Monday to Friday - 11am to 8pm', 'You will get the OG taste of food at our restaurant.', "/images/cafe-inside.jpeg", 44.96548, -93.298057,"nacho,cheese,salsa,medium,cheesy,largeparty,nachos,large"),
('Lord of the Wings', '763-555-8712', '320 Mizey Junction', 'Monday to Saturday - 10am to 11pm', 'We do wings and only wings', "/images/cafe-dim.jpg", 44.952147, -93.293456,"wings,crispy,fresh,tangy,chicken,spicy,large"),
('Pastabilities', '952-555-5873', '531 Dickinson Road', 'Monday to Sunday - 11am to 11pm', 'Everything can be solved with a little pasta', "/images/cafe-seats.jpeg", 44.968053, -93.290599,"thyme,mozzarella,fresh,pizza,crispy,soup,mushroom,tofu,smoked,oyster mushroom,warm,pasta,canola,salad");

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

insert into orders (order_items, app_user_id, restaurant_id, order_date, item_quantity, total_price) values
('Chicken Burrito', 1, 1, '2022-12-21', 1,13.50),
('Bison Burger', 2, 2, '2022-12-28', 1, 15.00),
('Bison Burger', 2, 2, '2022-12-29', 1, 15.00),
('Shrimp Curry Waffles', 1, 3, '2023-10-01', 1, 12.75);

insert into menu (item_name, item_price, item_description, restaurant_id, menu_image,`filters`) values
-- Taco House
('Chicken Burrito', 13.50, 'Its a chicken burrito with beans.', 1, '/images/burrito-chicken.jpg',"chicken,burrito,lettuce"),
('Chicken Taco', 8.50, 'Ground chicken with pico and lettuce between a corn tortilla.', 1, "/images/taco.jpg","taco,chicken,lettuce,corn,tortilla,pico"),
('Mexican Rice', 6.70, 'Rice with beans and red and green peppers.', 1, "/images/mexican-rice.jpg","peppers,beans,mexican,rice"),
-- Canadian bacon
('Bison Burger', 15.00, 'Ground bison between two buns.', 2, "/images/bison-burger.jpg","bison,burger,lettuce,cheese"),
('Bacon Burger', 13.00, 'Beef between two bun.s', 2, "/images/baconburger.jpg","burger,beef,lettuce,cheese"),
('Poutine', 12.70, 'Frech fries with gravy and cheese curds.', 2, "/images/poutine.jpg","fries,cheese,curds,gravy,poutine"),
-- SoulFu
('Shrimp Curry Waffles', 12.75, 'Spicy shrimp on top of 3 buttermilk waffles.', 3, "/images/waffles.jpg","spicy,waffles,shrimp,curry,savory"),
('Pork Fried Rice', 8.25, 'Pork fried with white rice, carrots, and peas.', 3, "/images/pork-rice.jpg","carrots,rice,peas,pork,white rice,fried rice"),
('BBQ Potstickers', 9.75, 'Pan seared dumpling with spicy BBQ sauce.', 3, "/images/potsticker.jpg","bbq,spicy,dumpling,potstickers"),
-- Party Fowl
('Chicken Dinner', 19.75, 'Just like how Momma used to make.', 4, "/images/chicken-dinner.jpg","chicken,homemade,warm"),
('Fried Chicken', 14.00, 'Its a bird fried to golden perfection.', 4, "/images/fried-chicken.jpg","chicken,fried,spicy,savory"),
('French Fries ', 14.00, 'Fried potato strings.', 4, "/images/fries.jpg","potato,fries,fried potato"),
-- 9021PHO
('Basil and Duck Kebab', 17.50, 'Skewer-cooked fresh basil and duck served in warm pitta pockets.', 5, "/images/duck-kebab.jpg","pitta,duck,basil,kebab,savory"),
('Leek and Tuna Pizza', 25.00, 'Deep pan pizza topped with baby leek and tuna.', 5, "/images/leek-pizza.jpg","tuna,leek,pizza,deep pan"),
('Crab and nectarine wontons', 13.25, 'Crab and nectarine wontons.', 5, "/images/wontons.jpg","crab,wontons,fried"),
-- Tequila Mockingbird
('Turkey Panini', 9.50, 'A hot, pressed panini filled with smoked turkey.', 6, "/images/fries.jpg","tequila,turkey,panini,smoked"),
('Sweetcorn', 6.50, 'Buttered sweet corn.', 6, "/images/corn.jpg","corn,sweet,buttered"),
('Cinnamon Bread', 8.75, 'Fluffy bread with added cinnamon.', 6, "/images/cinnamon-bread.jpg","cinnamon,bread,sweet,fluffy"),
-- Vincent Van Doughnut
('Bean and pumpkin cake', 15.00, 'White cake made with bean and fresh pumpkin.', 7, "/images/pumpkin-cake.jpg","cake,pumpkin,bean,fresh"),
('Apple Crumble', 11.50, 'red apple cake topped with butter crumble.', 7, "/images/apple-crumble.jpg","fresh,apple,crumble,cake,butter"),
('13 Angry Doughnuts', 11.00, 'Thirteen of our weekly special doughnuts.', 7, "/images/doughnuts.jpg","doughnuts,fresh,special,sweet"),
-- Nacho Daddy
('Party Pack', 44.00, 'Good friends are like nachos. You can never have enough of them.', 8, "/images/nacho-party.jpg","party,nachos,large"),
('Nacho Nacho Man', 18.50, 'A cheesy mountain of epic proportions.', 8, "/images/nacho-man.jpg","cheesy,cheese,nacho,large"),
('Nacho Bizness', 13.25, 'Cheese and salsa heaven on top of yummy nacho goodness.', 8, "/images/nacho-bizness.jpg","nacho,cheese,salsa,medium"),
-- Lord of the Wings
('A Wing and a Prayer', 10.25, 'Our spiciest wings sauce on top of eight wings.', 9, "/images/wings-prayer.jpg","wings,chicken,spicy,large"),
('Winged Perfection', 12.75, 'Award winning wings with a tangy dry rub', 9, "/images/wings-perfection.jpg","tangy,chicken,wings"),
('Queen Wings', 14.50, 'Crispy fried wings fit for a Queen', 9, "/images/wings-queen.jpg","wings,crispy,fresh"),
-- Pastabilities
('Canola oil and pasta salad', 19.00, 'A crisp salad featuring canola oil and dried pasta', 10, "/images/pasta-salad.jpg","pasta,canola,salad,fresh"),
('Tofu and mushroom soup', 13.00, 'Smoked tofu and oyster mushroom combined into chunky soup', 10, "/images/mushroom-soup.jpg","soup,mushroom,tofu,smoked,oyster mushroom,warm"),
('Mozzarella and thyme pizza', 18.00, 'Thin and crispy pizza topped with fresh mozzarella and thyme', 10, "/images/mozzarella.jpg","thyme,mozzarella,fresh,pizza,crispy");
