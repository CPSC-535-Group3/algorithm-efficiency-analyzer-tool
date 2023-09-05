from app import app
from src.common.common import *
import time

@app.route('/test', methods=[CKey.GET, CKey.POST, CKey.PATCH, CKey.DELETE])
def handle_users():
    arr = [5,2,3,1,7,10,100,2,6,78,8,1,2,3,6,1,10100,303030]
    s = Sort()
    return jsonify({
        'insert': s.insertion(arr.copy()),
        'select': s.selection(arr.copy()),
        'quick': s.quick(arr.copy()),
        'merge': s.merge(arr.copy()),
        'bubble': s.bubble(arr.copy())
    })

class Sort:
    def insertion(self, arr):
        if not arr:
            return 0

        start = time.perf_counter()

        for i in range(1, len(arr)):
            cur = arr[i]
            j = i - 1

            while j >= 0 and arr[j] > cur:
                arr[j + 1] = arr[j]
                j -= 1

            arr[j + 1] = cur

        end = time.perf_counter()
        return end - start

    def selection(self, arr):
        if not arr:
            return 0

        start = time.perf_counter()

        for i in range(len(arr) - 1):
            m_idx = i
            for j in range(i + 1, len(arr)):
                if arr[m_idx] > arr[j]:
                    m_idx = j

            arr[i], arr[m_idx] = arr[m_idx], arr[i]

        end = time.perf_counter()

        return end - start

    def bubble(self, arr):
        if not arr:
            return 0

        start = time.perf_counter()
        for i in range(len(arr) - 1):
            for j in range(len(arr) - 1 - i):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]

        end = time.perf_counter()
        return end - start

    def quick(self, arr):
        if not arr:
            return 0

        def helper(l, r):
            if l > r:
                return

            p, pivot = l, arr[r]

            for i in range(l, r):
                if arr[i] < pivot:
                    arr[p], arr[i] = arr[i], arr[p]
                    p += 1
            arr[p], arr[r] = arr[r], arr[p]

            helper(l, p - 1)
            helper(p + 1, r)

        start = time.perf_counter()
        helper(0, len(arr) - 1)
        end = time.perf_counter()
        return end - start

    def merge(self, arr):
        if not arr:
            return 0

        def helper(arr):
            if len(arr) > 1:
                m = len(arr) // 2
                L = arr[:m]
                R = arr[m:]

                helper(L)
                helper(R)

                i = j = k = 0

                while i < len(L) and j < len(R):
                    if L[i] < R[j]:
                        arr[k] = L[i]
                        i += 1
                    else:
                        arr[k] = R[j]
                        j += 1
                    k += 1

                while i < len(L):
                    arr[k] = L[i]
                    i += 1
                    k += 1

                while j < len(R):
                    arr[k] = R[j]
                    j += 1
                    k += 1

        start = time.perf_counter()
        helper(arr)
        end = time.perf_counter()
        return end - start







