using Final_Project.Dal.models;

namespace Final_Project.Dal.Api
{
    public interface IServiceManager
    {
        List<Service> GetAllServices();
        int AddService(Service service);
        bool UpdateService(Service service);
        bool DeleteService(int serviceId);
    }
}