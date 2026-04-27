using Final_Project.BL.Api;
using Final_Project.BL.Models;
using Final_Project.Dal.models;
using Final_Project.Dal.Servises;

namespace Final_Project.BL.Services
{
    public class ServiceManagerBL : IServiceManagerBL
    {
        private readonly ServiceManagerService _serviceManager = new ServiceManagerService();

        public List<ServiceModel> GetAllServices()
        {
            var services = _serviceManager.GetAllServices();
            return services.Select(s => new ServiceModel
            {
                ServiceId = s.ServiceId,
                ServiceName = s.ServiceName,
                Timetoservice = s.Timetoservice,
                Price = s.Price
            }).ToList();
        }

        public int AddService(string serviceName, int timetoservice, decimal price)
        {
            if (string.IsNullOrEmpty(serviceName))
                throw new Exception("שם השירות לא יכול להיות ריק");

            if (price <= 0)
                throw new Exception("המחיר חייב להיות חיובי");

            if (timetoservice <= 0)
                throw new Exception("זמן השירות חייב להיות חיובי");

            var service = new Service
            {
                ServiceName = serviceName,
                Timetoservice = timetoservice,
                Price = price
            };

            return _serviceManager.AddService(service);
        }

        public bool UpdateService(int serviceId, string serviceName,
                                   int timetoservice, decimal price)
        {
            if (string.IsNullOrEmpty(serviceName))
                throw new Exception("שם השירות לא יכול להיות ריק");

            if (price <= 0)
                throw new Exception("המחיר חייב להיות חיובי");

            var service = new Service
            {
                ServiceId = serviceId,
                ServiceName = serviceName,
                Timetoservice = timetoservice,
                Price = price
            };

            return _serviceManager.UpdateService(service);
        }

        public bool DeleteService(int serviceId)
        {
            return _serviceManager.DeleteService(serviceId);
        }
    }
}