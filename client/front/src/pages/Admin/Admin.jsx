import { useState, useEffect } from "react";
import NavbarAdmin from "../../components/Navbar/NavbarAdmin";
import {
  getAllUsers, getAllAppointments, getStatistics,
  getAllServices, addService, updateService, deleteService,
  getAllProducts, addProduct, updateProduct, deleteProduct,
  getAllLogs, getTodayAppointments,
  getRevenueByMonth, getAppointmentsByService
} from "../../api/adminApi";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#D4939A", "#7eb8d4", "#a8d8a8", "#f4a460", "#9b8ea8", "#f9c74f", "#90be6d"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [statistics, setStatistics] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [appointmentsByService, setAppointmentsByService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [serviceForm, setServiceForm] = useState({ serviceName: "", timetoservice: "", price: "" });
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [productForm, setProductForm] = useState({ productName: "", description: "", price: "", stockQuantity: "", imageUrl: "" });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "dashboard") {
        const [stats, today, revenue, byService] = await Promise.all([
          getStatistics(),
          getTodayAppointments(),
          getRevenueByMonth(),
          getAppointmentsByService()
        ]);
        setStatistics(stats);
        setTodayAppointments(today);
        setRevenueByMonth(revenue);
        setAppointmentsByService(byService);
      } else if (activeTab === "logs") {
        const data = await getAllLogs();
        setLogs(data);
      } else if (activeTab === "users") {
        const data = await getAllUsers();
        setUsers(data);
      } else if (activeTab === "appointments") {
        const data = await getAllAppointments();
        setAppointments(data);
      } else if (activeTab === "services") {
        const data = await getAllServices();
        setServices(data);
      } else if (activeTab === "products") {
        const data = await getAllProducts();
        setProducts(data);
      }
    } catch (err) {
      setError("שגיאה בטעינת הנתונים");
    }
    setLoading(false);
  };

  const getBarData = () => {
    const counts = {};
    logs.forEach(log => {
      const date = new Date(log.actionDate).toLocaleDateString("he-IL");
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).slice(-7).map(([date, count]) => ({ date, count }));
  };

  const getPieData = () => {
    const counts = {};
    logs.forEach(log => {
      counts[log.action] = (counts[log.action] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const handleServiceSubmit = async () => {
    try {
      if (editingServiceId) {
        await updateService(editingServiceId, serviceForm.serviceName, serviceForm.timetoservice, serviceForm.price);
      } else {
        await addService(serviceForm.serviceName, serviceForm.timetoservice, serviceForm.price);
      }
      setServiceForm({ serviceName: "", timetoservice: "", price: "" });
      setEditingServiceId(null);
      fetchData();
    } catch (err) { setError("שגיאה בשמירת השירות"); }
  };

  const handleEditService = (service) => {
    setEditingServiceId(service.serviceId);
    setServiceForm({ serviceName: service.serviceName, timetoservice: service.timetoservice, price: service.price });
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("האם למחוק את השירות?")) return;
    await deleteService(id);
    fetchData();
  };

  const handleProductSubmit = async () => {
    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productForm.productName, productForm.description, productForm.price, productForm.stockQuantity, productForm.imageUrl);
      } else {
        await addProduct(productForm.productName, productForm.description, productForm.price, productForm.stockQuantity, productForm.imageUrl);
      }
      setProductForm({ productName: "", description: "", price: "", stockQuantity: "", imageUrl: "" });
      setEditingProductId(null);
      fetchData();
    } catch (err) { setError("שגיאה בשמירת המוצר"); }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.productId);
    setProductForm({ productName: product.productName, description: product.description || "", price: product.price, stockQuantity: product.stockQuantity || "", imageUrl: product.imageUrl || "" });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("האם למחוק את המוצר?")) return;
    await deleteProduct(id);
    fetchData();
  };

  const tabs = [
    { id: "dashboard", label: "🏠 דשבורד" },
    { id: "logs", label: "📋 לוגים וגרפים" },
    { id: "appointments", label: "📅 תורים" },
    { id: "users", label: "👥 משתמשים" },
    { id: "services", label: "✂️ שירותים" },
    { id: "products", label: "🛍️ מוצרים" },
  ];

  const CardStyle = {
    background: "white", borderRadius: "15px", padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)", marginBottom: "24px"
  };

  return (
    <div style={{ direction: "rtl", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#fdf0f1" }}>
      <NavbarAdmin />
      <div style={{ padding: "100px 20px 20px 20px" }}>

        {/* טאבים */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", justifyContent: "center", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "10px 20px", borderRadius: "20px", border: "none",
              backgroundColor: activeTab === tab.id ? "#D4939A" : "#f0f0f0",
              color: activeTab === tab.id ? "white" : "#333",
              cursor: "pointer", fontWeight: "bold", fontSize: "14px"
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {loading && <p style={{ textAlign: "center" }}>טוען...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* דשבורד */}
        {activeTab === "dashboard" && (
          <div>
            {/* כרטיסי סטטיסטיקות */}
            {statistics && (
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
                {[
                  { label: "השירות הפופולרי", value: statistics.mostPopularService, icon: "✂️" },
                  { label: "סך הכנסות", value: `₪${statistics.totalRevenue}`, icon: "💰" },
                  { label: "סה״כ משתמשים", value: statistics.totalUsers, icon: "👥" },
                  { label: "משתמשים חדשים החודש", value: statistics.newUsersThisMonth, icon: "🆕" },
                  { label: "תורים השבוע", value: statistics.appointmentsThisWeek, icon: "📅" },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: "white", borderRadius: "15px", padding: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center", minWidth: "150px"
                  }}>
                    <div style={{ fontSize: "32px" }}>{stat.icon}</div>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#D4939A" }}>{stat.value}</div>
                    <div style={{ color: "#666", fontSize: "13px", marginTop: "4px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* שני גרפים בשורה */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
              {/* גרף הכנסות לפי חודש */}
              <div style={{ ...CardStyle, flex: 1, minWidth: "300px" }}>
                <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>💰 הכנסות לפי חודש</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₪${value}`} />
                    <Bar dataKey="revenue" name="הכנסות" fill="#D4939A" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* גרף תורים לפי שירות */}
              <div style={{ ...CardStyle, flex: 1, minWidth: "300px" }}>
                <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>✂️ תורים לפי שירות</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={appointmentsByService} dataKey="value" nameKey="name"
                      cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`}>
                      {appointmentsByService.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* תורים להיום */}
            <div style={CardStyle}>
              <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>📅 תורים להיום</h2>
              {todayAppointments.length === 0 ? (
                <p style={{ textAlign: "center", color: "#999" }}>אין תורים להיום</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                      <th style={thStyle}>שם לקוח</th>
                      <th style={thStyle}>טלפון</th>
                      <th style={thStyle}>שירות</th>
                      <th style={thStyle}>שעת התחלה</th>
                      <th style={thStyle}>שעת סיום</th>
                      <th style={thStyle}>סטטוס</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.map((a, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                        <td style={tdStyle}>{a.fullName}</td>
                        <td style={tdStyle}>{a.phoneNumber}</td>
                        <td style={tdStyle}>{a.serviceName}</td>
                        <td style={tdStyle}>{new Date(a.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</td>
                        <td style={tdStyle}>{new Date(a.endTime).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</td>
                        <td style={tdStyle}>{a.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* לוגים וגרפים */}
        {activeTab === "logs" && (
          <div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
              {/* גרף עמודות — פעולות לפי יום */}
              <div style={{ ...CardStyle, flex: 1, minWidth: "300px" }}>
                <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>📊 פעולות לפי יום</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={getBarData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="פעולות" fill="#7eb8d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* גרף עוגה — פעולות לפי סוג */}
              <div style={{ ...CardStyle, flex: 1, minWidth: "300px" }}>
                <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>🥧 פעולות לפי סוג</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={getPieData()} dataKey="value" nameKey="name"
                      cx="50%" cy="50%" outerRadius={90}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {getPieData().map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* טבלת לוגים */}
            <div style={CardStyle}>
              <h2 style={{ color: "#D4939A", marginBottom: "16px" }}>📋 כל הלוגים</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                    <th style={thStyle}>משתמש</th>
                    <th style={thStyle}>פעולה</th>
                    <th style={thStyle}>תאריך</th>
                    <th style={thStyle}>שעה</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                      <td style={tdStyle}>{log.fullName}</td>
                      <td style={tdStyle}>{log.action}</td>
                      <td style={tdStyle}>{new Date(log.actionDate).toLocaleDateString("he-IL")}</td>
                      <td style={tdStyle}>{new Date(log.actionDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* תורים */}
        {activeTab === "appointments" && (
          <div style={CardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                  <th style={thStyle}>שם</th>
                  <th style={thStyle}>שירות</th>
                  <th style={thStyle}>תאריך</th>
                  <th style={thStyle}>סטטוס</th>
                  <th style={thStyle}>מחיר</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                    <td style={tdStyle}>{a.fullName}</td>
                    <td style={tdStyle}>{a.serviceName}</td>
                    <td style={tdStyle}>{new Date(a.appointmentDate).toLocaleString("he-IL")}</td>
                    <td style={tdStyle}>{a.status}</td>
                    <td style={tdStyle}>₪{a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* משתמשים */}
        {activeTab === "users" && (
          <div style={CardStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                  <th style={thStyle}>שם</th>
                  <th style={thStyle}>אימייל</th>
                  <th style={thStyle}>טלפון</th>
                  <th style={thStyle}>תפקיד</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                    <td style={tdStyle}>{u.fullName}</td>
                    <td style={tdStyle}>{u.email}</td>
                    <td style={tdStyle}>{u.phoneNumber}</td>
                    <td style={tdStyle}>{u.userRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* שירותים */}
        {activeTab === "services" && (
          <div>
            <div style={CardStyle}>
              <h3>{editingServiceId ? "עריכת שירות" : "הוספת שירות חדש"}</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input placeholder="שם שירות" value={serviceForm.serviceName}
                  onChange={(e) => setServiceForm({ ...serviceForm, serviceName: e.target.value })} style={inputStyle} />
                <input placeholder="זמן (דקות)" type="number" value={serviceForm.timetoservice}
                  onChange={(e) => setServiceForm({ ...serviceForm, timetoservice: e.target.value })} style={inputStyle} />
                <input placeholder="מחיר" type="number" value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} style={inputStyle} />
                <button onClick={handleServiceSubmit} style={btnStyle}>
                  {editingServiceId ? "עדכן" : "הוסף"}
                </button>
                {editingServiceId && (
                  <button onClick={() => { setEditingServiceId(null); setServiceForm({ serviceName: "", timetoservice: "", price: "" }); }}
                    style={{ ...btnStyle, backgroundColor: "#999" }}>ביטול</button>
                )}
              </div>
            </div>
            <div style={CardStyle}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                    <th style={thStyle}>שם</th>
                    <th style={thStyle}>זמן (דקות)</th>
                    <th style={thStyle}>מחיר</th>
                    <th style={thStyle}>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                      <td style={tdStyle}>{s.serviceName}</td>
                      <td style={tdStyle}>{s.timetoservice}</td>
                      <td style={tdStyle}>₪{s.price}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleEditService(s)} style={{ ...btnStyle, backgroundColor: "#7eb8d4", marginLeft: "5px" }}>עריכה</button>
                        <button onClick={() => handleDeleteService(s.serviceId)} style={{ ...btnStyle, backgroundColor: "#e88" }}>מחיקה</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* מוצרים */}
        {activeTab === "products" && (
          <div>
            <div style={CardStyle}>
              <h3>{editingProductId ? "עריכת מוצר" : "הוספת מוצר חדש"}</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <input placeholder="שם מוצר" value={productForm.productName}
                  onChange={(e) => setProductForm({ ...productForm, productName: e.target.value })} style={inputStyle} />
                <input placeholder="תיאור" value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} style={inputStyle} />
                <input placeholder="מחיר" type="number" value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} style={inputStyle} />
                <input placeholder="כמות במלאי" type="number" value={productForm.stockQuantity}
                  onChange={(e) => setProductForm({ ...productForm, stockQuantity: e.target.value })} style={inputStyle} />
                <input placeholder="קישור לתמונה" value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })} style={inputStyle} />
                <button onClick={handleProductSubmit} style={btnStyle}>
                  {editingProductId ? "עדכן" : "הוסף"}
                </button>
                {editingProductId && (
                  <button onClick={() => { setEditingProductId(null); setProductForm({ productName: "", description: "", price: "", stockQuantity: "", imageUrl: "" }); }}
                    style={{ ...btnStyle, backgroundColor: "#999" }}>ביטול</button>
                )}
              </div>
            </div>
            <div style={CardStyle}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#D4939A", color: "white" }}>
                    <th style={thStyle}>שם</th>
                    <th style={thStyle}>תיאור</th>
                    <th style={thStyle}>מחיר</th>
                    <th style={thStyle}>מלאי</th>
                    <th style={thStyle}>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fdf0f1" }}>
                      <td style={tdStyle}>{p.productName}</td>
                      <td style={tdStyle}>{p.description}</td>
                      <td style={tdStyle}>₪{p.price}</td>
                      <td style={tdStyle}>{p.stockQuantity}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleEditProduct(p)} style={{ ...btnStyle, backgroundColor: "#7eb8d4", marginLeft: "5px" }}>עריכה</button>
                        <button onClick={() => handleDeleteProduct(p.productId)} style={{ ...btnStyle, backgroundColor: "#e88" }}>מחיקה</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = { padding: "12px", textAlign: "right", borderBottom: "1px solid #ddd" };
const tdStyle = { padding: "10px 12px", borderBottom: "1px solid #eee" };
const inputStyle = { padding: "8px 12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", minWidth: "150px" };
const btnStyle = { padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#D4939A", color: "white", cursor: "pointer", fontWeight: "bold" };

export default Admin;