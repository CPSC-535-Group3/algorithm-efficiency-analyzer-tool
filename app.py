from flask import Flask
from src.algo.all import *

app = Flask(__name__, static_url_path='')

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/sort', methods=[CKey.GET])
def sort():
    args = request.args
    arr = list(map(int, args.get("unsorted_arr").split(",")))
    algos = args.get("algorithms").split(",")
    s = Sort()
    metrics = {}

    for algo in algos:
        if algo == 'insert':
            metrics['insert'] = s.insertion(arr.copy())
        elif algo == 'select':
            metrics['select'] = s.selection(arr.copy())
        elif algo == 'quick':
            metrics['quick'] = s.quick(arr.copy())
        elif algo == 'merge':
            metrics['merge'] = s.merge(arr.copy())
        elif algo == 'bubble':
            metrics['bubble'] = s.bubble(arr.copy())
        elif algo == 'counting':
            metrics['counting'] = s.counting(arr.copy())
        elif algo == 'heap':
            metrics['heap'] = s.heap(arr.copy())

    return jsonify({
        'sorted_arr': sorted(arr.copy()),
        'metrics': metrics
    })

if __name__ == '__main__':
    app.run()
