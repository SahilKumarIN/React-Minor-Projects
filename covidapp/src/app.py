from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

input_value = []

@app.route('/process_string', methods=['POST'])
def handle_data():
    return {'processed_string' : input_value[0]}


@app.route('/process_string')
def serve():
    # Returning an api for showing in  reactjs
    input_value_name = request.args.get('input_string')
    input_value.append(input_value_name)
    return input_value

# @app.route('/process_string', methods=['GET'])
# def handle_data():
#     input_string = request.args.get('input_string')
#     print(input_string)
#     processed_string = input_string.upper()

#     return {'processed_string': processed_string}

if __name__ == "__main__":
    app.run(debug=True)
    app.run(host='0.0.0.0')