# Clasificador Automático de Reseñas de Comida

Este repositorio contiene un flujo de trabajo en **KNIME Analytics Platform 5.4.4** para clasificar reseñas de productos alimenticios como positivas o negativas.

---

## 📋 Contenido

- `README.md` – documentación del proyecto  
- `Clasificador Automatico por Resenias/` – carpeta con el flujo principal  
- `Example Workflows/` – ejemplos genéricos de KNIME  
- `data/FOOD_REVIEW.csv` – fichero de entrada con reseñas de comida

---

## 🛠️ Requisitos

1. **KNIME Analytics Platform 5.4.4**  
   Descarga e instala desde https://www.knime.com/download  
2. Extensiones KNIME necesarias:  
   - KNIME Textprocessing  
   - KNIME Python Integration (si usas nodos Python)  
   - KNIME Scoring Nodes (para matriz de confusión y métricas)

---

## 📂 Estructura de datos

El fichero `data/FOOD_REVIEW.csv` debe contener, al menos, las siguientes columnas:

| Columna          | Tipo     | Descripción                                    |
|------------------|----------|------------------------------------------------|
| `review_id`      | Texto / Numérico | Identificador único de la reseña       |
| `review_text`    | Texto    | Contenido de la reseña                         |
| `rating`         | Numérico | Puntuación asignada por el usuario (e.g. 1–5)  |
| `date`           | Fecha    | Fecha de la reseña (formato YYYY-MM-DD)        |

> **Nota:** Si tu CSV tiene otros nombres de columna, ajusta los nodos de lectura o define tus propias _Flow Variables_.

---

## 🚀 Instrucciones de instalación y ejecución

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/olgt/IA_Proyecto_Final.git
   cd IA_Proyecto_Final
