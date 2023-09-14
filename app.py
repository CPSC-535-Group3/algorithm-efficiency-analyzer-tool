from flask import Flask
from src.algo.all import *

app = Flask(__name__)

@app.route('/sort', methods=[CKey.GET])
def sort():
    args = request.args
    # arr = list(map(int, args.get("unsorted_arr", default=[], type=list)))
    arr = list(map(int, args.get("unsorted_arr").split(",")))
    s = Sort()
    print(arr)
    return jsonify({
        'sorted_arr': sorted(arr.copy()),
        'metrics': {
            'insert': s.insertion(arr.copy()),
            'select': s.selection(arr.copy()),
            'quick': s.quick(arr.copy()),
            'merge': s.merge(arr.copy()),
            'bubble': s.bubble(arr.copy()),
            'counting': s.counting(arr.copy()),
            'heap': s.heap(arr.copy()),
            'bogo': s.bogo(arr.copy())
        }
    })

if __name__ == '__main__':
    app.run()
