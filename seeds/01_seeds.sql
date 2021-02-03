INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'jasonAAAAvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Etta West ', 'charlielevy@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Margaret Wong ', 'makaylaweiss@icloud.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Leroy Hart', 'jaycereynolds@inbox.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country,street, city, province, post_code, active)
VALUES(1, 'Speed', 'Description','www.thub.com', 'www.photo.com', 1000, 2, 2 , 2, 'Canada', 'W Broadway','van' , 'BC', 'l5r3qq',TRUE),
(1, 'Apeed', 'Description','www.thub.com', 'www.photo.com', 200, 33, 2 , 2, 'Canada', 'W Broadway','van' , 'BC', 'l5r3qq',TRUE),
(2, 'Bpeed', 'Description','www.thub.com', 'www.photo.com', 3000, 2, 33 , 2, 'Canada', 'W Broadway','van' , 'BC', 'l5r3q12',TRUE),
(3, 'Cpeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE),
(4, 'Dpeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE),
(5, 'Epeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE),
(6, 'Fpeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE),
(7, 'Fpeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE),
(8, 'Gpeed', 'Description','www.thub.com', 'www.photo.com', 4000, 2, 2 , 33, 'Canada', 'W Broadway','van' , 'BC', 'l5raaaq',TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-11', 1,1),
('2018-09-11', '2018-10-11', 2,2),
('2018-09-11', '2018-11-11', 3,3),
('2018-09-11', '2019-12-11', 4,4),
('2018-09-11', '2019-10-11', 5,5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2,2,31,1,'message'),
(3,3,32,4,'message'),
(4,4,33,5,'message'),
(5,5,34,2,'message'),
(6,6,35,4,'message');