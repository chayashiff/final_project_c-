using Final_Project.BL.Models;

namespace Final_Project.BL.Api
{
    public interface IServiceManagerBL
    {
        List<ServiceModel> GetAllServices();
        int AddService(string serviceName, int timetoservice, decimal price);
        bool UpdateService(int serviceId, string serviceName, int timetoservice, decimal price);
        bool DeleteService(int serviceId);
    }
}