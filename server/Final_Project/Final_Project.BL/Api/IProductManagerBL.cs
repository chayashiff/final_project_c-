using Final_Project.BL.Models;

namespace Final_Project.BL.Api
{
    public interface IProductManagerBL
    {
        List<ProductModel> GetAllProducts();
        int AddProduct(string productName, string? description,
                       decimal price, int? stockQuantity, string? imageUrl);
        bool UpdateProduct(int productId, string productName, string? description,
                           decimal price, int? stockQuantity, string? imageUrl);
        bool DeleteProduct(int productId);
    }
}