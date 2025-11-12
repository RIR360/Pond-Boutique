import csv
import json

with open('./tools/product-list.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    data = list(reader)

with open('./tools/product-list.json', 'w') as jsonfile:
    json.dump(data, jsonfile, indent=4, separators=(',', ':'))
