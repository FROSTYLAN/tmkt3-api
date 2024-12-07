const express = require("express");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: ['*', 'https://api-template-j8d7.onrender.com'], // Permitir todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permitir cookies y credenciales
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir estos encabezados
};
app.use(cors(corsOptions));

// Configuración de la base de datos
const sequelize = require('./utils/database.util');

// Associations
// const { Product } = require("./models/product.model");
// const { Category } = require("./models/category.model");

// Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'categorias' });
// Category.hasMany(Product, { foreignKey: 'categoryId', as: 'productos' });

// Verificar conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos PostgreSQL"))
  .catch((err) => console.error("No se pudo conectar a la base de datos", err));

sequelize
  .sync(
    { 
      // force: true 
    }
  )
  .then(() => console.log("Modelos sincronizados con la base de datos"))
  .catch((err) => console.error("Error al sincronizar los modelos", err));

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de TKMT3",
      version: "1.0.0",
      description: "API de uso sospechoso",
    },
    servers: [{ url: process.env.URL_API }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Redirigir la ruta principal a /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Rutas
const { AuthRoutes } = require("./routes/auth.routes");
const { CategoryRoutes } = require('./routes/category.routes');

app.use("/api/auth", AuthRoutes);
// app.use('/api/categories', CategoryRoutes);

// Escuchando puerto de entrada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
