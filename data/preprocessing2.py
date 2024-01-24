import pandas as pd
import os

current_directory = os.getcwd()

csv_file_list = []


for file in os.listdir(current_directory):
    if '.csv' in file:
        if 'merged_files.csv' in file:
            print('found 1')
        else:
            csv_file_list.append(file)

print(csv_file_list)
print(len(csv_file_list))
count=0
df = pd.DataFrame()
print('ready to iterate')
for file in csv_file_list:
    print(count)
    print(csv_file_list[0])
    data = pd.read_csv(file) 
    df = pd.concat([df, data], axis=0)
    count+=1
df.to_csv('merged_files.csv', index=False)