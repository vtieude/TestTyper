 CREATE TABLE IF NOT EXISTS flight (
                id int NOT NULL AUTO_INCREMENT,  
                ip_address varchar(15) NOT NULL,
                original_itinerary JSON NOT NULL,
                final_itinerary JSON NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                PRIMARY KEY(id)
            )