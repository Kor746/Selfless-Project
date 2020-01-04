import os 
import csv

def clean_data():
	curr_dir = os.getcwd()
	selfie_dataset_name = 'selfie_dataset.txt'
	selfie_dataset_path = os.path.join(curr_dir,selfie_dataset_name)
	list_of_jpgs = []
	with open(selfie_dataset_path,'r') as f:

		for line in f:
			list_of_jpgs.append(line.split(' ')[0] + '.jpg')
			# print(line.split(' ')[0] + '.jpg')
	with open('image_paths.csv','a') as f:
		for row in list_of_jpgs:
			f.write(row + '\n')
		

def write_prefix():
	curr_dir = os.getcwd()
	selfie_dataset_name = 'selfie_dataset.txt'
	# /Users/admin/desktop/SelfieProject/Selfie-dataset/images/
	with open()

def main():
	clean_data()



if __name__ == '__main__':
	main()