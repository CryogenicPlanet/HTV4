import os
mainDir = "/home/rahultarak12345/htv4ML"
os.system("python3 /home/rahultarak12345/htv4ML/py/retrain.py --bottleneck_dir=/home/rahultarak12345/htv4ML/ottlenecks --how_many_training_steps 5000  --model_dir=/home/rahultarak12345/htv4ML/inception --output_graph=/home/rahultarak12345/htv4ML/food_graph.pb --output_labels=/home/rahultarak12345/htv4ML/food_labels.txt --image_dir=/home/rahultarak12345/htv4ML/data/FooDD")
# "--learing_rate 0.9  --testing_percentage 30 --validation_percentage 30 --train_batch_size 64 --test_batch_size 64 --validation_batch_size 64"
