using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Servises
{
    public class ProductManagerService : IProductManager
    {
        public List<Product> GetAllProducts()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Products.ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new List<Product>();
            }
        }

        public int AddProduct(Product product)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    context.Products.Add(product);
                    context.SaveChanges();
                    return product.ProductId;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }

        public bool UpdateProduct(Product product)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var existing = context.Products.FirstOrDefault(p => p.ProductId == product.ProductId);
                    if (existing == null) return false;

                    existing.ProductName = product.ProductName;
                    existing.Description = product.Description;
                    existing.Price = product.Price;
                    existing.StockQuantity = product.StockQuantity;
                    existing.ImageUrl = product.ImageUrl;

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }

        public bool DeleteProduct(int productId)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var product = context.Products.FirstOrDefault(p => p.ProductId == productId);
                    if (product == null) return false;

                    context.Products.Remove(product);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
    }
}