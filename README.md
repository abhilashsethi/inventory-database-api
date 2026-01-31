Database Schema Explanation

The database has two tables: Supplier and Inventory.
A supplier can have multiple inventory items, forming a one-to-many relationship.
Inventory.supplierId is a foreign key referencing Supplier.id.

Why SQL Was Chosen

SQL was chosen because the data is relational and requires joins and aggregations.
PostgreSQL ensures data integrity, consistency, and efficient querying for this use case.

Indexing / Optimization Suggestion

Adding an index on Inventory.supplierId would improve performance for supplier-based queries and aggregations.
