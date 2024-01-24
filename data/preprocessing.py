
#import packages 
import json
import csv
import pathlib
import os
import pandas as pd

current_directory = os.getcwd()
print("Current Working Directory:", current_directory)
file_list = os.listdir(current_directory)



# Opening JSON file and loading the data into the variable data

for participant in file_list:
    if '.txt' in participant:
        with open(participant) as json_file:
            data = json.load(json_file)
    
        # now we will open a file for writing
        data_file = open(participant+'.csv', 'w')
        
        # create the csv writer object
        csv_writer = csv.writer(data_file)
        
        # Counter variable used for writing
        # headers to the CSV file
        count = 0
       
        header = list(data[-1].keys())
        print(len(header))
        print(header)
        header.pop(9)
        print(len(header))
        print(header)
        csv_writer.writerow(header)

        for trial in data:
            if trial in data[:-1]:
                csv_writer.writerow(trial.values())
            else:
                trial.pop('endTime')
                csv_writer.writerow(trial.values())

csv_file_list = os.listdir(current_directory)
