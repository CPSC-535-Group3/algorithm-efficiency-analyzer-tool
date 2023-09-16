# from app import app
from src.common.common import *
from random import shuffle
import time

# @app.route('/test', methods=[CKey.GET, CKey.POST, CKey.PATCH, CKey.DELETE])
# def handle_users():
#     arr = [5,2,3,1,7,10,100,2,6,78,8,1,2,3,6,1]
#     s = Sort()
#     return jsonify({
#         'insert': s.insertion(arr.copy()),
#         'select': s.selection(arr.copy()),
#         'quick': s.quick(arr.copy()),
#         'merge': s.merge(arr.copy()),
#         'bubble': s.bubble(arr.copy()),
#         'counting': s.counting(arr.copy()),
#         'heap': s.heap(arr.copy()),
#         'bogo': s.bogo(arr.copy())
#     })

class Sort:
    def heap(self, arr):
        if not arr:
            return 0

        def heapify(arr, n, i):
            largest = i
            l = 2 * i + 1
            r = 2 * i + 2

            if l < n and arr[i] < arr[l]:
                largest = l

            if r < n and arr[largest] < arr[r]:
                largest = r

            if largest != i:
                (arr[i], arr[largest]) = (arr[largest], arr[i])  # swap

                heapify(arr, n, largest)

        start = time.perf_counter()

        n = len(arr)
        for i in range(n // 2 - 1, -1, -1):
            heapify(arr, n, i)

        for i in range(n - 1, 0, -1):
            (arr[i], arr[0]) = (arr[0], arr[i])
            heapify(arr, i, 0)

        end = time.perf_counter()
        return end - start

    def counting(self, arr):
        if not arr:
            return 0

        def helper(arr):
            if not arr:
                return

            max_val = max(arr)
            count = [0] * (max_val + 1)
            output = [-1] * len(arr)

            for i in arr:
                count[i] += 1

            for i in range(1, len(count)):
                count[i] += count[i - 1]

            for i in range(len(arr) - 1, -1, -1):
                output[count[arr[i]] - 1] = arr[i]
            count[arr[i]] -= 1

            for i in range(len(arr)):
                arr[i] = output[i]


        negative_sub = []
        positive_sub = []

        for num in arr:
            if num >= 0:
                positive_sub.append(num)
            else:
                negative_sub.append(-num)

        start = time.perf_counter()

        helper(negative_sub)
        for i in range(len(negative_sub)):
            negative_sub[i] = -negative_sub[i]
        negative_sub[::-1]
        helper(positive_sub)
        negative_sub.extend(positive_sub)

        end = time.perf_counter()
        return end - start

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
