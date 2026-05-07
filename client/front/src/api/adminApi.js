import api from "./authApi";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ── משתמשים ──
export const getAllUsers = async () => {
  const response = await api.get("/Admin/users", getAuthHeaders());
  return response.data;
};

// ── תורים ──
export const getAllAppointments = async () => {
  const response = await api.get("/Admin/appointments", getAuthHeaders());
  return response.data;
};

// ── סטטיסטיקות ──
export const getStatistics = async () => {
  const response = await api.get("/Admin/statistics", getAuthHeaders());
  return response.data;
};

// ── שירותים ──
export const getAllServices = async () => {
  const response = await api.get("/Admin/services", getAuthHeaders());
  return response.data;
};

export const addService = async (serviceName, timetoservice, price) => {
  const response = await api.post(
    `/Admin/services?serviceName=${serviceName}&timetoservice=${timetoservice}&price=${price}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const updateService = async (id, serviceName, timetoservice, price) => {
  const response = await api.put(
    `/Admin/services/${id}?serviceName=${serviceName}&timetoservice=${timetoservice}&price=${price}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/Admin/services/${id}`, getAuthHeaders());
  return response.data;
};

// ── מוצרים ──
export const getAllProducts = async () => {
  const response = await api.get("/Admin/products", getAuthHeaders());
  return response.data;
};

export const addProduct = async (productName, description, price, stockQuantity, imageUrl) => {
  const response = await api.post(
    `/Admin/products?productName=${productName}&description=${description}&price=${price}&stockQuantity=${stockQuantity}&imageUrl=${imageUrl}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const updateProduct = async (id, productName, description, price, stockQuantity, imageUrl) => {
  const response = await api.put(
    `/Admin/products/${id}?productName=${productName}&description=${description}&price=${price}&stockQuantity=${stockQuantity}&imageUrl=${imageUrl}`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/Admin/products/${id}`, getAuthHeaders());
  return response.data;
};

// ── לוגים ──
export const getAllLogs = async () => {
  const response = await api.get("/Admin/logs", getAuthHeaders());
  return response.data;
};

// ── תורים להיום ──
export const getTodayAppointments = async () => {
  const response = await api.get("/Admin/today", getAuthHeaders());
  return response.data;
};

// ── הכנסות לפי חודש ──
export const getRevenueByMonth = async () => {
  const response = await api.get("/Admin/revenue-by-month", getAuthHeaders());
  return response.data;
};

// ── תורים לפי שירות ──
export const getAppointmentsByService = async () => {
  const response = await api.get("/Admin/appointments-by-service", getAuthHeaders());
  return response.data;
};