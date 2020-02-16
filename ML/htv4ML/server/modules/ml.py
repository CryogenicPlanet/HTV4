import os
import numpy as np
import importlib.util
spec = importlib.util.spec_from_file_location(
    "label_image", "/home/rahultarak12345/htv4ML/py/label_image.py")
foo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(foo)
face_spec = importlib.util.spec_from_file_location(
    "label_image", "/home/rahultarak12345/htv4ML/py/label_face.py")
face_foo = importlib.util.module_from_spec(face_spec)
face_spec.loader.exec_module(face_foo)


def getScores():
    A = [1, 2, 3, 4, 5]
    scores = []
    for item in A:
        score = foo.label_image(item)
        scores.extend(score)
    scores = np.array(scores)
    return statistics(scores)
    # return scores


def getPerson():
    A = [1, 2, 3, 4, 5]
    people = []
    for item in A:
        person = face_foo.label_image(item)
        people.extend(person)
    people = np.array(people)
    print(people)
    return statistics(people)


def statistics(scores):
    # scores.sort(axis=0)
    # print(scores)
    imp_score = []
    #print("vvvv  ITEMS vvvvvv")
    for item in scores:
        if float(item[1]) > 0.1:
            # print(item)
            imp_score.extend([item])
    # print(imp_score)
    averages = {}
    for item in imp_score:
        if item[0] in averages:
            temp = (averages[item[0]] + float(item[1]))/2
            averages[item[0]] = temp
        else:
            # print(item[1])
            averages[item[0]] = float(item[1])
    # print(averages)
    averages = sorted(averages.items(), key=lambda kv: (kv[1], kv[0]))
    if(averages[-1][0] == 'rahul' and averages[-1][1] < 0.72):
        return averages[-2][0]
    print(averages)
    return averages[-1][0]
