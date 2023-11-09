-- Join the two tables so that every column and record appears,
--  regardless of if there is not an `owner_id`
SELECT * FROM owners LEFT JOIN vehicles ON owners.id = vehicles.owner_id;

-- Count the number of cars for each owner. Display the owners first_name,
-- last_name, and count of vehicles. The first_name should be ordered in 
-- ascending order. Your output should look like this:
select owners.first_name, owners.last_name, ownerCount.count_of_cars
FROM owners JOIN (
  SELECT owner_id, count(id) as count_of_cars
  FROM vehicles
  GROUP BY owner_id
) as ownerCount ON owners.id = ownerCount.owner_id
ORDER BY owners.first_name;

-- Count the number of cars for each owner and display the average price for 
--  each of the cars as integers. Display the owners first_name , last_name, 
--  average price and count of vehicles. The first_name should be ordered in 
--  descending order. Only display results with more than one vehicle and an 
--  average price greater than 10000.
SELECT owners.first_name, owners.last_name, round(cars.avg_price), cars.car_count
FROM owners JOIN (
  SELECT owner_id, count(id) as car_count, avg(price) as avg_price
  FROM vehicles
  GROUP BY owner_id
) as cars on owners.id = cars.owner_id
WHERE car_count > 1 
AND avg_price > 10000
ORDER BY first_name desc;