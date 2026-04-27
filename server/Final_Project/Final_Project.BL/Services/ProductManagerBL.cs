using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class ProductManagerBL : IProductManagerBL
    {
        private readonly ProductManagerService _productManager = new ProductManagerService();

        public List<ProductModel> GetAllProducts()
        {
            var products = _productManager.GetAllProducts();
            return products.Select(p => new ProductModel
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                ImageUrl = p.ImageUrl
            }).ToList();
        }

        public int AddProduct(string productName, string? description,
                               decimal price, int? stockQuantity, string? imageUrl)
        {
            if (string.IsNullOrEmpty(productName))
                throw new Exception("שם המוצר לא יכול להיות ריק");

            if (price <= 0)
                throw new Exception("המחיר חייב להיות חיובי");

            var product = new Product
            {
                ProductName = productName,
                Description = description,
                Price = price,
                StockQuantity = stockQuantity,
                ImageUrl = imageUrl
            };

            return _productManager.AddProduct(product);
        }

        public bool UpdateProduct(int productId, string productName, string? description,
                                   decimal price, int? stockQuantity, string? imageUrl)
        {
            if (string.IsNullOrEmpty(productName))
                throw new Exception("שם המוצר לא יכול להיות ריק");

            if (price <= 0)
                throw new Exception("המחיר חייב להיות חיובי");

            var product = new Product
            {
                ProductId = productId,
                ProductName = productName,
                Description = description,
                Price = price,
                StockQuantity = stockQuantity,
                ImageUrl = imageUrl
            };

            return _productManager.UpdateProduct(product);
        }

        public bool DeleteProduct(int productId)
        {
            return _productManager.DeleteProduct(productId);
        }
    }
}