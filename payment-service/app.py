from flask import Flask, jsonify, request

app = Flask(__name__)

payments = []
id_counter = 1

@app.route('/payments', methods=['GET'])
def get_payments():
    return jsonify(payments)

@app.route('/payments/process', methods=['POST'])
def process_payment():
    global id_counter
    payment = request.get_json() or {}
    payment['id'] = id_counter
    id_counter += 1
    payment['status'] = "SUCCESS"
    payments.append(payment)
    return jsonify(payment), 201

@app.route('/payments/<int:id>', methods=['GET'])
def get_payment(id):
    for p in payments:
        if p.get('id') == id:
            return jsonify(p)
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8083)