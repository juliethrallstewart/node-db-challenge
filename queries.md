# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
CategoryId = foreign key

select p.ProductName, c.CategoryName
from products as p
join categories as c on c.CategoryId = p.CategoryId

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
ShipperId = foreign key

select o.OrderId, s.ShipperName
from [Orders] as o
join shippers as s on s.ShipperId = o.ShipperId
where o.OrderDate < '1997-01-09'

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

select p.ProductName, od.Quantity
from OrderDetails as od
join Products as p on p.ProductID = od.ProductID
where od.OrderId = 10251
order by p.ProductName

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
EmployeeId & CustomerId = Fk

select o.OrderId as [Order Id], c.CustomerName as [Customer Name], e.LastName as [Employee Last Name]
from [Orders] as o
join customers as c on c.customerID = o.CustomerID
join employees as e on e.EmployeeId = o.EmployeeId


### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

ALTER TABLE categories
ADD Count;


### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 