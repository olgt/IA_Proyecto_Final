# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from pypmml import Model

# 1) Carga tu PMML completo (transformaciones + modelo)
#    Asegúrate de que KNIME haya escrito en él todo el pipeline de StringsToDocument, BagOfWords, RuleEngine, etc.
modelo = Model.fromFile("modelo_sentimiento.pmml")

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    js = request.get_json(force=True)
    if "review" not in js or not js["review"].strip():
        return jsonify({"error": "El campo 'review' está vacío o no existe"}), 400

    texto = js["review"]
    try:
        # 2) Alimenta el pipeline PMML con la columna que KNIME espera
        #    En tu captura de KNIME el StringsToDocument crea/renombra la columna a "Document"
        #    Si en tu flujo se llama de otra forma, cámbialo aquí.
        result = modelo.predict({"Document": texto})

        # 3) Extrae la predicción:
        #    asumiendo que tu PMML Writer generó la columna Predicted_<target>,
        #    la cogemos automáticamente:
        #    pypmml devuelve un objeto tipo Row, así que:
        columnas = result.resultFields
        # resultFields es lista de nombres en orden; tomamos el último:
        salida = columnas[-1]
        raw = result.get(salida)

        # 4) Normaliza la etiqueta a minúsculas
        etiqueta = str(raw).lower()

        # 5) Traduce
        trad = {"positive":"positivo", "negative":"negativo", "neutral":"neutral"}
        etiqueta_es = trad.get(etiqueta, etiqueta)

        return jsonify({"sentimiento": etiqueta_es}), 200

    except Exception as e:
        # Devolvemos mensaje para depurar
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
