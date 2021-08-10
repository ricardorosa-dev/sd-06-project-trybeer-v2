use Trybeer;
select
sales_products.product_id as idProduct,
sales_products.quantity as quantity,
sales.id as idSales,
sales.sale_date as dateSale,
products.name as productName,
products.price as price
from sales_products
inner join sales on sales_products.sale_id = sales.id
inner join products on sales_products.product_id = products.id
where sale_id=1
Order by productName;
