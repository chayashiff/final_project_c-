using Final_Project.Dal.Api;
using Final_Project.Dal.models;

namespace Final_Project.Dal.Servises
{
    public class ServiceManagerService : IServiceManager
    {
        public List<Service> GetAllServices()
        {
            try
            {
                using (var context = new dbmanager())
                {
                    return context.Services.ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new List<Service>();
            }
        }

        public int AddService(Service service)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    context.Services.Add(service);
                    context.SaveChanges();
                    return service.ServiceId;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return -1;
            }
        }

        public bool UpdateService(Service service)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var existing = context.Services.FirstOrDefault(s => s.ServiceId == service.ServiceId);
                    if (existing == null) return false;

                    existing.ServiceName = service.ServiceName;
                    existing.Price = service.Price;
                    existing.Timetoservice = service.Timetoservice;

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

        public bool DeleteService(int serviceId)
        {
            try
            {
                using (var context = new dbmanager())
                {
                    var service = context.Services.FirstOrDefault(s => s.ServiceId == serviceId);
                    if (service == null) return false;

                    context.Services.Remove(service);
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