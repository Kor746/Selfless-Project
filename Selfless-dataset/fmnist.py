import numpy as np
import pandas as pd
from skimage import data, io, filters
from sklearn.model_selection import train_test_split
from keras.utils import to_categorical
import keras
from keras.layers.normalization import BatchNormalization
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, MaxPool2D
from keras.preprocessing.image import ImageDataGenerator

from keras.layers import Conv2D, MaxPooling2D
from keras.optimizers import Adam
from keras.callbacks import LearningRateScheduler
from keras.callbacks import ReduceLROnPlateau
from keras.losses import categorical_crossentropy
from keras.optimizers import RMSprop
import os
from PIL import Image
from scipy import misc
import csv
import numpy
from scipy import ndimage, misc
import h5py


file_dir = os.getcwd() + '/images/'
# file_path = os.path.join(currdir,file_name)

# data_train = pd.read_csv('data_train.csv')
data_test = pd.read_csv('data_test.csv')


with h5py.File('baby.hdf5', 'w') as f:
	temp = ndimage.imread(file_dir+'baby.jpg')
	temp = misc.imresize(temp, (64, 64, 3))
	temp = np.stack(temp, axis=0)
	print(temp.shape)
	f.create_dataset("data_label", dtype='int8', data=temp, chunks=True, compression='gzip', compression_opts=9)

# with h5py.File('tool1.hdf5', 'r+') as f:
	
# 	temp = np.stack(temp, axis=0)
# 	temp = temp.reshape(temp.shape[0], 1)
# 	print(temp.shape)
# 	f.create_dataset("label_test", dtype='float32', data=temp, chunks=True, compression='gzip', compression_opts=9)


# with h5py.File('tool1.hdf5','w') as f:
# 	temp = []
# 	for k, value in data_test.iterrows():
# 		temp.append(ndimage.imread(file_dir+value['images']))
# 	temp = [misc.imresize(im, (64, 64, 3)) for im in temp]
# 	temp = np.stack(temp, axis=0)
# 	print(temp.shape)
# 	f.create_dataset("data_test", dtype='int8', data=temp, chunks=True, compression='gzip', compression_opts=9)

# with h5py.File('tool1.hdf5', 'r+') as f:
# 	temp = []
# 	for k, value in data_test.iterrows():
# 		temp.append(value["ppscore"])
# 	temp = np.stack(temp, axis=0)
# 	temp = temp.reshape(temp.shape[0], 1)
# 	print(temp.shape)
# 	f.create_dataset("label_test", dtype='float32', data=temp, chunks=True, compression='gzip', compression_opts=9)


