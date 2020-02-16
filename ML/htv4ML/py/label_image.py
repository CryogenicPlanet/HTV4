import tensorflow as tf
import sys
import os
import numpy as np


def label_image(image_number):
    mainDir = "/home/rahultarak12345/htv4ML/"
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
    number = image_number
    image_path = "/home/rahultarak12345/htv4ML/testImage/{}.jpg".format(
        number)
    # Read in the image_data
    image_data = tf.gfile.FastGFile(image_path, 'rb').read()
    # Loads label file, strips off carriage return
    label_lines = [line.rstrip() for line
                   in tf.gfile.GFile("{}food_labels.txt".format(mainDir))]
    # Unpersists graph from file
    with tf.gfile.FastGFile("{}food_graph.pb".format(mainDir), 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')
    # Feed the image_data as input to the graph and get first prediction
    with tf.Session() as sess:
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
        predictions = sess.run(softmax_tensor,
                               {'DecodeJpeg/contents:0': image_data})
        # Sort to show labels of first prediction in order of confidence
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
        scores = []
        for node_id in top_k:
            human_string = label_lines[node_id]
            score = predictions[0][node_id]
            #print('%s (score = %.5f)' % (human_string, score * 100))
            scores.append([human_string, score])
        scores = np.array(scores)
        # print(scores)
        return scores
        # np.savetxt('/home/rahultarak12345/UofTHacks-2020/ML/score/{}.txt'.format(number),scores)
