using Final_Project.Dal.models;

namespace Final_Project.Dal.Api
{
    public interface IProductManager
    {
        List<Product> GetAllProducts();
        int AddProduct(Product product);
        bool UpdateProduct(Product product);
        bool DeleteProduct(int productId);
    }
}