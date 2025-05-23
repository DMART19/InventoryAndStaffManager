CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  category VARCHAR(100),
  lastRestocked DATE
);