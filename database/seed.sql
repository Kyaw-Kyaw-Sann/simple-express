USE simple_express_db;

INSERT IGNORE INTO users (id, name, role)
VALUES
  (1, 'Aung Aung', 'admin'),
  (2, 'Su Su', 'member'),
  (3, 'Ko Ko', 'member');
